/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../utils/context/authContext';
import UserCard from '../components/cards/User';
import { getSingleUser } from '../api/UsersApi';
import { getPublicCocktails } from '../api/SavedCocktailsApi';
import SharedCocktail from '../components/cards/SharedCocktail';

function Share() {
  const { user, updateUser } = useAuth();
  const [appUser, setAppUser] = useState({});
  const [publicCocktails, setPublic] = useState([]);
  const ref = useRef();

  const getUser = () => {
    getSingleUser(user.id).then(setAppUser);
  };

  const getPublic = () => {
    getPublicCocktails().then(setPublic);
  };

  useEffect(() => {
    getUser();
    getPublic();
  }, [ref.current]);

  return (
    <div className="share-page">
      <div className="user-column">
        <UserCard user={appUser} updateUser={updateUser} />
      </div>
      <div className="post-column">
        <div className="d-flex justify-content-center">
          <h1 className="bi title">What other users are trying now</h1>
        </div>
        <div className="posts">
          {publicCocktails.map((cocktail) => (
            <SharedCocktail savedCocktail={cocktail} onUpdate={getPublic} key={cocktail.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Share;
