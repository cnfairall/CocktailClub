import {
  Button, Card, CardBody, Image,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { addPublicToSaved } from '../../api/SavedCocktailsApi';
import { useAuth } from '../../utils/context/authContext';

export default function SharedCocktail({ savedCocktail, onUpdate }) {
  const { user } = useAuth();
  const [added, setAdded] = useState(false);

  const addCocktail = () => {
    addPublicToSaved(savedCocktail.id, user.id).then(() => {
      setAdded(true);
      onUpdate();
    });
  };

  return (
    <Card style={{ margin: '20px' }}>
      <CardBody style={{ width: '18rem', flex: '0 1 30%' }}>
        <Image rounded style={{ width: '200px' }} src={savedCocktail.imageUrl} />
        <p>{savedCocktail.name}</p>

        <p>{savedCocktail.glass?.name}</p>
        {savedCocktail.cocktailIngredients?.map((ci) => (
          <p>{ci.amount} {ci.ingredient?.name}</p>
        ))}
        <p>{savedCocktail?.instructions}</p>

        <p>{savedCocktail.grade}</p>
        <p>{savedCocktail.notes}</p>
      </CardBody>
      {added ? (
        <Button>Added</Button>
      ) : (
        <Button onClick={addCocktail}>Add to my saved</Button>
      )}

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
