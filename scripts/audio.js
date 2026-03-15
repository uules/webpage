export const audio = document.getElementById('audio');
export const audioCtx = new AudioContext();
export const analyser = audioCtx.createAnalyser();

const source = audioCtx.createMediaElementSource(audio);

source.connect(analyser);
analyser.connect(audioCtx.destination);

document.addEventListener(
  'click',
  () => {
    if (audioCtx.state === 'suspended') audioCtx.resume();
  },
  { once: true },
);
