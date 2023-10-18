import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import Dashboard from '../components/Admindashboard/dashboard';
import CompanyDetails from '../components/Admindashboard/CompanyDetails/companydetails';
import ActiveTrip from '../components/Admindashboard/Trips/activetrips';
import AddNewDriver from '../components/Admindashboard/Driver/addnewdriver';
import FareManagement from '../components/Admindashboard/FareManagement/faremanagement';
import AddNewVehicle from '../components/Admindashboard/Vehicle/addnewvehicle';
import CompletedTrip from '../components/Admindashboard/Trips/completedtrips';
import BookingRequestTable from '../components/Admindashboard/Trips/BookingRequestTable';

const PrivateRoute = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/companydetails" element={<CompanyDetails />} />
            <Route path="/trips/activetrips" element={<ActiveTrip />} />
            <Route path="/trips/completetrips" element={<CompletedTrip />} />
            <Route path="/trips/requestbookings" element={<BookingRequestTable />} />
            <Route path="/driver/addnewdriver" element={<AddNewDriver />} />
            <Route path="/faremanagement" element={<FareManagement />} />
            <Route path="/vehicle/addnewvehicle" element={<AddNewVehicle />} />
            <Route path='*' element={<Navigate to={"/dashboard"} />} />

        </Routes>
    );
};

export default PrivateRoute;
