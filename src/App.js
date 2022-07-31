import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import CreateUserForm from './components/CreateUserForm';
import useToken from './components/useToken';


function App() {

  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-user" element={<CreateUserForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
