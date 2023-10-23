import React, { createContext, useState } from 'react';
import './assets/css/App.css';
import Routerpage from '../src/routes/router';
import './scss/style.scss'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userContext from './utils/context';
function App() {
  const [user, setUser] = useState(null);
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
