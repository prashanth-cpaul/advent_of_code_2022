import { INPUT } from './constants'

const monkeyTextBlocks = INPUT.split(/\n\n/)

interface Monkey {
  startingItems: string[]
  operation: (old: number) => number
  test: {
    divisibleBy: string
    toMonkeyIfTrue: string
    toMonkeyIfFalse: string
  }
}
const parsedMonkeys = monkeyTextBlocks
  .map((monkeyTextBlock: string) => {
    const monkeyAttributesString = monkeyTextBlock.match(
      /(?<=Monkey\s\d+\:\n).*/ms
    )
    if (monkeyAttributesString) {
      const startingItemsString = monkeyAttributesString[0].match(
        /(?<=Starting\sitems\:\s)(\d+,?\s|\n)+/
      )
      const startingItems = (startingItemsString ?? [])[0]?.match(/\d+/g)

      const operationString = monkeyAttributesString[0].match(
        /(?<=Operation\:\snew\s=\s).*/
      )
      const [operand1, operator, operand2] = (
        (operationString ?? [])[0] ?? ''
      ).split(/\s/)

      const testString = monkeyAttributesString[0].match(
        /(?<=Test\:\sdivisible\sby\s)(.*)/gms
      )
      const [divisibleBy, toMonkeyIfTrue, toMonkeyIfFalse] = (
        (testString ?? [])[0] ?? ''
      ).match(/\d+/g) ?? ['0', '0', '0']

      const operation = (old: number) => {
        const operand2Value = operand2 === 'old' ? old : parseInt(operand2, 10)
        switch (operator) {
          case '+':
            return old + operand2Value
          case '*':
            return old * operand2Value
        }
        return 0
      }

      return {
        startingItems,
        operation,
        test: {
          divisibleBy,
          toMonkeyIfTrue,
          toMonkeyIfFalse,
        },
      }
    }
    return null
  })
  .filter((monkey) => monkey !== null) as Monkey[]

const greatestCommonDivisor = parsedMonkeys.reduce(
  (acc, { test }) => (acc *= parseInt(test.divisibleBy, 10)),
  1
)

const calculateMonkeyBusiness = ({
  worryLevelDivider = 1,
  rounds,
}: {
  worryLevelDivider?: number
  rounds: number
}) => {
  // Deep copy
  const monkeys = parsedMonkeys.map(({ operation, test, startingItems }) => ({
    startingItems: [...startingItems],
    test,
    operation,
  }))
  const totalItemInspectionsPerMonkey = monkeys.map(() => 0)
  for (let i = 0; i < rounds; i++) {
    monkeys.forEach(({ operation, test }, index) => {
      let startingItems = [...monkeys[index].startingItems]
      while (startingItems.length > 0) {
        totalItemInspectionsPerMonkey[index]++
        const worryLevel = parseInt(startingItems[0], 10)
        const newWorryLevel = operation(worryLevel)
        const boredWorryLevel =
          worryLevelDivider === 1
            ? newWorryLevel % greatestCommonDivisor
            : Math.floor(newWorryLevel / worryLevelDivider)
        const divisibleBy = parseInt(test.divisibleBy)

        if (boredWorryLevel % divisibleBy === 0) {
          const toMonkeyIfTrueIndex = parseInt(test.toMonkeyIfTrue, 10)
          monkeys[toMonkeyIfTrueIndex].startingItems.push(
            boredWorryLevel.toString()
          )
        } else {
          const toMonkeyIfFalseIndex = parseInt(test.toMonkeyIfFalse, 10)
          monkeys[toMonkeyIfFalseIndex].startingItems.push(
            boredWorryLevel.toString()
          )
        }
        startingItems = startingItems.length > 1 ? startingItems.slice(1) : []
        monkeys[index].startingItems = [...startingItems]
      }
    })
  }
  console.log('totalItemInspectionsPerMonkey: ', totalItemInspectionsPerMonkey)
  const levelOfMonkeyBusiness = totalItemInspectionsPerMonkey
    .sort((a, b) => b - a)
    .reduce((acc, value, index) => {
      if (index < 2) {
        return (acc *= value)
      } else {
        return acc
      }
    }, 1)

  console.log('levelOfMonkeyBusiness: ', levelOfMonkeyBusiness)
}

// Part 1
calculateMonkeyBusiness({ worryLevelDivider: 3, rounds: 20 })

// Part 2
calculateMonkeyBusiness({ rounds: 10000 })
