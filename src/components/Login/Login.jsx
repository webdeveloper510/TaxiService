import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.bundle.min';
//import 'mdb-react-ui-kit';
import loginImg from '../../assets/images/login-img.png';
import loginLogo from '../../assets/images/login-logo.png'
import loginbg from '../../assets/images/login-bg.png'

import {MDBContainer, MDBCol, MDBRow, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
function Login() {
   
      return (
        
        <div className="container-login" style={{ backgroundImage: `url(${loginbg})`, backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '100%'}}>
      <MDBContainer fluid className="p-0 ps-0 pe-0 my-0 h-custom custom-login-form">
        <MDBRow>
          <MDBCol col='4' md='8'>
            <div className="login-left-content">
            <img src={loginLogo} className="login-imgg" alt="Logo" />
            <div className="d-flex flex-row align-items-center justify-content-center">
              <p className="lead me-3">LOG IN AS SUPER-ADMIN</p>
            </div>

            <div className="mb-4">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <MDBInput
                id='phoneNumber'
                type='number'
                size="lg"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <MDBInput
                id='password'
                type='password'
                size="lg"
              />
            </div>

            <div className="d-flex justify-content-between mb-4">
              <MDBCheckbox
                name='flexCheck'
                value=''
                id='flexCheckDefault'
                label='Remember me'
              />
              <a href="!#">Forgot password?</a>
            </div>

            <div className='text-center text-md-start mt-4 pt-2'>
              {/* <MDBBtn className="custom-login mb-0 px-5">
                Login
              </MDBBtn> */}
              <button class="custom-login btn btn-primary" type="submit">Login</button>
            </div>
            </div>
          </MDBCol>

          <MDBCol col='10' md='4'>
            <img src={loginImg} className="img-fluid" alt="login image" />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
      );
    };
  
   export default Login; 