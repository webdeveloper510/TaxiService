import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { Link, useNavigate, useParams } from "react-router-dom";
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
} from "@coreui/react";
import AppHeader from "../TopBar/AppHeader";
import { ClipLoader } from "react-spinners";
import SidebarDriver from "./Sidebar";

const EditdriverData = () => {
  const navigate = useNavigate();

  const [submitLoader, setSubmitLoader] = useState(false);
  const back = () => {
    navigate("/super-admin/driver/listofdrivers");
  };

  const initialValues = {
    FirstName: "",
    LastName: "",
    Address1: "",
    Address2: "",
    Country: "",
    City: "",
    Zip: "",
    Email: "",
    MobileNo: "",
    Gender: "",
  };

  const validationSchema = Yup.object().shape({
    FirstName: Yup.string().trim().required("First Name No is required"),
    LastName: Yup.string().trim().required("Last Name  is required"),
    Address1: Yup.string().trim().required("Address1  is required"),
    Address2: Yup.string().trim().required("Address2  is required"),
    Country: Yup.string().trim().required("Country is required"),
    City: Yup.string().trim().required("City  is required"),
    Zip: Yup.string().trim().required("Zip is required"),
    Email: Yup.string().trim().required("Email  is required"),
    MobileNo: Yup.string().trim().required("MobileNo is required"),
    Gender: Yup.string().trim().required("Gender is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("values", values);
    },
  });

  return (
    <div>
      <div className="container-fluidd">
        <div className="col-md-12">
          <div>
            <SidebarDriver/>
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div
                className="body flex-grow-1 px-3"
                style={{ paddingBottom: "20px" }}
              >
                <h1 class="heading-for-every-page">
                  {/* <Link to="/super-admin/driver/listofdrivers"> */}
                    {/* <img src={backtovehicle} alt="edit" />  */}
                    Edit Driver
                  {/* </Link> */}
                </h1>

                <div class="active-trip-outer">
                  {/* <h2>Add New Driver</h2> */}
                  {/* {loading?<AppLoader/>: */}
                  <CRow>
                    <CCol xs={12}>
                      <CCard className="mb-4">
                        <CCardHeader>
                          <strong>Basic Infromation</strong>
                        </CCardHeader>
                        <CCardBody>
                          <form
                            onSubmit={formik.handleSubmit}
                            noValidate
                            className="row g-3"
                          >
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputfirstname">
                                First Name
                              </CFormLabel>
                              <CFormInput
                                aria-label="First name"
                                {...formik.getFieldProps("FirstName")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.FirstName &&
                                      formik.errors.FirstName,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.FirstName &&
                                      !formik.errors.FirstName,
                                  }
                                )}
                                name="FirstName"
                                autoComplete="off"
                              />
                              {formik.errors.FirstName &&
                              formik.touched.FirstName ? (
                                <div className="text-danger">
                                  {formik.errors.FirstName}
                                </div>
                              ) : null}
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputlastname">
                                Last Name
                              </CFormLabel>
                              <CFormInput
                                aria-label="Last name"
                                {...formik.getFieldProps("LastName")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.LastName &&
                                      formik.errors.LastName,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.LastName &&
                                      !formik.errors.LastName,
                                  }
                                )}
                                name="LastName"
                                autoComplete="off"
                              />
                              {formik.errors.LastName &&
                              formik.touched.LastName ? (
                                <div className="text-danger">
                                  {formik.errors.LastName}
                                </div>
                              ) : null}
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputAddress">
                                Street Address 1
                              </CFormLabel>
                              <CFormInput
                                id="inputAddress"
                                {...formik.getFieldProps("Address1")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.Address1 &&
                                      formik.errors.Address1,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.Address1 &&
                                      !formik.errors.Address1,
                                  }
                                )}
                                name="Address1"
                                autoComplete="off"
                              />
                              {formik.errors.Address1 &&
                              formik.touched.Address1 ? (
                                <div className="text-danger">
                                  {formik.errors.Address1}
                                </div>
                              ) : null}
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputAddress2">
                                Street Address 2
                              </CFormLabel>
                              <CFormInput
                                id="inputAddress2"
                                {...formik.getFieldProps("Address2")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.Address2 &&
                                      formik.errors.Address2,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.Address2 &&
                                      !formik.errors.Address2,
                                  }
                                )}
                                name="Address2"
                                autoComplete="off"
                              />
                              {formik.errors.Address2 &&
                              formik.touched.Address2 ? (
                                <div className="text-danger">
                                  {formik.errors.Address2}
                                </div>
                              ) : null}
                            </CCol>
                            <CCol md={4}>
                              <CFormLabel htmlFor="inputcountry">
                                Country
                              </CFormLabel>
                              <CFormSelect
                                id="inputcountry"
                                {...formik.getFieldProps("Country")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.Country &&
                                      formik.errors.Country,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.Country &&
                                      !formik.errors.Country,
                                  }
                                )}
                                name="Country"
                                autoComplete="off"
                              >
                                <option default>Select Country</option>
                                <option>India</option>
                                <option>USA</option>
                                <option>UK</option>
                                <option>USA</option>
                                <option>AUS</option>
                              </CFormSelect>

                              {formik.errors.Country &&
                              formik.touched.Country ? (
                                <div className="text-danger">
                                  {formik.errors.Country}
                                </div>
                              ) : null}
                            </CCol>
                            <CCol md={4}>
                              <CFormLabel htmlFor="inputCity">City</CFormLabel>
                              <CFormInput
                                id="inputCity"
                                {...formik.getFieldProps("City")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.City && formik.errors.City,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.City &&
                                      !formik.errors.City,
                                  }
                                )}
                                name="City"
                                autoComplete="off"
                              />
                              {formik.errors.City && formik.touched.City ? (
                                <div className="text-danger">
                                  {formik.errors.City}
                                </div>
                              ) : null}
                            </CCol>

                            <CCol md={4}>
                              <CFormLabel htmlFor="inputZip">Zip</CFormLabel>
                              <CFormInput
                                id="inputZip"
                                {...formik.getFieldProps("Zip")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.Zip && formik.errors.Zip,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.Zip && !formik.errors.Zip,
                                  }
                                )}
                                name="Zip"
                                autoComplete="off"
                              />
                              {formik.errors.Zip && formik.touched.Zip ? (
                                <div className="text-danger">
                                  {formik.errors.Zip}
                                </div>
                              ) : null}
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputEmail4">
                                Email
                              </CFormLabel>
                              <CFormInput
                                type="email"
                                id="inputEmail4"
                                readOnly
                                {...formik.getFieldProps("Email")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.Email &&
                                      formik.errors.Email,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.Email &&
                                      !formik.errors.Email,
                                  }
                                )}
                                name="Email"
                                autoComplete="off"
                              />
                              {formik.errors.Email && formik.touched.Email ? (
                                <div className="text-danger">
                                  {formik.errors.Email}
                                </div>
                              ) : null}
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputmobile">
                                Mobile No.
                              </CFormLabel>
                              <CFormInput
                                type="number"
                                id="inputmobile"
                                readOnly
                                {...formik.getFieldProps("MobileNo")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.MobileNo &&
                                      formik.errors.MobileNo,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.MobileNo &&
                                      !formik.errors.MobileNo,
                                  }
                                )}
                                name="MobileNo"
                                autoComplete="off"
                              />
                              {formik.errors.MobileNo &&
                              formik.touched.MobileNo ? (
                                <div className="text-danger">
                                  {formik.errors.MobileNo}
                                </div>
                              ) : null}
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputgender">
                                Gender
                              </CFormLabel>
                              <fieldset className="row mb-12">
                                <CCol sm={12}>
                                  <CFormCheck
                                    inline
                                    type="radio"
                                    name="gridRadios"
                                    id="gridRadios1"
                                    value="Male"
                                    label="Male"
                                    //   onChange={handleGenderChange} // Add the onChange event handler
                                    //   checked={selectedGender === 'Male'} // Set the checked state if Male is selected
                                  />
                                  <CFormCheck
                                    inline
                                    type="radio"
                                    name="gridRadios"
                                    id="gridRadios2"
                                    value="Female"
                                    label="Female"
                                    //   onChange={handleGenderChange} // Add the onChange event handler
                                    //   checked={selectedGender === 'Female'} // Set the checked state if Female is selected
                                  />
                                </CCol>
                              </fieldset>
                            </CCol>

                            <CCol md={6} className="upload-file-input">
                              <CFormLabel htmlFor="inputmobile">
                                Upload Profile Photo
                              </CFormLabel>

                              {/* {image?.length > 0 ?
                          (
                            <img src={image} alt='img' height={300} width={100} />
                          ) :
                          ""} */}

                              {/* <CFormInput accept="image/*" type="file" id="formFile" onChange={(e) => { uploadFile(e) }}          
                          name="file"
                          autoComplete="off" /> */}

                              <label
                                htmlFor="formFile"
                                className="custom-file-upload"
                              >
                                <div className="files-outer">
                                  {/* <img className="upload-icon" src={uploadfileImg} alt='img' /><br /><br /> */}
                                  <span>Drop Image Here ...</span>
                                </div>
                              </label>
                            </CCol>
                            <CCol xs={12}>
                              <div
                                className="d-flex justify-content-center"
                                style={{ marginTop: "40px" }}
                              >
                                <CButton type="submit" className="submit-btn">
                                  {submitLoader ? (
                                    <ClipLoader color="#000000" />
                                  ) : (
                                    "Submit"
                                  )}
                                </CButton>
                                <CButton
                                  type="button"
                                  className="cancel-btn"
                                  onClick={back}
                                >
                                  Cancel
                                </CButton>
                              </div>
                            </CCol>
                          </form>
                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>
                  {/* // } */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditdriverData;
