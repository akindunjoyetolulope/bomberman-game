function createEnemy(scene, x, y) {
  let enemy = scene.add.circle(x, y, 15, 0xff0000);
  scene.physics.add.existing(enemy);
  enemy.canMove = true;
  return enemy;
}

function createEnemies(scene, count = 10) {
  let enemies = [];

  for (let i = 0; i < count; i++) {
    let x, y;

    // Find a random empty position in the grid
    do {
      x = Phaser.Math.Between(1, map[0].length - 2) * tileSize + tileSize / 2;
      y = Phaser.Math.Between(1, map.length - 2) * tileSize + tileSize / 2;
    } while (checkCollision(x, y, walls, destructibleBlocks));

    let enemy = scene.add.circle(x, y, 15, 0xff0000);
    scene.physics.add.existing(enemy);
    enemy.canMove = true;
    enemies.push(enemy);
  }

  return enemies;
}

function moveEnemy(scene, enemy, walls, destructibleBlocks) {
  if (!enemy.canMove) return;

  let directions = [
    { x: -tileSize, y: 0 },
    { x: tileSize, y: 0 },
    { x: 0, y: -tileSize },
    { x: 0, y: tileSize },
  ];

  let randomDir = Phaser.Math.RND.pick(directions);
  let newX = enemy.x + randomDir.x;
  let newY = enemy.y + randomDir.y;

  if (!checkCollision(newX, newY, walls, destructibleBlocks)) {
    enemy.canMove = false;
    scene.tweens.add({
      targets: enemy,
      x: newX,
      y: newY,
      duration: 1000, // Speed of movement
      onComplete: () => (enemy.canMove = true),
    });
  }
}
