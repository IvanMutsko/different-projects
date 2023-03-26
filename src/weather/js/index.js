import { fetchCity } from './fetchCityCode';

const formEl = document.querySelector('#weather-form');
const cityInputEl = document.querySelector('.city-input');
const findListEl = document.querySelector('.city-list');

cityInputEl.addEventListener('input', onFillingInput);

function onFillingInput() {
  let city = cityInputEl.value.trim();

  if (city !== '') {
    fetchCity(city).then(findedCity => renderMarkupFindedCities(findedCity));
  } else {
    findListEl.innerHTML = '';
  }
}

function renderMarkupFindedCities(citiesArray) {
  findListEl.innerHTML = '';

  const cities = citiesArray.results;
  console.log(cities);

  if (cities !== undefined) {
    cities.forEach(city => {
      const markup = `<li><button id="${city.id}" type="button">${city.name}, ${city.admin1}, ${city.country}</button></li>`;
      findListEl.insertAdjacentHTML('beforeend', markup);
    });
  }
}

// ======================================

formEl.addEventListener('click', onFindBtnClick);

function onFindBtnClick(evt) {
  evt.preventDefault();

  const formValue = new FormData(formEl);

  formValue.forEach(value => console.log(value));
}
