import "./App.css";
import React from "react";
import Title from "./components/Title";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import { signInWithGoogle, auth } from "./auth.js"; 
import { collection, query, where, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [todos, setTodos] = React.useState([]);
  const [user, setUser] = React.useState(null);

  // Check if a user is authenticated
  React.useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setUser(user); // Set the user if authenticated
    });
  
    return () => unsubscribeAuth(); // Clean up the subscription
  }, []);

  // Fetch to-dos for the authenticated user only
  React.useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "todos"),
        where("userId", "==", user.uid) // Filter todos by the current user's UID
      );
      const unsub = onSnapshot(q, (querySnapshot) => {
        let todosArray = [];
        querySnapshot.forEach((doc) => {
          todosArray.push({ ...doc.data(), id: doc.id });
        });
        setTodos(todosArray);
        console.log(todosArray);
      });
    
      return () => unsub();
    }
  }, [user]); // This effect runs every time the user state changes

  const handleEdit = async (todo, title) => {
    await updateDoc(doc(db, "todos", todo.id), { title: title });
  };

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className="App">
      <h1>To-Do App</h1>

      {!user ? (
        <button onClick={signInWithGoogle}>Sign In with Google</button>
      ) : (
        <div>
          <button onClick={() => auth.signOut()}>Sign Out</button>
          <div>
            <Title />
          </div>
          <div>
            <AddTodo userId={user.uid} /> {/* Pass userId to AddTodo */}
          </div>
          <div className="todo_container">
            {todos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
