const startBtn = document.querySelector('[data-start]');
const stopBTN = document.querySelector('[data-stop]');
stopBTN.setAttribute('disabled', true);
const COLORCHANGE_INTERVAL = 1000;
let timerId = null;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function changeColor(color) {
  document.body.style.backgroundColor = color;
}
function toggleBtn(offBtn, onBtn) {
  offBtn.setAttribute('disabled', true);
  onBtn.removeAttribute('disabled');
}

startBtn.addEventListener('click', event => {
  toggleBtn(event.target, stopBTN);
  timerId = setInterval(() => {
    let color = getRandomHexColor();
    changeColor(color);
  }, COLORCHANGE_INTERVAL);
});

stopBTN.addEventListener('click', event => {
  toggleBtn(event.target, startBtn);
  clearInterval(timerId);
  console.log('stop');
});
