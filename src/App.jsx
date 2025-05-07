import React from 'react';
import { Routes, Route } from 'react-router-dom';
/* import Login from './Pages/Login/Login'; */
/* import Register from './Pages/Register/Register'; */
import Home from './Pages/Home/Home';
import ListaDocentes from './Components/ListaDocentes/ListaDocentes';
import './App.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/docentes" element={<ListaDocentes />} />

      
    
    </Routes>
  );
};

export default App;
