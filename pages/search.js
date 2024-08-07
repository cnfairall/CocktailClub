import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import {
  getCocktailByName, getCocktailsByGlass, getCocktailsBySpirit,
} from '../api/CocktailsApi';
import Cocktail from '../components/cards/Cocktail';
import SearchBar from '../components/forms/SearchBar';
import getSpirits from '../api/SpiritsApi';
import getGlasses from '../api/GlassesApi';

export default function Search() {
  const [none, setNone] = useState(false);
  const [spirits, setSpirits] = useState([]);
  const [glasses, setGlasses] = useState([]);
  const [results, setResults] = useState([]);
  const [formInput, setFormInput] = useState('');

  useEffect(() => {
    getSpirits().then(setSpirits);
    getGlasses().then(setGlasses);
  }, []);

  const handleSpiritChange = (e) => {
    const { value } = e.target;
    setFormInput(value);
    getCocktailsBySpirit(value).then((resp) => {
      if (resp === 'no cocktails found') {
        setNone(true);
      } else {
        setNone(false);
        setResults(resp);
      }
    });
  };

  const handleGlassChange = (e) => {
    const { value } = e.target;
    setFormInput(value);
    const array = value.split(' ');
    const name = array[0];
    getCocktailsByGlass(name).then((resp) => {
      if (resp === 'no cocktails found') {
        setNone(true);
      } else {
        setNone(false);
        setResults(resp);
      }
    });
  };

  const getName = (query) => {
    if (query) {
      getCocktailByName(query).then((resp) => {
        if (resp === 'no cocktails found') {
          setNone(true);
        } else {
          setNone(false);
          setResults(resp);
        }
      });
    }
  };

  return (
    <div className="search-page">
      <div className="d-flex justify-content-center">
        <h1 className="bi title">Find a new cocktail</h1>
      </div>
      <div className="search">
        <SearchBar onSearch={getName} />
        <Form className="search-input">
          <Form.Group className="mb-3">
            <Form.Select
              aria-label="spirit-select"
              name="spirit"
              onChange={handleSpiritChange}
              value={formInput}
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
        <Form className="search-input">
          <Form.Group className="mb-3">
            <Form.Select
              aria-label="glass-select"
              name="glass"
              onChange={handleGlassChange}
              value={formInput}
            >
              <option value="">Glass</option>
              {
          glasses.map((glass) => (
            <option
              key={glass.id}
              value={glass.name}
            >
              {glass.name}
            </option>
          ))
          }
            </Form.Select>
          </Form.Group>
        </Form>
      </div>
      <div className="results">
        {none ? ('No results found') : (
          results?.map((cocktail) => (<Cocktail cocktail={cocktail} key={cocktail.idDrink} />))
        )}
      </div>
    </div>
  );
}
