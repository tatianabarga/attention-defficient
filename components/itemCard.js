import PropTypes from 'prop-types';
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
// import Link from 'next/link';
// import { deleteList } from '../api/listData';

function ItemCard({ itemObj }) {
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  // const deleteThisBook = () => {
  //   if (window.confirm(`Delete ${bookObj.title}?`)) {
  //     deleteBook(bookObj.firebaseKey).then(() => onUpdate());
  //   }
  // };

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
        {/* DYNAMIC LINK TO EDIT THE LIST DETAILS  */}
        <Link href={`/items/edit/${itemObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        {/* <Button variant="danger" onClick={deleteThisBook} className="m-2">
          DELETE
        </Button> */}
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
  // onUpdate: PropTypes.func.isRequired,
};

export default ItemCard;
