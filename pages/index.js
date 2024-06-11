import { useEffect, useState } from 'react';
import {
  Button, Modal,
} from 'react-bootstrap';
import { getRandomCocktail } from '../api/CocktailsApi';
import Cocktail from '../components/cards/Cocktail';

export default function Home() {
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

  useEffect(() => {
    setRandom();
  }, []);

  return (
    <>
      <div>
        <p className="shrikhand">Random Cocktail</p>
        <Cocktail cocktail={randomCocktail} onUpdate={handleShow} />
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
