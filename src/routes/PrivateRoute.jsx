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
import SuperAdminDashboard from '../components/Taxi/Dashboard/Dashboard';
import CompanyDetails from '../components/Taxi/CompanyDetails/companydetails';
import AddCompany from '../components/Taxi/CompanyDetails/AddCompany';
import AddNewDriver from '../components/Taxi/Drivers/addnewdriver';
import ListOfDrivers from '../components/Taxi/Drivers/ListOfDrivers';
import AddSuperVehicle from '../components/Taxi/Vehicles/addnewvehicle';
import LisOfVehicles from '../components/Taxi/Vehicles/listofvehicles';
import AddFare from '../components/Taxi/Fares/addfare';
import ListOfFares from '../components/Taxi/Fares/fareslisting';
import SuperBookedTrips from '../components/Taxi/Trips/Bookedtrips';
import SuperActiveTrip from '../components/Taxi/Trips/ActiveTrips';
import SuperPendingTrip from '../components/Taxi/Trips/PendingTrips';
import SuperCompleteTrip from '../components/Taxi/Trips/CompleteTrips';
import SuperRequestTrip from '../components/Taxi/Trips/RequestTrips';
import RequestAcceptTrip from '../components/Taxi/Trips/AcceptRequestTrip';
import AddNewBookings from '../components/Taxi/Trips/AddNewBookings';
import EditVehicle from '../components/Taxi/Vehicles/EditVehicle';
import EditDriver from '../components/Taxi/Drivers/EditDriver';
import SuperCancelledTrip from '../components/Taxi/Trips/CancelledTrips';
import EditpendingTrip from '../components/Admindashboard/Trips/EditpendingTrips';
import ViewSingleVehicle from '../components/Taxi/Vehicles/viewsinglevehicle';
import SecureSuperRoleRoute from '../utils/SecureSuperRoleRoute';
import ViewSingleSubVehicle from '../components/Admindashboard/Vehicle/viewsinglevehicle';


const PrivateRoute = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/trips/recenttrips" element={<RecentTrips />} />
            <Route path="/trips/activetrips" element={<ActiveTrip />} />
            <Route path="/trips/requestnewtrip" element={<RequestNewTrip />} />
            <Route path="/trips/pendingtrips" element={<PendingTrip />} />
            <Route path="/trips/editpendingtrips/:id" element={<EditpendingTrip />} />
            <Route path="/trips/completetrips" element={<CompletedTrip />} />
            <Route path="/trips/requestbookings" element={<BookingRequestTable />} />
            <Route path="/driver/listofdrivers" element={<DriverList />} />
            <Route path="/faremanagement" element={<FareManagement />} />
            <Route path="/vehicle/viewallvehicle" element={<ViewAllVehicle />} />
            <Route path="/vehicle/viewSiglevehicle/:vehicleId" element={<ViewSingleSubVehicle />} />
            <Route path="/taxi/dashboard" element={<SuperAdminDashboard />} />
            <Route path="/taxi/companydetails" element={<CompanyDetails />} />
            <Route path="/taxi/add-company" element={<AddCompany />} />
            <Route path="/taxi/trips/bookedtrips" element={<SuperBookedTrips/>} />
            <Route path="/taxi/trips/activetrips" element={<SuperActiveTrip/>} />
            <Route path="/taxi/trips/pendingtrips" element={<SuperPendingTrip/>} />
            <Route path="/taxi/trips/cancelledtrips" element={<SuperCancelledTrip/>} />
            <Route path="/taxi/trips/completetrips" element={<SuperCompleteTrip/>} />
            <Route path="/taxi/trips/requesttrips" element={<SuperRequestTrip/>} />
            <Route path="/taxi/trips/acceptedtrips" element={<RequestAcceptTrip/>} />
            <Route path="/taxi/trips/addnewbooking" element={<AddNewBookings/>} />
            <Route path="/taxi/driver/addnewdriver" element={<AddNewDriver />} />
            <Route path="/taxi/driver/listofdrivers" element={<ListOfDrivers />} />
            <Route path="/taxi/driver/editdriver/:driverId" element={<EditDriver />} />
            <Route path="/taxi/vehicle/addnewvehicle" element={<AddSuperVehicle />} />
            <Route path="/taxi/vehicle/listofvehicles" element={<LisOfVehicles />} />
            <Route path="/taxi/vehicle/vehicle-details/:vehicleId" element={<ViewSingleVehicle />} />
            <Route path="/taxi/vehicle/editvehicle/:vehicleId" element={<EditVehicle />} />
            <Route path="/taxi/fare/addfare" element={<AddFare />} />
            <Route path="/taxi/fare/listoffares" element={<ListOfFares/>} />
            <Route path='*' element={<Navigate to={"/dashboard"} />} />
        </Routes>
    );
};

export default PrivateRoute;    
