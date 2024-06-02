import { Card, CardBody } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function Cocktail({ cocktail }) {
  return (
    <Card>
      <CardBody>
        <p>{cocktail.strDrink}</p>
        <p>{cocktail.strGlass}</p>
      </CardBody>
    </Card>
  );
}

Cocktail.propTypes = {
  cocktail: PropTypes.shape({
    idDrink: PropTypes.string,
    strDrink: PropTypes.string,
    strGlass: PropTypes.string,
    strInstructions: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
};
