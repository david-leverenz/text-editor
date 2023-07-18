import { openDB } from 'idb';

// Creates the database inside of the idb if it doesn't already exist.
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// This writes to the database, gives it an id of 1 and stores it in the key "value".
export const putDb = async (content) => {
	const jateDB = await openDB('jate', 1);
	const tx = jateDB.transaction('jate', 'readwrite');
	const store = tx.objectStore('jate');
	const request = store.put({ id: 1, value: content });
	const result = await request;
	console.log(result);
};

// TODO: Add logic for a method that gets all the content from the database
// Reads the data inside of the idb.
export const getDb = async () => {
  console.log('GET all from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
