import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import StackQuestGame from '../game'
import Login from './Login'
import WhoAmI from './WhoAmI'
import Character from './Character'
import { whoami } from 'APP/app/reducers/auth'
import { showGameDisplay } from 'APP/app/reducers/game'
import { createCharacter } from 'APP/app/reducers/user'

const Game = ({ loggedIn, gameExist, startGame }) =>
  <div id="game-container">
    {loggedIn && !gameExist &&
      <div>
        {loggedIn.character
          ? <button className="btn btn-primary" onClick={startGame}>Start Game</button>
          : <Character />
        }
      </div>
    }
  </div>

class LocalContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: props.user,
      gameExist: props.game
    }
    this.startGame = this.startGame.bind(this)
  }

  componentWillReceiveProps({ user, game }) {
    if (user !== this.state.loggedIn) this.setState({ loggedIn: user })
    if (game !== this.state.gameExist) this.setState({ gameExist: game })
  }

  startGame() {
    // checks to make sure user and character information is updated in the store
    this.props.whoami()
    this.props.showGameDisplay(true)
    const character = this.props.user.character

    StackQuest.game = new StackQuestGame()
    StackQuest.game.startGame(character)
  }

  render() {
    return (
      <Game
        {...this.state}
        startGame={this.startGame}
      />
    )
  }
}

const GameContainer = connect(
  ({ auth, game }) => ({ user: auth, game: game }),
  { showGameDisplay, whoami }
)(LocalContainer)

export default GameContainer