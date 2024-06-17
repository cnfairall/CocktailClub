/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import UserCard from '../components/cards/User';
import { getSingleUser } from '../api/UsersApi';
import { getPublicCocktails } from '../api/SavedCocktailsApi';
import SharedCocktail from '../components/cards/SharedCocktail';

function Share() {
  const { user, updateUser } = useAuth();
  const [appUser, setAppUser] = useState({});
  const [publicCocktails, setPublic] = useState([]);

  const getUser = () => {
    getSingleUser(user.id).then(setAppUser);
  };

  const getPublic = () => {
    getPublicCocktails().then(setPublic);
  };

  useEffect(() => {
    getUser();
    getPublic();
  }, []);

  return (
    <div style={{
      display: 'flex', flexDirection: 'row', justifyItems: 'space-evenly', justifyContent: 'space-evenly',
    }}
    >
      <div className="column" style={{ width: '20%' }}>
        <UserCard user={appUser} updateUser={updateUser} />
      </div>
      <div className="column">
        <h1 style={{ marginLeft: '15px' }} className="title">The buzz is</h1>
        {publicCocktails.map((cocktail) => (
          <SharedCocktail savedCocktail={cocktail} onUpdate={getPublic} />
        ))}
      </div>
    </div>
  );
}
export default Share;
