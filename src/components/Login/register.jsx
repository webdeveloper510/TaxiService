import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import 'bootstrap/dist/js/bootstrap.bundle.min';
//import 'mdb-react-ui-kit';
import loginImg from "../../assets/images/login-img.png";
import loginLogo from "../../assets/images/login-logo.png";
import loginbg from "../../assets/images/login-bg.png";
import { Link, useNavigate } from "react-router-dom";
import { CCol, CFormCheck, CFormLabel } from "@coreui/react";
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
import { addDriver, userLogin } from "../../utils/api";
import { toast } from "react-toastify";
import userContext from "../../utils/context";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { ClipLoader } from "react-spinners";
function Register() {
  const { user, setUser } = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loginSchema = Yup.object().shape({
    fname: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("First name is required"),
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Email is required"),
    lname: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Last name is required"),
    phoneNo: Yup.string()
      // .min(7, "Phone number must be greater than 7")
      // .max(16, "Phone number not be greater than 17")
      .required("Email Address or Phone Number is required"),
    password: Yup.string()
      .min(6, "Password must be 6 characters long")
      .required("Password is required"),
    confirmpass: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Password confirmation is required")
      .oneOf(
        [Yup.ref("password")],
        "Password and Confirm Password didn't match"
      ),
    gender: Yup.string().trim().required("Gender is required"),
  });

  const initialValues = {
    phoneNo: "",
    password: "",
    fname: "",
    confirmpass: "",
    gender: "",
    email: "",
    lname: "",
  };
  const [passVissible, setPassVissible] = useState(false);
  const [passShow, setPassShow] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    console.log(event.target.value);
    formik.setFieldValue("gender", event.target.value);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      console.log("values", values);
      addDriver({
        email: values.email,
        password: values.password,
        first_name: values.fname,
        last_name : values.lname,
        gender : values.gender,
        phone : values.phoneNo
      })
        .then((response) => {
          console.log("response---->>>>", response);
          if (response.data.code === 200) {
            setUser(response.data.result);
            toast.success(`${response.data.message}`, {
              position: "top-right",
              autoClose: 1000,
            });
              navigate("/");
          } else {
            toast.warning(response?.data?.message, {
              position: "top-right",
              autoClose: 1000,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  const handleMobile = (event, max) => {
    const pattern = /^[0-9]+$/;
    if (
      event.key === "Backspace" ||
      event.key === "Enter" ||
      event.key === "Tab" ||
      event.key === "Shift" ||
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight"
    ) {
      formik.setFieldValue(event.target.name, event.target.value);
      formik.setFieldTouched(event.target.name, true);
    } else {
      let value = event.target.value.toString();
      if (value.length > max) {
        event.stopPropagation();
        event.preventDefault();
      } else {
        if (!pattern.test(event.key)) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          formik.setFieldValue(event.target.name, event.target.value);
          formik.setFieldTouched(event.target.name, true);
        }
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") !== null || undefined) {
      navigate("/dashboard");
    }
  }, []);

  //   const [password, setPassword] = useState("");
  // const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const [iconshow, setIconshow] = useState(eyeOff);
  const handleToggle = () => {
    if (!passVissible) {
      setIcon(eye);
    } else {
      setIcon(eyeOff);
    }
  };
  const handleTogglePass = () => {
    if (!passShow) {
      setIconshow(eye);
    } else {
      setIconshow(eyeOff);
    }
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
        className="p-0 ps-0 pe-0 my-0 h-custom custom-login-form"
      >
        <MDBRow>
          <MDBCol col="4" md="8">
            <div className="svg-outer"></div>
            <form onSubmit={formik.handleSubmit} noValidate>
              <div className="login-left-content">
                <img src={loginLogo} className="login-  " alt="Logo" />
                <div className="d-flex flex-row align-items-center justify-content-center">
                  {/* <p className="lead me-3">LOG IN</p> */}
                </div>

                <MDBRow>
                  <MDBCol col="12" md="6">
                    <div className="mb-4">
                      <label htmlFor="fname" className="form-label">
                        First Name
                      </label>
                      <MDBInput
                        id="fname"
                        type="text"
                        size="lg"
                        value={formik.fname}
                        {...formik.getFieldProps("fname")}
                        maxLength="50"
                        className={clsx(
                          "form-control bg-transparent",
                          {
                            "is-invalid":
                              formik.touched.fname && formik.errors.fname,
                          },
                          {
                            "is-valid":
                              formik.touched.fname && !formik.errors.fname,
                          }
                        )}
                        name="fname"
                        autoComplete="off"
                      />
                      {formik.errors.fname && formik.touched.fname ? (
                        <div className="text-danger text-start">
                          {formik.errors.fname}
                        </div>
                      ) : null}
                    </div>
                  </MDBCol>

                  <MDBCol col="12" md="6">
                    <div className="mb-4">
                      <label htmlFor="lname" className="form-label">
                        Last Name
                      </label>
                      <MDBInput
                        id="lname"
                        type="text"
                        size="lg"
                        value={formik.lname}
                        {...formik.getFieldProps("lname")}
                        maxLength="50"
                        className={clsx(
                          "form-control bg-transparent",
                          {
                            "is-invalid":
                              formik.touched.lname && formik.errors.lname,
                          },
                          {
                            "is-valid":
                              formik.touched.lname && !formik.errors.lname,
                          }
                        )}
                        name="lname"
                        autoComplete="off"
                      />
                      {formik.errors.lname && formik.touched.lname ? (
                        <div className="text-danger text-start">
                          {formik.errors.lname}
                        </div>
                      ) : null}
                    </div>
                  </MDBCol>
                  <MDBCol col="12" md="6">
                    <div className="mb-4">
                      <label htmlFor="emailAddress" className="form-label">
                        Email Address
                      </label>
                      <MDBInput
                        id="emailAddress"
                        type="text"
                        size="lg"
                        value={formik.email}
                        {...formik.getFieldProps("email")}
                        maxLength="50"
                        className={clsx(
                          "form-control bg-transparent",
                          {
                            "is-invalid":
                              formik.touched.email && formik.errors.email,
                          },
                          {
                            "is-valid":
                              formik.touched.email && !formik.errors.email,
                          }
                        )}
                        name="email"
                        autoComplete="off"
                      />
                      {formik.errors.email && formik.touched.email ? (
                        <div className="text-danger text-start">
                          {formik.errors.email}
                        </div>
                      ) : null}
                    </div>
                  </MDBCol>
                  <MDBCol col="12" md="6">
                    <div className="mb-4">
                      <label htmlFor="phoneNumber" className="form-label">
                        Phone Number
                      </label>
                      <MDBInput
                        id="phoneNumber"
                        type="text"
                        size="lg"
                        value={formik.phoneNo}
                        {...formik.getFieldProps("phoneNo")}
                        maxLength="50"
                        className={clsx(
                          "form-control bg-transparent",
                          {
                            "is-invalid":
                              formik.touched.phoneNo && formik.errors.phoneNo,
                          },
                          {
                            "is-valid":
                              formik.touched.phoneNo && !formik.errors.phoneNo,
                          }
                        )}
                        name="phoneNo"
                        autoComplete="off"
                      />
                      {formik.errors.phoneNo && formik.touched.phoneNo ? (
                        <div className="text-danger text-start">
                          {formik.errors.phoneNo}
                        </div>
                      ) : null}
                    </div>
                  </MDBCol>

                  <MDBCol col="12" md="6">
                    <div className="mb-4" id="pwd_field">
                      <label htmlFor="password" className="form-label">
                        Password
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
                              formik.touched.password &&
                              !formik.errors.password,
                          }
                        )}
                        name="password"
                        autoComplete="off"
                      />
                      {formik.errors.password && formik.touched.password ? (
                        <div className="text-danger text-start">
                          {formik.errors.password}
                        </div>
                      ) : null}

                      <span class="flex justify-around items-center eye_pwd_icon">
                        <Icon
                          onClick={() => {
                            setPassVissible(!passVissible);
                            handleToggle();
                          }}
                          class="absolute mr-10"
                          icon={icon}
                          size={25}
                        />
                      </span>
                    </div>
                  </MDBCol>

                  <MDBCol col="12" md="6">
                    <div className="mb-4" id="pwd_field">
                      <label htmlFor="confirmpass" className="form-label">
                        Confirm Password
                      </label>
                      <MDBInput
                        id="confirmpass"
                        type={passShow ? "text" : "password"}
                        size="lg"
                        {...formik.getFieldProps("confirmpass")}
                        maxLength="50"
                        className={clsx(
                          "form-control bg-transparent input_pwd",
                          {
                            "is-invalid":
                              formik.touched.confirmpass && formik.errors.confirmpass,
                          },
                          {
                            "is-valid":
                              formik.touched.confirmpass &&
                              !formik.errors.confirmpass,
                          }
                        )}
                        name="confirmpass"
                        autoComplete="off"
                      />
                      {formik.errors.confirmpass && formik.touched.confirmpass ? (
                        <div className="text-danger text-start">
                          {formik.errors.confirmpass}
                        </div>
                      ) : null}

                      <span class="flex justify-around items-center eye_pwd_icon">
                        <Icon
                          onClick={() => {
                            setPassShow(!passShow);
                            handleTogglePass();
                          }}
                          class="absolute mr-10"
                          icon={iconshow}
                          size={25}
                        />
                      </span>
                    </div>
                  </MDBCol>
                  <MDBCol col="12" md="6">
                    <CFormLabel htmlFor="inputgender">Gender</CFormLabel>
                    <fieldset className="row mb-12">
                      <MDBCol sm={12}>
                        <CFormCheck
                          inline
                          type="radio"
                          name="gridRadios"
                          id="gridRadios1"
                          value="Male"
                          label="Male"
                          onChange={handleGenderChange} // Add the onChange event handler
                          checked={selectedGender === "Male"} // Set the checked state if Male is selected
                        />
                        <CFormCheck
                          inline
                          type="radio"
                          name="gridRadios"
                          id="gridRadios2"
                          value="Female"
                          label="Female"
                          onChange={handleGenderChange} // Add the onChange event handler
                          checked={selectedGender === "Female"} // Set the checked state if Female is selected
                        />
                      </MDBCol>
                    </fieldset>
                  </MDBCol>
                </MDBRow>
                <div className="d-flex justify-content-between mb-4 login-remember-forgot"></div>

                <div className="text-center text-md-start mt-4 pt-2">
                  <button
                    className="custom-login btn btn-primary"
                    type="submit"
                  >
                    {loading ? <ClipLoader color="#000000" /> : "Register"}
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

export default Register;
