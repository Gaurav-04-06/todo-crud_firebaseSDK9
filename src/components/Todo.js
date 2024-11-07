import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Todo({ todo, toggleComplete, handleDelete, handleEdit }) {
  const [newTitle, setNewTitle] = React.useState(todo.title);
  const [isEditing, setIsEditing] = React.useState(false);

  // Handle input change
  const handleChange = (e) => {
    setNewTitle(e.target.value);
  };

  // Toggle edit mode and save changes
  const handleSaveEdit = () => {
    if (newTitle.trim() === "") {
      alert("Title cannot be empty!");
      return;
    }
    handleEdit(todo, newTitle); // Pass the updated title
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div className="todo">
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={handleChange}
          className="list"
        />
      ) : (
        <span
          style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          className="list"
        >
          {todo.title}
        </span>
      )}

      <div className="todo-buttons">
        <button
          className="button-complete"
          onClick={() => toggleComplete(todo)}
        >
          <CheckCircleIcon id="i" />
        </button>

        {isEditing ? (
          <button className="button-save" onClick={handleSaveEdit}>
            Save
          </button>
        ) : (
          <button
            className="button-edit"
            onClick={() => setIsEditing(true)}
          >
            <EditIcon id="i" />
          </button>
        )}

        <button className="button-delete" onClick={() => handleDelete(todo.id)}>
          <DeleteIcon id="i" />
        </button>
      </div>
    </div>
  );
}
