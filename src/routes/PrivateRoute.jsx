import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import Dashboard from '../components/Admindashboard/dashboard';
import ActiveTrip from '../components/Admindashboard/Trips/activetrips';
import AddNewDriver from '../components/Admindashboard/Driver/addnewdriver';
import FareManagement from '../components/Admindashboard/FareManagement/faremanagement';
import AddNewVehicle from '../components/Admindashboard/Vehicle/addnewvehicle';
import ViewAllVehicle from '../components/Admindashboard/Vehicle/viewallvehicle';
import CompletedTrip from '../components/Admindashboard/Trips/completedtrips';
import BookingRequestTable from '../components/Admindashboard/Trips/BookingRequestTable';
import DriverList from '../components/Admindashboard/Driver/driverlist';
import AddFare from '../components/Admindashboard/FareManagement/addfare';
import RecentTrips from '../components/Admindashboard/Trips/recenttrips';
import RequestNewTrip from '../components/Admindashboard/Trips/requesttrip';
import PendingTrip from '../components/Admindashboard/Trips/pedingtrips';
import SuperAdminDashboard from '../components/SuperAdminDashboard/Dashboard/Dashboard';
import CompanyDetails from '../components/SuperAdminDashboard/CompanyDetails/companydetails';
import AddCompany from '../components/SuperAdminDashboard/CompanyDetails/AddCompany';


const PrivateRoute = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/companydetails" element={<CompanyDetails />} />
            <Route path="/add-company" element={<AddCompany />} />
            <Route path="/trips/recenttrips" element={<RecentTrips />} />
            <Route path="/trips/activetrips" element={<ActiveTrip />} />
            <Route path="/trips/requestnewtrip" element={<RequestNewTrip />} />
            <Route path="/trips/pendingtrips" element={<PendingTrip />} />
            <Route path="/trips/completetrips" element={<CompletedTrip />} />
            <Route path="/trips/requestbookings" element={<BookingRequestTable />} />
            <Route path="/driver/addnewdriver" element={<AddNewDriver />} />
            <Route path="/driver/listofdrivers" element={<DriverList />} />
            <Route path="/faremanagement" element={<FareManagement />} />
            <Route path="/addfare" element={<AddFare />} />
            <Route path="/vehicle/addnewvehicle" element={<AddNewVehicle />} />
            <Route path="/vehicle/viewallvehicle" element={<ViewAllVehicle />} />
            <Route path="/dashboard/superadmindashboard" element={<SuperAdminDashboard />} />
            <Route path='*' element={<Navigate to={"/dashboard"} />} />

        </Routes>
    );
};

export default PrivateRoute;    
