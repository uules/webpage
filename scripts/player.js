import { audio } from "./audio.js";

const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    document.body.classList.add("stars");
  } else {
    audio.pause();
    document.body.classList.remove("stars");
  }
});
