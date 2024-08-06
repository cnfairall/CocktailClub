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
    <div>

      <div className="home-content">
        <div className="left-middle">
          <div className="left-content">
            <h1 className="title bi">Hello, {user.firstName}</h1>
            <Image id="bartender" src="/images/bartender.png" alt="person shaking cocktail" />
            <a className="credit smfont" href="https://storyset.com/people">People illustration by Storyset</a>
          </div>
          <div className="middle-content">
            <div>
              <p className="intro"><strong>Discover</strong> and save unique cocktail recipes to make at home.</p>
              <p className="intro"><strong>Review</strong> recipes and keep track of hits and misses.</p>
              <p className="intro">Check out the <strong>Share</strong> page to see what others are making!</p>
            </div>
            <Nav.Link className="shape">
              <Link passHref href="/search">
                <div id="start">Get Started</div>
              </Link>
            </Nav.Link>
          </div>
        </div>
        <div className="right-content">
          <div className="random-title">
            <div className="shrikhand">Why not try</div>
          </div>
          <Card>
            <CardBody className="random-card">
              <div className="top">
                <div className="pic">
                  <Image rounded className="random-pic" src={randomCocktail[0]?.strDrinkThumb} />
                </div>
                <div className="top-half">
                  <div>
                    <div>
                      <div className="name">{randomCocktail[0]?.strDrink}</div>
                      <p>{randomCocktail[0]?.strGlass}</p>
                    </div>
                  </div>
                  <div className="measures smfont">
                    <div className="amounts">
                      {randomCocktail.amounts?.map((item) => <div className="no-wrap" key={item.idDrink}>{item}</div>)}
                    </div>
                    <div className="ingredients bold">
                      {randomCocktail.ingredients?.map((item) => <div className="no-wrap" key={item.idDrink}>{item}</div>)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="instructions">{randomCocktail[0]?.strInstructions}</div>
              <div className="d-flex justify-content-between">
                <Button id="refresh" onClick={setRandom}>
                  <i className="bi-arrow-clockwise" />
                </Button>
                <Button onClick={saveThisCocktail}>Save</Button>
              </div>
            </CardBody>
          </Card>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton />
          <Modal.Body>
            <p>Cocktail saved!</p>
          </Modal.Body>
        </Modal>
      </div>
    </div>

  );
}
