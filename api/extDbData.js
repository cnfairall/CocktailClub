const getCocktailByName = (name) => new Promise((resolve, reject) => {
  fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?s=${name}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getCocktailDetails = (drinkId) => new Promise((resolve, reject) => {
  fetch(`https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        const ingredients = [];
        const amounts = [];
        const { drinks } = data;
        const nonNull = Object.entries(drinks[0]).filter((item) => item[1] !== null);
        const nonNullObj = Object.fromEntries(nonNull);
        const ingredientKeys = Object.keys(nonNullObj).filter((key) => key.includes('Ingredient'));
        ingredientKeys.forEach((key) => ingredients.push(nonNullObj[key]));

        for (let i = 0; i < ingredients.length; i++) {
          amounts.push(nonNullObj[`strMeasure${i + 1}`]);
        }
        console.warn(amounts);
        resolve(data);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

export { getCocktailDetails, getCocktailByName };
