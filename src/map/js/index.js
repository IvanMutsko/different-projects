import { fetchWeather } from './fetchweather';

const mapEl = document.querySelectorAll('#map path');
const stateNameEl = document.querySelector('.state');
const weatherBlockEl = document.querySelector('#weather-block');

mapEl.forEach(state => {
  state.style.fill = '#ffd700';
  state.style.stroke = '#499DF5';
  state.style.strokeWidth = '1px';

  state.addEventListener('mouseenter', evt => {
    state.style.fill = '#f7f760';

    const stateNameText = state.getAttribute('title');
    stateNameEl.textContent = `, ${stateNameText}`;
  });

  state.addEventListener('mouseleave', evt => {
    state.style.fill = '#ffd700';
    stateNameEl.textContent = '';
  });

  state.addEventListener('click', evt => {
    const geoCodeString = evt.target.getAttribute('data-geocode');

    const latitude = geoCodeString.split(',')[0].trim();
    const longitude = geoCodeString.split(',')[1].trim();

    fetchWeather(latitude, longitude).then(weatherData => {
      const { main, weather, wind, clouds, sys } = weatherData;

      const weatherDataForMarkup = {
        temp: main.temp, //
        feelsLike: main.feels_like, //
        pressure: (main.pressure * 0.750062).toFixed(0), //
        humidity: main.humidity, //
        windSpeed: wind.speed, //
        windGust: wind.gust, //
        clouds: clouds.all, //
        sunrise: formatUnixTime(sys.sunrise), //
        sunset: formatUnixTime(sys.sunset), //
        description: weather[0].description,
        icon: weather[0].icon,
        main: weather[0].main,
        id: weather[0].id,
      };

      weatherBlockEl.textContent = '';

      createMarkupWeather(weatherDataForMarkup);
    });
  });
});

function createMarkupWeather(data) {
  const markup = `
  <p>Температура: ${data.temp} °C</p>
  <p>відчувається як: ${data.feelsLike} °C</p>
  <p>Тиск: ${data.pressure} мм рт. ст.</p>
  <p>Вологість: ${data.humidity} %</p>
  <p>Вітер: ${data.windSpeed} м/с</p>
  <p>Вітер, пориви до: ${data.windGust} м/с</p>
  <p>Хмарність: ${data.clouds} %</p>
    <p>Схід: ${data.sunrise}</p>
      <p>Захід: ${data.sunset}</p>
  `;

  weatherBlockEl.insertAdjacentHTML('beforeend', markup);
}

function formatUnixTime(time) {
  const date = new Date(time * 1000);
  const timezoneOffset = date.getTimezoneOffset();
  console.log(timezoneOffset);
  date.setMinutes(date.getMinutes() - timezoneOffset);

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}

// розібратись з правильним часовим поясом
