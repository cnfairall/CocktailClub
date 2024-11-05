import {
  Button, Card, CardBody, Image, Modal,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUserCocktails, saveCocktail } from '../../api/SavedCocktailsApi';
import { useAuth } from '../../utils/context/authContext';
import { getCocktailDto, getCocktailbyDrinkId } from '../../api/CocktailsApi';

export default function Cocktail({ cocktail }) {
  const router = useRouter();
  const { user } = useAuth();
  const [added, setAdded] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [details, setDetails] = useState({});

  const handleClose = () => setShowDetail(false);

  const saveThisCocktail = () => {
    getCocktailDto(details[0].idDrink).then((resp) => {
      saveCocktail(resp[0], user.id).then(handleClose());
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

  const getCocktailDetails = () => {
    getCocktailbyDrinkId(cocktail.idDrink).then(setDetails);
    setShowDetail(true);
  };

  useEffect(() => {
    getUsersCocktails();
  }, [cocktail]);

  return (
    <>
      <Card className="smCard">
        <CardBody className="drink-body">
          <p className="name cocktail">{cocktail?.strDrink}</p>
          <Image rounded className="smPic cocktail-pic" src={cocktail?.strDrinkThumb} />
          <div className="corner">
            <Button
              id="clearbtn"
              onClick={getCocktailDetails}
            >
              <i className="fs-2 bi bi-eye-fill" />
            </Button>
          </div>
        </CardBody>
      </Card>

      <Modal
        show={showDetail}
        onHide={handleClose}
      >
        <Card>
          <CardBody className="detail-card">
            <div className="top-row">

              <div>
                <Image rounded className="lgPic" src={details[0]?.strDrinkThumb} />
              </div>
              <div className="info">
                <div>
                  <div className="title">{details[0]?.strDrink}</div>
                  <p>{details[0]?.strGlass}</p>
                </div>
                <div className="measures smfont">
                  <div className="amounts">
                    {details.amounts?.map((item) => <div className="no-wrap" key={item.idDrink}>{item}</div>)}
                  </div>
                  <div className="ingredients">
                    {details.ingredients?.map((item) => <div className="no-wrap" key={item.idDrink}><strong>{item}</strong></div>)}
                  </div>
                </div>
              </div>
            </div>

            <div className="instructions">{details[0]?.strInstructions}</div>
            <div className="corner">
              {added ? (
                <p className="added">Added</p>
              ) : (
                <Button onClick={saveThisCocktail}>Save</Button>
              )}
            </div>
          </CardBody>
        </Card>
      </Modal>
    </>

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
