import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtnEl = document.querySelector('button[data-start]');
const daysOutputEl = document.querySelector('span[data-days]');
const hoursOutputEl = document.querySelector('span[data-hours]');
const minutesOutputEl = document.querySelector('span[data-minutes]');
const secondsOutputEl = document.querySelector('span[data-seconds]');

startBtnEl.addEventListener('click', onStartBtnClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const isSelectedDatesValid =
      selectedDates[0].getTime() >= options.defaultDate.getTime();

    const isHasDisabledAttribute = startBtnEl.hasAttribute('disabled');

    if (!isSelectedDatesValid) {
      Notify.failure('Please choose a date in the future');
      setDisabledAttribute(startBtnEl);
      return;
    }

    removeDisabledAttribute(startBtnEl);
  },
};

const fp = flatpickr('input#datetime-picker', options);

function onStartBtnClick() {
  const intervalId = setInterval(() => {
    const currentDate = new Date();
    const { days, hours, minutes, seconds } = convertMs(
      fp.selectedDates[0].getTime() - currentDate.getTime()
    );

    const isTimeOver =
      days === 0 && hours === 0 && minutes === 0 && seconds === 0;

    renderTimeLeft({ days, hours, minutes, seconds });

    if (isTimeOver) {
      clearInterval(intervalId);
      return;
    }
  }, 1000);
}

function setDisabledAttribute(el) {
  el.setAttribute('disabled', 'true');
}

function removeDisabledAttribute(el) {
  el.removeAttribute('disabled');
}

function renderTimeLeft(time) {
  daysOutputEl.textContent = addLeadingZero(time.days);
  hoursOutputEl.textContent = addLeadingZero(time.hours);
  minutesOutputEl.textContent = addLeadingZero(time.minutes);
  secondsOutputEl.textContent = addLeadingZero(time.seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
