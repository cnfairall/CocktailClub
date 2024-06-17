import React from 'react';
import Image, { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center caprasimo"
      style={{
        height: '90vh',
        padding: '30px',
        margin: '0 auto',
        zIndex: 1,
        minHeight: '25rem',
        width: '100%',
        minWidth: '30rem',
        paddingBlock: '0 5rem',
      }}
    >
      <Image src="/images/shaker.gif" alt="Cocktail Club logo with shaker animation" />
      <Button style={{ width: '150px' }} type="button" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
