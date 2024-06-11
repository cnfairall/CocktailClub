import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SavedCocktail from '../../components/cards/SavedCocktail';
import { getSavedCocktailDetails } from '../../api/SavedCocktailsApi';

export default function CocktailDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [savedCocktail, setSavedCocktail] = useState({});

  const getCocktail = () => {
    getSavedCocktailDetails(id).then(setSavedCocktail);
  };

  useEffect(() => {
    getCocktail();
  }, [id]);

  return (
    <div className="center">
      <SavedCocktail savedCocktail={savedCocktail} onUpdate={getCocktail} />
    </div>
  );
}
