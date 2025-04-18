const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
context.scale(20, 20);

function createMatrix(w, h) {
  const matrix = [];
  while (h--) matrix.push(new Array(w).fill(0));
  return matrix;
}

function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = colors[value];
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

function merge(arena, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        arena[y + player.pos.y][x + player.pos.x] = value;
      }
    });
  });
}

function collide(arena, player) {
  const m = player.matrix;
  const o = player.pos;
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

function createPiece(type) {
  if (type === 'T') return [[0, 0, 0],[1, 1, 1],[0, 1, 0]];
  if (type === 'O') return [[2, 2],[2, 2]];
  if (type === 'L') return [[0, 3, 0],[0, 3, 0],[0, 3, 3]];
  if (type === 'J') return [[0, 4, 0],[0, 4, 0],[4, 4, 0]];
  if (type === 'I') return [[0, 5, 0, 0],[0, 5, 0, 0],[0, 5, 0, 0],[0, 5, 0, 0]];
  if (type === 'S') return [[0, 6, 6],[6, 6, 0],[0, 0, 0]];
  if (type === 'Z') return [[7, 7, 0],[0, 7, 7],[0, 0, 0]];
}

function playerReset() {
  const pieces = 'TJLOSZI';
  player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
  player.pos.y = 0;
  player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);
  if (collide(arena, player)) {
    arena.forEach(row => row.fill(0));
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
  if (collide(arena, player)) {
    player.pos.x -= dir;
  }
}

function draw() {
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawMatrix(arena, {x: 0, y: 0});
  drawMatrix(player.matrix, player.pos);
}

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;

function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;
  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    playerDrop();
  }
  draw();
  requestAnimationFrame(update);
}

document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') {
    playerMove(-1);
  } else if (event.key === 'ArrowRight') {
    playerMove(1);
  } else if (event.key === 'ArrowDown') {
    playerDrop();
  }
});

const arena = createMatrix(12, 20);
const player = {
  pos: {x: 0, y: 0},
  matrix: null,
};

const colors = [
  null,
  '#FF69B4',
  '#FFD700',
  '#00FFFF',
  '#FF4500',
  '#ADFF2F',
  '#1E90FF',
  '#BA55D3'
];

playerReset();
update();


document.getElementById('left').onclick = () => playerMove(-1);
document.getElementById('right').onclick = () => playerMove(1);
document.getElementById('down').onclick = () => playerDrop();
document.getElementById('rotate').onclick = () => {
    playerRotate(1);
    document.getElementById('sfx-rotate').play();
};

const splash = document.getElementById('splash');
const gameContainer = document.querySelector('.game-container');
splash.onclick = () => {
    splash.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    bgm.play();
};
