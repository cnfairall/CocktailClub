import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getGlasses = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/glasses`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export default getGlasses;
