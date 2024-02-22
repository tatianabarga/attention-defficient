/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ItemCard from '../../components/itemCard';
import { getSingleItem } from '../../api/itemData';
// import { Button } from 'react-bootstrap';

export default function ViewItem() {
  const [item, setItem] = useState([]);
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    getSingleItem(firebaseKey).then(setItem);
  }, [firebaseKey]);

  return (
    <ItemCard key={item.firebaseKey} itemObj={item} />
  );
}
