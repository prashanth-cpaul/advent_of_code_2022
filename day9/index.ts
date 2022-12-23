import { INPUT } from './constants'

const parsedInputStrings = INPUT.split(/\n/).filter((line) => line !== '')

const gridLength =
  parsedInputStrings
    .filter((line) => line.charAt(0) === 'R' || line.charAt(0) === 'L')
    .map((line) => parseInt(line.split(' ')[1], 10))
    .sort((a, b) => b - a)[0] + 1

const gridHeight =
  parsedInputStrings
    .filter((line) => line.charAt(0) === 'U' || line.charAt(0) === 'D')
    .map((line) => parseInt(line.split(' ')[1], 10))
    .sort((a, b) => b - a)[0] + 1

let positionsTVisited: [number, number][] = []

const addToPositionsVisited = ([T_pos_x, T_pos_y]: [number, number]) => {
  if (!positionsTVisited.find(([x, y]) => x === T_pos_x && y === T_pos_y)) {
    positionsTVisited.push([T_pos_x, T_pos_y])
  }
}

let headPosition: [number, number] = [
  Math.floor(gridLength / 2),
  Math.floor(gridHeight / 2),
]
const tailPositions: [number, number][] = []
for (let i = 0; i < 9; i++) {
  tailPositions.push([Math.floor(gridLength / 2), Math.floor(gridHeight / 2)])
}

const evaluateTailPosition = (
  currentHead: [number, number],
  tail: [number, number]
) => {
  const [H_pos_x, H_pos_y] = currentHead
  let [T_pos_x, T_pos_y] = tail

  if (T_pos_x - H_pos_x > 1) {
    if (T_pos_y === H_pos_y) {
      tail[0] = T_pos_x - 1
    } else if (T_pos_y - H_pos_y > 0) {
      tail[0] = T_pos_x - 1
      tail[1] = T_pos_y - 1
    } else {
      tail[0] = T_pos_x - 1
      tail[1] = T_pos_y + 1
    }
  } else if (H_pos_x - T_pos_x > 1) {
    if (T_pos_y === H_pos_y) {
      tail[0] = T_pos_x + 1
    } else if (T_pos_y - H_pos_y > 0) {
      tail[0] = T_pos_x + 1
      tail[1] = T_pos_y - 1
    } else {
      tail[0] = T_pos_x + 1
      tail[1] = T_pos_y + 1
    }
  } else if (H_pos_y - T_pos_y > 1) {
    if (T_pos_x === H_pos_x) {
      tail[1] = T_pos_y + 1
    } else if (T_pos_x - H_pos_x > 0) {
      tail[0] = T_pos_x - 1
      tail[1] = T_pos_y + 1
    } else {
      tail[0] = T_pos_x + 1
      tail[1] = T_pos_y + 1
    }
  } else if (T_pos_y - H_pos_y > 1) {
    if (T_pos_x === H_pos_x) {
      tail[1] = T_pos_y - 1
    } else if (T_pos_x - H_pos_x > 0) {
      tail[0] = T_pos_x - 1
      tail[1] = T_pos_y - 1
    } else {
      tail[0] = T_pos_x + 1
      tail[1] = T_pos_y - 1
    }
  }
}

const calculateNewHeadAndTail = ({
  headMovementDirection,
  numberOfTails = 1,
}: {
  headMovementDirection: string // 'U' | 'R' | 'D' | 'L'
  numberOfTails?: number
}) => {
  for (let i = 1; i <= numberOfTails; i++) {
    if (i === 1) {
      let [H_pos_x, H_pos_y] = headPosition
      switch (headMovementDirection) {
        case 'R':
          H_pos_y++
          break

        case 'L':
          H_pos_y--
          break

        case 'U':
          H_pos_x--
          break

        case 'D':
          H_pos_x++
          break
      }
      headPosition = [H_pos_x, H_pos_y]
      evaluateTailPosition(headPosition, tailPositions[0])
    } else {
      evaluateTailPosition(tailPositions[i - 2], tailPositions[i - 1])
    }

    if (i === numberOfTails) {
      addToPositionsVisited(tailPositions[i - 1])
    }
  }
}

const calculateTailMovements = async ({
  numberOfTails = 1,
}: {
  numberOfTails?: number
}) => {
  for (let i = 0; i < parsedInputStrings.length; i++) {
    const [direction, stepCount] = parsedInputStrings[i].split(' ')

    for (let j = 0; j < parseInt(stepCount, 10); j++) {
      await updateConsoleOutput()

      calculateNewHeadAndTail({
        headMovementDirection: direction,
        numberOfTails,
      })
    }

    await updateConsoleOutput()
  }
}

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const updateConsoleOutput = async () => {
  let output = ''
  let noOfLines = 0
  for (let k = 0; k < Math.floor(gridHeight * 2.5); k++) {
    let row = ''
    for (let l = 0; l < Math.floor(gridLength * 2.5); l++) {
      if (k === headPosition[0] && l === headPosition[1]) {
        row += ' H '
      } else if (k === tailPositions[0][0] && l === tailPositions[0][1]) {
        row += ' 1 '
      } else if (k === tailPositions[1][0] && l === tailPositions[1][1]) {
        row += ' 2 '
      } else if (k === tailPositions[2][0] && l === tailPositions[2][1]) {
        row += ' 3 '
      } else if (k === tailPositions[3][0] && l === tailPositions[3][1]) {
        row += ' 4 '
      } else if (k === tailPositions[4][0] && l === tailPositions[4][1]) {
        row += ' 5 '
      } else if (k === tailPositions[5][0] && l === tailPositions[5][1]) {
        row += ' 6 '
      } else if (k === tailPositions[6][0] && l === tailPositions[6][1]) {
        row += ' 7 '
      } else if (k === tailPositions[7][0] && l === tailPositions[7][1]) {
        row += ' 8 '
      } else if (k === tailPositions[8][0] && l === tailPositions[8][1]) {
        row += ' 9 '
      } else {
        row += ' . '
      }
    }
    output += row + `\n`
    noOfLines++
  }
  process.stdout.write(output)
  await sleep(50)

  for (let i = 1; i <= noOfLines; i++) {
    process.stdout.moveCursor(0, -1)
    process.stdout.clearLine(0)
    process.stdout.cursorTo(0)
  }
}

// Part 1
// calculateTailMovements({}).then(() => {
//   console.log(positionsTVisited.length)
//   positionsTVisited = []
// })

// Part 2
calculateTailMovements({ numberOfTails: 9 }).then(() => {
  console.log(positionsTVisited.length)
})
