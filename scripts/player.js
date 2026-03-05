import { audio } from './audio.js';

const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
  audio.paused ? audio.play() : audio.pause();
});
