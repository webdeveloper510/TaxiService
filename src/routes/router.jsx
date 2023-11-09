import React from 'react';
import { Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from "../components/Login/Login";
import MainPage from '../components/HomePage/Home';

import PrivateRoute from './PrivateRoute';

const Routerpage = () => {


  
  return (
    <>
     
      <Routes>
        {/* <Route path="/" element={auth()} />
        <Route path="/login" element={<Login />} /> */}
        <Route path="/*" element={<PrivateRoute />} />
        {/* <Route path='*' element={<Navigate to={"/login"}/> }/> */}

      </Routes>
     
    </>
  );
};

export default Routerpage;