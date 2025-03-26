import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Sell from './components/Sell';
import Buy from './components/Buy';
import Animals from './components/animals';
import Logout from './components/Logout';
import Livestock from './components/Livestock';

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar with links */}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/animals" element={<Animals />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/livestocks"element={<Livestock/>}/>
        
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
