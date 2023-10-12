import React from 'react';
import {Router, Route, Routes} from 'react-router-dom';
import Login from "./components/Login";


const routes =()=>{
    return(
    <>
   

    
      <Routes>
          <Route path="/login" element={<Login />} />
  
        </Routes>
       
       
     </>
      
    )
  }
  
  export default routes;