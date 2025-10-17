import { useState } from 'react';
export default function TaskForm({ addTask }) {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('general');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim() || !dueDate) {
      alert('Please enter both task and due date!');
      return;
    }
    addTask({
      text: task,
      priority,
      category,
      dueDate,
      completed: false,
    });
    setTask('');
    setPriority('medium');
    setCategory('general');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      {/* Top input row */}
      <div className="task-input-card">
        <div className="top-row">
          <input
            type="text"
            placeholder="Enter your task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="task-input"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="date-input"
          />
        </div>

        {/* Bottom row */}
        <div className="bottom-row">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="priority-select"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
            <option value="general">General</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
          </select>

          <button type="submit" className="add-btn">
            ➕ Add Task
          </button>
        </div>
      </div>
    </form>
  );
}
