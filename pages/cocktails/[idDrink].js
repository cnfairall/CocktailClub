import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Cocktail from '../../components/cards/Cocktail';
import { getCocktailbyDrinkId } from '../../api/CocktailsApi';

export default function CocktailDetailPage() {
  const router = useRouter();
  const { idDrink } = router.query;
  const [cocktail, setCocktail] = useState({});

  useEffect(() => {
    getCocktailbyDrinkId(idDrink).then(setCocktail);
  }, [idDrink]);

  return (
    <Cocktail cocktail={cocktail} />
  );
}
