import {
  Card, CardBody, Image,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSingleUser } from '../../api/UsersApi';

export default function SharedCocktail({ savedCocktail }) {
  const [reviewer, setReviewer] = useState({});

  const getCocktailReviewer = () => {
    getSingleUser(savedCocktail.userId).then(setReviewer);
  };

  useEffect(() => {
    getCocktailReviewer();
  }, [savedCocktail]);

  return (
    <Card className="shared-card">
      <CardBody className="shared-body">
        <Image rounded className="smPic shared-pic" src={savedCocktail.imageUrl} />
        <div className="shared-middle">
          <h1 className="name">{savedCocktail.name}</h1>
          <div className="shared-ingredients">
            {savedCocktail.cocktailIngredients?.map((ci) => (
              <p className="shared-p" key={ci.id}><strong>{ci.ingredient?.name}</strong></p>
            ))}
          </div>
        </div>
        <div className="shared-end">
          <div>
            <p className="shared-end-p">Shared by: <strong>{reviewer.username}</strong></p>
            <p className="shared-end-p"><strong>Grade:</strong> {savedCocktail.grade}</p>
            <p className="shared-end-p"><strong>Notes:</strong> {savedCocktail.notes}</p>
          </div>
          <div className="corner">
            <Link passHref href={`/cocktails/${savedCocktail.drinkId}`}>
              <i className="fs-2 bi bi-eye-fill" />
            </Link>
          </div>
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
};
