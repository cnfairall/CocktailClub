import { useEffect, useState } from 'react';
import { getSavedCocktails } from '../api/SavedCocktailsApi';
import { useAuth } from '../utils/context/authContext';
import SavedCocktail from '../components/cards/SavedCocktail';

export default function SavedCocktails() {
  const [savedCocktails, setSavedCocktails] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getSavedCocktails(user.id).then(setSavedCocktails);
  }, [user]);

  return (
    <>
      {savedCocktails.map((sc) => (
        <SavedCocktail savedCocktail={sc} key={sc.id} />
      ))}
    </>
  );
}
