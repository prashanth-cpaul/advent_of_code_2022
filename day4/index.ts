import { INPUT } from './constants'

const generateSectionsIDs = (section: string) => {
  const [sectionStart, sectionEnd] = section.split('-')
  const start = parseInt(sectionStart, 10)
  const end = parseInt(sectionEnd, 10)

  return [...Array(end - start + 1).keys()].map((x) => x + start)
}

const sectionsPerPair = INPUT.split(/\n/).filter((line) => line !== '')

// Part 1
const fullyOverlappingAssignmentCount = sectionsPerPair.reduce(
  (acc, sectionPerPair) => {
    const [section1, section2] = sectionPerPair.split(',')

    const section1IDs = generateSectionsIDs(section1)
    const section2IDs = generateSectionsIDs(section2)

    return (acc +=
      section1IDs.every((section1ID) => section2IDs.includes(section1ID)) ||
      section2IDs.every((section2ID) => section1IDs.includes(section2ID))
        ? 1
        : 0)
  },
  0
)

console.log(
  'Number of fully overlapping assignment pairs:',
  fullyOverlappingAssignmentCount
)

// Part 2
const someOverlappingAssignmentCount = sectionsPerPair.reduce(
  (acc, sectionPerPair) => {
    const [section1, section2] = sectionPerPair.split(',')

    const section1IDs = generateSectionsIDs(section1)
    const section2IDs = generateSectionsIDs(section2)

    return (acc +=
      section1IDs.some((section1ID) => section2IDs.includes(section1ID)) ||
      section2IDs.some((section2ID) => section1IDs.includes(section2ID))
        ? 1
        : 0)
  },
  0
)

console.log(
  'Number of partially overlapping assignment pairs:',
  someOverlappingAssignmentCount
)
