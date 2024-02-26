
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router';
import userContext from '../../utils/context';

export default function DriverVerification() {
   const { user, setUser, appLoaded } = useContext(userContext);
    const navigate = useNavigate()
    useEffect(() =>{
        if(user?.isVerified == true){
            navigate("/past-trip");
        }
    },[])

  return (
    <div style={{
        height: '100vh',
        width: '100vw',
    }}>
      <h1>Document Under Review</h1>
        <div>
          <p>Your document is currently under review.</p>
          
        </div>
    </div>
  );
}

