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
    unsaveCocktail(savedCocktail.id).then(() => {
      onUpdate();
      router.push('/saved');
    });
  };

  const shareACocktail = () => {
    shareCocktail(savedCocktail.id).then(() => {
      onUpdate();
      router.push('/share');
    });
  };

  return (
    <>
      <Card className={router.pathname.includes('/savedcocktails') ? 'lgCard' : 'smCard'}>

        {router.pathname === '/saved' && (
          <CardBody>
            <Image rounded className="smPic" src={savedCocktail.imageUrl} />
            <div className="name">{savedCocktail.name}</div>

            <div className="corner">
              <Link passHref href={`/savedcocktails/${savedCocktail.id}`}>
                <i className="fs-2 bi bi-eye-fill" />
              </Link>
            </div>
          </CardBody>
        )}

        {router.pathname.includes('/savedcocktails') && (
          <CardBody className="detail-card">
            <div className="top-row">
              <Image rounded className="lgPic" src={savedCocktail.imageUrl} />
              <div className="info">
                <div>
                  <div className="title">{savedCocktail.name}</div>
                  <div>{savedCocktail.glass?.name}</div>
                </div>
                <div className="smfont">
                  {savedCocktail.cocktailIngredients?.map((ci) => (
                    <div>{ci.amount} <strong>{ci.ingredient?.name}</strong></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="instructions">{savedCocktail?.instructions}</div>

              {savedCocktail?.made === true ? (
                <div className="made-info">
                  <div className="notes">
                    <div><strong>Grade:</strong> {savedCocktail.grade}</div>
                    <div><strong>Notes:</strong> {savedCocktail.notes}</div>
                  </div>
                  <div className="made-btns">
                    {savedCocktail.public === true ? (
                      <i className="bi bi-cloud-check-fill fs-2" />) : (
                        <>
                          <Button onClick={shareACocktail}>
                            Share
                          </Button>
                        </>
                    )}
                    <Link passHref href={`/savedcocktails/review/${savedCocktail.id}`}>
                      <Button>Edit notes</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="made-btns">
                  <Button onClick={handleShow}>Unsave</Button>
                  <Link passHref href={`/savedcocktails/review/${savedCocktail.id}`}>
                    <Button>Review</Button>
                  </Link>
                </div>
              )}
          </CardBody>
        )}
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>
          <p>Are you sure you want to remove this cocktail?</p>
          <Button style={{ marginRight: '10px' }} onClick={handleClose}>Cancel</Button>
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
