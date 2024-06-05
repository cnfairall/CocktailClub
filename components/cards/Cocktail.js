import {
  Button, Card, CardBody, Image,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Cocktail({ cocktail }) {
  const router = useRouter();
  return (
    <Card>
      {router.asPath === '/search' ? (
        <>
          <CardBody style={{ width: '18rem', margin: '20px', flex: '0 1 30%' }}>
            <Image style={{ width: '200px' }} src={cocktail?.strDrinkThumb} />
            <p>{cocktail?.strDrink}</p>
          </CardBody>
          <Link passHref href={`/cocktails/${cocktail.idDrink}`}>
            <Button>Details</Button>
          </Link>
        </>

      ) : (
        <>
          <CardBody style={{ width: '40rem', margin: '20px' }}>
            <Image style={{ width: '400px' }} src={cocktail[0]?.strDrinkThumb} />
            <p>{cocktail[0]?.strDrink}</p>
            <p>{cocktail[0]?.strGlass}</p>
            <div className="measures">
              <div className="amounts">
                {cocktail.amounts?.map((item) => <div key={item.idDrink}>{item}</div>)}
              </div>
              <div className="ingredients">
                {cocktail.ingredients?.map((item) => <div key={item.idDrink}>{item}</div>)}
              </div>
            </div>
            <p>{cocktail?.strInstructions}</p>
          </CardBody>
          <Button>Save Cocktail</Button>
        </>
      )}
    </Card>
  );
}

Cocktail.propTypes = {
  idDrink: PropTypes.string.isRequired,
  cocktail: PropTypes.shape({
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
