import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReviewForm from '../../../components/forms/ReviewForm';
import { getSavedCocktailDetails } from '../../../api/SavedCocktailsApi';

export default function Review() {
  const [savedCocktail, setSavedCocktail] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSavedCocktailDetails(id).then(setSavedCocktail);
  }, [id]);

  return (
    <ReviewForm savedCocktail={savedCocktail} />
  );
}
