import { analyser } from './audio.js';

analyser.fftSize = 128; // [32, 64, 128, 256... 32768] (default: 2048)

const dataArray = new Uint8Array(analyser.frequencyBinCount);

const canvas = document.getElementById('visualizer');
const canvasCtx = canvas.getContext('2d');

let count, gap, width;

function update() {
  canvas.width = window.innerWidth;
  canvas.height = Math.round(window.innerHeight);

  canvasCtx.fillStyle = 'black';

  count = analyser.frequencyBinCount * 0.5;
  gap = 4;
  width = (canvas.width - gap * (count - 1)) / count;
}
update();

window.addEventListener('resize', update);

function draw() {
  requestAnimationFrame(draw);

  analyser.getByteFrequencyData(dataArray);

  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < count; i++) {
    const half = count / 2;
    const freqIndex = i < half ? i : count - 1 - i;
    const value = dataArray[freqIndex] / 255;

    const height = Math.pow(value, 1.5) * canvas.height;
    const x = i * (width + gap);
    const y = canvas.height - height;
    canvasCtx.fillRect(x, y, width, height);
  }
}
draw();
