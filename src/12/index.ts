enum Direction {
  North = 'N',
  South = 'S',
  East = 'E',
  West = 'W',
  Left = 'L',
  Right = 'R',
  Forward = 'F'
}

interface Action {
  direction: Direction
  value: number
}

interface Vec2 {
  x: number
  y: number
}

async function taskA (input: string): Promise<any> {
  const actions = input.split('\n').map(row => {
    const action: Action = {
      direction: row.charAt(0) as Direction,
      value: parseInt(row.slice(1))
    }
    return action
  })

  const currentPosition: Vec2 = { x: 0, y: 0 }
  let currentRotation: number = 0

  for (const action of actions) {
    const direction: Vec2 = { x: 0, y: 0 }
    let rotation = 0
    let hasRotated = false
    switch (action.direction) {
      case Direction.North:
        direction.y = 1
        break
      case Direction.South:
        direction.y = -1
        break
      case Direction.East:
        direction.x = 1
        break
      case Direction.West:
        direction.x = -1
        break
      case Direction.Left:
        hasRotated = true
        rotation = currentRotation - action.value
        if (rotation < 0) {
          rotation = 360 + rotation
        }
        currentRotation = rotation
        break
      case Direction.Right:
        hasRotated = true
        rotation = currentRotation + action.value
        if (rotation >= 360) {
          rotation = rotation - 360
        }
        currentRotation = rotation
        break
      case Direction.Forward:
        if (currentRotation === 0) {
          direction.x = 1
        } else if (currentRotation === 90) {
          direction.y = -1
        } else if (currentRotation === 180) {
          direction.x = -1
        } else if (currentRotation === 270) {
          direction.y = 1
        }
        break
    };

    if (!hasRotated) {
      currentPosition.x += direction.x * action.value
      currentPosition.y += direction.y * action.value
    }
  }

  return Math.abs(currentPosition.x) + Math.abs(currentPosition.y)
}

async function taskB (input: string): Promise<any> {
  const actions = input.split('\n').map(row => {
    const action: Action = {
      direction: row.charAt(0) as Direction,
      value: parseInt(row.slice(1))
    }
    return action
  })

  const waypointPosition: Vec2 = { x: 10, y: 1 }
  const currentPosition: Vec2 = { x: 0, y: 0 }

  for (const action of actions) {
    let rotation = 0
    let hasRotated = false
    switch (action.direction) {
      case Direction.North:
        waypointPosition.y += action.value
        break
      case Direction.South:
        waypointPosition.y -= action.value
        break
      case Direction.East:
        waypointPosition.x += action.value
        break
      case Direction.West:
        waypointPosition.x -= action.value
        break
      case Direction.Left:
        hasRotated = true
        rotation = action.value
        break
      case Direction.Right:
        hasRotated = true
        rotation = 360 - action.value
        break
      case Direction.Forward:
        currentPosition.x += waypointPosition.x * action.value
        currentPosition.y += waypointPosition.y * action.value
        break
    };

    if (hasRotated) {
      const radians = rotation * (Math.PI / 180)
      const s = Math.sin(radians)
      const c = Math.cos(radians)
      // Handle rotation to new coords
      const newWaypoint: Vec2 = {
        x: Math.round(waypointPosition.x * c - waypointPosition.y * s),
        y: Math.round(waypointPosition.x * s + waypointPosition.y * c)
      }
      waypointPosition.x = newWaypoint.x
      waypointPosition.y = newWaypoint.y
    }
  }

  return Math.abs(currentPosition.x) + Math.abs(currentPosition.y)
}

export { taskA, taskB }
