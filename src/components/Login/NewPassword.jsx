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
import { userLogin } from "../../utils/api";
import { toast } from 'react-toastify';
import userContext from "../../utils/context";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import { ClipLoader } from "react-spinners";

function NewPassword() {
  const { user, setUser } = useContext(userContext)
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();
  const loginSchema = Yup.object().shape({
    phoneNo: Yup.string()
      // .min(7, "Phone number must be greater than 7")
      // .max(16, "Phone number not be greater than 17")
      .required("Email Address or Phone Number is required"),
    password: Yup.string()
      .min(6, "Password must be 6 characters long")
      // .matches(/[0-9]/, "Password requires a number")
      // .matches(/[a-z]/, "Password requires a lowercase letter")
      // .matches(/[A-Z]/, "Password requires an uppercase letter")
      // .matches(/[^\w]/, "Password requires a symbol")
      .required("Password is required"),
  });

  const initialValues = {
    phoneNo: "",
    password: "",
  };
  const [passVissible, setPassVissible] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      console.log("values", values);
      userLogin({
        email: values.phoneNo,
        password: values.password
      }).then((response) => {
        console.log("response---->>>>", response)
        // navige to dashboard if user role is super admin
        if (response.data.code === 200
          // && response.data.result.role === "SUB_ADMIN"
        ) {
          setUser(response.data.result)
          toast.success(`${response.data.message}`, {
            position: 'top-right',
            autoClose: 1000,
          });
          localStorage.setItem("token", response.data.jwtToken)
          if (response.data.result.role === "COMPANY") {

            navigate("/taxi/dashboard")


          }
          if (response.data.result.role === "SUPER_ADMIN") {

            navigate("/super-admin/dashboard")


          }
          else {

            navigate("/dashboard")

          }



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


  const handleMobile = (event, max) => {
    const pattern = /^[0-9]+$/;
    if (event.key === 'Backspace' || event.key === 'Enter' || event.key === 'Tab' || event.key === 'Shift' || event.key === 'ArrowLeft' || event.key === "ArrowRight") {

      formik.setFieldValue(event.target.name, event.target.value)
      formik.setFieldTouched(event.target.name, true)
    } else {

      let value = event.target.value.toString()
      if (value.length > max) {
        event.stopPropagation()
        event.preventDefault()
      } else {
        if (!pattern.test(event.key)) {
          event.preventDefault();
          event.stopPropagation()
        } else {
          formik.setFieldValue(event.target.name, event.target.value)
          formik.setFieldTouched(event.target.name, true)
        }
      }
    }
  }

  // useEffect(() => {
  //   if (localStorage.getItem("token") !== null || undefined) {
  //     navigate("/dashboard")
  //   }
  // }, [])



  //   const [password, setPassword] = useState("");
  // const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const handleToggle = () => {
    if (!passVissible) {
      setIcon(eye);

    } else {
      setIcon(eyeOff)

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