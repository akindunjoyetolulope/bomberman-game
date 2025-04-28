const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  backgroundColor: "#ffffff", // White background
  physics: { default: "arcade", arcade: { debug: false } },
  scene: { preload, create, update },
};

const game = new Phaser.Game(config);
let player,
  cursors,
  enemies = [],
  bombs = [],
  walls = [],
  destructibleBlocks = [];

function preload() {}

function create() {
  createMap(this); // Load map

  // Create player
  player = createPlayer(this);

  // Create enemy
  let eney = createEnemy(this, 300, 300);
  enemies.push(eney);
  let e = createEnemy(this, 550, 300);
  enemies.push(e);
  let enemy = createEnemy(this, 100, 220);
  enemies.push(enemy);

  // Collisions
  this.physics.add.collider(player, walls);
  this.physics.add.collider(player, destructibleBlocks);
  this.physics.add.collider(enemies, walls);
  this.physics.add.collider(enemies, destructibleBlocks);
  this.physics.add.collider(player, enemies, gameOver, null, this);

  cursors = this.input.keyboard.createCursorKeys();
  this.input.keyboard.on("keydown-SPACE", () =>
    placeBomb(this, player.x, player.y)
  );
}

function update() {
  movePlayer(this, player, cursors, walls, destructibleBlocks);

  enemies.forEach((enemy) => {
    moveEnemy(this, enemy, walls, destructibleBlocks);
  });
}

function gameOver() {
  console.log("💀 Game Over!");

  // Show the modal
  document.getElementById("gameOverModal").style.display = "flex";
}
