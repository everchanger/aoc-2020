async function taskA (input: string): Promise<any> {
  const joltRatings = input.split('\n').map(raw => parseInt(raw)).sort((a, b) => a - b)

  const deviceJolt = 3
  const deviceRating = joltRatings[joltRatings.length - 1] + deviceJolt
  joltRatings.push(deviceRating)

  const inputRatings = [1, 2, 3]
  const counter: { [key: number]: number } = {}

  let current = 0
  while (current < deviceRating) {
    for (const inputRating of inputRatings) {
      const checkRating = current + inputRating
      if (joltRatings.includes(checkRating)) {
        current += inputRating
        if (counter[inputRating] === undefined) {
          counter[inputRating] = 0
        }
        counter[inputRating]++
        break
      }
    }
  }

  return counter[1] * counter[3]
}

function countValidRatings (resultMap: Map<string, number>, joltRatings: number[], deviceRating: number, current: number, inputRatingOffset: number = 0, level: number = 0): number {
  let count = 0
  const inputRatings = [1, 2, 3]
  level++

  const inputHash = `c:${current}-o:${inputRatingOffset}`
  const cachedResult = resultMap.get(inputHash)
  if (cachedResult !== undefined) {
    return cachedResult
  }

  while (current < deviceRating) {
    const lastCurrent = current
    // console.log(lastCurrent)
    for (let i = inputRatingOffset; i < inputRatings.length; ++i) {
      const inputRating = inputRatings[i]
      const checkRating = current + inputRating
      // console.log(checkRating, inputRating)
      if (joltRatings.includes(checkRating)) {
        // console.log(current, 'found', checkRating, 'with', inputRating, 'level', level)

        // Need to check if this is a valid path
        if (inputRating < 3) {
          // console.log('trying with offset')
          count += countValidRatings(resultMap, joltRatings, deviceRating, current, inputRating, level)
        }
        current += inputRating

        // Reset inputRatingOffset after using it
        inputRatingOffset = 0
        break
      }
    }
    if (lastCurrent === current) {
      // Infinity loop = no answer
      // console.log(current, 'infinity', level)
      resultMap.set(inputHash, 0)
      return 0
    }
  }

  if (current > deviceRating) {
    // Overshot = no answer
    // console.log('overshot')
    resultMap.set(inputHash, 0)
    return 0
  }
  // console.log(count, level)
  resultMap.set(inputHash, count + 1)
  return count + 1
}

async function taskB (input: string): Promise<any> {
  const joltRatings = input.split('\n').map(raw => parseInt(raw)).sort((a, b) => a - b)

  const deviceJolt = 3
  const deviceRating = joltRatings[joltRatings.length - 1] + deviceJolt
  joltRatings.push(deviceRating)

  const resultMap = new Map<string, number>()

  const count = countValidRatings(resultMap, joltRatings, deviceRating, 0)
  // const count = 0

  return count
}

export { taskA, taskB }
