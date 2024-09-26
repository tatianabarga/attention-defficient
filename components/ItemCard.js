import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
// eslint-disable-next-line import/no-extraneous-dependencies
import useSound from 'use-sound';
import { deleteItem } from '../api/itemData';
import woodSfx from '../utils/sounds/wood.mp3';

export default function ItemCard({ itemObj }) {
  const [soundWood] = useSound(woodSfx);
  const router = useRouter();

  const onUpdate = () => {
    router.push(`/lists/${itemObj.listId}`);
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
    <Card className="card">
      <Card.Body>
        <Card.Title style={{ color: '#F1FFFA' }}>
          {itemObj.label}
        </Card.Title>
        <p style={{ color: '#96A6A0' }}>
          {status}
        </p>
        <Link href={`/items/edit/${itemObj.firebaseKey}`} passHref>
          <Button
            className="btns-gen"
            variant="info"
            onClick={soundWood}
          >
            EDIT
          </Button>
        </Link>
        <Button
          className="dlt-btn"
          variant="danger"
          onClick={() => {
            soundWood();
            deleteThisItem();
          }}
        >
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
    listId: PropTypes.string,
  }).isRequired,
};
