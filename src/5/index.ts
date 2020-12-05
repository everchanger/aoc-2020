function getSeatIdFromString (binaryString: string): number {
  let rangeMin = 0
  let rangeMax = 127

  const numRowChars = 7

  let row = -1
  let col = -1

  // FBFBBFFRLR

  for (let i = 0; i < binaryString.length; ++i) {
    const char = binaryString.charAt(i)

    let highChar = 'B'
    let lowChar = 'F'

    if (row !== -1) {
      highChar = 'R'
      lowChar = 'L'
    }

    const range = rangeMax - rangeMin
    const half = Math.floor(range / 2)

    if (char === highChar) {
      rangeMin = rangeMax - half
    } else if (char === lowChar) {
      rangeMax = rangeMin + half
    } else {
      throw new Error('Bad input')
    }

    if (i === numRowChars - 1) {
      row = rangeMin

      // Reset for column calc
      rangeMin = 0
      rangeMax = 7
    }
  }
  col = rangeMin

  return row * 8 + col
}

async function taskA (input: string): Promise<any> {
  const rows = input.split('\n')
  let high = 0
  for (const row of rows) {
    const seatId = getSeatIdFromString(row)
    if (seatId > high) {
      high = seatId
    }
  }
  return high
}

async function taskB (input: string): Promise<any> {
  const rows = input.split('\n')
  const seatIds: number[] = []
  for (const row of rows) {
    const seatId = getSeatIdFromString(row)
    seatIds.push(seatId)
  }
  seatIds.sort((a, b) => a - b)
  for (let i = 0; i < seatIds.length; ++i) {
    const currentSeatId = seatIds[i]
    const expectedNextSeatId = currentSeatId + 1
    const nextSeatId = seatIds[i + 1]
    // Check if the next id is the expected id, otherwise we have our seat!
    if (nextSeatId !== expectedNextSeatId) {
      return expectedNextSeatId
    }
  }
  return 'no solution'
}

export { taskA, taskB }
