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
    <Card style={{ margin: '20px' }}>
      <CardBody style={{
        display: 'flex', flex: '0 1 30%',
      }}
      >
        <Image rounded style={{ width: '200px' }} src={savedCocktail.imageUrl} />
        <div className="column" style={{ margin: '0 10px 0 10px' }}>
          <h1 className="title">{savedCocktail.name}</h1>
          <p><strong>Glass:</strong> {savedCocktail.glass?.name}</p>
          {savedCocktail.cocktailIngredients?.map((ci) => (
            <p>{ci.amount} {ci.ingredient?.name}</p>
          ))}
          <p>{savedCocktail?.instructions}</p>
        </div>
        <div className="column">
          <p>Shared by: <strong>{reviewer.username}</strong></p>
          <p><strong>Grade:</strong> {savedCocktail.grade}</p>
          <p><strong>Notes:</strong> {savedCocktail.notes}</p>
          {user.id !== reviewer.id && added && (
            <div className="corner">
              <Button>Added</Button>
            </div>
          )}

          {user.id !== reviewer.id && (
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
