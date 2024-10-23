import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import "./TaskItem.css";


const TaskItem = ({ task, toggleTask, editTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current.focus();
    }
  }, [isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editedTitle.trim()) {
      editTask(task.id, editedTitle.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsEditing(false);
      setEditedTitle(task.title);
    }
  };

  return (
    <li className={`todo-item ${task.completed ? "completed" : ""}`}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />
        <label onDoubleClick={() => setIsEditing(true)}>{task.title}</label>
        <button
          className="destroy"
          onClick={() => deleteTask(task.id)}
          aria-label="Delete"
        ><FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      {isEditing && (
        <form onSubmit={handleSubmit}>
          <input
            ref={editInputRef}
            className="edit"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleSubmit}
            onKeyDown={handleKeyDown}
          />
        </form>
      )}
    </li>
  );
};

export default TaskItem;
