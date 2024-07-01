// import { clientCredentials } from '../utils/client';

const endpoint = "https://cocktailclub.app";

const getSpirits = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/spirits`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export default getSpirits;
