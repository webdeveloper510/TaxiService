import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { getProfile } from './api';
import userContext from './context';
function SecureHotelRoleRoute({ children }) {

  const { user, setUser, appLoaded } = useContext(userContext);
  const token = localStorage.getItem('token');
  const navigate = useNavigate()
  useEffect(() => {
    console.log('user role is from secure taxi routes: ', user?.role, window.location.href);
    if(appLoaded && user){
      console.log('user role is from secure accelerator routes: ', user , appLoaded)
      if (!token || !user || !user.role) {
        return navigate("/")
      } 
      else {
        if (user?.role == "SUPER_ADMIN") {
          return navigate("/super-admin/dashboard") ;
        }
        else if(user?.role == "COMPANY") {
          return navigate("/taxi/dashboard")
  
        }
  
      }
    }
  }, [appLoaded, user])

 return children

}


export default SecureHotelRoleRoute