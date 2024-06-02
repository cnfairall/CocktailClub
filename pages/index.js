/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useAuth } from '../utils/context/authContext';
import UserCard from '../components/cards/User';

function Home() {
  const { user } = useAuth();

  return (
    <UserCard user={user} />
  );
}
export default Home;
