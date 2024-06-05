import { Card, CardBody, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function Cocktail({ cocktail }) {
  return (
    <Card>
      <CardBody>
        <Image style={{ width: '200px' }} src={cocktail?.strDrinkThumb} />
        <p>{cocktail?.strDrink}</p>
      </CardBody>
    </Card>
  );
}

Cocktail.propTypes = {
  cocktail: PropTypes.shape({
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
  }).isRequired,
};
