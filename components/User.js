import PropTypes from 'prop-types';
import { useState } from 'react';
import Link from 'next/link';
import {
  Button,
  Card, CardBody, CardImg, CardTitle, Modal,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { deleteUser } from '../api/UsersApi';
import { signOut } from '../utils/auth';

export default function UserCard({ user }) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const deleteAccount = () => {
    deleteUser(user.id).then(() => {
      handleClose();
      router.push('/');
      signOut();
    });
  };

  return (
    <>
      <Card>
        <CardTitle>{user.username}</CardTitle>
        <CardBody>
          <CardImg src={user.imageUrl} />
          <p>{user.firstName} {user.lastName}</p>
          <p>{user.email}</p>
          <p>{user.bio}</p>
        </CardBody>
        <Link passHref href="/edituser">
          <Button>Edit</Button>
        </Link>
        <Button onClick={handleShow}>Delete</Button>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div>Are you sure you want to delete your account?</div>
          <Button onClick={deleteAccount}>Delete</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Modal.Body>
      </Modal>
    </>

  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
    bio: PropTypes.string,
    imageUrl: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};
