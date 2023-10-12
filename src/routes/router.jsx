import React from 'react';
import { Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from "../components/Login/Login";
import MainPage from '../components/HomePage/Home';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/footer';

  const Routerpage = () => {
    const location = useLocation();
  
    // Check if the current location is not the login page
    const isLoginPage = location.pathname === '/login';
  
    return (
      <>
        {!isLoginPage && <Header />}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        {!isLoginPage && <Footer />}
      </>
    ); 
  }
  
  export default Routerpage;