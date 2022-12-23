import { INPUT } from './constants'

const parsedInputStrings = INPUT.split(/\n/).filter((line) => line !== '')

// Part 1
const recordSignalStrength = () => {
  if (
    noOfCycles === 20 ||
    (noOfCycles >= 60 && noOfCycles <= 220 && (noOfCycles - 20) % 40 === 0)
  ) {
    signalStrengths.push(X * noOfCycles)
  }
}

let X = 1
let noOfCycles = 0
const signalStrengths: number[] = []
for (let i = 0; i < parsedInputStrings.length; i++) {
  const [command, argument] = parsedInputStrings[i].split(' ')

  switch (command) {
    case 'noop':
      noOfCycles++
      recordSignalStrength()
      break

    case 'addx':
      for (let j = 1; j <= 2; j++) {
        noOfCycles++
        recordSignalStrength()
      }
      X += parseInt(argument, 10)
      break
  }
}

console.log(
  'Sum of signal strengths: ',
  signalStrengths.reduce((acc, value) => (acc += value), 0)
)

// Part 2
X = 1
let spritePosition: [number, number, number] = [0, 1, 2]
noOfCycles = 0
const crtPixelGrid: string[][] = []

for (let i = 0; i < 6; i++) {
  const row: string[] = []
  for (let j = 0; j < 40; j++) {
    row.push('.')
  }
  crtPixelGrid.push(row)
}

const drawPixel = () => {
  if (!spritePosition.includes(noOfCycles % 40)) {
    return
  }
  if (noOfCycles <= 40) {
    crtPixelGrid[0][noOfCycles] = '#'
  } else if (noOfCycles > 40 && noOfCycles <= 80) {
    crtPixelGrid[1][noOfCycles % 40] = '#'
  } else if (noOfCycles > 80 && noOfCycles <= 120) {
    crtPixelGrid[2][noOfCycles % 40] = '#'
  } else if (noOfCycles > 120 && noOfCycles <= 160) {
    crtPixelGrid[3][noOfCycles % 40] = '#'
  } else if (noOfCycles > 160 && noOfCycles <= 200) {
    crtPixelGrid[4][noOfCycles % 40] = '#'
  } else {
    crtPixelGrid[5][noOfCycles % 40] = '#'
  }
}

for (let i = 0; i < parsedInputStrings.length; i++) {
  const [command, argument] = parsedInputStrings[i].split(' ')

  switch (command) {
    case 'noop':
      drawPixel()
      noOfCycles++
      break

    case 'addx':
      for (let j = 1; j <= 2; j++) {
        drawPixel()
        noOfCycles++
      }
      X += parseInt(argument, 10)
      spritePosition = [X - 1, X, X + 1]
      break
  }
}

for (let i = 0; i < 6; i++) {
  let row = ''
  for (let j = 0; j < 40; j++) {
    row += crtPixelGrid[i][j]
  }
  console.log(`${row}\n`)
}
