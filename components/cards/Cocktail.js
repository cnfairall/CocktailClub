import {
  Button, Card, CardBody, Image,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function Cocktail({ cocktail }) {
  return (
    <Card style={{ width: '18rem', margin: '20px 20px', flex: '0 1 30%' }}>
      <CardBody>
        <Image style={{ width: '200px' }} src={cocktail?.strDrinkThumb} />
        <p>{cocktail?.strDrink}</p>
      </CardBody>
      <Link passHref href={`/cocktails/${cocktail.idDrink}`}>
        <Button>Details</Button>
      </Link>
    </Card>
  );
}

Cocktail.propTypes = {
  cocktail: PropTypes.shape({
    idDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
  }).isRequired,
};
