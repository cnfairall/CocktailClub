import PropTypes from 'prop-types';
import {
  Card, CardBody, CardImg, CardTitle,
} from 'react-bootstrap';

export default function UserCard({ user }) {
  return (
    <Card>
      <CardTitle>{user.username}</CardTitle>
      <CardBody>
        <CardImg src={user.imageUrl} />
        <p>{user.firstName} {user.lastName}</p>
        <p>{user.email}</p>
        <p>{user.bio}</p>
      </CardBody>
    </Card>
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
