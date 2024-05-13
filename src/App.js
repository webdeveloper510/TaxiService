import React, { createContext, useEffect, useState } from 'react';
import './assets/css/App.css';
import Routerpage from '../src/routes/router';
import './scss/style.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userContext from './utils/context';
import { getProfile } from './utils/api';
import { Navigate, useNavigate } from 'react-router-dom';
import AppLoader from './components/AppLoader';
import PrivateRoute from './routes/PrivateRoute';
import socket from './utils/socket';
export const socketContext = createContext();
function App() {
  
  const [appLoaded, setAppLoaded] = useState(false)
  const [user, setUser] = useState(null);
  const [loading , setLoading] = useState(false);
  const [refreshUser, setRefreshUser] = useState(false);
  function refreshUserData() {
    setRefreshUser(!refreshUser);
  };
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  function onLoadApp(){
    setLoading(true);
    setAppLoaded(false);
    console.log('token: from local storage' + token);
    if(!token){
      setLoading(false)
      return navigate("/")
      // return
       
    }
    console.log("path founder running on react app =====>>>>>,", user)
    getProfile(token).then(res => {
            console.log(res, 'profile data')
            if (res?.code === 200) {
              setUser(res.result)
              socket.emit("addUser",{token})
            }else{
              console.log("remove token from wrong app")
              localStorage.clear();
              navigate("/")
            }
          }).catch((err)=>{
            console.log("remove token from catch app")
            localStorage.clear();
            navigate("/")
          }).finally(()=>{
            setLoading(false);
            setAppLoaded(true);
          })
  }

  useEffect(()=>{
    onLoadApp()
  },[token,refreshUser])

  useEffect(()=>{
    console.log("socket code is start",user)
    socket.connect();
    socket.on("connection",()=>{
      console.log("Connected socket")
    })
    if(user) socket.emit("addUser",{token:localStorage.getItem('token')})
    socket.on("userConnection",(data)=>{
      console.log("userConnection socket",data)
    })
    socket.on("tripCancelledBYDriver",({trip})=>{
      toast.warning(`Trip has been canceled.Trip ID is ${trip.trip_id} `, {
        position: 'top-right',
        autoClose: 1000,
      });
    })
    socket.on("connect",()=>{
      console.log("Connected socket successfully");

    })
    return ()=>{
      socket.disconnect();
    }
  },[user])

  return (
    <socketContext.Provider value={{socket}}>
    <userContext.Provider value={{user,setUser,appLoaded, refreshUserData}}>
    {loading?<AppLoader/>:<div className="App">
      <PrivateRoute/>
      <ToastContainer />
    </div>}
    </userContext.Provider>
    </socketContext.Provider>
  );
}

export default App;