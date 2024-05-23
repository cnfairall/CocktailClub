/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { checkUser } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import RegisterForm from '../components/RegisterForm';
import { getCocktailDetails } from '../api/extDbData';

function Home() {
  const { user } = useAuth();
  const [authUser, setAuthUser] = useState({});

  useEffect(() => {
    checkUser(user.uid).then(setAuthUser);
    getCocktailDetails(17180).then(console.log);
  }, []);

  const onUpdate = () => {
    checkUser(user.uid).then((data) => {
      setAuthUser(data);
    });
  };

  if (authUser.uid === user.uid) {
    return <Card>hi</Card>;
  }

  return <RegisterForm user={user} updateUser={onUpdate} />;
}

export default Home;
