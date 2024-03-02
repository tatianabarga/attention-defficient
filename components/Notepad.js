import React, { useEffect, useState } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { deleteNote, getNotes } from '../api/noteData';
import NotesForm from './NotesForm';
import { useAuth } from '../utils/context/authContext';

export default function Notepad() {
  const [notes, setNotes] = useState([]);
  const [formState, setFormState] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getNotes(user.uid).then(setNotes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showBlank = () => {
    setFormState(true);
  };

  const onUpdate = () => {
    router.push('/');
  };

  const clearNotepad = () => {
    if (window.confirm('Delete all stray thoughts?')) {
      const promiseArray = notes.map((note) => deleteNote(note.firebaseKey));
      console.log(promiseArray);
      Promise.all(promiseArray)
        .then(() => onUpdate());
    }
  };

  return (
    <Card className="form" style={{ borderWidth: '10px', borderColor: '#34424A' }}>
      <h2 style={{ color: '#F1FFFA', fontWeight: '400', fontSize: 'x-large' }}>Stray Thoughts</h2>
      <ListGroup>
        {/* map over notes here */}
        {
          notes.map((note) => (
            <div
              className="note-item"
              key={note.firebaseKey}
              value={note.firebaseKey}
            >
              {note.label}
              {/* <Button className="tiny-btn">X</Button> */}
            </div>
          ))
        }
      </ListGroup>
      {formState && <NotesForm />}
      <Button className="add-btn" onClick={showBlank}>
        Add a Thought
      </Button>
      <Button
        className="btns-gen"
        style={{ backgroundColor: '#AF60FF' }}
        onClick={clearNotepad}
      >
        Clear Notepad
      </Button>
    </Card>
  );
}
