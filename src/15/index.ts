interface SpokenNumber {
  indices: number[]
}

function getSpokenNumberAt (numbers: number[], maxIterations: number): number {
  const lookup = new Map<number, SpokenNumber>()
  let lastSpoken: number
  let index = 0
  while (index !== maxIterations) {
    let current = numbers[index]

    if (index >= numbers.length) {
      const lastSpokenNumber = lookup.get(lastSpoken)
      if (lastSpokenNumber === undefined) {
        current = lastSpoken
      } else if (lastSpokenNumber.indices.length === 1) {
        current = 0
      } else if (lastSpokenNumber.indices.length > 1) {
        const len = lastSpokenNumber.indices.length
        current = lastSpokenNumber.indices[len - 1] - lastSpokenNumber.indices[len - 2]
      }
    }

    let spokenNumber = lookup.get(current)
    if (spokenNumber === undefined) {
      spokenNumber = {
        indices: []
      }
    }

    spokenNumber.indices.push(index)

    lastSpoken = current
    lookup.set(current, spokenNumber)
    index++
  }
  return lastSpoken
}

async function taskA (input: string): Promise<any> {
  const numbers = input.split(',').map(str => parseInt(str))
  return getSpokenNumberAt(numbers, 2020)
}

async function taskB (input: string): Promise<any> {
  const numbers = input.split(',').map(str => parseInt(str))
  return getSpokenNumberAt(numbers, 30000000)
}

export { taskA, taskB }
