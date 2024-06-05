import { useState } from 'react';
import {
  getCocktailByName,
  // getCocktailbyDrinkId, getCocktailsByGlass, getCocktailsBySpirit,
} from '../api/CocktailsApi';
import Cocktail from '../components/cards/Cocktail';
import SearchBar from '../components/forms/SearchBar';
import SpiritSelect from '../components/forms/SpiritSelect';

export default function Search() {
  const [cocktailArray, setCocktailArray] = useState([]);

  const getName = (query) => {
    if (query) {
      getCocktailByName(query).then(setCocktailArray);
    }
  };

  return (
    <>
      <SearchBar onSearch={getName} />
      <SpiritSelect />
      <div>
        {cocktailArray.slice(0, 10).map((cocktail) => (<Cocktail cocktail={cocktail} key={cocktail.idDrink} />))}
      </div>
    </>
  );
}
