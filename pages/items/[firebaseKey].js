/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleItem } from '../../api/itemData';
import ItemCard from '../../components/ItemCard';

export default function ViewItem() {
  const [item, setItem] = useState([]);
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleItem(firebaseKey).then(setItem);
  }, [firebaseKey]);

  return (
    <ItemCard key={firebaseKey} itemObj={item} />
  );
}
