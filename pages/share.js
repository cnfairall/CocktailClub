/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import UserCard from '../components/cards/User';
import { getSingleUser } from '../api/UsersApi';

function Share() {
  const { user, updateUser } = useAuth();
  const [appUser, setAppUser] = useState();

  useEffect(() => {
    getSingleUser(user.id).then(setAppUser);
  }, []);

  return (
    <UserCard user={appUser} updateUser={updateUser} />
  );
}
export default Share;
