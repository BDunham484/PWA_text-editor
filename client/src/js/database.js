import { openDB } from 'idb';
import 'regenerator-runtime/runtime';
//function to initialize database
const initdb = async () => 
  console.log("initdb has been run")
  //create new database named jate_db v.1
  openDB('jate_db', 1, {
    //add database schema if not already initialized
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      //create new object store for data and give it a key name of 'id which will increment automatically
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  })

// TODO: Add logic to a method that accepts some content and adds it to the database
//export function used to edit db
export const putDb = async (content) => {
  console.log('PUT to the database');
  //create a connection to the jate database and the version we want to use
  const contactDb = await openDB('jate_db', 1);
  //create new transaction and specify the store and data privileges
  const tx = contactDb.transaction('jate', 'readwrite');
  //open up the desired object store
  const store = tx.objectStore('jate');
  //use the .put() method to updat data in the database
  const request = store.put({content});
  //get confirmation of the request
  const result = await request;
  console.log('🚀 - data saved to the database', result)
};

// TODO: Add logic for a method that gets all the content from the database
//export function to get data from database
export const getDb = async () => {
  console.log('GET from the database');
  // Create a connection to the IndexedDB database and the version we want to use.
  const contactDb = await openDB('jate_db', 1);
  // Create a new transaction and specify the store and data privileges.
  const tx = contactDb.transaction('jate', 'readonly');
  // Open up the desired object store.
  const store = tx.objectStore('jate');
  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();
  // Get confirmation of the request.
  const result = await request;
  //get an array of content values from the result
  const values = result.map(function(item) {
      return item['content']
    })
  //get index of the last value in the values array
  const index = ((result.length)-1)
  //get the last value stored in the array
  const finalResult = values[index];
  console.log(finalResult)
  //return last value stored in array
  return finalResult;
};

//initdb() call
initdb();
