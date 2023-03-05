import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputField: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputField.addEventListener(
  'input',
  debounce(() => {
    const trimValue = refs.inputField.value.trim();
    listClear();
    if (trimValue !== '') {
      fetchCountries(trimValue)
        .then(dataOfCountries => {
          if (dataOfCountries.length > 10) {
            Notiflix.Notify.info(
              'Too many matches found. Please enter a more specific name.'
            );
            return;
          }

          if (dataOfCountries.length > 1) {
            makeMarkupOfListCountries(dataOfCountries);
          }

          if (dataOfCountries.length === 1) {
            makeMarkupOfSingleCountrie(dataOfCountries);
          }
        })
        .catch(error => {
          Notiflix.Notify.failure('Oops, there is no country with that name');
          return;
        });
    }
  }, DEBOUNCE_DELAY)
);

function makeMarkupOfListCountries(countries) {
  const markupCountries = countries
    .map(country => {
      return `<li class="list-item"><img class="flag" src="${country.flags.svg}" alt="country flag" width="40px">${country.name.official}</li>`;
    })
    .join('');

  refs.countryList.innerHTML = markupCountries;
}

function makeMarkupOfSingleCountrie(country) {
  const markupCountry = country.map(countryInfo => {
    return `<h2 class="country-title"><img class="flag" src="${
      countryInfo.flags.svg
    }" alt="country flag" width="70px"/>${
      countryInfo.name.official
    }</h2><ul class="country-list"><li class="list-item"><h3>Capital: <span class="value">${
      countryInfo.capital
    }</span></h3></li><li class="list-item"><h3>Population: <span class="value">${
      countryInfo.population
    }</span></h3></li><li class="list-item"><h3>Languages: <span class="value">${Object.values(
      countryInfo.languages
    ).join(', ')}</span></h3></li></ul>`;
  });

  refs.countryInfo.innerHTML = markupCountry;
}

function listClear() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
