require('pixi')
require('p2')
require('phaser')

import loadingScreen from './states/loadingScreen'
import fantasyState from './states/fantasyState'
import spaceState from './states/spaceState'

/* global StackQuest, Phaser */

class StackQuest extends Phaser.Game {
  // Initialize game
  constructor() {
    const width = Math.min(window.innerWidth, 960)
    const height = Math.min(window.innerHeight, 540)

    super(width, height, Phaser.AUTO, 'game-container')
    // Add all the states
    this.state.add('loadingScreen', loadingScreen)
    this.state.add('fantasyState', fantasyState)
    this.state.add('spaceState', spaceState)
  }

  // Start StackQuest Game
  startGame(character) {
    this.state.start('loadingScreen', true, false, character)
    // this.state.start(character.currentMap, true, false, character)
  }
}

export default StackQuest
