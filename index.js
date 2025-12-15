const START_SECONDS = 40;
let remaining = START_SECONDS;
let timeoutIds = [];
let running = false;

const display = document.getElementById("display");
const startBtn = document.getElementById("start");
// const stopBtn = document.getElementById("stop");

function updateDisplay(sec) {
  display.textContent = `${sec} seconds`;
}

function clearAllTimeouts() {
  timeoutIds.forEach((id) => clearTimeout(id));
  timeoutIds = [];
  // running = false;
}

function startCountdown() {
  // if (running) return; // prevent double-start

  if (running === false) {
    clearAllTimeouts(); // ensure clean state
    running = true;
    startBtn.innerText = "Stop and Reset";
    startBtn.style.backgroundColor = "#fc3d21";
    display.style.backgroundColor = "whitesmoke";
    display.style.color = "steelblue";
    remaining = START_SECONDS;
    updateDisplay(remaining);

    for (let i = START_SECONDS - 1; i >= 0; i--) {
      // schedule tick at (START_SECONDS - i) seconds later
      const id = setTimeout(() => {
        remaining = i;
        updateDisplay(remaining);
        if (i < 10) {
          display.style.fontWeight = "bold";
        } else {
          display.style.fontWeight = "normal";
        }
        if (remaining === 0) {
          running = false;
          startBtn.innerText = "Start";
        }
      }, (START_SECONDS - i) * 1000);
      timeoutIds.push(id);
    }
  } else if (running === true) {
    running = false;
    clearAllTimeouts();
    remaining = START_SECONDS;
    startBtn.innerText = "Start";
    startBtn.style.backgroundColor = "steelblue";
    display.style.backgroundColor = "steelblue";
    display.style.backgroundColor = "whitesmoke";

    updateDisplay(remaining);
  }
}

// function stopAndReset() {
// console.log('Timer stopped and reset.');
// }

startBtn.addEventListener("click", startCountdown);
// stopBtn.addEventListener("click", stopAndReset);
