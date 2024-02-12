import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  btn: document.querySelector('[data-start]'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate;
let interval;

refs.btn.disabled = true;

refs.btn.addEventListener('click', () => {
  if (userSelectedDate) {
    refs.btn.disabled = true;
    refs.input.disabled = true;
    startTimer();
  }
});

function startTimer() {
  interval = setInterval(timerSet, 1000);
}

function timerSet() {
  const date = new Date();
  const timeLeft = userSelectedDate - date;

  if (timeLeft <= 0) {
    stopTimer();
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeLeft);
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

function stopTimer() {
  clearInterval(interval);
  refs.input.disabled = false;
}

const options = {
  closeOnEscape: true,
  timeout: 1000,
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      iziToast.error({
        position: 'topRight',
        message: 'Please choose a date in the future',
      });
      refs.btn.disabled = true;
    } else {
      refs.btn.disabled = false;
    }
  },
};

const fp = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day)
    .toString()
    .padStart(2, '0');
  const hours = Math.floor((ms % day) / hour)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor(((ms % day) % hour) / minute)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor((((ms % day) % hour) % minute) / second)
    .toString()
    .padStart(2, '0');

  return { days, hours, minutes, seconds };
}