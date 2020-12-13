import { unwatchFile } from 'fs-extra'

function getBusTimestamp (timestamp: number, busId: number): number {
  let iteration = 0
  let currentTimestamp = 0
  while (timestamp > currentTimestamp) {
    currentTimestamp = iteration * busId
    iteration++
  }
  return currentTimestamp
}

async function taskA (input: string): Promise<any> {
  const inputList = input.split('\n')
  const timestamp = parseInt(inputList[0])
  const busIds = inputList[1].split(',').filter(id => id !== 'x').map(id => parseInt(id))

  let bestBus = 0
  let delta = Number.MAX_SAFE_INTEGER
  for (const busId of busIds) {
    const busTimestamp = getBusTimestamp(timestamp, busId)
    const currentDelta = busTimestamp - timestamp
    if (currentDelta < delta) {
      bestBus = busId
      delta = currentDelta
    }
  }

  return bestBus * delta
}

function testTimestamp (timestamp: number, busId: number, offset: number): boolean {
  return (timestamp + offset) % busId === 0
}

async function taskB (input: string): Promise<any> {
  const inputList = input.split('\n')
  const busIds = inputList[1].split(',').map(id => Number.isNaN(parseInt(id)) ? -1 : parseInt(id))

  // I know the start offset 0 and end offset 20+
  // Test first and last first then move inwards

  // I*OFFSET

  let timestampToTest = 0
  while (true) {
    let found = false

    let start = 0
    let end = busIds.length - 1
    while (!found && start < end) {
      // console.log(timestampToTest, start, end)
      if (testTimestamp(timestampToTest, busIds[start], start) && testTimestamp(timestampToTest, busIds[end], end)) {
        // console.log('found a pair!')
        start++
        end--
        if (start === end) {
          // odd, check
          if (testTimestamp(timestampToTest, busIds[start], start)) {
            found = true
          }
        }
        if (start > end) {
          // Correct solution!
          console.log(start, end)
          found = true
          // S       E
          //   S   E
          //     S
          // 0 1 2 3 4
        }
      } else {
        // Not found
        break
      }
    }
    if (found) {
      // Found!
      break
    }
    timestampToTest++
  }

  return timestampToTest
}

export { taskA, taskB }
