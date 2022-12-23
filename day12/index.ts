// import { INPUT } from './constants'

const INPUT = `
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
`
const elevationGrid = INPUT.split(/\n/)
  .filter((line) => line !== '')
  .map((row) => row.split(''))

const [startingCoordinates, destinationCoordinates] = elevationGrid.flatMap(
  (row, x) =>
    row
      .map((column, y) =>
        column === 'S' || column === 'E' ? [x, y] : [-1, -1]
      )
      .filter(([x, y]) => x !== -1 && y !== -1)
)

const paths = []

const travelToDestination = () => {
  const currentCoordinates = [...startingCoordinates]

  while (
    currentCoordinates[0] !== destinationCoordinates[0] ||
    currentCoordinates[1] !== destinationCoordinates[1]
  ) {
    const nextPossibleMoves = getNextPossibleMoves(currentCoordinates)
    nextPossibleMoves.map((nextMove) => {
      paths.push(nextMove)
    })
  }
}

const getNextPossibleMoves = ([x, y]: number[]) => {
  const possibleMoves: number[][] = []
  if (x - 1 >= 0) {
    possibleMoves.push([x - 1, y])
  }
  if (y - 1 >= 0) {
    possibleMoves.push([x, y - 1])
  }
  if (x + 1 <= elevationGrid.length - 1) {
    possibleMoves.push([x + 1, y])
  }
  if (y + 1 <= elevationGrid.length - 1) {
    possibleMoves.push([x, y + 1])
  }

  return possibleMoves
}
