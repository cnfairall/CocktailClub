import {
  Button, Card, CardBody, Image, Modal,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import { unsaveCocktail, shareCocktail } from '../../api/SavedCocktailsApi';

export default function SavedCocktail({ savedCocktail, onUpdate }) {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const removeCocktail = () => {
    unsaveCocktail(savedCocktail.id).then(router.push('/saved'));
  };

  const shareACocktail = () => {
    shareCocktail(savedCocktail.id).then(onUpdate());
  };

  return (
    <>
      <Card className={router.pathname.includes('/savedcocktails') ? 'lgCard' : 'smCard'}>
        <CardBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Image rounded className={router.pathname.includes('/savedcocktails') ? 'lgPic' : 'smPic'} src={savedCocktail.imageUrl} />
          <div className="title">{savedCocktail.name}</div>

          {router.pathname === '/saved' && (
            <div className="corner">
              <Link passHref href={`/savedcocktails/${savedCocktail.id}`}>
                <i className="fs-2 bi bi-eye-fill" />
              </Link>
            </div>
          )}
        </CardBody>

        {router.pathname.includes('/savedcocktails') && (
          <CardBody style={{ display: 'flex' }}>
            <div className="info">

              <p>{savedCocktail.glass?.name}</p>
              {savedCocktail.cocktailIngredients?.map((ci) => (
                <p>{ci.amount} {ci.ingredient?.name}</p>
              ))}
              <p>{savedCocktail?.instructions}</p>
              {savedCocktail?.made === true ? (
                <>
                  <p>{savedCocktail.grade}</p>
                  <p>{savedCocktail.notes}</p>
                  {savedCocktail.public === true ? (
                    <p>Shared</p>
                  ) : (
                    <>
                      <p>Private</p>
                      <Button onClick={shareACocktail}>Share</Button>
                    </>
                  )}
                  <Link passHref href={`/savedcocktails/review/${savedCocktail.id}`}>
                    <Button>Edit notes</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Button onClick={handleShow}>Unsave</Button>
                  <Link passHref href={`/savedcocktails/review/${savedCocktail.id}`}>
                    <Button>Review</Button>
                  </Link>
                </>
              )}
            </div>
          </CardBody>
        )}
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>
          <p>Are you sure you want to remove this cocktail?</p>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={removeCocktail}>Unsave</Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

SavedCocktail.propTypes = {
  savedCocktail: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    name: PropTypes.string,
    glass: PropTypes.string,
    instructions: PropTypes.string,
    imageUrl: PropTypes.string,
    cocktailIngredients: PropTypes.arrayOf(PropTypes.keys),
    grade: PropTypes.string,
    notes: PropTypes.string,
    made: PropTypes.bool,
    public: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
