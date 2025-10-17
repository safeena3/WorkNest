import { useEffect, useState } from "react";
import TaskForm from "./Components/TaskForm";
import Tasklist from "./Components/Tasklist";
import ProgressTracker from "./Components/ProgressTracker";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);
  const [tasks, settasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // Apply dark/light mode
  useEffect(() => {
    document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Save tasks in local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // === Reminder Feature ===
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    const checkReminders = setInterval(() => {
      const now = new Date();

      tasks.forEach((task) => {
        if (!task.completed && task.dueDate) {
          const taskDate = new Date(task.dueDate);
          const diff = taskDate - now;

          // Reminder 1 hour before deadline
          if (diff > 0 && diff < 60 * 60 * 1000) {
            new Notification("⏰ Task Reminder", {
              body: `Your task "${task.text}" is due soon!`,
            });
          }
        }
      });
    }, 60 * 1000); // check every minute

    return () => clearInterval(checkReminders);
  }, [tasks]);

  // === CRUD Functions ===
  const addTask = (task) => {
    settasks([...tasks, task]);
  };

  const updateTask = (updatedTask, index) => {
    const newtask = [...tasks];
    newtask[index] = updatedTask;
    settasks(newtask);
  };

  const deleteTask = (index) => {
    settasks(tasks.filter((_, i) => i !== index));
  };

  const clearTask = () => {
    settasks([]);
  };

  // === Filtering Logic ===
  const filteredTasks = tasks.filter((task) => {
    const matchesCategory =
      filterCategory === "all" || task.category === filterCategory;
    const matchesSearch = task.text
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // === Progress Tracker ===
  const completedTasks = tasks.filter((t) => t.completed).length;
  const progress = tasks.length ? (completedTasks / tasks.length) * 100 : 0;

  // === Date Display ===
  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={darkMode ? 'theme-dark' : 'theme-light'}>
    <div className="App">
      <header>
        <h1>WorkNest</h1>
        <p className="tagline">Work with WorkNest</p>
        <p className="date">{currentDate}</p>
         <button className="theme-toggle" onClick={toggleTheme}>
            {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
      </header>

      {/* Add Task */}
      <TaskForm addTask={addTask} />

      {/* Search & Filter Section */}
      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="general">General</option>
        </select>
      </div>

      {/* Task List */}
      <Tasklist
        tasks={filteredTasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />

      {/* Progress Tracker */}
      <ProgressTracker tasks={tasks}/>

      {/* Clear All Button */}
      {tasks.length > 0 && (
        <button className="clear-btn" onClick={clearTask}>
          Clear All
        </button>
      )}
    </div>
    </div>
  );
}
