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
  const [buttonText, setButtonText] = useState([]);

  const showBlank = () => {
    setFormState(!formState);
  };

  const onUpdate = () => {
    showBlank();
    router.push('/');
  };

  useEffect(() => {
    getNotes(user.uid).then(setNotes);
    if (!formState) {
      setButtonText('Add a Thought');
    } else if (formState) {
      setButtonText('close blank');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onUpdate]);

  const clearNotepad = () => {
    if (window.confirm('Delete all stray thoughts?')) {
      const promiseArray = notes.map((note) => deleteNote(note.firebaseKey));
      Promise.all(promiseArray)
        .then(() => onUpdate());
    }
  };

  return (
    <Card className="form" style={{ borderWidth: '10px', borderColor: '#34424A', width: '240px' }}>
      <h2 style={{ color: '#F1FFFA', fontWeight: '400', fontSize: 'x-large' }}>Stray Thoughts</h2>
      <ListGroup>
        {
          notes.map((note) => (
            <div
              className="note-item"
              key={note.firebaseKey}
              value={note.firebaseKey}
            >
              {note.label}
            </div>
          ))
        }
      </ListGroup>
      {formState && <NotesForm />}
      <Button className="add-btn" onClick={showBlank}>
        {buttonText}
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
