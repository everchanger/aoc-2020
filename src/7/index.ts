interface Bag {
  color: string
  count: number
  children: Bag[]
}

function parseBags (rows: string[]): Map<string, Bag> {
  const parentRegex = /(.*) bag/
  const childRegex = /([0-9]*) ([a-z].*) bag/

  const bagMap = new Map<string, Bag>()

  for (const row of rows) {
    const columns = row.split('contain')
    const parentColor = columns[0].match(parentRegex)[1]
    const parent: Bag = {
      color: parentColor,
      count: 0,
      children: []
    }
    const bags = columns[1].split(',')

    // Insert parent in map
    bagMap.set(parentColor, parent)

    if (bags.length === 1 && bags[0].includes('no other bags.')) {
      continue
    }

    // Set children to parent
    for (const bag of bags) {
      const childRegexResult = bag.match(childRegex)
      const count = parseInt(childRegexResult[1])
      const color = childRegexResult[2]

      const child: Bag = {
        color,
        count,
        children: []
      }

      parent.children.push(child)
    }
  }
  return bagMap
}

function findBags (needle: string, bags: Map<string, Bag>, result: Map<string, boolean>): void {
  for (const entry of bags.entries()) {
    const bag = entry[1]
    // Check which of the parents has the bag we are looking for
    for (const childBag of bag.children) {
      if (childBag.color !== needle) {
        continue
      }
      result.set(bag.color, true)
      findBags(bag.color, bags, result)
    }
  }
}

async function taskA (input: string): Promise<any> {
  const rows = input.split('\n')
  const bags = parseBags(rows)

  const needle = 'shiny gold'
  const result = new Map<string, boolean>()
  findBags(needle, bags, result)

  return result.size
}

function countChildBags (bag: Bag, bags: Map<string, Bag>): number {
  let count = 0
  for (const shallowChild of bag.children) {
    count += shallowChild.count
    const childBag = bags.get(shallowChild.color)
    if (childBag.children.length > 0) {
      count += countChildBags(childBag, bags) * shallowChild.count
    }
  }
  return count
}

async function taskB (input: string): Promise<any> {
  const rows = input.split('\n')
  const bags = parseBags(rows)

  const needle = 'shiny gold'
  const bag = bags.get(needle)
  const count = countChildBags(bag, bags)

  return count
}

export { taskA, taskB }
