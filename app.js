if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}

const bgm = new Audio('bgm_loop.wav');
bgm.loop = true;
bgm.volume = 0.4;

window.addEventListener('click', () => {
  if (bgm.paused) {
    bgm.play().catch((e) => {
      console.warn("BGM play blocked:", e);
    });
  }
});
