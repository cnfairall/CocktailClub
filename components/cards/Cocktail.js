import { Card, CardBody } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export default function Cocktail({ cocktail }) {
  // const [ingredients, setIngredients] = useState([]);

  // const getIngredients = () => {
  //   setIngredients(Object.entries(cocktail?.cocktailIngredients));
  // };

  useEffect(() => {
    console.warn(cocktail);
  }, [cocktail]);

  const { ingredients, amounts } = cocktail;

  return (
    <Card>
      <CardBody>
        <p>{cocktail[0]?.strDrink}</p>
        <p>{cocktail[0]?.strGlass}</p>
        <div className="measures">
          <div className="amounts">
            {amounts?.map((item) => <div>{item}</div>)}
          </div>
          <div className="ingredients">
            {ingredients?.map((item) => <div>{item}</div>)}
          </div>
        </div>
        <p>{cocktail[0]?.strInstructions}</p>
      </CardBody>
    </Card>
  );
}

Cocktail.propTypes = {
  cocktail: PropTypes.shape({
    0: PropTypes.shape({
      idDrink: PropTypes.string,
      strDrink: PropTypes.string,
      strGlass: PropTypes.string,
      strInstructions: PropTypes.string,
      strDrinkThumb: PropTypes.string,
    }),
    ingredients: PropTypes.arrayOf(PropTypes.string),
    amounts: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
