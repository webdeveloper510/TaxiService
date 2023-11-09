import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import Dashboard from '../components/Hotel/dashboard';
import ActiveTrip from '../components/Hotel/Trips/activetrips';
import FareManagement from '../components/Hotel/FareManagement/faremanagement';
import ViewAllVehicle from '../components/Hotel/Vehicle/viewallvehicle';
import CompletedTrip from '../components/Hotel/Trips/completedtrips';
import BookingRequestTable from '../components/Hotel/Trips/BookingRequestTable';
import DriverList from '../components/Hotel/Driver/driverlist';
import RecentTrips from '../components/Hotel/Trips/recenttrips';
import RequestNewTrip from '../components/Hotel/Trips/requesttrip';
import PendingTrip from '../components/Hotel/Trips/pedingtrips';
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
import EditpendingTrip from '../components/Hotel/Trips/EditpendingTrips';
import ViewSingleVehicle from '../components/Taxi/Vehicles/viewsinglevehicle';
import SecureSuperRoleRoute from '../utils/SecureSuperRoleRoute';
import ViewSingleSubVehicle from '../components/Hotel/Vehicle/viewsinglevehicle';
import SuperDashboard from '../components/SuperAdmin/Dashboard/Dashboard';
import AddSuperCompany from '../components/SuperAdmin/Companies/AddCompany';
import AllCompanyDetails from '../components/SuperAdmin/Companies/AllCompanies';
import SuperRecentTrips from '../components/SuperAdmin/Trips/RecentTrips';
import EditCompanyDetails from '../components/SuperAdmin/Companies/EditCompany';
import Home from '../components/HomePage/Home';
import GuestRoute from '../utils/GuestRoute';
import Login from '../components/Login/Login';
import SecureHotelRoleRoute from '../utils/SecureHotelRoleRoute';
import SecureTaxiRoleRoute from '../utils/SecureTaxiRoleRoute';
import ForgotPassword from '../components/Login/ForgotPassword';
import NewPassword from '../components/Login/NewPassword';
import EnterOtp from '../components/Login/EnterOtp';
import EditProfile from '../components/Login/EditProfile';
import BookingForm from '../components/BookingForm/BookingForm';


