import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_1vX0CRY2ny06zyyyl2ZaMwhqYAVz2f8coNHA08oY2Rrpomumw6LojRvfTREelWSz';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
export function fetchBreeds() {
  return axios.get('/breeds').then(response => response.data);
}
export function fetchCatByBreed(breedId) {
  return axios
    .get(`/images/search?breed_ids=${breedId}`)
    .then(response => response.data);
}
