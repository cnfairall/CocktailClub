import { useEffect, useState } from 'react';
import {
  Button, Modal, Card, CardBody, Image, Nav,
} from 'react-bootstrap';
import Link from 'next/link';
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
    <div className="column mt-5">
      <div style={{
        display: 'flex', justifyContent: 'space-between',
      }}
      >
        <div className="flex-column justify-between">
          <h1 className="title bi">Hello, {user.firstName}</h1>
          <div className="d-flex m-4 justify-content-start">
            <Image id="bartender" src="/images/bartender.png" alt="person shaking cocktail" />
            <div className="d-flex flex-column justify-content-between">
              <div style={{ width: '18em' }}>
                <p><strong>Discover</strong> and save unique cocktail recipes to make at home.</p>
                <p><strong>Review</strong> recipes and keep track of hits and misses.</p>
                <p>Check out the <strong>Share</strong> page to see what others are making!</p>
              </div>
              <Nav.Link className="shape">
                <Link passHref href="/search">
                  <div id="start">Get Started</div>
                </Link>
              </Nav.Link>
            </div>
          </div>
          <a className="smfont" href="https://storyset.com/people">People illustration by Storyset</a>
        </div>
        <div className="yellow flex-wrap d-flex flex-column justify-content-end align-content-center">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <p className="shrikhand">Why not try</p>
          </div>
          <Card style={{ width: '30rem' }}>
            <CardBody style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Image rounded className="smPic" src={randomCocktail[0]?.strDrinkThumb} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div>
                    <div style={{ fontFamily: 'Caprasimo', fontSize: '25px' }}>{randomCocktail[0]?.strDrink}</div>
                    <p>{randomCocktail[0]?.strGlass}</p>
                  </div>
                  <div className="measures smfont">
                    <div className="amounts">
                      {randomCocktail.amounts?.map((item) => <div key={item.idDrink}>{item}</div>)}
                    </div>
                    <div className="ingredients bold">
                      {randomCocktail.ingredients?.map((item) => <div key={item.idDrink}>{item}</div>)}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ margin: '10px 0 10px 0' }}>{randomCocktail[0]?.strInstructions}</div>
              <div className="d-flex justify-content-between">
                <Button id="refresh" onClick={setRandom}>
                  <i className="bi-arrow-clockwise" />
                </Button>
                <Button onClick={saveThisCocktail}>Save Cocktail</Button>
              </div>
            </CardBody>
          </Card>
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
