import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ListForm from '../../../components/ListForm';
import { getSingleList } from '../../../api/listData';

function EditBook() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // TODO: grab the firebasekey
  const { firebaseKey } = router.query;

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    getSingleList(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (
    <ListForm obj={editItem} />
  );
}

export default EditBook;
