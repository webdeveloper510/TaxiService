import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import userContext from './context';
function GuestRoute({ children }) {
    const navigate = useNavigate()
    const { user, setUser, appLoaded } = useContext(userContext);
    useEffect(()=>{
        if(appLoaded && user && user.role){
            if(user?.role == "COMPANY"){
                return navigate("/taxi/dashboard");
               }else if(user?.role == "SUPER_ADMIN"){
                return navigate("/super-admin/dashboard");
               }else if(user?.role == "HOTEL"){
                return navigate("dashboard");
               }
        }
    },[appLoaded])
      return children
    
    
    }

export default GuestRoute