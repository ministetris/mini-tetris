
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const scale = 20;
const rows = canvas.height / scale;
const cols = canvas.width / scale;
let score = 0;

document.getElementById("left").onclick = () => move(-1);
document.getElementById("right").onclick = () => move(1);
document.getElementById("rotate").onclick = () => rotate();

let board = Array.from({length: rows}, () => Array(cols).fill(0));

function drawBlock(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * scale, y * scale, scale - 1, scale - 1);
}

function drawBoard() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (board[y][x]) drawBlock(x, y, board[y][x]);
        }
    }
}

function dropPiece() {
    current.y++;
    if (collides()) {
        current.y--;
        placePiece();
        resetPiece();
        updateScore();
    }
    draw();
}

function updateScore() {
    score += 10;
    document.getElementById("scoreValue").innerText = score;
}

function collides() {
    return current.shape.some((row, dy) =>
        row.some((val, dx) => val && (board[current.y + dy]?.[current.x + dx] || 0))
    );
}

function placePiece() {
    current.shape.forEach((row, dy) =>
        row.forEach((val, dx) => {
            if (val) board[current.y + dy][current.x + dx] = current.color;
        })
    );
}

function resetPiece() {
    const shapes = [
        [[1, 1], [1, 1]],
        [[0, 1, 0], [1, 1, 1]],
        [[1, 1, 0], [0, 1, 1]]
    ];
    const colors = ["#ff8a65", "#81d4fa", "#a5d6a7"];
    let id = Math.floor(Math.random() * shapes.length);
    current = {
        x: Math.floor(cols / 2) - 1,
        y: 0,
        shape: shapes[id],
        color: colors[id]
    };
}

function move(dir) {
    current.x += dir;
    if (collides()) current.x -= dir;
    draw();
}

function rotate() {
    current.shape = current.shape[0].map((_, i) => current.shape.map(row => row[i])).reverse();
    if (collides()) current.shape = current.shape[0].map((_, i) => current.shape.map(row => row[i])).reverse();
    draw();
}

function draw() {
    drawBoard();
    current.shape.forEach((row, dy) =>
        row.forEach((val, dx) => {
            if (val) drawBlock(current.x + dx, current.y + dy, current.color);
        })
    );
}

let current;
resetPiece();
draw();
setInterval(dropPiece, 1000);
