import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "../src/components/NavBar" // Ensure this path is correct based on your project structure
import HomePage from "./pages/HomePage"; // Ensure this path is correct based on your project structure
import LoginPage from "./pages/LoginPage"; // Ensure this path is correct based on your project
import RegisterPage from "./pages/RegisterPage"; // Ensure this path is correct based on your project structure
import CategoryList from "../src/components/categoryList"; // Ensure this path is correct based on your project
import QuestionList from "../src/components/questionList";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/category" element={<CategoryList />} />
          {/* Add more routes as needed */}
          
          {/* Redirect any unknown routes to the home page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;