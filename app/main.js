require('pixi')
require('p2')
require('phaser')
import socketio from 'socket.io-client'
import socketFunctions from './sockets'

export const socket = socketio.connect()

socketFunctions(socket)

// import testState from './states/testState'
import loadingScreen from './states/loadingScreen'
import preloadTest from './states/preloadTest'
import testStateOne from './states/testStateOne'
import testStateTwo from './states/testStateTwo'

// Initialize game
var StackQuest = new Phaser.Game(1280, 720, Phaser.AUTO, 'main')

// Add all the states
StackQuest.state.add('loadingScreen', loadingScreen)
StackQuest.state.add('preloadTest', preloadTest)
StackQuest.state.add('testStateOne', testStateOne)
StackQuest.state.add('testStateTwo', testStateTwo)

// Start StackQuest Game
StackQuest.state.start('loadingScreen')

export default StackQuest
