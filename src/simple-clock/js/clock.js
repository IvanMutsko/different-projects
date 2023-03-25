const clockElements = {
  hoursEl: document.querySelector('#hours'),
  minutesEl: document.querySelector('#minutes'),
  secondsEl: document.querySelector('#seconds'),

  ampm: document.querySelector('#ampm'),

  slideHourEl: document.querySelector('#slide-hour'),
  slideMinEl: document.querySelector('#slide-min'),
  slideSecEl: document.querySelector('#slide-sec'),
};

setInterval(getTime, 1000);

function getTime() {
  const {
    hoursEl,
    minutesEl,
    secondsEl,
    ampm,
    slideHourEl,
    slideMinEl,
    slideSecEl,
  } = clockElements;

  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();
  let seconds = new Date().getSeconds();

  ampm.textContent = hours > 12 ? 'PM' : 'AM';

  let hoursAMPM = hours > 12 ? hours - 12 : hours;

  hoursEl.textContent =
    hoursAMPM < 10 ? '0' + hoursAMPM : (hoursEl.textContent = hoursAMPM);

  minutesEl.textContent =
    minutes < 10 ? '0' + minutes : (minutesEl.textContent = minutes);

  secondsEl.textContent =
    seconds < 10 ? '0' + seconds : (secondsEl.textContent = seconds);

  slideHourEl.style.transform = `translateX(${hoursAMPM * (300 / 12)}px)`;

  slideMinEl.style.transform = `translateX(${minutes * (300 / 60)}px)`;

  slideSecEl.style.transform = `translateX(${seconds * (300 / 60)}px)`;
}
