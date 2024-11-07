import "./App.css";
import React from "react";
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
      <div className="header">
        <h1 className="heading">
          {!user? <h1 className="heading">To-Do App</h1> 
          : <div className="header ">
            <h1 className="heading">To-Do App</h1> 
            <img src="todo.png" alt="To-Do App Logo" className="header-image" />
        </div>
        }
        </h1>
        {!user ? 
        (
          <button className="sign-in-btn" onClick={signInWithGoogle}>Sign In with Google</button>
        )
        :
        <button className="sign-in-btn" onClick={() => auth.signOut()}>Sign Out</button>
        }
      </div>

      {!user ? (
        <div className="landing-page">
          <div className="landing-content">
            <img src="image.jpg" alt="To-Do App Logo" className="landing-image" /> {/* Replace with a relevant image */}
            <div className="text-content">
              <h2>Welcome to the To-Do App!</h2>
              <p className="p1">
                This is your personal to-do list where you can manage tasks efficiently. 
                Get started by signing in with your Google account and start adding your to-dos today!
              </p>
              <p className="p2">
                Whether it's work, personal goals, or daily chores, this app helps you stay organized and productive. 
                Track your progress, set reminders, and mark your tasks as complete when you're done.
              </p>
              <p className="p3">
                Your to-do list is synced across devices, so you can access it anytime, anywhere. 
                Get started now and take control of your day!
              </p>
            </div>
          </div>
          
        </div>
      ) : (
        <div>
          
          
          <div className="marg">
            <AddTodo userId={user.uid} /> 
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
