
import {collection,addDoc,getDocs,serverTimestamp,} from "firebase/firestore";
import { db } from "../firebaseConfig";

// Reference to the todos collection
const todosCollection = collection(db, "todos");

// TODO 1: Save a todo to Firestore
export async function addTodo(title) {
  await addDoc(todosCollection, {
    title: title,
    completed: false,
    createdAt: serverTimestamp(),
  });
}

// TODO 2: Read all todos from Firestore
export async function fetchTodos() {

  // Get all documents from the collection
  const snapshot = await getDocs(todosCollection);

  // Convert documents into an array
  const todos = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Return the todos
  return todos;
};