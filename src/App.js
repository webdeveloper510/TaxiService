import React, { createContext, useEffect, useState } from 'react';
import './assets/css/App.css';
import Routerpage from '../src/routes/router';
import './scss/style.scss'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userContext from './utils/context';
import { getProfile } from './utils/api';
import { Navigate } from 'react-router-dom';
function App() {
  const [user, setUser] = useState(null);
  function onLoadApp(){
    const token = localStorage.getItem('token');
    console.log('token: from local storage' + token);
    if(!token){
      return <Navigate to="/" />;
    }
    getProfile(token).then(res => {
            console.log(res, 'profile data')
            if (res?.code === 200) {
              setUser(res.result)
              if(res?.result?.role === "SUB_ADMIN") {
                return <Navigate to="/taxi/dashboard" />;
                
              }else{
                return <Navigate to="/dashboard" />;
              }
            }else{
                return <Navigate to="/" />;
            }
          })
  }
 
  //   
  useEffect(()=>{
    onLoadApp();
  },[])
  return (
    <userContext.Provider value={{user,setUser}}>
    <div className="App">
      <Routerpage/>
      <ToastContainer />
    </div>
    </userContext.Provider>
  );
}

export default App;
