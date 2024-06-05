import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchInput, setSearchInput] = useState({});

  const handleChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  const handleSubmit = () => {
    onSearch(searchInput);
  };

  return (
    <Form>
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        name="search"
        onChange={handleChange}
      />
      <Button onClick={handleSubmit}>Search</Button>
    </Form>

  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
