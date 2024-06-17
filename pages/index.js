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
    <div className="column">
      <div style={{
        display: 'flex', marginTop: '20px', justifyItems: 'space-evenly', justifyContent: 'space-evenly',
      }}
      >
        <div style={{
          width: '30%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}
        >
          <Image src="/images/party.png" alt="cocktail party" />
          <h1 className="title">Hello, {user.firstName}</h1>
          <div>
            <p><strong>Discover</strong> and save unique cocktail recipes to make at home.</p>
            <p><strong>Review</strong> recipes and keep track of hits and misses.</p>
            <p>Check out the <strong>Share</strong> page to see what others are making!</p>
          </div>
          <a href="https://storyset.com/people">People illustration by Storyset</a>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <p className="shrikhand">Why not try</p>
          </div>
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
          <div className="center">
            <Button style={{ margin: '10px', width: '200px' }} onClick={setRandom}>Refresh</Button>
          </div>
        </div>

      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>
          <p>Cocktail saved!</p>
        </Modal.Body>
      </Modal>
    </div>
  );
}
