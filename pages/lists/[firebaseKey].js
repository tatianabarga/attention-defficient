/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link';
import { Button, Card } from 'react-bootstrap';
import viewListDetails from '../../api/mergeData';
import { getItemsByList } from '../../api/itemData';
import ItemCard from '../../components/ItemCard';

export default function ViewList() {
  const [listDetails, setListDetails] = useState({});
  const [items, setItems] = useState([]);
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewListDetails(firebaseKey).then(setListDetails);
  }, [firebaseKey]);

  useEffect(() => {
    getItemsByList(firebaseKey).then((data) => { setItems(data); });
  }, [firebaseKey]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }} className="mt-5 d-flex flex-wrap">
      <h4 style={{ color: '#f1fffa' }}>
        {listDetails.label}
      </h4>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
        className="text-white ms-5 details"
      >
        {
          items.map((item) => (
            <ItemCard
              key={item.firebaseKey}
              itemObj={item}
            />
          ))
        }
        <Card style={{
          width: '18rem',
          margin: '10px',
          backgroundColor: '#34424A',
          borderRadius: '10px',
        }}
        >
          <Card.Body style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Link href="/items/new" key={listDetails.firebaseKey} value={listDetails.firebaseKey} passHref>
              <Button
                className="add-btn"
                style={{ color: '#F1FFFA' }}
              >
                Add an Item
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
