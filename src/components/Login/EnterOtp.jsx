import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import 'bootstrap/dist/js/bootstrap.bundle.min';
//import 'mdb-react-ui-kit';
import loginImg from "../../assets/images/login-img.png";
import loginLogo from "../../assets/images/login-logo.png";
import loginbg from "../../assets/images/login-bg.png";
import OtpInput from 'react-otp-input';
import { Link, useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import Cookie from "js-cookie";
import { confirmOtp } from "../../utils/api";
import { toast } from "react-toastify";
function EnterOtp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [submitLoader, setSubmitLoader] = useState(false)
  useEffect(()=>{console.log("otp: ",otp)},[otp])
  const handleSubmit = () => {
    const email = Cookie.get("forgotEmail");
    confirmOtp({email,OTP:otp}).then((res) => {
      console.log("response---->>>>", res);
      if (res?.data?.code === 200) {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 1000,
        });
        navigate("/new-password")
      } else {
        toast.warning(`${res.data.message}`, {
          position: "top-right",
          autoClose: 1000,
        });
      }
    }).finally(()=>{
      setSubmitLoader(false)
    });
  };
  return (
    <div
      className="container-login"
      style={{
        backgroundImage: `url(${loginbg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "100%",
      }}
    >
      <MDBContainer
        fluid
        className="p-0 ps-0 pe-0 my-0 h-custom custom-login-form custom-opt-form"
      >
        <MDBRow>
          <MDBCol col="4" md="8">
            <div className="svg-outer">

            </div>
            <div>
              <div className="login-left-content">
                <img src={loginLogo} className="login-  " alt="Logo" /><br/><br/>
                <div className="d-flex flex-row align-items-center justify-content-center">
                  {/* <p className="lead me-3">LOG IN</p> */}
              <p>Please  Enter your OTP</p>
                </div><br/>
<div className="opt-outer">
                <OtpInput
      value={otp}
      onChange={(setOtp)}
      inputType="number"
      numInputs={4}
      renderInput={(props) => <input {...props} />}
    />

</div><br/>



                <div className="text-center text-md-start mt-4 pt-2">
                  {/* <MDBBtn className="custom-login mb-0 px-5">
                Login
              </MDBBtn> */}
                  <button className="custom-login btn btn-primary" onClick={handleSubmit}>
                    Verify
                  </button>
                </div>
              </div>
            </div>
          </MDBCol>

          <MDBCol col="10" md="4">
            <img src={loginImg} className="img-fluid-login " alt="login" />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default EnterOtp;