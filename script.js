
const canvas = document.getElementById("tetris");
const ctx = canvas.getContext("2d");
const blockSize = 40;

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

// Demo block draw
blockImages.T.onload = () => {
  drawBlock("T", 2, 2);
  drawBlock("I", 3, 3);
  drawBlock("L", 4, 1);
};

function drawBlock(type, x, y) {
  ctx.drawImage(blockImages[type], x * blockSize, y * blockSize, blockSize, blockSize);
}

// Button actions
document.getElementById("left").onclick = () => console.log("Move Left");
document.getElementById("right").onclick = () => console.log("Move Right");
document.getElementById("down").onclick = () => console.log("Move Down");
document.getElementById("rotate").onclick = () => console.log("Rotate Block");
