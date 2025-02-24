/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BasicExample from './componenti/BasicExample.jsx';//index.js'; 
import Professori from './componenti/Professori.jsx';//index.js';
import Ordinari from './componenti/Ordinari.jsx';//index.js';
import Associato from './componenti/Associato.jsx';
import Ricercatori from './componenti/Ricercatori.jsx';//index.js';
import Home from './componenti/Home.jsx';//index.js';
import Corsi from './componenti/Corsi.jsx';
import './App.css';  



const App = () => {
  return (
    <>
      <BasicExample></BasicExample>
      <Router>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/professori" element={<Professori />} />
          <Route path="/ordinari" element={<Ordinari />} />
          <Route path="/associati" element={<Associato />} />
          <Route path="/ricercatori" element={<Ricercatori />} />
          <Route path="/corsi" element={<Corsi/>}/>
        </Routes>
      </Router>
    </>
  );
};

export default App;