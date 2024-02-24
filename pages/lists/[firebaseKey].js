/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link';
import { Button } from 'react-bootstrap';
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
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-white ms-5 details">
        <h5>
          {listDetails.label}
        </h5>
        {
          items.map((item) => (
            <ItemCard
              key={item.firebaseKey}
              itemObj={item}
            />
          ))
        }
      </div>
      <Link href="/items/new" key={listDetails.firebaseKey} value={listDetails.firebaseKey} passHref>
        <Button>
          Add an Item
        </Button>
      </Link>
    </div>
  );
}
