// import { clientCredentials } from '../utils/client';

const endpoint = "https://cocktailclub.app";

const getSingleUser = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const editUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/users/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export { getSingleUser, editUser, deleteUser };
