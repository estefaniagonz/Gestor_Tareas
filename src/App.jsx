import React from "react";
import Header from './components/Header/Header'; 
import TaskInput from "./components/TaskInput/TaskInput";
import ('./App.css')

const App = () => {

    const addTask = (title) => {
        const newTask = {
          id: Date.now().toString(),
          title: title,
          completed: false
        };
        setTasks([...tasks, newTask]);
      };


    return (
        <div className="app-container">
            <Header/>
        <main className="main-content">
            <TaskInput addTask={addTask} />
        </main>
        </div>
)};


export default App; 
