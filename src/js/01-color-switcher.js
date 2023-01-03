const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

startBtnEl.addEventListener('click', onStartBtnClick);
stopBtnEl.addEventListener('click', onStopBtnClick);

let intervalId = null;

function onStartBtnClick(event) {
  intervalId = setInterval(setBackgroundColor, 1000);
  startBtnEl.setAttribute('disabled', 'true');
  stopBtnEl.removeAttribute('disabled');
}

function onStopBtnClick() {
  clearInterval(intervalId);
  startBtnEl.removeAttribute('disabled');
  stopBtnEl.setAttribute('disabled', 'true');
}

function setBackgroundColor() {
  bodyEl.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
