const progressBar = document.querySelector(".progress");
const minElem = document.querySelector("#minutes");
const secElem = document.querySelector("#seconds");
const startStop = document.querySelector("#stop");
const setting = document.querySelector("#settings");
const body = document.querySelector("body");

let minutes = parseInt(minElem.innerHTML);
let seconds = parseInt(secElem.innerHTML);
let progress = null;
let progressStart = 0;
let progressEnd = minutes * 60 + seconds;
let speed = 1000;
let degTravel = 360 / progressEnd;
let toggleSettings = false;
let secRem = 0;
let minRem = 0;

minElem.contentEditable = true;
secElem.contentEditable = true;

function progressTrack() {
  progressStart++;

  secRem = Math.floor((progressEnd - progressStart) % 60);
  minRem = Math.floor((progressEnd - progressStart) / 60);

  secElem.innerHTML = secRem.toString().padStart(2, "0");
  minElem.innerHTML = minRem.toString().padStart(2, "0");

  progressBar.style.background = `conic-gradient(#9d0000 ${progressStart * degTravel}deg, #915a5b ${progressStart * degTravel}deg)`;

  if (progressStart === progressEnd) {
    progressBar.style.background = `conic-gradient(#00aa51 360deg, #00aa51 360deg)`;
    clearInterval(progress);
    startStop.innerHTML = "START";
    progress = null;
    progressStart = 0;
    play();
  }
}

function startStopProgress() {
  if (!progress) {
    progress = setInterval(progressTrack, speed);
  } else {
    clearInterval(progress);
    progress = null;
    progressStart = 0;
    progressBar.style.background = `conic-gradient(#915a5b 360deg, #915a5b 360deg)`;
  }
}

function resetValues() {
  if (progress) {
    clearInterval(progress);
  }
  minutes = parseInt(minElem.innerHTML);
  if (isNaN(minutes)) {
    minutes = 0;
  }
  seconds = parseInt(secElem.innerHTML);
  if (isNaN(seconds)) {
    seconds = 0;
  }
  progress = null;
  progressStart = 0;
  progressEnd = minutes * 60 + seconds;
  degTravel = 360 / progressEnd;
  progressBar.style.background = `conic-gradient(#915a5b 360deg, #915a5b 360deg)`;
}

function resetSettings() {
  toggleSettings = false;
  body.style.fontFamily = `var(--font-alpha)`;
}

startStop.onclick = function () {
  if (startStop.innerHTML === "START") {
    if (!(minutes === 0 && seconds === 0)) {
      startStop.innerHTML = "STOP";
      startStopProgress();
    }
  } else {
    startStop.innerHTML = "START";
    startStopProgress();
  }
};

setting.onclick = function () {
  if (!toggleSettings) {
    toggleSettings = true;
    body.style.fontFamily = `var(--font-beta)`;
  } else {
    resetSettings();
  }
};

minElem.onblur = function () {
  resetValues();
};

secElem.onblur = function () {
  resetValues();
};

function play() {
  var audio = new Audio("assets\\media\\cowbell.mp3");
  audio.play();
}
