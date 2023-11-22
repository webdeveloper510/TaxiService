import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { getProfile } from './api';
import userContext from './context';
import AppLoader from '../components/AppLoader';

function SecureSuperRoleRoute({ children }) {
 
  const { user, setUser, appLoaded } = useContext(userContext);
  const token = localStorage.getItem('token');
  const navigate = useNavigate()
  useEffect(() => {

    if(appLoaded && user){
   
      if (!token || !user || !user.role) {
        return navigate("/")
      } 
      else {
        if (user?.role == "COMPANY") {
          return navigate("/taxi/dashboard") ;
        }
        else if(user?.role == "HOTEL") {
          return navigate("/dashboard")
  
        }else if(user?.role == "DRIVER"){
          return navigate("/past-trips");
         }
  
      }
    }
  }, [appLoaded, user])

 return  appLoaded  ? children : <AppLoader/>

}


export default SecureSuperRoleRoute