import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getItemsByList } from '../api/itemData';
import { deleteList } from '../api/listData';

function ListCard({ listObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  const deleteThisList = () => {
    if (window.confirm(`Delete ${listObj.label}?`)) {
      deleteList(listObj.firebaseKey).then(() => onUpdate());
    }
  };

  const [items, setItems] = useState([]);

  useEffect(() => {
    getItemsByList(listObj.firebaseKey).then(setItems);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{listObj.label}</Card.Title>
        {
          items.map((item) => (
            <p
              key={item.firebaseKey}
              value={item.firebaseKey}
            >
              {item.label}
            </p>
          ))
        }
        <Link href="/items/new" key={listObj.firebaseKey} value={listObj.firebaseKey} passHref>
          <Button>
            Add an Item
          </Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE LIST DETAILS  */}
        <Link href={`/lists/edit/${listObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Link href={`/lists/${listObj.firebaseKey}`} passHref>
          <Button variant="info">VIEW</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisList} className="m-2">
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
