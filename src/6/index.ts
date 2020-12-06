function getAnswersA (group: string): Map<string, number> {
  const persons = group.split('\n')
  const answers = new Map<string, number>()
  for (const person of persons) {
    for (let i = 0; i < person.length; ++i) {
      const answer = person.charAt(i)
      let count = answers.get(answer) ?? 0
      count++
      answers.set(answer, count)
    }
  }
  return answers
}

async function taskA (input: string): Promise<any> {
  const groups = input.split('\n\n')
  let count = 0
  for (const group of groups) {
    count += getAnswersA(group).size
  }

  return count
}

function getAnswersB (group: string): Map<string, number> {
  const persons = group.split('\n')
  const answers = new Map<string, number>()
  for (const person of persons) {
    for (let i = 0; i < person.length; ++i) {
      const answer = person.charAt(i)
      let count = answers.get(answer) ?? 0
      count++
      answers.set(answer, count)
    }
  }

  const output = new Map(answers)
  for (const entry of answers.entries()) {
    if (persons.length !== entry[1]) {
      output.delete(entry[0])
    }
  }

  return output
}

async function taskB (input: string): Promise<any> {
  const groups = input.split('\n\n')
  let count = 0
  for (const group of groups) {
    count += getAnswersB(group).size
  }

  return count
}

export { taskA, taskB }
