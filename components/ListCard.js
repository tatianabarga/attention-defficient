import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { deleteItem, getItemsByList } from '../api/itemData';
import { deleteList } from '../api/listData';

function ListCard({ listObj, onUpdate }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItemsByList(listObj.firebaseKey).then(setItems);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteThisList = () => {
    if (window.confirm(`Delete ${listObj.label}?`)) {
      const promiseArray = items.map((item) => deleteItem(item.firebaseKey));
      Promise.all(promiseArray)
        .then(deleteList(listObj.firebaseKey))
        .then(() => onUpdate());
    }
  };

  return (
    <Card className="card">
      <Card.Body>
        <Card.Title style={{ color: '#F1FFFA', fontWeight: '400', borderColor: '#F1FFFA' }}>
          {listObj.label}
        </Card.Title>
        {
          items.map((item) => (
            <p
              style={{ color: '#96A6A0', textDecoration: item.done ? 'line-through' : 'none' }}
              key={item.firebaseKey}
              value={item.firebaseKey}
            >
              {item.label}
            </p>
          ))
        }
        <Link href="/items/new" key={listObj.firebaseKey} value={listObj.firebaseKey} passHref>
          <Button className="add-btn">
            Add an Item
          </Button>
        </Link>
        <br />
        <Link href={`/lists/edit/${listObj.firebaseKey}`} passHref>
          <Button
            className="btns-gen"
            style={{ backgroundColor: '#3E9F95' }}
            variant="info"
          >
            EDIT
          </Button>
        </Link>
        <Link href={`/lists/${listObj.firebaseKey}`} passHref>
          <Button
            className="btns-gen"
            style={{ backgroundColor: '#3E9F95' }}
            variant="info"
          >
            VIEW
          </Button>
        </Link>
        <Button
          className="btns-gen"
          style={{ backgroundColor: '#FE4A4A' }}
          onClick={deleteThisList}
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
