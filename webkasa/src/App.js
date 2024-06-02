import './App.css';
import { Login } from './components/Login';
import { AnaEkran } from './components/AnaEkran'; 
import { Routes, Route } from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/anaekran" element={<AnaEkran />} />
      </Routes>
    </div>
   
  );
}

export default App;
