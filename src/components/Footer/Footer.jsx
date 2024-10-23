import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; 

const Footer = ({ pendingTasksCount, clearCompleted, hasCompletedTasks, setFilter }) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{pendingTasksCount}</strong> {pendingTasksCount === 1 ? 'item' : 'items'} left
      </span>
      <ul className="filters">
        <li>
          <Link to="/" className="filter-link-all" onClick={() => setFilter('all')}>
            All
          </Link>
        </li>
        <li>
          <Link to="/pending" className="filter-link" onClick={() => setFilter('pending')}>
            Pending
          </Link>
        </li>
        <li>
          <Link to="/completed" className="filter-link" onClick={() => setFilter('completed')}>
            Completed
          </Link>
        </li>
      </ul>
      {hasCompletedTasks && (
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default Footer;
