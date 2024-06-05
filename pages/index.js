import { useEffect, useState } from 'react';
import { Button, Card, CardBody } from 'react-bootstrap';
import { getRandomCocktail } from '../api/CocktailsApi';

export default function Home() {
  const [randomCocktail, setRandomCocktail] = useState({});

  const setRandom = () => {
    getRandomCocktail().then((resp) => {
      setRandomCocktail(resp);
    });
  };

  useEffect(() => {
    setRandom();
    console.warn(randomCocktail);
  }, []);

  return (
    <>
      <Card>
        <CardBody>
          <p>{randomCocktail[0]?.strDrink}</p>
          <p>{randomCocktail[0]?.strGlass}</p>
          <div className="measures">
            <div className="amounts">
              {randomCocktail.amounts?.map((item) => <div>{item}</div>)}
            </div>
            <div className="ingredients">
              {randomCocktail.ingredients?.map((item) => <div>{item}</div>)}
            </div>
          </div>
          <p>{randomCocktail[0]?.strInstructions}</p>
        </CardBody>
      </Card>
      <Button onClick={setRandom}>Refresh</Button>
    </>
  );
}
