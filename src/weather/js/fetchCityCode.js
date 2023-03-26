const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1';
const API_KEY = 'c807f2acdd74ab8a78287327fdf94a6e';

const fetchCity = async function (city) {
  try {
    const response = await fetch(
      `${GEOCODING_API}/search?name=${city}&count=10`
    );
    const findedCity = await response.json();
    return findedCity;
  } catch (error) {
    console.log(error);
  }
};

export { fetchCity };

console.log(GeolocationCoordinates)