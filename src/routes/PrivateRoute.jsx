import React from 'react';
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


const PrivateRoute = () => {
    // const token = localStorage.getItem('token');
    // console.log('token: from local storage' + token);
    // getProfile().then(res => {
    //     console.log(res, 'profile data')
    //     if (res?.code === 200) {
          
    //     }else{
    //         return <Navigate to="/login" />;
    //     }
    //   })
    // if (!token) {
    //     return <Navigate to="/login" />;
    // }

    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/trips/recenttrips" element={<RecentTrips />} />
            <Route path="/trips/activetrips" element={<ActiveTrip />} />
            <Route path="/trips/requestnewtrip" element={<RequestNewTrip />} />
            <Route path="/trips/pendingtrips" element={<PendingTrip />} />
            <Route path="/trips/completetrips" element={<CompletedTrip />} />
            <Route path="/trips/requestbookings" element={<BookingRequestTable />} />
            <Route path="/driver/listofdrivers" element={<DriverList />} />
            <Route path="/faremanagement" element={<FareManagement />} />
            <Route path="/vehicle/viewallvehicle" element={<ViewAllVehicle />} />
            <Route path="/superadmindashboard/dashboard" element={<SuperAdminDashboard />} />
            <Route path="/superadmindashboard/companydetails" element={<CompanyDetails />} />
            <Route path="/superadmindashboard/add-company" element={<AddCompany />} />
            <Route path="/superadmindashboard/edit-company/:companyId" element={<AddCompany />} />
            <Route path="/superadmindashboard/driver/addnewdriver" element={<AddNewDriver />} />
            <Route path="/superadmindashboard/driver/listofdrivers" element={<ListOfDrivers />} />
            <Route path="/superadmindashboard/vehicle/addnewvehicle" element={<AddSuperVehicle />} />
            <Route path="/superadmindashboard/vehicle/listofvehicles" element={<LisOfVehicles />} />
            <Route path="/superadmindashboard/fare/addfare" element={<AddFare />} />
            <Route path="/superadmindashboard/fare/listoffares" element={<ListOfFares/>} />
            {/* <Route path='*' element={<Navigate to={"/dashboard"} />} /> */}
        </Routes>
    );
};

export default PrivateRoute;    
