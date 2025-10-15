import { useState } from 'react'
export default function TaskForm({addTask}) {
 const [task, setTask ] = useState('');
 const [priority,setPriority ]=useState('medium');
 const[category, setCategory] = useState('general');
 const handleSubmit = (e) => {
    e.preventDefault();
    addTask({text: task, priority, category, completed: false});
  
    setTask('');
    setPriority("medium");
    setCategory("general");
}
    return(
            <form onSubmit={handleSubmit} id="task-form">
                  <div id="inp">
                    <input type='text' placeholder='enter the text'value={task}
                     onChange={(e)=> setTask(e.target.value)}/>
                   <button type="submit">Add task</button>
                  </div>
           
     <div id='btns'>
               <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="high">high</option>
                <option value="medium">medium</option>
                <option value="low">low</option>
               </select>
               <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="general">general</option>
                <option value = "work">work</option>
                <option value= "personal">personal</option>
               </select>
            </div>
         </form>
    )
}
