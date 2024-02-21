import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { createList, updateList } from '../api/listData';

const initialState = {
  label: '',
};

function ListForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateList(formInput).then(() => router.push(`/lists/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createList(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateList(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} List</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="List Label" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a name for this list"
          name="label"
          value={formInput.label}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} List</Button>
    </Form>
  );
}

ListForm.propTypes = {
  obj: PropTypes.shape({
    label: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

ListForm.defaultProps = {
  obj: initialState,
};

export default ListForm;
