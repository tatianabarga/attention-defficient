import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { deleteItem } from '../api/itemData';

export default function ItemCard({ itemObj }) {
  const router = useRouter();

  const onUpdate = () => {
    router.push('/');
  };

  const deleteThisItem = () => {
    if (window.confirm(`Delete ${itemObj.label}?`)) {
      deleteItem(itemObj.firebaseKey).then(() => onUpdate());
    }
  };

  let status = 'The status for this item has not been set.';

  if (itemObj.notStarted) {
    status = 'Not Started';
  } else if (itemObj.inProgress) {
    status = 'In Progress';
  } else if (itemObj.done) {
    status = 'Done!';
  }

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{itemObj.label}</Card.Title>
        <p>
          {status}
        </p>
        <Link href={`/items/edit/${itemObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisItem} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

ItemCard.propTypes = {
  itemObj: PropTypes.shape({
    label: PropTypes.string,
    firebaseKey: PropTypes.string,
    notStarted: PropTypes.bool,
    inProgress: PropTypes.bool,
    done: PropTypes.bool,
  }).isRequired,
};
