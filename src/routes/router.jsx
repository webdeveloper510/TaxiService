import React from 'react';
import { Router, Route, Routes } from 'react-router-dom';
import Login from "../components/Login/Login";
import MainPage from '../components/HomePage/Home';
import Dashboard from '../components/Admindashboard/dashboard';
import CompanyDetails from '../components/Admindashboard/CompanyDetails/companydetails';
import ActiveTrip from '../components/Admindashboard/Trips/activetrips';
import AddNewDriver from '../components/Admindashboard/Driver/addnewdriver';
import FareManagement from '../components/Admindashboard/FareManagement/faremanagement';
import AddNewVehicle from '../components/Admindashboard/Vehicle/addnewvehicle';
import CompletedTrip from '../components/Admindashboard/Trips/completedtrips';
import BookingRequestTable from '../components/Admindashboard/Trips/BookingRequestTable';
import DriverList from '../components/Admindashboard/Driver/driverlist';
import ViewAllVehicle from '../components/Admindashboard/Vehicle/viewallvehicle';



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
        <Route path="/trips/completetrips" element={<CompletedTrip />}/>
        <Route path="/trips/requestbookings" element={<BookingRequestTable/>}/>
        <Route path="/driver/addnewdriver" element={<AddNewDriver />}/>
        <Route path="/driver/listofdrivers" element={<DriverList/>}/>
        <Route path="/faremanagement" element={<FareManagement/>}/>
        <Route path="/vehicle/addnewvehicle" element={<AddNewVehicle/>}/>
        <Route path="/vehicle/viewallvehicle" element={<ViewAllVehicle/>}/>
        
      </Routes>
      {/* {!isLoginPage || Dashboard && <Footer />} */}
    </>
  );
};

  export default Routerpage;