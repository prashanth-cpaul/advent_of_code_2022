import { INPUT } from './constants'

const parsedInputString = INPUT.replace(/\n/, '')

const getFirstUniqueString = (
  startIndex: number,
  desiredStringLength: number
) => {
  let result = ''
  for (let i = startIndex; i < parsedInputString.length; i++) {
    if (result.length < desiredStringLength) {
      if (result.includes(parsedInputString[i])) {
        result = getFirstUniqueString(
          i - result.length + 1,
          desiredStringLength
        )
      } else {
        result += parsedInputString[i]
      }
      if (result.length === desiredStringLength) {
        break
      }
    }
  }
  return result
}

const getFirstMarkerAfterString = (str: string) => {
  const matchStartIndex = parsedInputString.match(str)?.index
  if (matchStartIndex) {
    return matchStartIndex + str.length
  }
  return 0
}

// Part 1
const startOfPacketString = getFirstUniqueString(0, 4)
console.log(
  'Number of characters to be processed before the first start-of-packet marker is detected: ',
  getFirstMarkerAfterString(startOfPacketString)
)

// Part 2
const startOfMessageString = getFirstUniqueString(0, 14)
console.log(
  'Number of characters to be processed before the first start-of-message marker is detected: ',
  getFirstMarkerAfterString(startOfMessageString)
)
