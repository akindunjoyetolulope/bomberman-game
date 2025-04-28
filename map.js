const mapData = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 1],
  [1, 0, 1, 0, 1, 2, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
  [1, 0, 2, 0, 2, 0, 1, 0, 1, 0, 0, 2, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const tileSize = 40;

function createMap(scene) {
  for (let y = 0; y < mapData.length; y++) {
    for (let x = 0; x < mapData[y].length; x++) {
      let posX = x * tileSize + tileSize / 2;
      let posY = y * tileSize + tileSize / 2;

      if (mapData[y][x] === 1) {
        let wall = scene.add.rectangle(
          posX,
          posY,
          tileSize,
          tileSize,
          0x555555
        );
        scene.physics.add.existing(wall, true);
        walls.push(wall);
      } else if (mapData[y][x] === 2) {
        let block = scene.add.rectangle(
          posX,
          posY,
          tileSize,
          tileSize,
          0x8b4513
        );
        scene.physics.add.existing(block, true);
        destructibleBlocks.push(block);
      }
    }
  }
}
