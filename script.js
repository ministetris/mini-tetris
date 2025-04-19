
const canvas = document.getElementById("tetris");
const ctx = canvas.getContext("2d");
const blockSize = 32;

const blockImages = {
  T: new Image(),
  I: new Image(),
  L: new Image(),
  O: new Image(),
  Z: new Image(),
  DOT: new Image()
};

blockImages.T.src = "block_t.png";
blockImages.I.src = "block_i.png";
blockImages.L.src = "block_l.png";
blockImages.O.src = "block_o.png";
blockImages.Z.src = "block_z.png";
blockImages.DOT.src = "block_dot.png";

function drawBlock(type, x, y) {
  ctx.drawImage(blockImages[type], x * blockSize, y * blockSize, blockSize, blockSize);
}

function startGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBlock("T", 3, 5);
  drawBlock("I", 5, 6);
  drawBlock("L", 6, 5);
  drawBlock("O", 4, 7);
}

document.getElementById("left").onclick = () => console.log("Move Left");
document.getElementById("right").onclick = () => console.log("Move Right");
document.getElementById("down").onclick = () => console.log("Move Down");
document.getElementById("rotate").onclick = () => console.log("Rotate Block");

window.onload = startGame;
