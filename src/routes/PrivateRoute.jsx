import React, { useContext, useState } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import Dashboard from '../components/Admindashboard/dashboard';
import ActiveTrip from '../components/Admindashboard/Trips/activetrips';
import FareManagement from '../components/Admindashboard/FareManagement/faremanagement';
import ViewAllVehicle from '../components/Admindashboard/Vehicle/viewallvehicle';
import CompletedTrip from '../components/Admindashboard/Trips/completedtrips';
import BookingRequestTable from '../components/Admindashboard/Trips/BookingRequestTable';
import DriverList from '../components/Admindashboard/Driver/driverlist';
import RecentTrips from '../components/Admindashboard/Trips/recenttrips';
import RequestNewTrip from '../components/Admindashboard/Trips/requesttrip';
import PendingTrip from '../components/Admindashboard/Trips/pedingtrips';
import SuperAdminDashboard from '../components/SuperAdminDashboard/Dashboard/Dashboard';
import CompanyDetails from '../components/SuperAdminDashboard/CompanyDetails/companydetails';
import AddCompany from '../components/SuperAdminDashboard/CompanyDetails/AddCompany';
import AddNewDriver from '../components/SuperAdminDashboard/Drivers/addnewdriver';
import ListOfDrivers from '../components/SuperAdminDashboard/Drivers/ListOfDrivers';
import AddSuperVehicle from '../components/SuperAdminDashboard/Vehicles/addnewvehicle';
import LisOfVehicles from '../components/SuperAdminDashboard/Vehicles/listofvehicles';
import AddFare from '../components/SuperAdminDashboard/Fares/addfare';
import ListOfFares from '../components/SuperAdminDashboard/Fares/fareslisting';
import { getProfile } from '../utils/api';
import userContext from '../utils/context';
import SecureSuperRoleRoute from '../utils/SecureSuperRoleRoute';
import SecureSubRoleRoute from '../utils/SecureSubRoleRoute';


const PrivateRoute = () => {


    return (
        <Routes>
            <Route path="/dashboard" element={
                <SecureSubRoleRoute>
                    <Dashboard />
                </SecureSubRoleRoute>
            } />
            <Route path="/trips/recenttrips" element={<SecureSubRoleRoute>
                <RecentTrips />
            </SecureSubRoleRoute>} />
            <Route path="/trips/activetrips" element={<SecureSubRoleRoute>
                <ActiveTrip />
            </SecureSubRoleRoute>} />
            <Route path="/trips/requestnewtrip" element={<SecureSubRoleRoute>
                <RequestNewTrip />
            </SecureSubRoleRoute>} />
            <Route path="/trips/pendingtrips" element={<SecureSubRoleRoute>
                <PendingTrip />
            </SecureSubRoleRoute>} />
            <Route path="/trips/completetrips" element={<SecureSubRoleRoute>
                <CompletedTrip />
            </SecureSubRoleRoute>} />
            <Route path="/trips/requestbookings" element={<SecureSubRoleRoute>
                <BookingRequestTable />
            </SecureSubRoleRoute>} />
            <Route path="/driver/listofdrivers" element={<SecureSubRoleRoute>
                <DriverList />
            </SecureSubRoleRoute>} />
            <Route path="/faremanagement" element={<SecureSubRoleRoute>
                <FareManagement />
            </SecureSubRoleRoute>} />
            <Route path="/vehicle/viewallvehicle" element={<SecureSubRoleRoute>
                <ViewAllVehicle />
            </SecureSubRoleRoute>} />
            <Route path="/superadmindashboard/dashboard" element={
                <SecureSuperRoleRoute>
                    <SuperAdminDashboard />
                </SecureSuperRoleRoute>
            } />
            <Route path="/superadmindashboard/companydetails" element={
                <SecureSuperRoleRoute>
                    <CompanyDetails />
                </SecureSuperRoleRoute>
            } />
            <Route path="/superadmindashboard/add-company" element={
                <SecureSuperRoleRoute>
                    <AddCompany />
                </SecureSuperRoleRoute>
            } />
            <Route path="/superadmindashboard/edit-company/:companyId" element={<SecureSuperRoleRoute>
                <AddCompany />
            </SecureSuperRoleRoute>} />
            <Route path="/superadmindashboard/driver/addnewdriver" element={<SecureSuperRoleRoute>
                <AddNewDriver />
            </SecureSuperRoleRoute>} />
            <Route path="/superadmindashboard/driver/listofdrivers" element={<SecureSuperRoleRoute>
                <ListOfDrivers />
            </SecureSuperRoleRoute>} />
            <Route path="/superadmindashboard/vehicle/addnewvehicle" element={<SecureSuperRoleRoute>
                <AddSuperVehicle />
            </SecureSuperRoleRoute>} />
            <Route path="/superadmindashboard/vehicle/listofvehicles" element={<SecureSuperRoleRoute>
                <LisOfVehicles />
            </SecureSuperRoleRoute>} />
            <Route path="/superadmindashboard/fare/addfare" element={<SecureSuperRoleRoute>
                <AddFare />
            </SecureSuperRoleRoute>} />
            <Route path="/superadmindashboard/fare/listoffares" element={<SecureSuperRoleRoute>
                <ListOfFares />
            </SecureSuperRoleRoute>} />
            {/* <Route path='*' element={<Navigate to={"/dashboard"} />} /> */}
        </Routes>
    );
};

export default PrivateRoute;    
