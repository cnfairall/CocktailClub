import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import Cocktail from '../../components/cards/Cocktail';
import { getCocktailbyDrinkId } from '../../api/CocktailsApi';

export default function CocktailDetailPage() {
  const router = useRouter();
  const ref = useRef();
  const { idDrink } = router.query;
  const [cocktail, setCocktail] = useState({});

  const getCocktail = () => {
    getCocktailbyDrinkId(idDrink).then(setCocktail);
  };

  useEffect(() => {
    getCocktail();
  }, [ref.current, idDrink]);

  return (
    <div className="center">
      <Cocktail cocktail={cocktail} />
    </div>
  );
}
