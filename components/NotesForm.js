import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createNote, updateNote } from '../api/noteData';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  label: '',
};

export default function NotesForm({ obj }) {
  const [formInput, setFormInput] = useState({ ...initialState, ...obj });
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(formInput);
    const payload = { ...formInput, uid: user.uid };
    createNote(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateNote(patchPayload);
    });
  };

  return (
    <Form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          style={{
            color: '#96A6A0',
            backgroundColor: '#132029',
            border: 'none',
            justifyItems: 'center',
          }}
          type="text"
          name="label"
          value={formInput.label}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button className="btns-gen" style={{ backgroundColor: '#AF60FF' }} type="submit">Add Thought</Button>
    </Form>
  );
}

NotesForm.propTypes = {
  obj: PropTypes.shape({
    label: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }),
};

NotesForm.defaultProps = {
  obj: initialState,
};
