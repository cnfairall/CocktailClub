import {
  Button, Card, CardBody, Image,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUserCocktails, saveCocktail } from '../../api/SavedCocktailsApi';
import { useAuth } from '../../utils/context/authContext';
import { getCocktailDto } from '../../api/CocktailsApi';

export default function Cocktail({ cocktail }) {
  const router = useRouter();
  const { user } = useAuth();
  const [added, setAdded] = useState(false);

  const saveThisCocktail = () => {
    getCocktailDto(cocktail[0].idDrink).then((resp) => {
      saveCocktail(resp[0], user.id).then(router.push('/saved'));
    });
  };

  const getUsersCocktails = () => {
    getUserCocktails(user.id).then((resp) => {
      if (router.pathname.includes('/cocktails')) {
        if (resp.some((c) => c.drinkId === parseInt(cocktail[0]?.idDrink, 36)) === true) {
          setAdded(true);
        }
      }
    });
  };

  useEffect(() => {
    getUsersCocktails();
  }, [cocktail]);

  return (
    <Card className={router.pathname === '/search' ? 'smCard' : 'lgCard'}>
      {router.pathname === '/search' ? (

        <CardBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <p className="title">{cocktail?.strDrink}</p>
          <Image rounded className="smPic" src={cocktail?.strDrinkThumb} />
          <div className="corner">
            <Link passHref href={`/cocktails/${cocktail.idDrink}`}>
              <i className="fs-2 bi bi-eye-fill" />
            </Link>
          </div>
        </CardBody>

      ) : (
        <>
          <CardBody style={{ display: 'flex' }}>
            <Image rounded className="lgPic" src={cocktail[0]?.strDrinkThumb} />
            <div className="info">
              <div>
                <p className="title">{cocktail[0]?.strDrink}</p>
                <p><strong>{cocktail[0]?.strGlass}</strong></p>
              </div>
              <div className="measures">
                <div className="amounts">
                  {cocktail.amounts?.map((item) => <div key={item.idDrink}>{item}</div>)}
                </div>
                <div className="ingredients">
                  {cocktail.ingredients?.map((item) => <div key={item.idDrink}><strong>{item}</strong></div>)}
                </div>
              </div>
              <div>{cocktail[0]?.strInstructions}</div>
              <div className="corner">
                {added ? (
                  <p className="added">Added</p>
                ) : (
                  <Button onClick={saveThisCocktail}>Save Cocktail</Button>
                )}
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
