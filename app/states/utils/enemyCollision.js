/* global StackQuest */

import { GameEnemies, socket } from 'APP/app/sockets'

const enemyCollision = (playerObject, projectile, graveyard) => {
  Object.keys(GameEnemies).forEach(enemyKey => {
    const enemy = GameEnemies[enemyKey]
    StackQuest.game.physics.arcade.overlap(projectile.bullets, enemy, (target, bullet) => {
      const didDie = enemy.takeDamage(projectile.damage)
      bullet.kill()

      if (didDie) {
        graveyard.push(enemy)
        // enemy.kill()
        delete GameEnemies[enemyKey]
        // socket.emit('killEnemy', enemy.name)
      }
    })
    StackQuest.game.physics.arcade.overlap(enemy, playerObject, () => {
      playerObject.stats.hp -= enemy.attack()

      if (playerObject.stats.hp <= 0) {
        playerObject.position.x = 200
        playerObject.position.y = 200
        //  reset internal health: TEMP
        playerObject.stats.hp = 100
        socket.emit('updatePlayer', {playerPos: playerObject.position, lootCount: 0})
      }
    })
  })
}

export default enemyCollision
