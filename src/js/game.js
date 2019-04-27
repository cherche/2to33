import { getRandomInt, getRandomVal } from './probability.js'
import Array3 from './array3.js'

export default function Game ({ size }) {
  const [length, width, height] = size
  // Upon the completion of a valid move, we stomp over
  // map with a new 3D array
  // I really think this is the cleanest way, but I don't like it
  const map = Array3({ fill: 0, size })

  // This stuff just deals with order of iteration
  // Sometimes, we want to move:
  // * east-west (fix the x-axis)
  // * north-south (fix the y-axis)
  // * up-down (fix the z-axis)
  const orient = function orient ([m, n, a], axis) {
    const orientations = {
      0: [a, n, m],
      1: [m, a, n],
      2: [m, n, a]
    }

    return orientations[axis]
  }

  // This is essentially a stripped down version of the move() function
  const isValidMove = function isValidMove (axis, dir) {
    // For brevity, we'll define a local orient function
    const lOrient = function lOrient (vals) {
      return orient(vals, axis)
    }
    // This doesn't orient in exactly the same way as coordinates,
    // but it's a pretty close match
    const [mMax, nMax, aMax] = lOrient([length, width, height])

    for (let m = 0; m < mMax; m++) {
      for (let n = 0; n < nMax; n++) {
        // Start by gathering all of the stuff that we care about (not 0)
        const nonBlanks = []

        // We'll check to see if there are any zeroes that will get squished
        // as a result of the move. That is, any zero surrounded by non-zeroes
        // Example: 0 2 0 4
        let squishPotential = false
        for (let a = 0; a < aMax; a++) {
          // If we were actually shifting the other way,
          // we would also be merging the other way
          const b = (dir === 1) ? (aMax - 1) - a : a
          const [x, y, z] = lOrient([m, n, b])
          // If we run into any zeroes, we're going to be on alert
          // for when we run into any non-zeroes after
          if (map[x][y][z] === 0) squishPotential = true
          if (map[x][y][z] !== 0) {
            // Oh damn, there's squishing!
            // This means that the move must be valid
            if (squishPotential) return true
            nonBlanks.push(map[x][y][z])
          }
        }

        // Using the nonBlanks array, we'll merge adjacent duplicates
        let i = 0
        while (i < nonBlanks.length - 1) {
          // Merge should only be called after swiped, so if we
          // run into a zero, there is no more merging after
          if (nonBlanks[i] === 0 || nonBlanks[i + 1] === 0) break

          // If they match, we'll merge them together
          if (nonBlanks[i] === nonBlanks[i + 1]) {
            // This means that the move must be valid
            return true
          }

          i++
        }
      }
    }

    // Wow, all of that work and it actually wasn't valid
    return false
  }

  const hasValidMoves = function hasValidMoves () {
    const DIMENSION = 3
    const DIRECTIONS = 2

    for (let axis = 0; axis < DIMENSION; axis++) {
      for (let dir = 0; dir < DIRECTIONS; dir++) {
        if (isValidMove(axis, dir)) return true
      }
    }

    return false
  }

  const getValidMoves = function getValidMoves () {
    const moves = []

    const DIMENSION = 3
    const DIRECTIONS = 2

    for (let axis = 0; axis < DIMENSION; axis++) {
      for (let dir = 0; dir < DIRECTIONS; dir++) {
        if (isValidMove(axis, dir)) moves.push([axis, dir])
      }
    }

    return moves
  }

  // There is a danger zone here:
  // If there are no valid moves, this is an infinite loop
  // Users must check for validity themselves using an above function
  const move = function move (axis, dir) {
    // For brevity, we'll define a local orient function
    const lOrient = function lOrient (vals) {
      return orient(vals, axis)
    }
    // This doesn't orient in exactly the same way as coordinates,
    // but it's a pretty close match
    const [mMax, nMax, aMax] = lOrient([length, width, height])

    for (let m = 0; m < mMax; m++) {
      for (let n = 0; n < nMax; n++) {
        // Start by gathering all of the stuff that we care about (not 0)
        const nonBlanks = []

        for (let a = 0; a < aMax; a++) {
          const [x, y, z] = lOrient([m, n, a])
          if (map[x][y][z] !== 0) nonBlanks.push(map[x][y][z])
        }

        // If we were actually shifting the other way,
        // we would also be merging the other way
        if (dir === 1) nonBlanks.reverse()

        // Using the nonBlanks array, we'll merge adjacent duplicates
        let i = 0
        while (i < nonBlanks.length - 1) {
          // Merge should only be called after swiped, so if we
          // run into a zero, there is no more merging after
          if (nonBlanks[i] === 0 || nonBlanks[i + 1] === 0) break

          // If they match, we'll merge them together
          if (nonBlanks[i] === nonBlanks[i + 1]) {
            // Literally the same as merging it
            nonBlanks[i] *= 2
            // Then, we need to shift everything else over
            // That is, remove the merged element
            nonBlanks.splice(i + 1, 1)
          }

          i++
        }

        // Renaming to have a less misleading name because of what we're about to do
        const series = nonBlanks

        // Fill the rest with 0s so that its length is appropriate
        while (series.length < aMax) {
          series.push(0)
        }

        // Accounting for the reverse earlier (if applicable)
        if (dir === 1) series.reverse()

        // Finally, we put the nonBlanks back in the row/column/other
        for (let a = 0; a < aMax; a++) {
          const [x, y, z] = lOrient([m, n, a])
          map[x][y][z] = series[a]
        }
      }
    }
  }

  const addRandomTile = function addRandomTile () {
    let done = false
    const value = getRandomVal([2, 4, 8, 16])

    do {
      const coords = [
        getRandomInt(0, length),
        getRandomInt(0, width),
        getRandomInt(0, height)
      ]
      const [x, y, z] = coords

      if (map[x][y][z] === 0) {
        map[x][y][z] = value
        done = true
      }
    } while (!done)
  }

  const getMapValue = function getMapValue ([x, y, z]) {
    return map[x][y][z]
  }

  return {
    isValidMove,
    hasValidMoves,
    getValidMoves,
    move,
    addRandomTile,
    getMapValue
  }
}
