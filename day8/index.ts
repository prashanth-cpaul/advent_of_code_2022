import { INPUT } from './constants'

// const INPUT = `
// 30373
// 25512
// 65332
// 33549
// 35390
// `

const parsedInputStrings = INPUT.split(/\n/).filter((line) => line !== '')
const treeHeightGrid = parsedInputStrings.map((parsedInputString) =>
  parsedInputString.split('').map((value) => parseInt(value, 10))
)

console.log(treeHeightGrid[0].length)
console.log(treeHeightGrid.length)
const calculateVisibility = (x: number, y: number) => {
  let isVisibleXStart = true
  let isVisibleXEnd = true
  let isVisibleYStart = true
  let isVisibleYEnd = true
  for (let i = 0; i < x; i++) {
    if (treeHeightGrid[x][y] <= treeHeightGrid[i][y]) {
      isVisibleXStart = false
    }
  }
  for (let i = x + 1; i < treeHeightGrid[0].length; i++) {
    if (treeHeightGrid[x][y] <= treeHeightGrid[i][y]) {
      isVisibleXEnd = false
    }
  }
  for (let j = 0; j < y; j++) {
    if (treeHeightGrid[x][y] <= treeHeightGrid[x][j]) {
      isVisibleYStart = false
    }
  }
  for (let j = y + 1; j < treeHeightGrid[0].length; j++) {
    if (treeHeightGrid[x][y] <= treeHeightGrid[x][j]) {
      isVisibleYEnd = false
    }
  }
  return isVisibleXStart || isVisibleXEnd || isVisibleYStart || isVisibleYEnd
}

let visibleTrees = treeHeightGrid.length * 4 - 4
for (let i = 1; i < treeHeightGrid.length - 1; i++) {
  for (let j = 1; j < treeHeightGrid[i].length - 1; j++) {
    visibleTrees += calculateVisibility(i, j) ? 1 : 0
  }
}

console.log('visible treees: ', visibleTrees)

// Part 2
const calculateScenicScore = (x: number, y: number) => {
  let scoreXStart = 0
  let scoreXEnd = 0
  let scoreYStart = 0
  let scoreYEnd = 0
  for (let i = x - 1; i >= 0; i--) {
    if (treeHeightGrid[x][y] > treeHeightGrid[i][y]) {
      scoreYStart++
    } else {
      scoreYStart++
      break
    }
  }
  for (let i = x + 1; i < treeHeightGrid[0].length; i++) {
    if (treeHeightGrid[x][y] > treeHeightGrid[i][y]) {
      scoreYEnd++
    } else {
      scoreYEnd++
      break
    }
  }
  for (let j = y - 1; j >= 0; j--) {
    if (treeHeightGrid[x][y] > treeHeightGrid[x][j]) {
      scoreXStart++
    } else {
      scoreXStart++
      break
    }
  }
  for (let j = y + 1; j < treeHeightGrid[0].length; j++) {
    if (treeHeightGrid[x][y] > treeHeightGrid[x][j]) {
      scoreXEnd++
    } else {
      scoreXEnd++
      break
    }
  }
  if (x === 3 && y === 2) {
    console.log(scoreYStart, scoreXStart, scoreXEnd, scoreYEnd)
  }
  return scoreXStart * scoreXEnd * scoreYStart * scoreYEnd
}

let highestTreeScenicScore = 0
for (let i = 1; i < treeHeightGrid.length - 1; i++) {
  for (let j = 1; j < treeHeightGrid[i].length - 1; j++) {
    const currentTreeScenicScore = calculateScenicScore(i, j)
    console.log(currentTreeScenicScore)
    if (currentTreeScenicScore > highestTreeScenicScore) {
      highestTreeScenicScore = currentTreeScenicScore
    }
  }
}

console.log('highestTreeScenicScore: ', highestTreeScenicScore)
