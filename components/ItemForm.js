import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { createItem, updateItem } from '../api/itemData';
import { useAuth } from '../utils/context/authContext';
import { getLists } from '../api/listData';

const initialState = {
  label: '',
  listId: '',
  notStarted: true,
  inProgress: false,
  done: false,
};

function ItemForm({ obj }) {
  const [formInput, setFormInput] = useState({ ...initialState, ...obj });
  const router = useRouter();
  const { user } = useAuth();
  const [lists, setLists] = useState([]);

  useEffect(() => {
    setFormInput({ ...initialState, ...obj });
  }, [obj]);

  useEffect(() => {
    getLists(user.uid).then(setLists);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      updateItem(formInput).then(() => router.push(`/items/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createItem(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateItem(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  const handleChangeCheck = (e) => {
    const { value } = e.target;
    if (value === '1') {
      formInput.notStarted = true;
      formInput.inProgress = false;
      formInput.done = false;
    } else if (value === '2') {
      formInput.notStarted = false;
      formInput.inProgress = true;
      formInput.done = false;
    } else if (value === '3') {
      formInput.notStarted = false;
      formInput.inProgress = false;
      formInput.done = true;
    }
  };

  return (
    <Form
      className="form"
      onSubmit={handleSubmit}
    >
      <h2
        style={{
          fontSize: 'large',
          color: '#F1FFFA',
          fontWeight: '400',
        }}
        className="text-white mt-5"
      >
        {obj.firebaseKey ? 'Update' : 'Create'} Item
      </h2>

      <FloatingLabel
        style={{ color: '#96A6A0', backgroundColor: '#132029' }}
        controlId="floatingTextarea"
        label="Item Label"
        className="mb-3"
      >
        <Form.Control
          style={{
            color: '#96A6A0',
            backgroundColor: '#132029',
            border: 'none',
            justifyItems: 'center',
          }}
          as="textarea"
          placeholder="Enter a Label"
          name="label"
          value={formInput.label}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Form.Select
        style={{
          color: '#96A6A0',
          backgroundColor: '#132029',
          border: 'none',
          justifyItems: 'center',
        }}
        aria-label="List"
        name="listId"
        onChange={handleChange}
        className="mb-3"
        value={formInput.listId}
        required
      >
        <option value="">Select a List</option>
        {
          lists.map((list) => (
            <option
              key={list.firebaseKey}
              value={list.firebaseKey}
            >
              {list.label}
            </option>
          ))
        }
      </Form.Select>

      <ToggleButtonGroup
        defaultValue={1}
        style={{ margin: '8px' }}
        type="radio"
        name="options"
        className="mb-2"
      >
        <ToggleButton
          className="toggle-btn"
          id="tbg-radio-1"
          value={1}
          onChange={handleChangeCheck}
        >
          Not Started
        </ToggleButton>
        <ToggleButton
          className="toggle-btn"
          id="tbg-radio-2"
          value={2}
          onChange={handleChangeCheck}
        >
          In Progress
        </ToggleButton>
        <ToggleButton
          className="toggle-btn"
          id="tbg-radio-3"
          value={3}
          onChange={handleChangeCheck}
        >
          Done
        </ToggleButton>
      </ToggleButtonGroup>

      <Button
        className="toggle-btn"
        type="submit"
      >
        {obj.firebaseKey ? 'Update' : 'Create'} Item
      </Button>
    </Form>
  );
}

ItemForm.propTypes = {
  obj: PropTypes.shape({
    label: PropTypes.string,
    notStarted: PropTypes.bool,
    inProgress: PropTypes.bool,
    done: PropTypes.bool,
    firebaseKey: PropTypes.string,
    listId: PropTypes.string,
    uid: PropTypes.string,
  }),
};

ItemForm.defaultProps = {
  obj: initialState,
};

export default ItemForm;
