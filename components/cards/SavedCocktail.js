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
          <CardBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Image rounded className="smPic" src={savedCocktail.imageUrl} />
            <div className="title">{savedCocktail.name}</div>

            <div className="corner">
              <Link passHref href={`/savedcocktails/${savedCocktail.id}`}>
                <i className="fs-2 bi bi-eye-fill" />
              </Link>
            </div>
          </CardBody>
        )}

        {router.pathname.includes('/savedcocktails') && (
          <CardBody style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex' }}>
              <Image rounded className="lgPic" src={savedCocktail.imageUrl} />
              <div className="d-flex flex-column justify-content-between">
                <div>
                  <div className="title">{savedCocktail.name}</div>
                  <div><strong>{savedCocktail.glass?.name}</strong></div>
                </div>
                <div style={{ marginLeft: '10px' }}>
                  {savedCocktail.cocktailIngredients?.map((ci) => (
                    <div>{ci.amount} <strong>{ci.ingredient?.name}</strong></div>
                  ))}
                </div>
                <div>{savedCocktail?.instructions}</div>
              </div>
            </div>

              {savedCocktail?.made === true ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div><strong>Grade:</strong> {savedCocktail.grade}</div>
                    <div><strong>Notes:</strong> {savedCocktail.notes}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    {savedCocktail.public === true ? (
                      <i className="bi bi-cloud-check-fill fs-2" />) : (
                        <>
                          <Button style={{ marginBottom: '10px' }} onClick={shareACocktail}>
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
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: '10px',
                }}
                >
                  <Button style={{ marginBottom: '10px' }} onClick={handleShow}>Unsave</Button>
                  <Link passHref href={`/savedcocktails/review/${savedCocktail.id}`}>
                    <Button>Review</Button>
                  </Link>
                </div>
              )}
            {/* </div> */}
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
