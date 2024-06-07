import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SavedCocktail from '../../components/cards/SavedCocktail';
import { getSavedCocktailDetails } from '../../api/SavedCocktailsApi';

export default function CocktailDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [savedCocktail, setSavedCocktail] = useState({});

  useEffect(() => {
    getSavedCocktailDetails(id).then(setSavedCocktail);
  }, [id]);

  return (
    <SavedCocktail savedCocktail={savedCocktail} />
  );
}
