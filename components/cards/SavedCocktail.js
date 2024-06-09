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
    unsaveCocktail(savedCocktail.id).then(onUpdate());
  };

  const shareACocktail = () => {
    shareCocktail(savedCocktail.id).then(onUpdate());
  };

  return (
    <>
      <Card style={{ margin: '20px' }}>
        <CardBody style={{ width: '18rem', flex: '0 1 30%' }}>
          <Image style={{ width: '200px' }} src={savedCocktail.imageUrl} />
          <p>{savedCocktail.name}</p>

          {router.pathname === '/saved' && (
          <Link passHref href={`/savedcocktails/${savedCocktail.id}`}>
            <Button>Details</Button>
          </Link>
          )}
        </CardBody>

        {router.pathname.includes('/savedcocktails') && (
          <>
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
          </>
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
