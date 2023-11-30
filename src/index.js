import { fetchBreeds, fetchCatByBreed } from './cat-api';

import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import Notiflix from 'notiflix';

const refs = {
  selector: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loading: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

window.addEventListener('load', wrap);

refs.catInfo.classList.add('is-hidden');
refs.error.style.display = 'none';

load();

function wrap() {
  fetchBreeds()
    .then(response => creatMap(response))
    .catch(responseError)
    .finally(load);
}
let array = [];

function creatMap(response) {
  response.map(({ name, id }) => array.push({ text: name, value: id }));
  scroll(array);
  load();
}
function scroll(array) {
  new SlimSelect({
    select: refs.selector,
    data: array,
  });
}
refs.selector.addEventListener('change', onSelector);

let firstSelect = true;

function onSelector(event) {
  if (!firstSelect) {
    onChangeBreed();
  } else {
    firstSelect = false;
  }
}
function onChangeBreed() {
  const breedId = refs.selector.value;

  fetchCatByBreed(breedId)
    .then(response => {
      refs.catInfo.innerHTML = createMarkup(response);
    })
    .catch(responseError)
    .finally(load);
}
function createMarkup(arr) {
  refs.loading.classList.toggle('is-hidden');
  refs.catInfo.classList.remove('is-hidden');

  return arr.map(
    ({ url, breeds }) => `
<div class="box-img">
<img src="${url}" alt="${breeds[0].name}" width="400"/>
</div>
<div class="box">
<h1 class="tittle">${breeds[0].name}</h1>
<p class="subtitle">${breeds[0].description}</p>
<p class="breed"><b>Temperament:</b> ${breeds[0].temperament}</p>
</div>`
  );
}
function responseError() {
  refs.selector.classList.add('is-hidden');
  refs.error.classList.add('is-hidden');
  refs.catInfo.classList.add('is-ho=idden');
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}

function load() {
  refs.loading.classList.toggle('is-hidden');
}
