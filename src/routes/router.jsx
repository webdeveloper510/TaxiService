import React from 'react';
import { Router, Route, Routes } from 'react-router-dom';
import Login from "../components/Login/Login";
import MainPage from '../components/HomePage/Home';
import Dashboard from '../components/Admindashboard/dashboard';
import CompanyDetails from '../components/Admindashboard/companydetails';
import ActiveTrip from '../components/Admindashboard/Trips/activetrips';

const Routerpage = () => {
  //const location = useLocation();

  // Check if the current location is not the login page
 // const isLoginPage = location.pathname === '/login';

  return (
    <>
      {/* {!isLoginPage || Dashboard  && <Header />} */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/" element={<Dashboard />}/>
        <Route path="/companydetails/" element={<CompanyDetails />}/>
        <Route path="/trips/activetrips" element={<ActiveTrip />}/>
      </Routes>
      {/* {!isLoginPage || Dashboard && <Footer />} */}
    </>
  );
};

  export default Routerpage;