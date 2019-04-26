import { getRandomInt, getRandomVal } from './probability.js'

const LENGTH = 4
const WIDTH = 4
const HEIGHT = 4

const map = []

for (let x = 0; x < LENGTH; x++) {
  const sub = []
  for (let y = 0; y < WIDTH; y++) {
    sub.push(new Array(HEIGHT).fill(0))
  }
  map.push(sub)
}

console.log(map.length, map[0].length, map[0][0].length)

// This stuff just deals with order of iteration
// Sometimes we want to move horizontally (fix the y-axis)
// Sometimes we want to move verticaly (fix the x-axis)
const orient = function orient ([m, n, a], axis) {
  const orientations = {
    0: [a, n, m],
    1: [m, a, n],
    2: [m, n, a]
  }

  return orientations[axis]
}

// I will need to add some sort of check to see if
// there are any valid moves
const move = function move (axis, opp = false) {
  // For brevity, we'll define a local orient function
  const lOrient = function lOrient (vals) {
    return orient(vals, axis)
  }
  // This doesn't orient in exactly the same way as coordinates,
  // but it's a pretty close match
  const [mMax, nMax, aMax] = lOrient([LENGTH, WIDTH, HEIGHT])

  for (let m = 0; m < mMax; m++) {
    for (let n = 0; n < nMax; n++) {
      const nonBlanks = []

      for (let a = 0; a < aMax; a++) {
        const [x, y, z] = lOrient([m, n, a])
        if (map[x][y][z] !== 0) nonBlanks.push(map[x][y][z])
      }

      // If we were actually shifting the other way,
      // we would also be merging the other way
      if (opp) nonBlanks.reverse()

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
      if (opp) series.reverse()

      // Finally, we put the nonBlanks back in the row/column/other
      for (let a = 0; a < aMax; a++) {
        const [x, y, z] = lOrient([m, n, a])
        map[x][y][z] = series[a]
      }
    }
}
}

/* This is kept just to show how it might look with a constant orientation
const moveLeft = function moveLeft () {
  // We want to consider each y separately (rows)
  for (let y = 0; y < HEIGHT; y++) {
    // First, we want everything to collect all of the nonBlanks
    const nonBlanks = []

    for (let x = 0; x < WIDTH; x++) {
      if (map[x][y] !== 0) nonBlanks.push(map[x][y])
    }

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

    // Finally, we put the nonBlanks back in the row
    for (let x = 0; x < WIDTH; x++) {
      if (x < nonBlanks.length) {
        map[x][y] = nonBlanks[x]
      } else {
        map[x][y] = 0
      }
    }
  }
}
*/

const addRandomTile = function addRandomTile () {
  let done = false
  const value = getRandomVal([2, 4])

  do {
    const coords = [
      getRandomInt(0, LENGTH),
      getRandomInt(0, WIDTH),
      getRandomInt(0, HEIGHT)
    ]
    const [x, y, z] = coords

    if (map[x][y][z] === 0) {
      map[x][y][z] = value
      done = true
    }
  } while (!done)
}

const getMapString = function getMapString () {
  let string = ''

  for (let z = 0; z < HEIGHT; z++) {
    for (let y = 0; y < WIDTH; y++) {
      for (let x = 0; x < LENGTH; x++) {
        const display = map[x][y][z] || '.'
        string += display + '\t'
      }
      string += '\n'
    }

    string += '\n\n'
  }

  return string
}

addRandomTile()
addRandomTile()

const pre = document.body.querySelector('pre')

pre.innerHTML = getMapString()

window.f = (...args) => {
  move(...args)
  addRandomTile()
  pre.innerHTML = getMapString()
}
