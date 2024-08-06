import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function SearchBar({ onSearch }) {
  const handleChange = (e) => {
    onSearch(e.target.value.toLowerCase());
  };

  return (
    <Form className="search-input">
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        name="search"
        onChange={handleChange}
      />
    </Form>

  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