const PrivateRoute = () => {


    return (
        <Routes>
            <Route path="/" element={<GuestRoute><Home /></GuestRoute>} />
            <Route path="/booking-form" element={<BookingForm />} />
            <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
            <Route path="/forgot-password" element={<GuestRoute><ForgotPassword /></GuestRoute>} />
            <Route path="/new-password" element={<GuestRoute><NewPassword /></GuestRoute>} />
            <Route path="/enter-otp" element={<GuestRoute><EnterOtp /></GuestRoute>} />
            <Route path="/dashboard" element={<SecureHotelRoleRoute><Dashboard /></SecureHotelRoleRoute>} />
            <Route path="/trips/recenttrips" element={<SecureHotelRoleRoute><RecentTrips /></SecureHotelRoleRoute>} />
            <Route path="/trips/activetrips" element={<SecureHotelRoleRoute><ActiveTrip /></SecureHotelRoleRoute>} />
            <Route path="/trips/requestnewtrip" element={<SecureHotelRoleRoute><RequestNewTrip /></SecureHotelRoleRoute>} />
            <Route path="/trips/pendingtrips" element={<SecureHotelRoleRoute><PendingTrip /></SecureHotelRoleRoute>} />
            <Route path="/trips/editpendingtrips/:id" element={<SecureHotelRoleRoute><EditpendingTrip /></SecureHotelRoleRoute>} />
            <Route path="/trips/completetrips" element={<SecureHotelRoleRoute><CompletedTrip /></SecureHotelRoleRoute>} />
            <Route path="/trips/requestbookings" element={<SecureHotelRoleRoute><BookingRequestTable /></SecureHotelRoleRoute>} />
            <Route path="/driver/listofdrivers" element={<SecureHotelRoleRoute><DriverList /></SecureHotelRoleRoute>} />
            <Route path="/faremanagement" element={<SecureHotelRoleRoute><FareManagement /></SecureHotelRoleRoute>} />
            <Route path="/vehicle/viewallvehicle" element={<SecureHotelRoleRoute><ViewAllVehicle /></SecureHotelRoleRoute>} />
            <Route path="/vehicle/viewSiglevehicle/:vehicleId" element={<SecureHotelRoleRoute><ViewSingleSubVehicle /></SecureHotelRoleRoute>} />
            <Route path="/taxi/dashboard" element={<SecureTaxiRoleRoute>
                <SuperAdminDashboard />
            </SecureTaxiRoleRoute>} />
            <Route path="/taxi/companydetails" element={<SecureTaxiRoleRoute><CompanyDetails /></SecureTaxiRoleRoute>} />
            <Route path="/taxi/add-company" element={<SecureTaxiRoleRoute><AddCompany /></SecureTaxiRoleRoute>} />
            <Route path="/taxi/trips/bookedtrips" element={<SecureTaxiRoleRoute><SuperBookedTrips/></SecureTaxiRoleRoute>} />
            <Route path="/taxi/trips/activetrips" element={<SecureTaxiRoleRoute><SuperActiveTrip /></SecureTaxiRoleRoute>} />
            <Route path="/taxi/trips/pendingtrips" element={<SecureTaxiRoleRoute><SuperPendingTrip /></SecureTaxiRoleRoute>} />
            <Route path="/taxi/trips/cancelledtrips" element={<SecureTaxiRoleRoute><SuperCancelledTrip /></SecureTaxiRoleRoute>} />
            <Route path="/taxi/trips/completetrips" element={<SecureTaxiRoleRoute><SuperCompleteTrip /></SecureTaxiRoleRoute>} />
            <Route path="/taxi/trips/requesttrips" element={<SecureTaxiRoleRoute><SuperRequestTrip /></SecureTaxiRoleRoute>} />
            <Route path="/taxi/trips/acceptedtrips" element={<SecureTaxiRoleRoute><RequestAcceptTrip /></SecureTaxiRoleRoute>} />
            <Route path="/taxi/trips/addnewbooking" element={<SecureTaxiRoleRoute><AddNewBookings /></SecureTaxiRoleRoute>} />
          
            <Route path="/taxi/driver/listofdrivers" element={<SecureTaxiRoleRoute><ListOfDrivers role="taxi" /></SecureTaxiRoleRoute>} />
           
            <Route path="/taxi/vehicle/listofvehicles" element={<SecureTaxiRoleRoute><LisOfVehicles role="taxi" /></SecureTaxiRoleRoute>} />
            <Route path="/taxi/vehicle/vehicle-details/:vehicleId" element={<SecureTaxiRoleRoute><ViewSingleVehicle role="taxi"/></SecureTaxiRoleRoute>} />
          
            <Route path="/taxi/fare/addfare" element={<SecureTaxiRoleRoute><AddFare /></SecureTaxiRoleRoute>} />
            <Route path="/super-admin/dashboard" element={<SecureSuperRoleRoute><SuperDashboard /></SecureSuperRoleRoute>} />
            <Route path="/super-admin/add-company" element={<SecureSuperRoleRoute><AddSuperCompany /></SecureSuperRoleRoute>} />
            <Route path="/super-admin/all-companies" element={<SecureSuperRoleRoute><AllCompanyDetails /></SecureSuperRoleRoute>} />
            <Route path="/super-admin/edit-company-details" element={<SecureSuperRoleRoute><EditCompanyDetails /></SecureSuperRoleRoute>} />
            <Route path="/super-admin/trips/recent-trips" element={<SecureSuperRoleRoute><SuperRecentTrips /></SecureSuperRoleRoute>} />
            <Route path="/taxi/fare/listoffares" element={<SecureTaxiRoleRoute><ListOfFares /></SecureTaxiRoleRoute>} />
            <Route path="/super-admin/driver/addnewdriver" element={<SecureSuperRoleRoute><AddNewDriver /></SecureSuperRoleRoute>} />
            <Route path="/super-admin/driver/listofdrivers" element={<SecureSuperRoleRoute><ListOfDrivers role="super" /></SecureSuperRoleRoute>} />
            <Route path="/super-admin/driver/editdriver/:driverId" element={<SecureSuperRoleRoute><EditDriver /></SecureSuperRoleRoute>} />
            <Route path="/super-admin/vehicle/viewallvehicle" element={<SecureSuperRoleRoute><LisOfVehicles role="super"  /></SecureSuperRoleRoute>} />
            <Route path="/super-admin/vehicle/vehicle-details/:vehicleId" element={<SecureSuperRoleRoute><ViewSingleVehicle role="super" /></SecureSuperRoleRoute>} />
            <Route path="/super-admin/vehicle/addnewvehicle" element={<SecureSuperRoleRoute><AddSuperVehicle /></SecureSuperRoleRoute>} />
            <Route path="/super-admin/vehicle/editvehicle/:vehicleId" element={<SecureSuperRoleRoute><EditVehicle /></SecureSuperRoleRoute>} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/new-password" element={<SecureSuperRoleRoute><NewPassword /></SecureSuperRoleRoute>} />
            <Route path='*' element={<Navigate to="/" />} />

        </Routes>
    );
};

export default PrivateRoute;    