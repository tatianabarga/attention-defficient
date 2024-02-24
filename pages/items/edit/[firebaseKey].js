import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ItemForm from '../../../components/ItemForm';
import { getSingleItem } from '../../../api/itemData';

function EditItem() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleItem(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <ItemForm obj={editItem} />
  );
}

export default EditItem;
