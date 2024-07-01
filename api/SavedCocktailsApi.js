// import { clientCredentials } from '../utils/client';

const endpoint = "https://cocktailclub.app";

const saveCocktail = (payload, userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/savedcocktails/${userId}/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSavedCocktails = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/savedcocktails/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        const unmadeCocktails = data.filter((cocktail) => (cocktail.made === false));
        const madeCocktails = data.filter((cocktail) => (cocktail.made === true));
        resolve({ unmadeCocktails, madeCocktails });
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getUserCocktails = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/savedcocktails/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSavedCocktailDetails = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/savedcocktails/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const unsaveCocktail = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/savedcocktails/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const reviewCocktail = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/savedcocktails/review`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const shareCocktail = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/savedcocktails/${id}/share`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getPublicCocktails = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/api/savedcocktails/public`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  saveCocktail, getSavedCocktails, getSavedCocktailDetails, unsaveCocktail, reviewCocktail, shareCocktail, getPublicCocktails, getUserCocktails,
};
