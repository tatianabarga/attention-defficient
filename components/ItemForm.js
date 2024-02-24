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
  const [selectedStatus, setSelectedStatus] = useState([]);
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
    setSelectedStatus((prevSelectedStatus) => {
      const newSelectedStatus = new Set(prevSelectedStatus);
      if (newSelectedStatus.has(value)) {
        newSelectedStatus.delete(value);
      } else {
        newSelectedStatus.add(value);
      }
      const updatedStatus = Array.from(newSelectedStatus);
      return updatedStatus;
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Item</h2>

      <FloatingLabel controlId="floatingTextarea" label="Item Label" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Enter a Label"
          style={{ height: '100px' }}
          name="label"
          value={formInput.label}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* List SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="List">
        <Form.Select
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
      </FloatingLabel>

      {/* STATUS SELECT  */}
      <ToggleButtonGroup type="checkbox" className="mb-2">
        <ToggleButton id="tbg-check-1" value="1" onChange={handleChangeCheck} checked={selectedStatus.includes('1')}>
          Not Started
        </ToggleButton>
        <ToggleButton id="tbg-check-2" value="2" onChange={handleChangeCheck} checked={selectedStatus.includes('2')}>
          In Progress
        </ToggleButton>
        <ToggleButton id="tbg-check-3" value="3" onChange={handleChangeCheck} checked={selectedStatus.includes('3')}>
          Done
        </ToggleButton>
      </ToggleButtonGroup>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Item</Button>
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
