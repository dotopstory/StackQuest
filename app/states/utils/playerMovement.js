// import { socket } from 'APP/app/sockets'

// /* global StackQuest */

// const playerMovement = (playerObject, cursors) => {
//   console.log(playerObject)
//   playerObject.body.velocity.x = 0
//   playerObject.body.velocity.y = 0
//   playerObject.rotation = StackQuest.game.physics.arcade.angleToPointer(playerObject)

//   if (cursors.up.isDown || cursors.w.isDown) {
//     playerObject.body.velocity.y = -200
//     socket.emit('updatePlayer', {playerPos: playerObject.position, lootCount: playerObject.lootCount})
//   } else if (cursors.down.isDown || cursors.s.isDown) {
//     playerObject.body.velocity.y = 200
//     socket.emit('updatePlayer', {playerPos: playerObject.position, lootCount: playerObject.lootCount})
//   }
//   if (cursors.left.isDown || cursors.a.isDown) {
//     playerObject.body.velocity.x = -200
//     socket.emit('updatePlayer', {playerPos: playerObject.position, lootCount: playerObject.lootCount})
//   } else if (cursors.right.isDown || cursors.d.isDown) {
//     playerObject.body.velocity.x = 200
//     socket.emit('updatePlayer', {playerPos: playerObject.position, lootCount: playerObject.lootCount})
//   }
// }

// export default playerMovement
