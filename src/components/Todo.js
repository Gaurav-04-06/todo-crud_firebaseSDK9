// Todo.js
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Todo({ todo, toggleComplete, handleDelete, handleEdit }) {
  const [newTitle, setNewTitle] = React.useState(todo.title);

  const handleChange = (e) => {
    e.preventDefault();
    setNewTitle(e.target.value); // Update newTitle when editing
  };

  return (
    <div className="todo">
      <input
        style={{ textDecoration: todo.completed && "line-through" }} // Strikethrough if completed
        type="text"
        value={todo.title} // Always reflect the correct title
        className="list"
        onChange={handleChange}
      />
      <div>
        <button
          className="button-complete"
          onClick={() => toggleComplete(todo)} // Toggle completed status
        >
          <CheckCircleIcon id="i" />
        </button>
        <button
          className="button-edit"
          onClick={() => handleEdit(todo, newTitle)} // Pass the newTitle for editing
        >
          <EditIcon id="i" />
        </button>
        <button
          className="button-delete"
          onClick={() => handleDelete(todo.id)} // Delete the to-do
        >
          <DeleteIcon id="i" />
        </button>
      </div>
    </div>
  );
}
