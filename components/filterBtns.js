import { Button } from 'bootstrap';
import React from 'react';

export default function filterBtns() {
  return (
    <div>
      <Button>Not Started</Button>
      <Button>In Progress</Button>
      <Button>Done</Button>
    </div>
  );
}
