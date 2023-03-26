const URL_WEATHER_API = 'https://api.openweathermap.org/data/2.5/weather?';
const API_KEY = 'c807f2acdd74ab8a78287327fdf94a6e';

const fetchWeather = async function (latitude, longitude) {
  try {
    const response = await fetch(
      `${URL_WEATHER_API}lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
    );
    const weatherDate = await response.json();
    return weatherDate;
  } catch (error) {
    console.log(error);
  }
};

export { fetchWeather };
