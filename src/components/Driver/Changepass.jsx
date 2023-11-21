import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import clsx from "clsx";
import { Icon } from "react-icons-kit";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import SuperAdminSideBar from "../SuperAdmin/Sidebar/SideBar";
import AppHeader from "../TopBar/AppHeader";
import { ClipLoader } from "react-spinners";
import SidebarDriver from "./Sidebar";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { changePass } from "../../utils/api";

const Changepass = () => {
  const [loading, setLoading] = useState(false);
  const [passVissible, setPassVissible] = useState(false);
  const [icon, setIcon] = useState(eyeOff);
  const [iconOld, setIconOld] = useState(eyeOff);
  const [passVissibleOld, setPassVissibleOld] = useState(false);
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be 6 characters long")
      // .matches(/[0-9]/, "Password requires a number")
      // .matches(/[a-z]/, "Password requires a lowercase letter")
      // .matches(/[A-Z]/, "Password requires an uppercase letter")
      // .matches(/[^\w]/, "Password requires a symbol")
      .required("Password is required"),
    newPassword: Yup.string()
      .min(6, "New Password must be 6 characters long")
      // .matches(/[0-9]/, "Password requires a number")
      // .matches(/[a-z]/, "Password requires a lowercase letter")
      // .matches(/[A-Z]/, "Password requires an uppercase letter")
      // .matches(/[^\w]/, "Password requires a symbol")
      .oneOf(
        [Yup.ref("password")],
        "Password and Confirm Password didn't match"
      )
      .required("Confirm Password is required"),
  });
  const initialValues = {
    password: "",
    newPassword: "",
  };

  const navigate = useNavigate();

  const back = () => {
    navigate("/super-admin/driver/listofdrivers");
  };

  const handleToggle = () => {
    if (!passVissible) {
      setIcon(eye);
    } else {
      setIcon(eyeOff);
    }
  };
  const handleToggleOld = () => {
    if (!passVissibleOld) {
      setIconOld(eye);
    } else {
      setIconOld(eyeOff);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (values.password == values.newPassword) {
        toast.warning("New Password and Old Password must not be same", {
          position: "top-right",
          autoClose: 1000,
        });
        return;
      }
      setLoading(true);
      console.log("values", values);
      changePass({
        oldPassword: values.password,
        password: values.newPassword,
      })
        .then((response) => {
          console.log("response---->>>>", response);
          if (response.data.code === 200) {
            toast.success(`${response.data.message}`, {
              position: "top-right",
              autoClose: 1000,
            });
          } else {
            toast.warning(`${response.data.message}`, {
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

  return (
    <div>
      <div className="container-fluidd">
        <div className="col-md-12">
          <div>
            <SidebarDriver />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div
                className="body flex-grow-1 px-3"
                style={{ paddingBottom: "20px" }}
              >
                <h1 class="heading-for-every-page">Change Password</h1>

                <CRow>
                  <CCol xs={2}></CCol>
                  <CCol xs={8}>
                    <div class="active-trip-outer mx-5 p-4">
                      <form onSubmit={formik.handleSubmit} noValidate>
                        <div className="change-password-content">
                          <div className="mb-4" id="pwd_field">
                            <label htmlFor="password" className="form-label">
                              Old Password
                            </label>
                            <MDBInput
                              id="password"
                              type={passVissibleOld ? "text" : "password"}
                              size="lg"
                              {...formik.getFieldProps("password")}
                              maxLength="50"
                              className={clsx(
                                "form-control bg-transparent input_pwd",
                                {
                                  "is-invalid":
                                    formik.touched.password &&
                                    formik.errors.password,
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
                            {formik.errors.password &&
                            formik.touched.password ? (
                              <div className="text-danger text-start">
                                {formik.errors.password}
                              </div>
                            ) : null}

                            <span class="flex justify-around items-center eye_pwd_icon">
                              <Icon
                                onClick={() => {
                                  setPassVissibleOld(!passVissibleOld);
                                  handleToggleOld();
                                }}
                                class="absolute mr-10"
                                icon={iconOld}
                                size={22}
                              />
                            </span>
                          </div>

                          <div className="mb-4" id="pwd_field">
                            <label htmlFor="password" className="form-label">
                              New Password
                            </label>
                            <MDBInput
                              id="password"
                              type={passVissible ? "text" : "password"}
                              size="lg"
                              {...formik.getFieldProps("newPassword")}
                              maxLength="50"
                              className={clsx(
                                "form-control bg-transparent input_pwd",
                                {
                                  "is-invalid":
                                    formik.touched.newPassword &&
                                    formik.errors.newPassword,
                                },
                                {
                                  "is-valid":
                                    formik.touched.newPassword &&
                                    !formik.errors.newPassword,
                                }
                              )}
                              name="newPassword"
                              autoComplete="off"
                            />
                            {formik.errors.newPassword &&
                            formik.touched.newPassword ? (
                              <div className="text-danger text-start">
                                {formik.errors.newPassword}
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
                                size={22}
                              />
                            </span>
                          </div>
                          <div className="text-center text-md-start mt-2">
                            <button
                              className="custom-login btn btn-primary"
                              type="submit"
                              id="rest_btn"
                            >
                              Reset Password
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </CCol>
                  <CCol xs={2}></CCol>
                </CRow>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Changepass;
