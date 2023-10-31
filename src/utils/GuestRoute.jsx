import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import userContext from './context';
function GuestRoute({ children }) {
    const { user, setUser } = useContext(userContext);
     if(!user){
      return children
     }
     if(user?.role == "COMPANY"){
      return <Navigate to="/taxi/dashboard" />;
     }else if(user?.role == "SUPER_ADMIN"){
      return <Navigate to="/super-admin/dashboard" />;
     }else{
      return <Navigate to="dashboard" />;
     }
    }

export default GuestRoute