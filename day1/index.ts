import { INPUT } from './constants'

const caloriesPerElfList = INPUT.split(/\n\n/)
const totalCaloriesPerElf = caloriesPerElfList.map((caloriesPerElf) => {
  const caloriesArray = caloriesPerElf
    .split(/\n/)
    .filter((calorie) => calorie !== '')

  return caloriesArray.reduce((acc, calorie) => {
    return (acc += parseInt(calorie, 10))
  }, 0)
})

const caloriesLeaderBoard = totalCaloriesPerElf.sort((a, b) => b - a)

// Part 1
console.log('Highest total calories among all elves: ', caloriesLeaderBoard[0])

// Part 2
console.log(
  'Sum total calories of top 3 elves with highest total calories: ',
  caloriesLeaderBoard[0] + caloriesLeaderBoard[1] + caloriesLeaderBoard[2]
)
