import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase.js";

const AddTodo = ({ userId, signOut }) => {
  const [title, setTitle] = useState("");

  const handleAddTodo = async (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      alert("Please enter a title for the todo!");
      return;
    }

    try {
      // Add new todo with userId to ensure each user has their own todos
      await addDoc(collection(db, "todos"), {
        title: title,
        completed: false,
        userId: userId,  // Make sure this is being passed properly
      });

      setTitle("");  // Reset the title input after adding the todo
    } catch (error) {
      console.error("Error adding to-do:", error);  // This will print the detailed error
      alert("An error occurred while adding the to-do.");  // Display a user-friendly error message
    }
  };

  return (
    <div>
      

      {/* Form to add a new Todo */}
      
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit">Add Todo</button>
      </form>
      
    </div>
  );
};

export default AddTodo;
