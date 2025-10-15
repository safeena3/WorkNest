import { useEffect, useState } from 'react'

import TaskForm from './Components/TaskForm'
import Tasklist from './Components/Tasklist'
import ProgressTracker from './Components/ProgressTracker'

export default function App() {

const [tasks, settasks] = useState([]);

useEffect(()=> {
   localStorage.setItem("tasks", JSON.stringify(tasks));
});
  const addTask = (task) => {
    settasks([...tasks,task]);
  }

  const updateTask = (updatedTask, index) => {
    const newtask = [...tasks];
    newtask[index] = updatedTask;
    settasks(newtask);
  }

  const deleteTask = (index) => {
     settasks(tasks.filter((_,i) => i != index));
  }

  const clearTask = () => {
    settasks([]);
  }
  return (
      <div className = 'App'>
        <header>
        <h1>Work Nest</h1>
        <p>Your lovely Task Manager</p>
        </header>
          <TaskForm addTask={addTask}/>
          <Tasklist tasks = {tasks} 
          updateTask = {updateTask}
          deleteTask = {deleteTask}/>
          <ProgressTracker tasks = {tasks}/>
         {tasks.length>0 && (<button onClick={clearTask}>Clear all</button>)}
        </div>
      ) }


     