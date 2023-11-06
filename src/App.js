import React, { createContext, useEffect, useState } from 'react';
import './assets/css/App.css';
import Routerpage from '../src/routes/router';
import './scss/style.scss'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userContext from './utils/context';
import { getProfile } from './utils/api';
import { Navigate, useNavigate } from 'react-router-dom';
import AppLoader from './components/AppLoader';
function App() {
  const [appLoaded, setAppLoaded] = useState(false)
  const [user, setUser] = useState(null);
  const [loading , setLoading] = useState(false);
  const navigate = useNavigate();
  function onLoadApp(){
    setLoading(true);
    const token = localStorage.getItem('token');
    console.log('token: from local storage' + token);
    if(!token){
      setLoading(false)
      return navigate("/")
       
    }
    console.log("path founder running on react app =====>>>>>,", user)
    getProfile(token).then(res => {
            console.log(res, 'profile data')
            if (res?.code === 200) {
              setUser(res.result)
            //   if(res?.result?.role === "COMPANY") {
            //     return <Navigate to="/taxi/dashboard" />;
                
            //   }
            //   else if(res?.result?.role === "SUPER_ADMIN") {
            //     return <Navigate to="/super-admin/dashboard" />;
                
            //   }
            //   else{
            //     return <Navigate to="/dashboard" />;
            //   }
            // }else{
            //     return <Navigate to="/" />;
            }else{
              console.log("remove token from wrong app")
              localStorage.clear();
              // navigate("/")
            }
          }).catch((err)=>{
            console.log("remove token from catch app")
            localStorage.clear();
            // navigate("/")
          }).finally(()=>{
            setLoading(false);
            setAppLoaded(true);
          })
  }
  useEffect(()=>{
    onLoadApp()
  },[])
  return (
    <userContext.Provider value={{user,setUser,appLoaded}}>
    {loading?<AppLoader/>:<div className="App">
      <Routerpage/>
      <ToastContainer />
    </div>}
    </userContext.Provider>
  );
}

export default App;
