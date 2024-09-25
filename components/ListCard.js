import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
// eslint-disable-next-line import/no-extraneous-dependencies
import useSound from 'use-sound';
import {
  createItem,
  deleteItem,
  getItemsByList,
  updateItem,
} from '../api/itemData';
import { deleteList } from '../api/listData';
import { useAuth } from '../utils/context/authContext';
import woodSfx from '../utils/sounds/wood.mp3';

function ListCard({ listObj, onUpdate }) {
  const [soundWood] = useSound(woodSfx);
  const [items, setItems] = useState([]);
  // const [filteredItems, setFilteredItems] = useState;
  const [editingItemKey, setEditingItemKey] = useState(null);
  const [editItemLabel, setEditItemLabel] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getItemsByList(listObj.firebaseKey).then(setItems);
  }, [onUpdate, listObj.firebaseKey]);

  const deleteThisList = () => {
    if (window.confirm(`Delete ${listObj.label}?`)) {
      const promiseArray = items.map((item) => deleteItem(item.firebaseKey));
      Promise.all(promiseArray)
        .then(() => deleteList(listObj.firebaseKey))
        .then(() => onUpdate());
    }
  };

  const addItem = (listKey) => {
    const payload = {
      done: false,
      inProgress: false,
      label: 'click to change',
      listId: listKey,
      notStarted: true,
      uid: user.uid,
    };
    createItem(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateItem(patchPayload).then(() => {
        onUpdate();
      });
    });
  };

  const handleEdit = (itemKey, label) => {
    setEditingItemKey(itemKey);
    setEditItemLabel(label);
  };

  const handleEditChange = (e) => {
    setEditItemLabel(e.target.value);
  };

  const handleEditSubmit = (itemKey) => {
    const patchPayload = { firebaseKey: itemKey, label: editItemLabel };
    updateItem(patchPayload).then(() => {
      setEditingItemKey(null);
      onUpdate();
    });
  };

  const editItem = () => {
    router.push(`/items/edit/${editingItemKey}`);
  };

  return (
    <Card className="card">
      <Card.Body>
        <Card.Title style={{ color: '#F1FFFA', fontWeight: '400', borderColor: '#F1FFFA' }}>
          {listObj.label}
        </Card.Title>
        {items.map((item) => (
          <div key={item.firebaseKey}>
            {editingItemKey === item.firebaseKey ? (
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <input
                  style={{
                    color: '#fff1fa',
                    backgroundColor: '#34424A',
                    border: 'solid',
                    borderColor: '#fff1fa',
                    borderRadius: '10px',
                  }}
                  type="text"
                  value={editItemLabel}
                  onChange={handleEditChange}
                />
                <Button
                  className="btns-gen"
                  onClick={() => {
                    handleEditSubmit(item.firebaseKey);
                    soundWood();
                  }}
                >
                  SAVE
                </Button>
                <Button
                  className="btns-gen"
                  onClick={() => {
                    editItem();
                    soundWood();
                  }}
                >
                  EDIT
                </Button>
              </div>
            ) : (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
              <p
                className="item"
                style={{ textDecoration: item.done ? 'line-through' : 'none' }}
                onClick={() => {
                  handleEdit(item.firebaseKey, item.label);
                  soundWood();
                }}
              >
                {item.label}
              </p>
            )}
          </div>
        ))}
        <Button
          className="add-btn"
          onClick={() => {
            addItem(listObj.firebaseKey);
            soundWood();
          }}
        >
          Add an Item
        </Button>
        <br />
        <Link href={`/lists/edit/${listObj.firebaseKey}`} passHref>
          <Button
            className="btns-gen"
            variant="info"
            onClick={soundWood}
          >
            EDIT
          </Button>
        </Link>
        <Link href={`/lists/${listObj.firebaseKey}`} passHref>
          <Button
            className="btns-gen"
            variant="info"
            onClick={soundWood}
          >
            VIEW
          </Button>
        </Link>
        <Button
          className="dlt-btn"
          onClick={() => {
            soundWood();
            deleteThisList();
          }}
        >
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

ListCard.propTypes = {
  listObj: PropTypes.shape({
    label: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ListCard;
