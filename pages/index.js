import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Card } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getLists } from '../api/listData';
import ListCard from '../components/ListCard';

function Home() {
  const [lists, setLists] = useState([]);
  const { user } = useAuth();

  const getAllTheLists = () => {
    getLists(user.uid).then(setLists);
  };

  useEffect(() => {
    getAllTheLists();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }} className="text-center my-4">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
        className="d-flex flex-wrap"
      >
        <></>
        {lists.map((list) => (
          <ListCard key={list.firebaseKey} listObj={list} onUpdate={getAllTheLists} />
        ))}
        <Card className="card">
          <Card.Body style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Link href="/lists/new" passHref>
              <Button className="add-btn" style={{ color: '#F1FFFA' }}>
                Add A List
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Home;
