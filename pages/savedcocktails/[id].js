import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import SavedCocktail from '../../components/cards/SavedCocktail';
import { getSavedCocktailDetails } from '../../api/SavedCocktailsApi';

export default function CocktailDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const ref = useRef();
  const [savedCocktail, setSavedCocktail] = useState({});

  const getCocktail = () => {
    getSavedCocktailDetails(id).then(setSavedCocktail);
  };

  useEffect(() => {
    getCocktail();
  }, [ref.current, id]);

  return (
    <div className="center">
      <SavedCocktail savedCocktail={savedCocktail} onUpdate={getCocktail} />
    </div>
  );
}
