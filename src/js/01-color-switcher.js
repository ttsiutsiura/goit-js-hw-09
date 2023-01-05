const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

startBtnEl.addEventListener('click', onStartBtnClick);
stopBtnEl.addEventListener('click', onStopBtnClick);

let intervalId = null;

function onStartBtnClick() {
  intervalId = setInterval(setRandomBackgroundColor, 1000, bodyEl);
  setDisabledAttribute(startBtnEl);
  removeDisabledAttribute(stopBtnEl);
}

function onStopBtnClick() {
  clearInterval(intervalId);
  setDisabledAttribute(stopBtnEl);
  removeDisabledAttribute(startBtnEl);
}

function setDisabledAttribute(el) {
  el.setAttribute('disabled', 'true');
}

function removeDisabledAttribute(el) {
  el.removeAttribute('disabled');
}

function setRandomBackgroundColor(el) {
  el.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

export {setDisabledAttribute, removeDisabledAttribute}