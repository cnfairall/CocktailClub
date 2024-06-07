import {
  Button, Card, CardBody, Image,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { unsaveCocktail, shareCocktail } from '../../api/SavedCocktailsApi';

export default function SavedCocktail({ savedCocktail }) {
  const router = useRouter();

  const removeCocktail = () => {
    if (window.confirm('Are you sure you want to remove this cocktail?')) {
      unsaveCocktail(savedCocktail.id).then(router.push('/saved'));
    }
  };

  const shareACocktail = () => {
    shareCocktail(savedCocktail.id).then(router.push('/share'));
  };

  return (
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
              <Button onCLick={shareACocktail}>Share</Button>
              <Link passHref href={`/savedcocktails/review/${savedCocktail.id}`}>
                <Button>Edit notes</Button>
              </Link>
            </>
          ) : (
            <>
              <Button onClick={removeCocktail}>Unsave</Button>
              <Link passHref href={`/savedcocktails/review/${savedCocktail.id}`}>
                <Button>Review</Button>
              </Link>
            </>
          )}
        </>
      )}
    </Card>
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
  }).isRequired,
};