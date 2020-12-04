function readPassportData (input: string): Array<Map<string, string>> {
  const keyPairSeperator = ':'
  const rawEntries = input.split('\n\n')
  const entries = []
  for (const rawEntry of rawEntries) {
    const pairs = new Map<string, string>()
    let work = rawEntry
    // Find the keyPairSeperator
    let done = false
    while (!done) {
      const startPosition = work.indexOf(keyPairSeperator)
      // Check if we have another entry after this entry
      const nextStartPosition = work.indexOf(keyPairSeperator, startPosition + 1)

      let endPosition = 0
      if (nextStartPosition === -1) {
        // We can use the rest of the string as value
        endPosition = work.length
        done = true
      } else {
        // Find the location of the space or the newline separating this pair from the next
        endPosition = work.indexOf(' ', startPosition + 1)
        if (endPosition > nextStartPosition || endPosition === -1) {
          endPosition = work.indexOf('\n', startPosition + 1)
          if (endPosition > nextStartPosition) {
            throw new Error('This is bad, should never happen with sane input')
          }
        }
      }

      // The entry is between 0 of the string and endPosition
      const rawKeyPair = work.slice(0, endPosition)
      const keyPair = rawKeyPair.split(keyPairSeperator)
      pairs.set(keyPair[0].trim(), keyPair[1])

      // Plus one to skip seperator
      work = work.slice(endPosition)
    }
    entries.push(pairs)
  }
  return entries
}

function validatePassportAttributes (passport: Map<string, string>, neededAttributes: string[]): boolean {
  return neededAttributes.every(attribute => passport.has(attribute))
}

async function taskA (input: string): Promise<any> {
  const passports = readPassportData(input)

  const attributes = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid'
  ]
  let count = 0
  for (const passport of passports) {
    if (validatePassportAttributes(passport, attributes)) {
      count++
    }
  }
  return count
}

function validatePassportRules (passport: Map<string, string>, rules: Map<string, Function>): boolean {
  for (const rule of rules.entries()) {
    const data = passport.get(rule[0])
    if (rule[1](data) === false) {
      return false
    }
  }
  return true
}

async function taskB (input: string): Promise<any> {
  const passports = readPassportData(input)

  const rules = new Map<string, Function>()

  rules.set('byr', (data: string): boolean => {
    const intData = parseInt(data)
    return data.length === 4 && intData >= 1920 && intData <= 2002
  })

  rules.set('iyr', (data: string): boolean => {
    const intData = parseInt(data)
    return data.length === 4 && intData >= 2010 && intData <= 2020
  })

  rules.set('eyr', (data: string): boolean => {
    const intData = parseInt(data)
    return data.length === 4 && intData >= 2020 && intData <= 2030
  })

  rules.set('hgt', (data: string): boolean => {
    let isCm = true
    let pos = data.indexOf('cm')
    if (pos === -1) {
      isCm = false
      pos = data.indexOf('in')
    }

    const intData = parseInt(data.slice(0, pos))

    if (isCm) {
      return intData >= 150 && intData <= 193
    }

    return intData >= 59 && intData <= 76
  })

  rules.set('hcl', (data: string): boolean => {
    return /^#[0-9a-f]{6}$/i.test(data)
  })

  rules.set('ecl', (data: string): boolean => {
    const allowed = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
    return allowed.includes(data)
  })

  rules.set('pid', (data: string): boolean => {
    return data.length === 9
  })

  const attributes = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid'
  ]

  let count = 0
  for (const passport of passports) {
    if (validatePassportAttributes(passport, attributes) && validatePassportRules(passport, rules)) {
      count++
    }
  }
  return count
}

export { taskA, taskB }
