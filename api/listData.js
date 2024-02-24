import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getLists = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/lists.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// TODO: GET SINGLE LIST
const getSingleList = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/lists/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// TODO: CREATE BOOK
const createList = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/lists.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// TODO: UPDATE BOOK
const updateList = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/lists/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// TODO: DELETE BOOK
const deleteList = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/lists/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export {
  getLists,
  updateList,
  createList,
  getSingleList,
  deleteList,
};
