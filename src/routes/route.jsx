import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Login from "../components/Login/Login";
import MainPage from '../components/HomePage/Main';

const Routing =()=>{
    return(
     <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainPage />} />
      </Routes>      
    )
  }
  
  export default Routing;