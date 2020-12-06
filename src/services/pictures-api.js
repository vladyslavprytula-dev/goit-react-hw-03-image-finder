import axios from 'axios';

const apiKey = '16794185-2b626f9c0a0a64e0d0da5a900';

axios.defaults.baseURL = 'https://pixabay.com/api';

const fetchPictures = ({ searchQuery = '', currentPage = 1 }) => {
  return axios
    .get(`/?key=${apiKey}&q=${searchQuery}&per_page=12&page=${currentPage}`)
    .then(response => response.data);
  // .then(response => response.data.hits);
};

export default { fetchPictures };
