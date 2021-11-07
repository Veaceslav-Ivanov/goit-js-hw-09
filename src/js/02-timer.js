import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const inputEl = document.querySelector('#datetime-picker');
const INTERVAL = 1000;

startBtn.setAttribute('disabled', '');

let selected = null;
const fp = flatpickr('#datetime-picker', {
  // minDate: 'today',
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    selected = selectedDates[0].getTime();
    const current = this.config.defaultDate.getTime();
    if (current >= selected) {
      Notify.failure('Please choose a date in the future');
      // alert('Please choose a date in the future');
      return;
    }
    startBtn.removeAttribute('disabled');
    inputEl.setAttribute('disabled', '');
  },
});
startBtn.addEventListener('click', startCountdown);
function startCountdown() {
  startBtn.setAttribute('disabled', '');
  const timerID = setInterval(() => {
    const currentTime = new Date();
    const timeLeft = selected - currentTime.getTime();
    if (timeLeft / 1000 < 0) {
      Notify.success('The time is over');
      // console.log('the time is ran out');
      clearInterval(timerID);
      return;
    }
    const unitAmount = convertMs(timeLeft);
    Object.entries(unitAmount).forEach(([unit, amount]) => {
      const output = document.querySelector(`[data-${unit}]`);
      output.textContent = addLeadingZero(amount);
    });
  }, INTERVAL);
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
