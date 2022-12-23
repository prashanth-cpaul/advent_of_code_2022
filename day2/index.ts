import {
  DRAW,
  DRAW_POINTS,
  INPUT,
  LOSS,
  PAPER_1,
  PAPER_2,
  PAPER_POINTS,
  ROCK_1,
  ROCK_2,
  ROCK_POINTS,
  SCISSORS_1,
  SCISSORS_2,
  SCISSORS_POINTS,
  WIN,
  WIN_POINTS,
} from './constants'

const rounds = INPUT.split(/\n/).filter((round) => round !== '')

// Part 1 strategy
const resultsStrategy1 = rounds.map((round) => {
  const [playerAChoice, playerBChoice] = round.split(' ')
  switch (playerAChoice) {
    case `${ROCK_1}`:
      switch (playerBChoice) {
        case `${ROCK_2}`:
          return ROCK_POINTS + DRAW_POINTS
        case `${PAPER_2}`:
          return PAPER_POINTS + WIN_POINTS
        case `${SCISSORS_2}`:
          return SCISSORS_POINTS
      }

    case `${PAPER_1}`:
      switch (playerBChoice) {
        case `${ROCK_2}`:
          return ROCK_POINTS
        case `${PAPER_2}`:
          return PAPER_POINTS + DRAW_POINTS
        case `${SCISSORS_2}`:
          return SCISSORS_POINTS + WIN_POINTS
      }

    case `${SCISSORS_1}`:
      switch (playerBChoice) {
        case `${ROCK_2}`:
          return ROCK_POINTS + WIN_POINTS
        case `${PAPER_2}`:
          return PAPER_POINTS
        case `${SCISSORS_2}`:
          return SCISSORS_POINTS + DRAW_POINTS
      }

    default:
      return 0
  }
})

const totalPointsStrategy1 = resultsStrategy1.reduce(
  (acc, roundPoints) => acc + roundPoints,
  0
)
console.log('Strategy 1 total points:', totalPointsStrategy1)

// Part 2 strategy
const resultsStrategy2 = rounds.map((round) => {
  const [playerAChoice, expectedResult] = round.split(' ')
  switch (playerAChoice) {
    case `${ROCK_1}`:
      switch (expectedResult) {
        case `${LOSS}`:
          return SCISSORS_POINTS
        case `${DRAW}`:
          return ROCK_POINTS + DRAW_POINTS
        case `${WIN}`:
          return PAPER_POINTS + WIN_POINTS
      }

    case `${PAPER_1}`:
      switch (expectedResult) {
        case `${LOSS}`:
          return ROCK_POINTS
        case `${DRAW}`:
          return PAPER_POINTS + DRAW_POINTS
        case `${WIN}`:
          return SCISSORS_POINTS + WIN_POINTS
      }

    case `${SCISSORS_1}`:
      switch (expectedResult) {
        case `${LOSS}`:
          return PAPER_POINTS
        case `${DRAW}`:
          return SCISSORS_POINTS + DRAW_POINTS
        case `${WIN}`:
          return ROCK_POINTS + WIN_POINTS
      }

    default:
      return 0
  }
})

const totalPointsStrategy2 = resultsStrategy2.reduce(
  (acc, roundPoints) => acc + roundPoints,
  0
)
console.log('Strategy 2 total points:', totalPointsStrategy2)
