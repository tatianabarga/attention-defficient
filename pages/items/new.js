import React from 'react';
import { useRouter } from 'next/router';
import ItemForm from '../../components/ItemForm';

export default function AddItem() {
  const router = useRouter();
  const { listId } = router.query;

  return <ItemForm listId={listId} />;
}
