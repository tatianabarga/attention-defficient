import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ItemForm from '../../../components/ItemForm';
import { getSingleItem } from '../../../api/itemData';

function EditItem() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // TODO: grab the firebasekey
  const { firebaseKey } = router.query;

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    getSingleItem(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (
    <ItemForm obj={editItem} />
  );
}

export default EditItem;
