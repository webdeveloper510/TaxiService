import React, {  useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { getProfile } from './api';

function SecureSuperRoleRoute({children}) {
  const [isValid, setValid] = useState(true);
    function onLoadApp(){

      const token = localStorage.getItem('token');
      console.log('token: from local storage' + token);
      if(!token){
        return <Navigate to="/" />;
      }
      getProfile(token).then(res => {
              if (res?.code === 200) {
                if(res.result.role === "SUB_ADMIN") {
                  setValid(false);     
                  
                }
              }else{
                  return <Navigate to="/" />;
              }
            })
    }
    useEffect(() => {
      onLoadApp()
    }, [])
    if(!isValid){
      return <Navigate to="/dashboard" />;                
    }else {
      return children

    } 

}

export default SecureSuperRoleRoute