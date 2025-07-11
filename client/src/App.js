import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import TodoList from './components/Home';
import Login from './components/login';
import Contact from './components/contact';
import CreateAccount from './components/createAccount'; // Ensure the import path is correct
import QandA from "./components/QA"; // Import the QandA component
import './App.css'; // Import your App.css for global styles

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(''); // State to hold the username

  // Function to handle user login
  const handleLogin = (user) => {
    setIsAuthenticated(true); // Set authentication state to true
    setUsername(user); // Set the logged in user's username
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Clear authentication state
    setUsername(''); // Clear username on logout
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} username={username} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login setIsAuthenticated={handleLogin} setUsername={setUsername} />} />
        <Route path="/movies" element={isAuthenticated ? <TodoList /> : <Navigate to="/" />} />
        <Route path="/home" element={isAuthenticated ? <TodoList /> : <Navigate to="/" />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/create-account" element={<CreateAccount />} /> {/* Create Account page */}
        <Route path="/qa" element={isAuthenticated ? <QandA /> : <Navigate to="/" />} /> {/* Q&A page */}
        
        {/* Optional - if you want a specific login route */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login setIsAuthenticated={handleLogin} setUsername={setUsername} />} />
      </Routes>
    </Router>
  );
};

export default App;