import { INPUT } from './constants'

const calculatePriority = (item: string) => {
  const unicodeValue = item.charCodeAt(0)
  if (unicodeValue >= 'a'.charCodeAt(0) && unicodeValue <= 'z'.charCodeAt(0)) {
    return unicodeValue - 'a'.charCodeAt(0) + 1
  }
  if (unicodeValue >= 'A'.charCodeAt(0) && unicodeValue <= 'Z'.charCodeAt(0)) {
    return unicodeValue - 'A'.charCodeAt(0) + 27
  }
  return 0
}

const contentsPerRucksackList = INPUT.split(/\n/).filter((line) => line !== '')

// Part 1
const commonItemPriorities = contentsPerRucksackList.map((contents) => {
  const compartmentAContents = contents.slice(0, contents.length / 2).split('')
  const compartmentBContents = contents.slice(contents.length / 2).split('')

  const commonItem = compartmentAContents.find((value) =>
    compartmentBContents.includes(value)
  )
  if (commonItem) {
    return calculatePriority(commonItem)
  }
  return 0
})

console.log(
  "Sum total of priorities of common item in each elf's rucksack: ",
  commonItemPriorities.reduce((acc, priority) => (acc += priority), 0)
)

// Part 2
const groupRucksacksList: string[][] = []
for (let i = 0; i < contentsPerRucksackList.length; i++) {
  if (i % 3 === 0) {
    groupRucksacksList.push([contentsPerRucksackList[i]])
  } else {
    groupRucksacksList[Math.floor(i / 3)].push(contentsPerRucksackList[i])
  }
}

const badgeItemList = groupRucksacksList.flatMap((groupRucksacks) => {
  const contentsOfRucksack1 = groupRucksacks[0].split('')
  const contentsOfRucksack2 = groupRucksacks[1].split('')
  const contentsOfRucksack3 = groupRucksacks[2].split('')
  const commonItems1and2 = contentsOfRucksack1.filter((value) =>
    contentsOfRucksack2.includes(value)
  )
  const badgeItem = contentsOfRucksack3.filter((value) =>
    commonItems1and2.includes(value)
  )

  return [...new Set(badgeItem)] // return without duplicates
})

console.log(
  'Sum total of priorities of badge item in rucksacks of each elf group: ',
  badgeItemList.reduce((acc, item) => (acc += calculatePriority(item)), 0)
)
