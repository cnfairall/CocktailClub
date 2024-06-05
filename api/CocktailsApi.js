import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getCocktailByName = (name) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/cocktails/name/${name}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getCocktailbyDrinkId = (drinkId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/cocktails/drinkId/${drinkId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        const [{ cocktailIngredients }] = data;
        const ingredients = Object.keys(cocktailIngredients);
        const amounts = Object.values(cocktailIngredients);
        resolve({ ...data, ingredients, amounts });
      } else {
        resolve([]);
      }
    });
});

const getCocktailsBySpirit = (spirit) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/cocktails/spirit/${spirit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getCocktailsByGlass = (glass) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/cocktails/glass/${glass}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getRandomCocktail = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/cocktails/random`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        const [{ cocktailIngredients }] = data;
        const ingredients = Object.keys(cocktailIngredients);
        const amounts = Object.values(cocktailIngredients);
        resolve({ ...data, ingredients, amounts });
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

export {
  getCocktailByName, getCocktailbyDrinkId, getCocktailsByGlass, getCocktailsBySpirit, getRandomCocktail,
};
