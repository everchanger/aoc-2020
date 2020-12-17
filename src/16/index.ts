async function taskA (input: string): Promise<any> {
  const definitionPattern = /(.*): (.*[0-9])-(.*[0-9]) or (.*[0-9])-(.*[0-9])/
  const sections = input.split('\n\n')
  const validNumbers: number[] = []
  const definitions = sections[0].split('\n').map((row) => {
    const match = row.match(definitionPattern)
    const label = match[1]
    const firstMin = parseInt(match[2])
    const firstMax = parseInt(match[3])
    const secondMin = parseInt(match[4])
    const secondMax = parseInt(match[5])

    for (let i = firstMin; i <= firstMax; ++i) {
      validNumbers.push(i)
    }
    for (let i = secondMin; i <= secondMax; ++i) {
      validNumbers.push(i)
    }

    return label
  })

  const invalidTickets = []
  const rawTickets = sections[2].split('\n').slice(1)
  for (const rawTicket of rawTickets) {
    const values = rawTicket.split(',')
    for (const value of values) {
      const valueNumeric = parseInt(value)
      if (!validNumbers.includes(valueNumeric)) {
        invalidTickets.push(valueNumeric)
      }
    }
  }

  const sum = invalidTickets.reduce((a, b) => a + b)
  return sum
}

async function taskB (input: string): Promise<any> {
  const definitionPattern = /(.*): (.*[0-9])-(.*[0-9]) or (.*[0-9])-(.*[0-9])/
  const sections = input.split('\n\n')
  const validNumbers: number[] = []
  const definitions = sections[0].split('\n').map((row) => {
    const match = row.match(definitionPattern)
    const label = match[1]
    const firstMin = parseInt(match[2])
    const firstMax = parseInt(match[3])
    const secondMin = parseInt(match[4])
    const secondMax = parseInt(match[5])

    for (let i = firstMin; i <= firstMax; ++i) {
      validNumbers.push(i)
    }
    for (let i = secondMin; i <= secondMax; ++i) {
      validNumbers.push(i)
    }

    return label
  })

  const invalidTickets = []
  const rawTickets = sections[2].split('\n').slice(1)
  const tickets = []
  for (const rawTicket of rawTickets) {
    const values = rawTicket.split(',')
    const ticket = []
    let invalid = false
    for (const value of values) {
      const valueNumeric = parseInt(value)
      if (!validNumbers.includes(valueNumeric)) {
        invalid = true
      }
      ticket.push(valueNumeric)
    }
    if (!invalid) {
      tickets.push(ticket)
    }
  }
  console.log(tickets)
  return 'task B'
}

export { taskA, taskB }
