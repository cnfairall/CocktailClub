import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { reviewCocktail } from '../../api/SavedCocktailsApi';

function ReviewForm({ savedCocktail }) {
  const [formData, setFormData] = useState({
    notes: '',
    grade: '',
    savedCocktailId: savedCocktail.id,
  });

  const router = useRouter();

  useEffect(() => {
    if (savedCocktail.made === true) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        savedCocktailId: savedCocktail.id,
        notes: savedCocktail.notes || '',
        grade: savedCocktail.grade || '',
      }));
    }
  }, [savedCocktail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (savedCocktail.made === false) {
      const payload = {
        ...formData,
        made: true,
        savedCocktailId: savedCocktail.id,
      };
      reviewCocktail(payload).then(router.push('/saved'));
    } else {
      reviewCocktail(formData).then(router.push('/saved'));
    }
  };

  return (
    <div className="flex-wrap d-flex flex-column justify-content-center align-content-center">
      <h1 className="title">Review {savedCocktail.name}</h1>
      <Form style={{ width: '60%' }} onSubmit={handleSubmit}>
        <Form.Group className="mt-3 mb-3">
          <Form.Label className="caprasimo">Grade</Form.Label>
          <Form.Control
            type="text"
            placeholder="ex. A-"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="caprasimo">Notes</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            placeholder="Describe your experience"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </Form.Group>
        <div className="d-flex justify-content-center mt-5">
          <Button variant="primary" type="submit">
            Save review
          </Button>
        </div>
      </Form>
    </div>
  );
}

ReviewForm.propTypes = {
  savedCocktail: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    notes: PropTypes.string,
    grade: PropTypes.string,
    made: PropTypes.bool,
  }).isRequired,
};

export default ReviewForm;
