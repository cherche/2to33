import Game from './game.js'
import Array3 from './array3.js'
import PressHandler from './press.js'

const size = [4, 4, 4]
const [LENGTH, WIDTH, HEIGHT] = size

const game = Game({ size })
game.addRandomTile()
game.addRandomTile()

const $container = document.createElement('div')
$container.className = 'container'

// Set up the game area
const $main = document.createElement('main')

// Set up the controls
const getTableFromArray2 = function getTableFromArray2 (arr2, process) {
  const [width, height] = [arr2[0].length, arr2.length]
  const $table = document.createElement('table')
  const $tbody = document.createElement('tbody')

  for (let y = 0; y < height; y++) {
    const $tr = document.createElement('tr')
    for (let x = 0; x < width; x++) {
      $tr.appendChild(process(arr2[y][x]))
    }
    $tbody.appendChild($tr)
  }

  $table.appendChild($tbody)
  return $table
}
const process = (val) => {
  const $td = document.createElement('td')
  if (val !== '') {
    $td.textContent = val
    $td.className = val
  }
  return $td
}
const $elevation = getTableFromArray2([
  ['u'],
  [''],
  ['d']
], process)
$elevation.className = 'controls elevation'
const $cardinal = getTableFromArray2([
  ['', 'n', ''],
  ['w', '', 'e'],
  ['', 's', '']
], process)
$cardinal.className = 'controls cardinal'

// Create all of the elements (and add them)
const $cells = Array3({ size })
for (let z = 0; z < HEIGHT; z++) {
  const $table = document.createElement('table')
  $table.className = 't' + z
  const $tbody = document.createElement('tbody')
  $table.appendChild($tbody)
  for (let y = 0; y < WIDTH; y++) {
    const $tr = document.createElement('tr')
    for (let x = 0; x < LENGTH; x++) {
      const $td = document.createElement('td')
      $tr.appendChild($td)
      $cells[x][y][z] = $td
    }
    $table.appendChild($tr)
  }
  $main.appendChild($table)
}

const updateCells = function updateCells () {
  for (let z = 0; z < HEIGHT; z++) {
    for (let y = 0; y < WIDTH; y++) {
      for (let x = 0; x < LENGTH; x++) {
        const val = game.getMapValue([x, y, z])
        const $td = $cells[x][y][z]
        $td.className = 'd' + val
        $td.textContent = val || ''
      }
    }
  }
}

// Finally, add everything to the DOM
$container.appendChild($elevation)
$container.appendChild($main)
$container.appendChild($cardinal)
document.body.appendChild($container)

// Call updateCells() to initially show the board
updateCells()

const move = function move (button) {
  const args = {
    w: [0, 0],
    e: [0, 1],
    n: [1, 0],
    s: [1, 1],
    u: [2, 0],
    d: [2, 1]
  }
  const [axis, dir] = args[button]
  // Don't allow people to make invalid moves
  // That takes away the challenge
  if (!game.isValidMove(axis, dir)) return
  game.move(axis, dir)
  game.addRandomTile()
  updateCells()
}

// We still don't have a check for a game over (no valid moves)
// I don't know when I'll throw one in
PressHandler(document.body, (e) => {
  // Only do this for primary clicks (left click for most)
  if (e.button !== 0) return
  const target = e.target
  if (target.tagName === 'TD' && target.className) {
    move(target.className)
  }
})

// And we'll also throw in some keyboard controls
window.addEventListener('keydown', (e) => {
  // We define it this way so that you can have more than
  // one keybinding for each direction
  const mappings = {
    n: ['ArrowUp', 'w'],
    e: ['ArrowRight', 'd'],
    s: ['ArrowDown', 's'],
    w: ['ArrowLeft', 'a'],
    u: ['r'],
    d: ['f']
  }

  for (let key of Object.keys(mappings)) {
    if (mappings[key].includes(e.key)) {
      move(key)
      break
    }
  }
})
