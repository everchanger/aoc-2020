enum SeatState {
  EMPTY = 'L',
  OCCUPIED = '#',
  FLOOR = '.'
}

function simulate (state: string[], occupiedToEmptyThreshold: number, neighbourDistanceLimit: number = undefined): string[] {
  const newState = []
  const height = state.length
  const width = state[0].length
  for (let y = 0; y < height; ++y) {
    let row = ''
    for (let x = 0; x < width; ++x) {
      // Apply rules
      const current = state[y].charAt(x)
      let nextState = current
      if (current !== SeatState.FLOOR) {
        const neighbourCount = countOccupiedNeighbours(state, x, y, neighbourDistanceLimit)
        if (current === SeatState.EMPTY && neighbourCount === 0) {
          nextState = SeatState.OCCUPIED
        } else if (current === SeatState.OCCUPIED && neighbourCount >= occupiedToEmptyThreshold) {
          nextState = SeatState.EMPTY
        }
      }
      row += nextState
    }
    newState.push(row)
  }
  return newState
}

function countOccupiedNeighbours (state: string[], x: number, y: number, neighbourDistanceLimit: number = undefined): number {
  const height = state.length
  const width = state[0].length

  // Shoot rays from the current x and y until hitting either an edge or a seat
  const patterns = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]

  let count = 0
  for (const pattern of patterns) {
    let done = false
    let currentX = x
    let currentY = y

    let tries = 0
    while (!done) {
      currentX += pattern[0]
      currentY += pattern[1]
      tries++

      if (currentX < 0 || currentX >= width) {
        done = true
      } else if (currentY < 0 || currentY >= height) {
        done = true
      } else if (state[currentY].charAt(currentX) === SeatState.EMPTY) {
        done = true
      } else if (state[currentY].charAt(currentX) === SeatState.OCCUPIED) {
        done = true
        count++
      } else if (tries === neighbourDistanceLimit) {
        done = true
      }
    }
  }

  return count
}

async function taskA (input: string): Promise<any> {
  const rows = input.split('\n')

  let simulatedState = [...rows]
  let done = false
  while (!done) {
    const result = simulate(simulatedState, 4, 1)

    if (result.every((value, index) =>
      value === simulatedState[index]
    )) {
      done = true
    } else {
      simulatedState = [...result]
    }
  }

  let count = 0
  for (const row of simulatedState) {
    for (let i = 0; i < row.length; ++i) {
      if (row.charAt(i) === SeatState.OCCUPIED) {
        count++
      }
    }
  }

  return count
}

async function taskB (input: string): Promise<any> {
  const rows = input.split('\n')

  let simulatedState = [...rows]
  let done = false
  while (!done) {
    const result = simulate(simulatedState, 5)

    if (result.every((value, index) =>
      value === simulatedState[index]
    )) {
      done = true
    } else {
      simulatedState = [...result]
    }
  }

  let count = 0
  for (const row of simulatedState) {
    for (let i = 0; i < row.length; ++i) {
      if (row.charAt(i) === SeatState.OCCUPIED) {
        count++
      }
    }
  }

  return count
}

export { taskA, taskB }
