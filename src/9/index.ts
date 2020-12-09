import { start } from 'repl'

function checkDataValidity (data: number[], start: number, end: number): boolean {
  // We need to find two values in the data that adds up to needle
  const sum = data[end + 1]
  for (let i = start; i < end; ++i) {
    const rest = sum - data[i]
    if (rest === data[i]) {
      // Must not be the same number
      continue
    }
    if (data.includes(rest)) {
      return true
    }
  }
  return false
}

async function taskA (input: string): Promise<any> {
  const encryptedData = input.split('\n').map(raw => parseInt(raw))
  const preamble = 25

  for (let i = preamble; i < encryptedData.length; ++i) {
    if (!checkDataValidity(encryptedData, i - preamble, i - 1)) {
      return encryptedData[i]
    }
  }
  return 'no solution'
}

async function taskB (input: string): Promise<any> {
  const encryptedData = input.split('\n').map(raw => parseInt(raw))
  const preamble = 25
  let invalidNumber = -1

  for (let i = preamble; i < encryptedData.length; ++i) {
    if (!checkDataValidity(encryptedData, i - preamble, i - 1)) {
      invalidNumber = encryptedData[i]
      break
    }
  }

  if (invalidNumber === -1) {
    throw new Error('No invalid number found!')
  }

  let startIndex = 0
  let currentSum = 0
  let endIndex = -1

  for (let i = 0; i < encryptedData.length; ++i) {
    currentSum += encryptedData[i]
    // console.log('checking i', i, currentSum)
    if (currentSum === invalidNumber) {
      // Solution found!
      endIndex = i
      break
    }

    if (currentSum > invalidNumber) {
      // Reset to where we started, increase startIndex and reset current sum
      startIndex++
      currentSum = 0

      i = startIndex - 1
    }
  }

  if (endIndex === -1) {
    console.log(startIndex, endIndex)
    throw new Error('end index not found :(')
  }

  // Create a new array of the section in the encrypted array, sort it and use the first/last index to calculate the answer
  const range = encryptedData.slice(startIndex, endIndex).sort((a, b) => a - b)

  const smallest = range[0]
  const largest = range[range.length - 1]

  return smallest + largest
}

export { taskA, taskB }
