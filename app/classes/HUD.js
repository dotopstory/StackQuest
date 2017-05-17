require('pixi')
require('p2')
require('phaser')

import store from 'APP/app/store'
import { GameGroups, GamePlayers } from '../sockets'
import { addMessage } from 'APP/app/reducers/chat'

const textColor = '#fff'

class HUD {
  constructor(game, player) {
    this.game = game

    this.player = player
    this.HUDElement = {}
    this.boardVisibility = false
    this.initHUD()
    GameGroups.HUD.setAll('fixedToCamera', true)
  }

  updateHealth() {
    this.HUDElement.currentHealth.setText(`HP: ${this.player.stats.hp}/${this.player.stats.maxHp}`)
  }

  updateStats() {
    this.HUDElement.currentStats.setText(`ATK: ${this.player.stats.attack + this.player.weapon.attack}/DEF: ${this.player.stats.defense + this.player.armor.defense}`)
  }

  updateNumPlayers() {
    this.HUDElement.numPlayers.setText(`Players in Map: ${Object.keys(GamePlayers).length + 1}`)
  }

  updateScoreboard() {
    // add player names and score to array
    const playerScores = []
    for (const player in GamePlayers) {
      playerScores.push({ name: GamePlayers[player].name, score: GamePlayers[player].lootCount })
    }
    // add our player object to playerScores
    playerScores.push({ name: this.player.name, score: this.player.lootCount })
    // sort the array based on lootCount
    playerScores.sort((p1, p2) => p1.score < p2.score)
    // add these as text nodes to the HUD
    if (playerScores[0]) this.HUDElement.scoreboardOne.setText(`${playerScores[0].name} : ${playerScores[0].score}`)
    if (playerScores[1]) this.HUDElement.scoreboardTwo.setText(`${playerScores[1].name} : ${playerScores[1].score}`)
    if (playerScores[2]) this.HUDElement.scoreboardThree.setText(`${playerScores[2].name} : ${playerScores[2].score}`)
  }

  updateKillboard() {
    // add player names and score to array
    const playerScores = []
    for (const player in GamePlayers) {
      playerScores.push({ name: GamePlayers[player].name, score: GamePlayers[player].killCount })
    }
    // add our player object to playerScores
    playerScores.push({ name: this.player.name, score: this.player.killCount })
    // sort the array based on lootCount
    playerScores.sort((p1, p2) => p1.score < p2.score)
    // add these as text nodes to the HUD
    if (playerScores[0]) this.HUDElement.killboardOne.setText(`${playerScores[0].name} : ${playerScores[0].score}`)
    if (playerScores[1]) this.HUDElement.killboardTwo.setText(`${playerScores[1].name} : ${playerScores[1].score}`)
    if (playerScores[2]) this.HUDElement.killboardThree.setText(`${playerScores[2].name} : ${playerScores[2].score}`)
  }

  toggleBoards() {
    this.boardVisibility = !this.boardVisibility
    this.HUDElement.scoreboardTitle.visible = this.boardVisibility
    this.HUDElement.scoreboardOne.visible = this.boardVisibility
    this.HUDElement.scoreboardTwo.visible = this.boardVisibility
    this.HUDElement.scoreboardThree.visible = this.boardVisibility
    this.HUDElement.killBoardTitle.visible = this.boardVisibility
    this.HUDElement.killboardOne.visible = this.boardVisibility
    this.HUDElement.killboardTwo.visible = this.boardVisibility
    this.HUDElement.killboardThree.visible = this.boardVisibility
  }

  updateFeed(newFeed) {
    store.dispatch(addMessage(newFeed))
  }

  initHUD() {
    const gameX = this.game.width
    const gameY = this.game.height

    this.HUDElement.currentHealth = this.game.add.text(30, 25, `HP: ${this.player.stats.hp}/${this.player.stats.maxHp}`, {
      font: '15px Press Start 2P',
      fill: textColor,
      strokeThickness: 1
    })

    this.HUDElement.currentStats = this.game.add.text(30, 55, `ATK: ${this.player.stats.attack + this.player.weapon.attack}/DEF: ${this.player.stats.defense + this.player.armor.defense}`, {
      font: '15px Press Start 2P',
      fill: textColor,
      strokeThickness: 1
    })

    this.HUDElement.numPlayers = this.game.add.text(30, 85, `Players in World: ${Object.keys(GamePlayers).length + 1}`, {
      font: '15px Press Start 2P',
      fill: textColor,
      strokeThickness: 1
    })

    this.HUDElement.scoreboardTitle = this.game.add.text(600, 25, `Top 3 GREEDIEST Players`, {
      font: '15px Press Start 2P',
      fill: textColor,
      strokeThickness: 1
    })
    this.HUDElement.scoreboardTitle.visible = this.boardVisibility

    // We are initializing the top scoring players to be empty text nodes
    this.HUDElement.scoreboardOne = this.game.add.text(600, 55, '', {
      font: '15px Press Start 2P',
      fill: textColor,
      strokeThickness: 1
    })
    this.HUDElement.scoreboardOne.visible = this.boardVisibility

    this.HUDElement.scoreboardTwo = this.game.add.text(600, 85, '', {
      font: '15px Press Start 2P',
      fill: textColor,
      strokeThickness: 1
    })
    this.HUDElement.scoreboardTwo.visible = this.boardVisibility

    this.HUDElement.scoreboardThree = this.game.add.text(600, 115, '', {
      font: '15px Press Start 2P',
      fill: textColor,
      strokeThickness: 1
    })
    this.HUDElement.scoreboardThree.visible = this.boardVisibility

    this.HUDElement.killBoardTitle = this.game.add.text(600, 145, `Top 3 HUNTERS`, {
      font: '15px Press Start 2P',
      fill: textColor,
      strokeThickness: 1
    })
    // We are initializing the top scoring players to be empty text nodes
    this.HUDElement.killBoardTitle.visible = this.boardVisibility

    this.HUDElement.killboardOne = this.game.add.text(600, 175, '', {
      font: '15px Press Start 2P',
      fill: textColor,
      strokeThickness: 1
    })
    this.HUDElement.killboardOne.visible = this.boardVisibility

    this.HUDElement.killboardTwo = this.game.add.text(600, 205, '', {
      font: '15px Press Start 2P',
      fill: textColor,
      strokeThickness: 1
    })
    this.HUDElement.killboardTwo.visible = this.boardVisibility

    this.HUDElement.killboardThree = this.game.add.text(600, 115, '', {
      font: '15px Press Start 2P',
      fill: textColor,
      strokeThickness: 1
    })
    this.HUDElement.killboardThree.visible = this.boardVisibility

    for (const elements in this.HUDElement) {
      GameGroups.HUD.add(this.HUDElement[elements])
    }
  }
}

export default HUD
