import './App.css';
import { Login } from './components/Login';
import { AnaEkran } from './components/AnaEkran'; // AnaEkran bileşenini import edin
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { useRef, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Giriş durumunu takip etmek için state ekledik

  return (
   
      // <Routes>
      //   <Route path="/" element={
      //     isLoggedIn ? <Navigate to="/anaekran" /> : <Login setIsLoggedIn={setIsLoggedIn} /> 
      //   } />
      //   <Route path="/anaekran" element={
      //     isLoggedIn ? <AnaEkran /> : <Navigate to="/" />
      //   } />
      // </Routes>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/AnaEkran' element={<AnaEkran/>} />
      </Routes>
   
  );
}

export default App;

