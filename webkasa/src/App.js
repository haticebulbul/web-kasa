import './App.css';
import { Login } from './components/Login';
import { AnaEkran } from './components/AnaEkran'; 
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import PaymentScreen from './components/PaymentScreen';
import  Settings  from './components/Settings';
import { SaleScreen } from './components/SaleScreen';
import { Product } from './components/Product';
function App() {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/anaekran" element={<AnaEkran />} />
        <Route path="/paymentscreen" element={<PaymentScreen />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/salescreen" element={<SaleScreen />} />
        <Route path="/products" element={<Product />} />

      </Routes>
    </div>
   
  );
}

export default App;
