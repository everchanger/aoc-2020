interface Instruction {
  opCode: string
  value: number
}

enum OpCode {
  ACC = 'acc',
  JMP = 'jmp',
  NOP = 'nop',
}

enum ExitCode {
  OK = 0,
  RUNNING,
  INFINITY,
}

interface ProgramResult {
  accumulator: number
  exitCode: ExitCode
}

function parseInstructions (input: string): Instruction[] {
  return input.split('\n').map(row => {
    const rawInstruction = row.split(' ')
    const instruction: Instruction = { opCode: rawInstruction[0], value: parseInt(rawInstruction[1]) }
    return instruction
  })
}

function runProgram (instructions: Instruction[]): ProgramResult {
  const instructionHistory: Instruction[] = []
  let accumulator = 0
  let currentOffset = 0
  let exitCode: ExitCode = ExitCode.RUNNING

  while (exitCode === ExitCode.RUNNING) {
    const instruction = instructions[currentOffset]

    let currentOffsetIncrement = 1

    switch (instruction.opCode) {
      case OpCode.ACC:
        accumulator += instruction.value
        break
      case OpCode.JMP:
        currentOffsetIncrement = instruction.value
        break
    }

    currentOffset += currentOffsetIncrement

    // Add current instruction to history
    instructionHistory.push(instruction)

    // Check if we are done
    if (currentOffset >= instructions.length) {
      // Program done
      exitCode = ExitCode.OK
    } else if (instructionHistory.includes(instructions[currentOffset])) {
      // Running same instruction again, abort
      exitCode = ExitCode.INFINITY
    }
  }
  const result: ProgramResult = {
    accumulator,
    exitCode
  }
  return result
}

async function taskA (input: string): Promise<any> {
  const instructions = parseInstructions(input)
  return runProgram(instructions).accumulator
}

async function taskB (input: string): Promise<any> {
  const instructions = parseInstructions(input)

  // Try to alter one instruction at a time, re-running the program and checking for a normal program exit
  for (const instruction of instructions) {
    const tmpCode = instruction.opCode

    // Switch 'jmp' and 'nop' instruction codes around
    if (instruction.opCode === OpCode.JMP) {
      instruction.opCode = OpCode.NOP
    } else if (instruction.opCode === OpCode.NOP) {
      instruction.opCode = OpCode.JMP
    }

    const result = runProgram(instructions)
    if (result.exitCode === ExitCode.OK) {
      // Program exited correctly!
      return result.accumulator
    }

    // Reset instruction code
    instruction.opCode = tmpCode
  }
  return 'no solution found'
}

export { taskA, taskB }
