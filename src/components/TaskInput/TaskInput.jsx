import React,{useState} from "react";
import ('./TaskInput.css')

const TaskInput = ({addTask})=>{
    const [title, setTitle] = useState ('');

    const handleSubmit =(e)=>{
        e.preventDefault();
        if (title.trim()){
            addTask(title.trim());
            setTitle ('');
        }

    };

    return (
        <form  className="form"onSubmit={handleSubmit}>
          <input
            className="new-todo"
            placeholder="Type new todo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        </form>
      );
};


export default TaskInput; 

