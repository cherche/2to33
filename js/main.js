import Game from './game.js'

const game = Game({
  length: 4,
  width: 4,
  height: 4
})

console.log(game)

game.addRandomTile()
game.addRandomTile()

const pre = document.body.querySelector('pre')

pre.innerHTML = game.getMapString()

window.f = (...args) => {
  game.move(...args)
  game.addRandomTile()
  pre.innerHTML = game.getMapString()
}
