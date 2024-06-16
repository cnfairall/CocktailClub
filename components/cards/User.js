import PropTypes from 'prop-types';
import { useState } from 'react';
import Link from 'next/link';
import {
  Button,
  Card, CardBody, CardImg, Modal,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { deleteUser } from '../../api/UsersApi';
import { signOut } from '../../utils/auth';

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
      <Card style={{ width: '15rem' }}>
        <CardBody className="column">
          <CardImg src={user?.imageUrl} />
          <h2 className="title">{user?.username}</h2>
          <p>{user?.firstName} {user?.lastName}</p>
          <p>{user?.email}</p>
          <p>{user?.bio}</p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <Link passHref href="/edituser">
              <Button style={{ marginBottom: '10px' }}>Edit</Button>
            </Link>
            <Button onClick={handleShow}>Delete</Button>
          </div>
        </CardBody>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div>Are you sure you want to delete your account?</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <Button onClick={deleteAccount}>Delete</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </div>
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
