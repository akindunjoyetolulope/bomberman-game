function placeBomb(scene, x, y) {
  let bomb = scene.add.rectangle(x, y, 30, 30, 0x000000);
  scene.physics.add.existing(bomb);
  bombs.push(bomb);

  setTimeout(() => {
    bomb.destroy();

    let explosionCenters = [
      { x: x, y: y }, // Center
      { x: x + 20, y: y }, // Right 1 tile
      { x: x + 40, y: y }, // Right 2 tiles
      { x: x - 20, y: y }, // Left 1 tile
      { x: x - 40, y: y }, // Left 2 tiles
      { x: x, y: y - 20 }, // Up 1 tile
      { x: x, y: y - 40 }, // Up 2 tiles
      { x: x, y: y + 20 }, // Down 1 tile
      { x: x, y: y + 40 }, // Down 2 tiles
    ];

    let explosions = [];

    explosionCenters.forEach((center) => {
      let explosion = scene.add.rectangle(center.x, center.y, 32, 32, 0xff0000);
      explosions.push(explosion);

      // Destroy destructible blocks in range
      for (let i = destructibleBlocks.length - 1; i >= 0; i--) {
        let block = destructibleBlocks[i];
        if (
          Phaser.Math.Distance.Between(center.x, center.y, block.x, block.y) <
          20
        ) {
          block.destroy();
          destructibleBlocks.splice(i, 1);
        }
      }

      // Kill enemies in range
      for (let i = enemies.length - 1; i >= 0; i--) {
        let enemy = enemies[i];
        if (
          Phaser.Math.Distance.Between(center.x, center.y, enemy.x, enemy.y) <
          20
        ) {
          enemy.destroy();
          enemies.splice(i, 1);
          if (enemies.length === 0) {
            gameWon();
          }
        }
      }
    });

    setTimeout(() => {
      explosions.forEach((explosion) => explosion.destroy());
    }, 500);
  }, 2000);
}

function gameWon() {
  console.log("Winner! 🎉");

  // Show the modal
  document.getElementById("youWonModal").style.display = "flex";
}
