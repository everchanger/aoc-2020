async function taskA (input: string): Promise<any> {
  const sum = 2020
  const inputArray = input.split('\n')

  // Create a lookup table where the key is the sum - entry to quickly lookup the matching value
  const lookup = new Map<number, number>()
  for (const inputEntry of inputArray) {
    const entryInt = parseInt(inputEntry)
    const index = sum - entryInt
    lookup.set(index, entryInt)
  }

  let result = 0
  for (const needle of lookup.values()) {
    const match = lookup.get(needle)
    if (match !== undefined) {
      result = match * needle
      break
    }
  }

  return result
}

function findIndicesOfSum (sum: number, input: number[], usedIndices: number[]): number[] {
  for (let i = 0; i < input.length; ++i) {
    if (usedIndices.includes(i)) {
      // We don't want to re-add an already run index!
      continue
    }
    const entry = input[i]
    const rest = sum - entry
    if (rest > 0) {
      // Add the current index to the usedIndex array and run this function again
      const allreadyUsedIndices = [...usedIndices, i]
      const result = findIndicesOfSum(rest, input, allreadyUsedIndices)
      if (result.length > 0) {
        return result
      }
    } else if (rest === 0) {
      // Nothing more to do, return the indices
      return [...usedIndices, i]
    }
  }
  // Looks like this is a dead end
  return []
}

async function taskB (input: string): Promise<any> {
  const sum = 2020
  const inputArray = input.split('\n')
  const numbers = inputArray.map(str => parseInt(str))

  const indices = findIndicesOfSum(sum, numbers, [])

  let result = 0
  for (const index of indices) {
    result = result === 0 ? numbers[index] : result * numbers[index]
  }

  return result
}

export { taskA, taskB }
