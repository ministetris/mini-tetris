
const bgm = new Audio('bgm_loop.wav');
bgm.loop = true;
bgm.volume = 0.4;
window.addEventListener('click', () => {
  if (bgm.paused) {
    bgm.play().catch(() => {});
  }
});
