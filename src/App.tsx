import React from 'react';
import {Routes, Route} from "react-router-dom"
import MainPage from './pages/MainPage';
import "./App.css"
import CurrentCoinPage from './pages/CurrentCoinPage';
// import styles  from "./App.module.scss"



function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage/>}></Route>
      <Route path="/coins/:id" element={<CurrentCoinPage/>}></Route>
    </Routes>
  );
}

export default App;
