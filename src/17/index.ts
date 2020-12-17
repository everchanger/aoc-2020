function countNeighbours (currentKey: string, isActive: boolean, lookup: Map<string, boolean>, result: Map<string, boolean>): number {
  let count = 0
  const pattern = /x(.*[0-9])y(.*[0-9])z(.*[0-9])/
  const match = currentKey.match(pattern)
  const cx = parseInt(match[1])
  const cy = parseInt(match[2])
  const cz = parseInt(match[3])
  console.log(cx, cy, cz, isActive)

  for (let x = -1; x <= 1; ++x) {
    for (let y = -1; y <= 1; ++y) {
      for (let z = -1; z <= 1; ++z) {
        const checkX = cx + x
        const checkY = cy + y
        const checkZ = cz + z
        const key = `x${checkX}y${checkY}z${checkZ}`
        if (key === currentKey) {
          continue
        }
        if (currentKey === 'x0y0z0') {
          console.log('checking: ', key)
        }
        if (lookup.has(key) && lookup.get(key)) {
          count++
        }
      }
    }
  }

  let newActive = false
  if (isActive) {
    // Active
    if (count === 2 || count === 3) {
      // Stay active
      newActive = true
    }
  } else {
    // Inactive
    if (count === 3) {
      newActive = true
    }
  }
  result.set(currentKey, newActive)

  return count
}

function addValues (minX: number, maxX: number, minY: number, maxY: number, minZ: number, maxZ: number, lookup: Map<string, boolean>): void {
  for (let y = minY; y <= maxY; ++y) {
    for (let x = minX; x <= maxX; ++x) {
      for (let z = minZ; z < maxZ; ++z) {
        if (!lookup.has(`x${x}y${y}z${z}`)) {
          lookup.set(`x${x}y${y}z${z}`, false)
          console.log('adding: ', `x${x}y${y}z${z}`)
        }
      }
    }
  }
}

async function taskA (input: string): Promise<any> {
  const rows = input.split('\n')

  const z = 0
  let lookup = new Map<string, boolean>()
  for (let y = 0; y < rows.length; ++y) {
    for (let x = 0; x < rows[y].length; ++x) {
      const active = rows[y].charAt(x) === '#'
      lookup.set(`x${x}y${y}z${z}`, active)
    }
  }

  // console.log(lookup)
  console.log('*'.repeat(20))

  // We always start at z = 0, we always need to descend one level and ascend one
  let numCycles = 1
  // Before we run our count we need to populate the new z planes with empty states. We also need new rows and columns..

  while (true) {
    const result = new Map<string, boolean>()
    const width = rows[0].length - 1
    const heigth = rows.length - 1

    addValues(-numCycles, width + numCycles, -numCycles, heigth + numCycles, -numCycles, numCycles, lookup)

    for (const entry of lookup.entries()) {
      countNeighbours(entry[0], entry[1], lookup, result)
    }
    numCycles++
    console.log('BEFORE')
    console.log(lookup)
    console.log('-'.repeat(20))
    lookup = result

    if (numCycles > 7) {
      break
    }

    console.log(lookup)
  }

  console.log('RESULT: ')
  console.log(lookup)

  let count = 0
  for (const value of lookup.values()) {
    if (value) {
      count++
    }
  }

  return count
}

async function taskB (input: string): Promise<any> {
  return 'task B'
}

export { taskA, taskB }
