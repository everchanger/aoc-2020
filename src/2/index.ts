interface RowData {
  char: string
  password: string
  first: number
  second: number
}

function parseRow (row: string): RowData {
  const parts = row.split(' ').map(part => part.trim())
  const counts = parts[0].split('-')

  const result: RowData = {
    first: parseInt(counts[0]),
    second: parseInt(counts[1]),
    char: parts[1].charAt(0),
    password: parts[2]
  }

  return result
}

async function taskA (input: string): Promise<any> {
  const inputArray = input.split('\n')
  const result = inputArray.filter(row => {
    const data = parseRow(row)

    return checkPasswordA(data.char, data.first, data.second, data.password)
  })
  return result.length
}

function checkPasswordA (char: string, min: number, max: number, password: string): boolean {
  const regex: RegExp = new RegExp(char, 'g')
  const regexResult = password.match(regex)

  let count = 0
  if (regexResult !== null) {
    count = regexResult.length
  }
  return count >= min && count <= max
}

async function taskB (input: string): Promise<any> {
  const inputArray = input.split('\n')
  const result = inputArray.filter(row => {
    const data = parseRow(row)

    return checkPasswordB(data.char, data.first, data.second, data.password)
  })
  return result.length
}

function checkPasswordB (char: string, first: number, second: number, password: string): boolean {
  const onFirst = (password.charAt(first - 1) === char)
  const onSecond = (password.charAt(second - 1) === char)
  return onFirst !== onSecond
}

export { taskA, taskB }
