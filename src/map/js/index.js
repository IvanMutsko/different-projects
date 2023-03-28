import 'normalize.css';
import { fetchWeather } from './fetchweather';

const mapEl = document.querySelectorAll('#map path');
const stateNameEl = document.querySelector('.state');
const weatherBlockEl = document.querySelector('#weather-block');

mapEl.forEach(state => {
  state.style.fill = '#ffd700';
  state.style.fillOpacity = '0.3';
  state.style.stroke = 'rgba(0, 0, 0, 0.3)';
  state.style.strokeWidth = '1px';

  state.addEventListener('mouseenter', evt => {
    state.style.fill = '#0057b8';

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
        description: weather[0].description, //
        icon: weather[0].icon,
        main: weather[0].main,
        id: weather[0].id, //
      };

      weatherBlockEl.textContent = '';

      weatherBlockEl.classList.remove('visually-hidden');

      createMarkupWeather(weatherDataForMarkup);
    });
  });
});

function createMarkupWeather(data) {
  const markup = `
  <div class="weather-description">
          <h2 class="descr-title">${
            data.description.charAt(0).toUpperCase() + data.description.slice(1)
          }</h2>
          <img
            class="weather-img"
            src="https://openweathermap.org/img/wn/${data.icon}@2x.png"
          />
          <ul class="time-wrap weather-list">
                <li>sunrise: ${data.sunrise}</li>
                <li>sunset: ${data.sunset}</li>
              </ul>
          </ul>
        </div>
        <div class="wether-data-wrap">
          <ul class="weather-list">
            <li>Temperature: ${data.temp} °C</li>
            <li>Feels like: ${data.feelsLike} °C</li>
            <li>Wind: ${data.windSpeed} m/s</li>
            <li>Wind gust: ${data.windGust} m/s</li>
          </ul>
          <ul class="weather-list">
            <li>Pressure: ${data.pressure} mmHg</li>
            <li>Humidity: ${data.humidity} %</li>
            <li>Cloudiness: ${data.clouds} %</li>
          </ul>
        </div>
  `;

  weatherBlockEl.insertAdjacentHTML('beforeend', markup);
}

function formatUnixTime(time) {
  const date = new Date(time * 1000);

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}
