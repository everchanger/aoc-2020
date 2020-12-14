const MASKSIZE = 36

function decimalToBinary (decimal: number, maskSize = MASKSIZE): string {
  const binary = (decimal >>> 0).toString(2)
  const zerosNeeded = maskSize - binary.length
  if (zerosNeeded > 0) {
    // Need to pad to MASKSIZE chars
    return '0'.repeat(zerosNeeded) + binary
  }
  return binary
}

function binaryToDecimal (binary: string): number {
  return parseInt(binary, 2)
}

function applyMaskA (mask: string, value: number): number {
  const binary = decimalToBinary(value)
  let output = ''
  for (let i = 0; i < mask.length; ++i) {
    if (mask[i] === 'X') {
      output += binary[i]
    } else {
      output += mask[i]
    }
  }
  return binaryToDecimal(output)
}

async function taskA (input: string): Promise<any> {
  const instructions = input.split('mask = ').filter(row => row.length > 0).map(row => row.split('\n').filter(line => line.length > 0))
  const pattern = /mem\[(.*)\] = (.*[0-9])/
  const memory = new Map<string, number>()
  for (const instruction of instructions) {
    const mask = instruction[0]
    for (let i = 1; i < instruction.length; ++i) {
      const regexResult = instruction[i].match(pattern)
      const address = regexResult[1]
      const value = parseInt(regexResult[2])
      const maskedValue = applyMaskA(mask, value)

      memory.set(address, maskedValue)
    }
  }

  let sum = 0
  for (const value of memory.values()) {
    sum += value
  }

  return sum
}

function getPossibleValues (binary: string, floats: number): number[] {
  const solutions: number[] = []

  // We need to move from 000 to 111 if floats is 3
  const maxValueBinary = '1'.repeat(floats)
  const maxValueDec = binaryToDecimal(maxValueBinary)
  for (let i = 0; i <= maxValueDec; ++i) {
    const currentBinary = decimalToBinary(i, floats)

    // Replace X in order of the currentBinary string, e.g: X at index first index gets replaced with currentBinary[0]
    let copy = binary
    for (let j = 0; j < floats; ++j) {
      copy = copy.replace('X', currentBinary[j])
    }
    const decimal = binaryToDecimal(copy)
    solutions.push(decimal)
  }

  return solutions
}

function applyMaskToAddress (mask: string, address: number): number[] {
  const binary = decimalToBinary(address)
  let output = ''
  let floats = 0
  for (let i = 0; i < mask.length; ++i) {
    if (mask[i] === '0') {
      output += binary[i]
    } else if (mask[i] === '1') {
      output += '1'
    } else {
      // Floating bit
      output += mask[i]
      floats++
    }
  }
  return getPossibleValues(output, floats)
}

async function taskB (input: string): Promise<any> {
  const instructions = input.split('mask = ').filter(row => row.length > 0).map(row => row.split('\n').filter(line => line.length > 0))
  const pattern = /mem\[(.*)\] = (.*[0-9])/
  const memory = new Map<number, number>()
  for (const instruction of instructions) {
    const mask = instruction[0]
    for (let i = 1; i < instruction.length; ++i) {
      const regexResult = instruction[i].match(pattern)
      const address = parseInt(regexResult[1])
      const value = parseInt(regexResult[2])
      const maskedAdresses = applyMaskToAddress(mask, address)

      for (const maskedAdress of maskedAdresses) {
        memory.set(maskedAdress, value)
      }
    }
  }

  let sum = 0
  for (const value of memory.values()) {
    sum += value
  }

  return sum
}

export { taskA, taskB }
