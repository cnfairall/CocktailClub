import { Card, CardBody } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getCocktailbyDrinkId } from '../../api/CocktailsApi';

export default function CocktailDetails({ cocktailId }) {
  const [fullCocktail, setFullCocktail] = useState({});

  const getFullCocktail = () => {
    getCocktailbyDrinkId(cocktailId).then(setFullCocktail);
    const { cocktailIngredients } = fullCocktail;
    const ingredients = Object.keys(cocktailIngredients);
    const amounts = Object.values(cocktailIngredients);
    const details = {
      ...fullCocktail,
      ingredients,
      amounts,
    };
    setFullCocktail(details);
  };

  useEffect(() => {
    getFullCocktail();
  });

  return (
    <Card>
      <CardBody>
        <p>{fullCocktail?.strDrink}</p>
        <p>{fullCocktail?.strGlass}</p>
        <div className="measures">
          <div className="amounts">
            {fullCocktail.amounts?.map((item) => <div key={item.idDrink}>{item}</div>)}
          </div>
          <div className="ingredients">
            {fullCocktail.ingredients?.map((item) => <div key={item.idDrink}>{item}</div>)}
          </div>
        </div>
        <p>{fullCocktail?.strInstructions}</p>
      </CardBody>
    </Card>
  );
}

CocktailDetails.propTypes = {
  cocktailId: PropTypes.string.isRequired,
  fullCocktail: PropTypes.shape({
    idDrink: PropTypes.string,
    strDrink: PropTypes.string,
    strGlass: PropTypes.string,
    strInstructions: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    amounts: PropTypes.arrayOf(PropTypes.string),
    cocktailIngredients: PropTypes.objectOf(PropTypes.keys, PropTypes.values),
  }).isRequired,
};
