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
      reviewCocktail(payload).then(router.push(`/savedcocktails/${savedCocktail.id}`));
    } else {
      reviewCocktail(formData).then(router.push(`/savedcocktails/${savedCocktail.id}`));
    }
  };

  return (
    <div className="center">
      <h1 className="shrikhand">Review {savedCocktail.name}</h1>
      <Form style={{ width: '60%' }} onSubmit={handleSubmit}>
        <Form.Group className="mt-3 mb-3">
          <Form.Label className="shrikhand">Grade</Form.Label>
          <Form.Control
            type="text"
            placeholder="ex. A-"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="shrikhand">Notes</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            placeholder="Describe your experience"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save review
        </Button>
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
