import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import 'bootstrap/dist/js/bootstrap.bundle.min';
//import 'mdb-react-ui-kit';
import loginImg from "../../assets/images/login-img.png";
import loginLogo from "../../assets/images/login-logo.png";
import loginbg from "../../assets/images/login-bg.png";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { changeForgotPass, userLogin } from "../../utils/api";
import { toast } from 'react-toastify';
import userContext from "../../utils/context";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import { ClipLoader } from "react-spinners";
import jsCookie from "js-cookie";

function NewPassword() {
  const { user, setUser } = useContext(userContext)
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();
  const loginSchema = Yup.object().shape({
    password: Yup.string()
    .min(6, "Password must be 6 characters long")
    // .matches(/[0-9]/, "Password requires a number")
    // .matches(/[a-z]/, "Password requires a lowercase letter")
    // .matches(/[A-Z]/, "Password requires an uppercase letter")
    // .matches(/[^\w]/, "Password requires a symbol")
    .required("Password is required"),
    confirmPassword: Yup.string()
      .min(6, "Password must be 6 characters long")
      // .matches(/[0-9]/, "Password requires a number")
      // .matches(/[a-z]/, "Password requires a lowercase letter")
      // .matches(/[A-Z]/, "Password requires an uppercase letter")
      // .matches(/[^\w]/, "Password requires a symbol")
      .required("Confirm Password is required"),
  });

  const initialValues = {
    password: "",
    confirmPassword: "",
  };
  const [passVissible, setPassVissible] = useState(false);
  const [comPassVissible, setComPassVissible] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      if(values.password !== values.confirmPassword){
        toast.warning("Password and Confirm Password must be same", {
          position: 'top-right',
          autoClose: 1000,
        });
        return
      }
      setLoading(true);
      console.log("values", values);
      const email = jsCookie.get("forgotEmail");
      changeForgotPass({
        email,
        password: values.password
      }).then((response) => {
        console.log("response---->>>>", response)
        if (response.data.code === 200
        
        ) {
          navigate("/login")
          toast.success(`${response.data.message}`, {
            position: 'top-right',
            autoClose: 1000,
          });
        

        } else {
          toast.warning("Invalid Credentials", {
            position: 'top-right',
            autoClose: 1000,
          });
        }
      }).catch((error) => {
        console.log(error)
      }).finally(() => { setLoading(false) })
    },
  });


  const [icon, setIcon] = useState(eyeOff);
  const [iconCom, setIconCom] = useState(eyeOff);
  const handleToggle = () => {
    if (!passVissible) {
      setIcon(eye);

    } else {
      setIcon(eyeOff)

    }
  }
  const handleToggleCom = () => {
    if (!passVissible) {
      setIconCom(eye);

    } else {
      setIconCom(eyeOff)

    }
  }
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
        className="p-0 ps-0 pe-0 my-0 h-custom custom-login-form"
      >
        <MDBRow>
          <MDBCol col="4" md="8">
            <div className="svg-outer">

            </div>
            <form onSubmit={formik.handleSubmit} noValidate>
              <div className="login-left-content">
                <img src={loginLogo} className="login-  " alt="Logo" />
                <div className="d-flex flex-row align-items-center justify-content-center">
                  {/* <p className="lead me-3">LOG IN</p> */}
                </div>

              

                <div className="mb-4" id="pwd_field">
                  <label htmlFor="password" className="form-label">
                   New  Password
                  </label>
                  <MDBInput
                    id="password"
                    type={passVissible ? "text" : "password"}
                    size="lg"
                    {...formik.getFieldProps("password")}
                    maxLength="50"
                    className={clsx(
                      "form-control bg-transparent input_pwd",
                      {
                        "is-invalid":
                          formik.touched.password && formik.errors.password,
                      },
                      {
                        "is-valid":
                          formik.touched.password && !formik.errors.password,
                      }
                    )}
                    name="password"
                    autoComplete="off"
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <div className="text-danger text-start">{formik.errors.password}</div>
                  ) : null}

                  <span class="flex justify-around items-center eye_pwd_icon">
                    <Icon onClick={() => {
                      setPassVissible(!passVissible)
                      handleToggle()
                    }} class="absolute mr-10" icon={icon} size={25} />
                  </span>
                </div>

                <div className="mb-4" id="pwd_field">
                  <label htmlFor="password" className="form-label">
                  Confirm  Password
                  </label>
                  <MDBInput
                    id="password"
                    type={passVissible ? "text" : "password"}
                    size="lg"
                    {...formik.getFieldProps("confirmPassword")}
                    maxLength="50"
                    className={clsx(
                      "form-control bg-transparent input_pwd",
                      {
                        "is-invalid":
                          formik.touched.confirmPassword && formik.errors.confirmPassword,
                      },
                      {
                        "is-valid":
                          formik.touched.confirmPassword && !formik.errors.confirmPassword,
                      }
                    )}
                    name="confirmPassword"
                    autoComplete="off"
                  />
                  {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                    <div className="text-danger text-start">{formik.errors.confirmPassword}</div>
                  ) : null}

                  <span class="flex justify-around items-center eye_pwd_icon">
                    <Icon onClick={() => {
                      setComPassVissible(!comPassVissible)
                      handleToggleCom()
                    }} class="absolute mr-10" icon={iconCom} size={25} />
                  </span>
                </div>



                {/* <input
                  type={type}
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
             /> */}

                

                <div className="text-center text-md-start mt-4 pt-2">
                  {/* <MDBBtn className="custom-login mb-0 px-5">
                Login
              </MDBBtn> */}
                  <button className="custom-login btn btn-primary" type="submit">
                   Reset Password
                  </button>
                </div>
              </div>
            </form>
          </MDBCol>

          <MDBCol col="10" md="4">
            <img src={loginImg} className="img-fluid-login " alt="login" />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default NewPassword;