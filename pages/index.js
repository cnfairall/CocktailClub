import { useEffect, useState } from 'react';
import {
  Button, Modal, Card, CardBody, Image,
} from 'react-bootstrap';
import { getRandomCocktail, getCocktailDto } from '../api/CocktailsApi';
import { saveCocktail } from '../api/SavedCocktailsApi';
import { useAuth } from '../utils/context/authContext';

export default function Home() {
  const { user } = useAuth();
  const [randomCocktail, setRandomCocktail] = useState({});
  const [show, setShow] = useState(false);

  const setRandom = () => {
    getRandomCocktail().then((resp) => {
      setRandomCocktail(resp);
    });
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const saveThisCocktail = () => {
    getCocktailDto(randomCocktail[0].idDrink).then((resp) => {
      saveCocktail(resp[0], user.id).then(handleShow());
    });
  };

  useEffect(() => {
    setRandom();
  }, []);

  return (
    <>
      <div>
        <p className="shrikhand">Random Cocktail</p>
        <Card style={{ width: '30rem' }}>
          <CardBody style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Image rounded className="smPic" src={randomCocktail[0]?.strDrinkThumb} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div>
                  <p className="title">{randomCocktail[0]?.strDrink}</p>
                  <p>{randomCocktail[0]?.strGlass}</p>
                </div>
                <div className="measures">
                  <div className="amounts">
                    {randomCocktail.amounts?.map((item) => <div key={item.idDrink}>{item}</div>)}
                  </div>
                  <div className="ingredients">
                    {randomCocktail.ingredients?.map((item) => <div key={item.idDrink}>{item}</div>)}
                  </div>
                </div>
              </div>
            </div>
            <div>{randomCocktail[0]?.strInstructions}</div>
            <div className="corner">
              <Button onClick={saveThisCocktail}>Save Cocktail</Button>
            </div>
          </CardBody>
        </Card>
        <Button onClick={setRandom}>Refresh</Button>

      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>
          <p>Cocktail saved!</p>
        </Modal.Body>
      </Modal>
    </>
  );
}
