import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Cocktail from '../components/cards/Cocktail';
import { getRandomCocktail } from '../api/CocktailsApi';

export default function Home() {
  const [randomCocktail, setRandomCocktail] = useState({});

  const setRandom = () => {
    getRandomCocktail().then(setRandomCocktail);
  };

  useEffect(() => {
    getRandomCocktail().then(setRandomCocktail);
    console.warn(randomCocktail);
  }, []);

  return (
    <>
      <Cocktail cocktail={randomCocktail} />

      <Button onClick={setRandom}>Refresh</Button>
    </>
  );
}
