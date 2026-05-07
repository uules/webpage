const $audio = document.getElementById("audio");
const $canvas = document.getElementById("visualizer");

const audioCtx = new AudioContext();
const source = audioCtx.createMediaElementSource($audio);
const analyser = audioCtx.createAnalyser();
source.connect(analyser);
analyser.connect(audioCtx.destination);

const canvasCtx = $canvas.getContext("2d");

analyser.fftSize = 128; // [32, 64, 128, 256... 32768] (default: 2048)
const count = analyser.frequencyBinCount;
const dataArray = new Uint8Array(count);

let gradient;

function update() {
  $canvas.width = window.innerWidth;
  $canvas.height = window.innerHeight;

  gradient = canvasCtx.createLinearGradient(0, $canvas.height, 0, 0);
  gradient.addColorStop(0, "lightblue");
  gradient.addColorStop(1, "white");
}

function draw() {
  requestAnimationFrame(draw);

  analyser.getByteFrequencyData(dataArray);
  canvasCtx.clearRect(0, 0, $canvas.width, $canvas.height);
  canvasCtx.fillStyle = gradient;

  const pixel = 6;
  const gap = 2;
  const width = ($canvas.width - gap * (count - 1)) / count;

  for (let i = 0; i < count; i++) {
    const freqIndex = i < count / 2 ? i : count - 1 - i;
    const value = dataArray[freqIndex] / 255;

    const height = Math.floor((value * $canvas.height) / (pixel + gap));
    const x = i * (width + gap);

    for (let j = 0; j < height; j++) {
      const y = $canvas.height - (j + 1) * (pixel + gap);
      canvasCtx.fillRect(x, y, width, pixel);
    }
  }
}

window.addEventListener("resize", update);

window.addEventListener("click", () => {
  if (audioCtx.state === "suspended") audioCtx.resume();
  $audio.paused ? $audio.play() : $audio.pause();
});

update();

draw();
