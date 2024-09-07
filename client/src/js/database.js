import { openDB } from 'idb';

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
export const putDb = async (content) => {
  try {
    const idb = await openDB('jate', 1);
    const ta = idb.transaction('jate', 'readwrite');
    const store = ta.objectStore('jate');
    const request = store.add({ value: content });
    const result = await request;
    console.log('Data saved to the database', result);
  } catch (error) {
    console.error('putDb not implemented:', error);
  };
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const idb = await openDB('jate', 1);
    const ta = idb.transaction('jate', 'readonly');
    const store = ta.objectStore('jate');
    const request = store.getAll();
    const result = await request;
    console.log('result.value', result);
    return result;
  } catch (error) {
    console.error('getDb not implemented:', error);
  };
};

initdb();
