import { Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import getSpirits from '../../api/SpiritsApi';
import { getCocktailsBySpirit } from '../../api/CocktailsApi';
import Cocktail from '../cards/Cocktail';

export default function SpiritSelect() {
  const [spirits, setSpirits] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    getSpirits().then(setSpirits);
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    // setFormInput(value);
    getCocktailsBySpirit(value).then(setResults);
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-3">
          <Form.Select
            aria-label="spirit-select"
            name="spirit"
            onChange={handleChange}
            value="spirit"
          >
            <option value="">Spirit</option>
            {
          spirits.map((spirit) => (
            <option
              key={spirit.id}
              value={spirit.name}
            >
              {spirit.name}
            </option>
          ))
          }
          </Form.Select>
        </Form.Group>
      </Form>
      <div>
        {results.map((cocktail) => (<Cocktail cocktail={cocktail} key={cocktail.idDrink} />))};
      </div>
    </>

  );
}
