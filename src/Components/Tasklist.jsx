import React from 'react'
export default function Tasklist({tasks, updateTask , deleteTask}) {
  const toggleComplete = (index) => {
    const updatedTask = {...tasks[index], completed: !tasks[index].completed};
    updateTask(updatedTask, index);
  };
  
    return (
        <div>
            <ul>
                {tasks.map((task,index)=> (
                    <li key = {index}>
                        <div>
                          <span> {task.text}</span> 
                            <small> ({task.priority}, {task.category})
                            </small>
                        </div>
                        <div>
                            <button onClick={() => toggleComplete(index)}> {task.completed ? "undo": "complete"}</button>
                            <button onClick = {()=>deleteTask(index)}>deleted</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}