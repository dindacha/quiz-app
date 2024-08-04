
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import Quiz from './Components/Quiz';

function App() {
  return (

    <Router>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
    </Router>
  );
}

export default App;
