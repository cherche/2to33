import Game from './game.js'
import Array3 from './array3.js'

const size = [4, 4, 4]
const [LENGTH, WIDTH, HEIGHT] = size

const game = Game({ size })
game.addRandomTile()
game.addRandomTile()

const $main = document.body.querySelector('main')

// Create all of the elements (and add them)
const $cells = Array3({ size })
for (let z = 0; z < HEIGHT; z++) {
  const $table = document.createElement('table')
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

// Call updateCells() to initially show the board
updateCells()

const move = function move (button) {
  const args = {
    'w': [0, 0],
    'e': [0, 1],
    'n': [1, 0],
    's': [1, 1],
    'u': [2, 0],
    'd': [2, 1]
  }
  game.move(...args[button])
  game.addRandomTile()
  updateCells()
}

window.move = move

document.body.addEventListener('mousedown', (e) => {
  // Only do this for primary clicks (left click for most)
  if (e.button !== 0) return
  const target = e.target
  if (target.tagName === 'TD' && target.className) {
    move(target.className)
  }
})
