import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ListForm from '../../../components/ListForm';
import { getSingleList } from '../../../api/listData';

function EditList() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleList(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <ListForm obj={editItem} />
  );
}

export default EditList;
