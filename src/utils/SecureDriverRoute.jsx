import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { getProfile } from './api';
import userContext from './context';
import AppLoader from '../components/AppLoader';
function SecureDriverRoute({ children }) {

  const { user, setUser, appLoaded } = useContext(userContext);
  const token = localStorage.getItem('token');
  const navigate = useNavigate()
  useEffect(() => {
   
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
  
        } else if(user?.role == "HOTEL") {
          return navigate("/dashboard")
  
        }
        if(!user?.isDocUploaded) return navigate("/complete-documentation");
        if(!user?.isVerified) return navigate("/driver-verification");
  
      }
    }
  }, [appLoaded, user])

 return  appLoaded  ? children : <AppLoader/>

}


export default SecureDriverRoute