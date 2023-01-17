import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import './styles/App.css';
import Details from './components/Details/Details';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import Create from './components/CreateActivity/Create';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/details/:id" element={<Details />} />
        <Route exact path='/home/create' element={<Create/>} />
      </Routes>
    </Router>
  );
}

export default App;
