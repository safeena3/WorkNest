
import React, { useState } from "react";

export default function Tasklist({ tasks, updateTask, deleteTask }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editTaskData, setEditTaskData] = useState({});

  const startEditing = (task, index) => {
    setEditingIndex(index);
    setEditTaskData(task);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditTaskData({});
  };

  const saveEditing = (index) => {
    updateTask(editTaskData, index);
    setEditingIndex(null);
  };

  const toggleComplete = (index) => {
    const updatedTask = { ...tasks[index], completed: !tasks[index].completed };
    updateTask(updatedTask, index);
  };

  const isOverdue = (dueDate) => {
    const today = new Date().toISOString().split("T")[0];
    return dueDate < today;
  };

  return (
    <ul>
      {tasks.map((task, index) => (
        <li
          key={index}
          style={{
            color: isOverdue(task.dueDate) && !task.completed ? "red" : "black",
          }}
          className="task-item"
        >
          {editingIndex === index ? (
            <div className="edit-form">
              <input
                type="text"
                value={editTaskData.text}
                onChange={(e) =>
                  setEditTaskData({ ...editTaskData, text: e.target.value })
                }
              />
              <input
                type="date"
                value={editTaskData.dueDate}
                onChange={(e) =>
                  setEditTaskData({ ...editTaskData, dueDate: e.target.value })
                }
              />
              <select
                value={editTaskData.priority}
                onChange={(e) =>
                  setEditTaskData({ ...editTaskData, priority: e.target.value })
                }
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <select
                value={editTaskData.category}
                onChange={(e) =>
                  setEditTaskData({ ...editTaskData, category: e.target.value })
                }
              >
                <option value="general">General</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
              </select>

              <button onClick={() => saveEditing(index)}>Save</button>
              <button onClick={cancelEditing}>Cancel</button>
            </div>
          ) : (
            <>
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
                onClick={() => toggleComplete(index)}
                title="Click to toggle complete"
              >
                {task.text}
              </span>
              <small>{task.dueDate}</small>
              <small>{task.priority}</small>
              <small>{task.category}</small>
              <div className="btn-group">
                <button onClick={() => startEditing(task, index)}>Edit</button>
                <button onClick={() => deleteTask(index)}>Delete</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
