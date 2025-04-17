if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}

const bgm = new Audio('bgm_loop.wav');
bgm.loop = true;
bgm.volume = 0.3;
window.addEventListener('click', () => {
  if (bgm.paused) bgm.play();
});
