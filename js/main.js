import Game from './game.js'

const game = Game({ size: [4, 4, 4] })

game.addRandomTile()
game.addRandomTile()

const pre = document.body.querySelector('pre')
pre.innerHTML = game.getMapString()

window.f = (...args) => {
  game.move(...args)
  game.addRandomTile()
  pre.innerHTML = game.getMapString()
}
