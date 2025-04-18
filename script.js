
const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
context.scale(20, 20);

const blockImages = {
  1: new Image(),
  2: new Image(),
  3: new Image(),
  4: new Image(),
  5: new Image(),
  6: new Image(),
  7: new Image()
};

blockImages[1].src = 'block_I.png';
blockImages[2].src = 'block_J.png';
blockImages[3].src = 'block_L.png';
blockImages[4].src = 'block_O.png';
blockImages[5].src = 'block_S.png';
blockImages[6].src = 'block_T.png';
blockImages[7].src = 'block_Z.png';

function createMatrix(w, h) {
  const matrix = [];
  while (h--) matrix.push(new Array(w).fill(0));
  return matrix;
}

function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.drawImage(blockImages[value], x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

function createPiece(type) {
  if (type === 'T') return [[0,6,0],[6,6,6],[0,0,0]];
  if (type === 'O') return [[4,4],[4,4]];
  if (type === 'L') return [[0,0,3],[3,3,3],[0,0,0]];
  if (type === 'J') return [[2,0,0],[2,2,2],[0,0,0]];
  if (type === 'I') return [[0,0,0,0],[1,1,1,1],[0,0,0,0]];
  if (type === 'S') return [[0,5,5],[5,5,0],[0,0,0]];
  if (type === 'Z') return [[7,7,0],[0,7,7],[0,0,0]];
}

const arena = createMatrix(12, 20);
const player = { pos: {x: 0, y: 0}, matrix: null, score: 0 };

function merge(arena, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) arena[y + player.pos.y][x + player.pos.x] = value;
    });
  });
}

function collide(arena, player) {
  const m = player.matrix, o = player.pos;
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length; ++x) {
      if (m[y][x] !== 0 &&
          (arena[y + o.y] &&
           arena[y + o.y][x + o.x]) !== 0) {
        return true;
      }
    }
  }
  return false;
}

function playerReset() {
  const pieces = 'TJLOSZI';
  player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
  player.pos.y = 0;
  player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);
  if (collide(arena, player)) {
    arena.forEach(row => row.fill(0));
    player.score = 0;
    updateScore();
  }
}

function playerDrop() {
  player.pos.y++;
  if (collide(arena, player)) {
    player.pos.y--;
    merge(arena, player);
    playerReset();
  }
  dropCounter = 0;
}

function playerMove(dir) {
  player.pos.x += dir;
  if (collide(arena, player)) player.pos.x -= dir;
}

function playerRotate(dir) {
  const m = player.matrix;
  for (let y = 0; y < m.length; ++y)
    for (let x = 0; x < y; ++x)
      [m[x][y], m[y][x]] = [m[y][x], m[x][y]];
  if (dir > 0) m.forEach(row => row.reverse());
  else m.reverse();
}

document.getElementById('left').onclick = () => playerMove(-1);
document.getElementById('right').onclick = () => playerMove(1);
document.getElementById('down').onclick = () => playerDrop();
document.getElementById('rotate').onclick = () => playerRotate(1);

function updateScore() {
  document.getElementById('score').innerText = 'Score: ' + player.score;
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawMatrix(arena, {x: 0, y: 0});
  drawMatrix(player.matrix, player.pos);
}

let dropCounter = 0, dropInterval = 1000, lastTime = 0;
function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;
  dropCounter += deltaTime;
  if (dropCounter > dropInterval) playerDrop();
  draw();
  requestAnimationFrame(update);
}

document.getElementById('splash').onclick = () => {
  document.getElementById('splash').classList.add('hidden');
  document.querySelector('.game-container').classList.remove('hidden');
  playerReset();
  update();
};

updateScore();
