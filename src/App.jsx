<import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList/TaskList.jsx';
import Header from './components/Header/Header';
import TaskInput from './components/TaskInput/TaskInput';
import Footer from './components/Footer/Footer';  
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('mydayapp-reactjs') || '[]');
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('mydayapp-reactjs', JSON.stringify(tasks));
  }, [tasks]);


  const addTask = (title) => {
    setTasks([...tasks, { id: Date.now().toString(), title, completed: false }]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const editTask = (id, newTitle) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, title: newTitle } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const pendingTasks = tasks.filter(task => !task.completed);
  const hasCompletedTasks = tasks.some(task => task.completed);

  return (
    <Router>
      <div className="todoapp">
        <Header />
        <div className="main-content">
          <TaskInput addTask={addTask} />
          
          {tasks.length > 0 && (
            <main id="main">
              <Routes>
                <Route path="/" element={
                  <TaskList
                    tasks={filteredTasks}
                    toggleTask={toggleTask}
                    editTask={editTask}
                    deleteTask={deleteTask}
                  />
                } />
                <Route path="/pending" element={
                  <TaskList
                    tasks={filteredTasks.filter(task => !task.completed)}
                    toggleTask={toggleTask}
                    editTask={editTask}
                    deleteTask={deleteTask}
                  />
                } />
                <Route path="/completed" element={
                  <TaskList
                    tasks={filteredTasks.filter(task => task.completed)}
                    toggleTask={toggleTask}
                    editTask={editTask}
                    deleteTask={deleteTask}
                  />
                } />
              </Routes>
            </main>
          )}
          
          {tasks.length > 0 && (
            <Footer
              pendingTasksCount={pendingTasks.length}
              clearCompleted={clearCompleted}
              hasCompletedTasks={hasCompletedTasks}
              setFilter={setFilter}
            />
          )}
        </div>
      </div>
    </Router>
  );
};

export default App;
