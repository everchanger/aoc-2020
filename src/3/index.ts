interface Slope {
  stepX: number
  stepY: number
}

function countTreesOnSlope (slope: Slope, map: string[]): number {
  const width = map[0].length

  let treeCount = 0

  for (let y = 0, x = 0; y < map.length; y += slope.stepY, x += slope.stepX) {
    if (x >= width) {
      x = x - width
    }
    if (map[y].charAt(x) === '#') {
      treeCount++
    }
  }

  return treeCount
}

async function taskA (input: string): Promise<any> {
  const rows = input.split('\n')
  return countTreesOnSlope({ stepX: 3, stepY: 1 }, rows)
}

async function taskB (input: string): Promise<any> {
  const rows = input.split('\n')
  const slopes: Slope[] = [
    {
      stepX: 1,
      stepY: 1
    },
    {
      stepX: 3,
      stepY: 1
    },
    {
      stepX: 5,
      stepY: 1
    },
    {
      stepX: 7,
      stepY: 1
    },
    {
      stepX: 1,
      stepY: 2
    }
  ]
  const countProduct = slopes.map(slope => countTreesOnSlope(slope, rows)).reduce((a, b) => a * b)
  return countProduct
}

export { taskA, taskB }
