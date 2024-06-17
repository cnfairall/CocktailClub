import {
  Button, Card, CardBody, Image,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { addPublicToSaved } from '../../api/SavedCocktailsApi';
import { useAuth } from '../../utils/context/authContext';
import { getSingleUser } from '../../api/UsersApi';

export default function SharedCocktail({ savedCocktail, onUpdate }) {
  const { user } = useAuth();
  const [added, setAdded] = useState(false);
  const [reviewer, setReviewer] = useState({});

  const getCocktailReviewer = () => {
    getSingleUser(savedCocktail.userId).then(setReviewer);
  };

  const addCocktail = () => {
    addPublicToSaved(savedCocktail.id, user.id).then(() => {
      setAdded(true);
      onUpdate();
    });
  };

  useEffect(() => {
    getCocktailReviewer();
  });
  return (
    <Card style={{ margin: '10px 0 10px 20px' }}>
      <CardBody className="d-flex justify-content-between">
        <Image rounded style={{ height: '200px' }} src={savedCocktail.imageUrl} />
        <div className="d-flex flex-column align-content-between" style={{ margin: '0 10px 0 10px', maxWidth: '50%' }}>
          <h1 className="smtitle">{savedCocktail.name}</h1>
          <p><strong>Glass:</strong> {savedCocktail.glass?.name}</p>
          <div className="mb-3">
            {savedCocktail.cocktailIngredients?.map((ci) => (
              <div key={ci.id}>{ci.amount} <strong>{ci.ingredient?.name}</strong></div>
            ))}
          </div>
          <div>{savedCocktail?.instructions}</div>
        </div>
        <div className="d-flex flex-column justify-content-between">
          <div>
            <p>Shared by: <strong>{reviewer.username}</strong></p>
            <p><strong>Grade:</strong> {savedCocktail.grade}</p>
            <p><strong>Notes:</strong> {savedCocktail.notes}</p>
          </div>

          {added || reviewer.id === user.id ? (
            ''
          )
            : (
              <div className="corner">
                <Button onClick={addCocktail}>Add to my saved</Button>
              </div>
            )}

        </div>
      </CardBody>
    </Card>
  );
}

SharedCocktail.propTypes = {
  savedCocktail: PropTypes.shape({
    id: PropTypes.number,
    drinkId: PropTypes.number,
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
