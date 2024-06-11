import {
  Button, Card, CardBody, Image,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { saveCocktail } from '../../api/SavedCocktailsApi';
import { useAuth } from '../../utils/context/authContext';
import { getCocktailDto } from '../../api/CocktailsApi';

export default function Cocktail({ cocktail }) {
  const router = useRouter();
  const { user } = useAuth();

  const saveThisCocktail = () => {
    getCocktailDto(cocktail[0].idDrink).then((resp) => {
      saveCocktail(resp[0], user.id).then(router.push('/saved'));
    });
  };

  return (
    <Card className={router.pathname === '/search' || router.pathname === '/' ? 'smCard' : 'lgCard'}>
      {router.pathname === '/search' ? (

        <CardBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <p className="title">{cocktail?.strDrink}</p>
          <Image rounded style={{ width: '200px' }} src={cocktail?.strDrinkThumb} />
          <div className="corner">
            <Link passHref href={`/cocktails/${cocktail.idDrink}`}>
              <i className="fs-2 bi bi-eye-fill" />
            </Link>
          </div>
        </CardBody>

      ) : (
        <>
          <CardBody style={{ display: 'flex' }}>
            <Image rounded className={router.pathname === '/' ? 'smPic' : 'lgPic'} src={cocktail[0]?.strDrinkThumb} />
            <div className="info">
              <div>
                <p className="title">{cocktail[0]?.strDrink}</p>
                <p>{cocktail[0]?.strGlass}</p>
              </div>
              <div className="measures">
                <div className="amounts">
                  {cocktail.amounts?.map((item) => <div key={item.idDrink}>{item}</div>)}
                </div>
                <div className="ingredients">
                  {cocktail.ingredients?.map((item) => <div key={item.idDrink}>{item}</div>)}
                </div>
              </div>
              <div>{cocktail[0]?.strInstructions}</div>
              <div className="corner">
                <Button onClick={saveThisCocktail}>Save Cocktail</Button>
              </div>
            </div>
          </CardBody>
        </>
      )}
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
    ingredients: PropTypes.arrayOf(PropTypes.string),
    amounts: PropTypes.arrayOf(PropTypes.string),
    cocktailIngredients: PropTypes.objectOf(PropTypes.keys, PropTypes.values),
  }).isRequired,
};
