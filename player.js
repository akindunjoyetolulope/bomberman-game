function createPlayer(scene) {
  let player = scene.add.circle(tileSize * 1.5, tileSize * 1.5, 15, 0x00ff00);
  scene.physics.add.existing(player);
  player.canMove = true; // Allow movement
  return player;
}

function movePlayer(scene, player, cursors, walls, destructibleBlocks) {
  if (!player.canMove) return;

  let moveX = 0;
  let moveY = 0;

  if (cursors.left.isDown) moveX = -tileSize;
  if (cursors.right.isDown) moveX = tileSize;
  if (cursors.up.isDown) moveY = -tileSize;
  if (cursors.down.isDown) moveY = tileSize;

  if (moveX !== 0 || moveY !== 0) {
    let newX = player.x + moveX;
    let newY = player.y + moveY;

    if (!checkCollision(newX, newY, walls, destructibleBlocks)) {
      player.canMove = false;
      scene.tweens.add({
        targets: player,
        x: newX,
        y: newY,
        duration: 150,
        onComplete: () => (player.canMove = true),
      });
    }
  }
}

function checkCollision(x, y, walls, destructibleBlocks) {
  return [...walls, ...destructibleBlocks].some((block) =>
    Phaser.Geom.Intersects.RectangleToRectangle(
      block.getBounds(),
      new Phaser.Geom.Rectangle(x - 15, y - 15, 30, 30)
    )
  );
}
