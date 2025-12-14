const START_SECONDS = 40;
let remaining = START_SECONDS;
let timeoutIds = [];
let running = false;

const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");

function updateDisplay(sec) {
  display.textContent = `${sec} seconds`;
}

function clearAllTimeouts() {
  timeoutIds.forEach((id) => clearTimeout(id));
  timeoutIds = [];
  running = false;
}

function startCountdown() {
  if (running) return; // prevent double-start
  clearAllTimeouts(); // ensure clean state
  running = true;
  remaining = START_SECONDS;
  updateDisplay(remaining);

  for (let i = START_SECONDS - 1; i >= 0; i--) {
    // schedule tick at (START_SECONDS - i) seconds later
    const id = setTimeout(() => {
      remaining = i;
      updateDisplay(remaining);
      // console.log(`${remaining} seconds.`);
      if (remaining === 0) running = false;
    }, (START_SECONDS - i) * 1000);
    timeoutIds.push(id);
  }
}

function stopAndReset() {
  clearAllTimeouts();
  remaining = START_SECONDS;
  updateDisplay(remaining);
  // console.log('Timer stopped and reset.');
}

startBtn.addEventListener("click", startCountdown);
stopBtn.addEventListener("click", stopAndReset);
