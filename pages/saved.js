import { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { getSavedCocktails } from '../api/SavedCocktailsApi';
import { useAuth } from '../utils/context/authContext';
import SavedCocktail from '../components/cards/SavedCocktail';

export default function SavedCocktails() {
  const [savedCocktails, setSavedCocktails] = useState([]);
  const { user } = useAuth();

  const getCocktails = () => {
    getSavedCocktails(user.id).then(setSavedCocktails);
  };

  useEffect(() => {
    getCocktails();
  }, []);

  return (
    <>
      <Tabs
        defaultActiveKey="unmade"
        id="made-unmade"
        className="mb-3 caprasimo"
      >
        <Tab eventKey="unmade" title="To try">
          <div className="list">
            {savedCocktails.unmadeCocktails?.map((cocktail) => (
              <SavedCocktail savedCocktail={cocktail} key={cocktail.id} onUpdate={getCocktails} />
            ))}
          </div>
        </Tab>
        <Tab eventKey="made" title="Made">
          <div className="list">
            {savedCocktails.madeCocktails?.map((cocktail) => (
              <SavedCocktail savedCocktail={cocktail} key={cocktail.id} onUpdate={getCocktails} />
            ))}
          </div>
        </Tab>
      </Tabs>
    </>
  );
}
