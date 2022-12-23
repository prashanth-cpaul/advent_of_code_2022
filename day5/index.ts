import { INPUT } from './constants'

const [stackString, instructionString] = INPUT.split(/\n\n/).filter(
  (line) => line !== ''
)

const stacks: string[][] = []
let currentStackIndex = 0
let spaceCount = 0

for (let i = stackString.length - 1; i > 0; i--) {
  if (!isNaN(parseInt(stackString[i]))) {
    stacks.push([])
  } else {
    const unicodeValue = stackString[i].charCodeAt(0)
    if (unicodeValue === '\n'.charCodeAt(0)) {
      currentStackIndex = 0
      spaceCount = 0
    }
    if (i % 2 === 0) {
      if (
        unicodeValue >= 'A'.charCodeAt(0) &&
        unicodeValue <= 'Z'.charCodeAt(0)
      ) {
        stacks[currentStackIndex].push(stackString[i])
        currentStackIndex++
        spaceCount = 0
      } else if (unicodeValue === ' '.charCodeAt(0)) {
        spaceCount++

        if (spaceCount > 1) {
          spaceCount = 0
          currentStackIndex++
        }
      }
    }
  }
}

const procedureList = instructionString
  .split(/\n/)
  .filter((line) => line !== '')

const getStacksCopy = (stacks: string[][]) => stacks.map((stack) => [...stack]) // deep copy 2 dimensional array
const unorderedStacks = getStacksCopy(stacks).reverse()

// Part 1
const craneMover9000 = (stacks: string[][]) => {
  for (let i = 0; i < procedureList.length; i++) {
    const numberValues = procedureList[i].match(/\d+/g)
    if (numberValues) {
      const [itemCount, from, to] = numberValues.map((value) =>
        parseInt(value, 10)
      )

      const fromIndex = from - 1
      const toIndex = to - 1
      for (let j = 0; j < itemCount; j++) {
        const itemToMove = stacks[fromIndex].pop()
        if (itemToMove) {
          stacks[toIndex] = [...stacks[toIndex], itemToMove]
        }
      }
    }
  }

  return stacks
}

console.log(
  'Crates at the top of each stack using CrateMover 9000:',
  craneMover9000(getStacksCopy(unorderedStacks)).reduce((acc, stack) => {
    const stackLength = stack.length
    if (stackLength > 0) {
      return (acc += stack[stack.length - 1])
    }

    return ''
  }, '')
)

// Part 2
const craneMover9001 = (stacks: string[][]) => {
  for (let i = 0; i < procedureList.length; i++) {
    const numberValues = procedureList[i].match(/\d+/g)
    if (numberValues) {
      const [itemCount, from, to] = numberValues.map((value) =>
        parseInt(value, 10)
      )

      const fromIndex = from - 1
      const toIndex = to - 1
      let itemsToMove: string[] = []
      for (let j = 0; j < itemCount; j++) {
        const itemToMove = stacks[fromIndex].pop()
        if (itemToMove) {
          itemsToMove = [itemToMove, ...itemsToMove]
        }
      }
      stacks[toIndex] = [...stacks[toIndex], ...itemsToMove]
    }
  }

  return stacks
}

console.log(
  'Crates at the top of each stack using CrateMover 9001:',
  craneMover9001(getStacksCopy(unorderedStacks)).reduce((acc, stack) => {
    const stackLength = stack.length
    if (stackLength > 0) {
      return (acc += stack[stack.length - 1])
    }

    return ''
  }, '')
)
