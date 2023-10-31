import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { getProfile } from './api';
import userContext from './context';

function SecureSuperRoleRoute({ children }) {
  const { user, setUser } = useContext(userContext);
  const [isValid, setValid] = useState(true);
  function onLoadApp() {

    const token = localStorage.getItem('token');
    console.log('token: from local storage' + token);
    if (!token) {
      return <Navigate to="/" />;
    }

    
      if (user?.role != "SUPER_ADMIN") {
        setValid(false);
      }
  }
  useEffect(() => {
    onLoadApp()
  }, [])
  if (!isValid) {
   if(!user){
    return <Navigate to="/" />;
   }
   if(user.role == "COMPANY"){
    return <Navigate to="/super-admin/dashboard" />;
   }else{
    return <Navigate to="/dashboard" />;

   }
  } else {
    return children

  }

}

export default SecureSuperRoleRoute