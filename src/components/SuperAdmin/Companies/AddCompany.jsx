

import React, { useEffect, useState } from "react";
import AppHeader from "../../TopBar/AppHeader";
import Sidebar from "../../Taxi/SiderNavBar/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CFormSelect,
} from "@coreui/react";
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { addCompany, getCompanyById } from "../../../utils/api";
import { toast } from "react-toastify";
import SideBar2 from "../../Hotel/SideBar2";
import SuperSideBar from "../../Taxi/SiderNavBar/Sidebar";
import SuperAdminSideBar from "../Sidebar/SideBar";
import { ClipLoader } from "react-spinners";

const AddSuperCompany = () => {
  const [address, setAddress] = useState("");
  const [touched, setTouched] = useState(false)
  const [addressError, setAddressError] = useState(true);
  const { companyId } = useParams();
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    // console.log("companyId: " + companyId);
    // if(companyId){
    // getCompanyById(companyId).then(res => {
    // console.log(res?.result, 'companyData')
    // if (res?.code === 200) {
    // setCompanyData(res?.result)
    // }else{
    // setError(true);
    // }
    // }).catch(err => {setError(true)});
    // setLoading(false)
    // }
  }, []);
  const handleSelectAddress = async (selectedAddress) => {
    try {
      formik.setFieldValue("land", selectedAddress)
      setAddress(selectedAddress)

    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleAddressError = () => {
    console.log("handle Address error: ", address)
    if (!address) {
      console.log("handle Address error: true")
      formik.setFieldError("land", "Address is required")
      setAddressError(true);
    }
    else {
      setAddressError(false)
    }
  }
  const navigate = useNavigate();
  const initialValues = {
    company_name: "",
    land: "",
    post_code: "",
    house_number: "",
    describe_your_taxi_company: "",
    affiliated_with: "",
    phone: "",
    commision: "",
    // number_of_cars: "",
    // chamber_of_comerce_number: "",
    // vat:"",
    website: "",
    tx_quality: "",
    // contact: "",
    first_name: "",
    last_name: "",
    tel_contact_number: "",
    email: "",
  };
  const validationSchema = Yup.object().shape({
    company_name: Yup.string().trim()
      .min(2, "Company Name must be at least 2 characters")
      .max(50, "Company Name must be at most 50 characters")
      .required("Company Name is required"),
    // land: Yup.string().min(4).max(20).required("Land is required"),
    post_code: Yup.string().trim().max(10, "Post Code must be at most 10 characters").matches(/\S/, 'Field must not contain only white spaces').required("Postcode is required"),
    house_number: Yup.string().trim().max(20).required("Building number is required"),
    describe_your_taxi_company: Yup.string().trim()
      .min(4, "Describe your taxi company must be at least 4 characters")
      .max(50, "Describe your taxi company must be at most 50 characters")
      .required("Describe your taxi company is required"),
    affiliated_with: Yup.string().trim(),
    phone: Yup.string().trim()
      .matches(/^[0-9]+$/, "Must be only digits")
      .required("Phone Number is required"),
    // number_of_cars: Yup.string().matches(/^[0-9]+$/, "Must be only digits").required("Number of cars is required"),
    // chamber_of_comerce_number: Yup.string().required("Chamber of Commerce Number is required"),
    // vat:Yup.string().min(4).max(18).required("VAT Number is required"),
    website: Yup.string().trim()
      .url("Invalid URL format. Please enter a valid URL."),
    tx_quality: Yup.string().trim(),
    // contact: Yup.string().required("Contact is required"),
    first_name: Yup.string().trim().required("First Name is required"),
    last_name: Yup.string().trim().required("Last Name is required"),
    tel_contact_number: Yup.string().trim()
      .min(6, "minimum length must be 6")
      .max(18, "max length must be 6")
      .matches(/^[0-9]+$/, "Must be only digits"),
    email: Yup.string().trim().email().required("Email Address is required"),
    commision: Yup.number()
      .typeError('Must be a number')
      .required('Commission  is required')
      .max(100, 'Value must be lower than equal to 100')
  });
  const handleValueCommission = (e) => {
    // console.log("handleValueCommission", e)
    const value = parseFloat(e.target.value);
    if (value > 100) {
      console.log("value must be lower than 100")
      formik.setFieldError("commision", "value must be lower than 100")
    } else {
      formik.setFieldValue(e.target.name, e.target.value);
      formik.setFieldTouched(e.target.name, true);
    }
  }
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (address.length < 1) {
        setAddressError(true);
        setTouched(true);
        return
      }
      setSubmitLoader(true)
      console.log("values", values);
      addCompany({
        company_name: values.company_name,
        land: address,
        post_code: values.post_code,
        house_number: values.house_number,
        description: values.describe_your_taxi_company,
        affiliated_with: values.affiliated_with,
        phone: values.phone,
        website: values.website,
        tx_quality_mark: values.tx_quality,
        first_name: values.first_name,
        last_name: values.last_name,
        p_number: values.tel_contact_number,
        email: values.email,
        commision: values.commision,
        role: "COMPANY"
      }).then((res) => {
        console.log("response---->>>>", res);
        if (res?.data?.code === 200) {
          toast.success(`Company added successfully`, {
            position: "top-right",
            autoClose: 1000,
          });
          navigate("/super-admin/all-companies")
        } else {
          toast.warning(`${res.data.message}`, {
            position: "top-right",
            autoClose: 1000,
          });
        }
      }).finally(() => {
        setSubmitLoader(false)
      });
    },
  });
  const [submitLoader, setSubmitLoader] = useState(false);
  const [inputData, setInputData] = useState({
    company_name: "",
    land: "",
    post_code: "",
    house_number: "",
    describe_your_taxi_company: "",
    affiliated_with: "",
    phone: "",
    number_of_cars: "",
    chamber_of_comerce_number: "",
    vat: "",
    website: "",
    tx_quality: "",
    contact: "",
    first_name: "",
    last_name: "",
    tel_contact_number: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    company_name: null,
    land: null,
    post_code: null,
    house_number: null,
    describe_your_taxi_company: null,
    affiliated_with: null,
    phone: null,
    number_of_cars: null,
    chamber_of_comerce_number: null,
    vat: null,
    website: null,
    tx_quality: null,
    contact: null,
    first_name: null,
    last_name: null,
    tel_contact_number: null,
    email: null,
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
  const inputHandler = (e) => {
    console.log("errors====>>>>", inputData);
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div className="container-fluidd">
        <div className="col-md-12">
          <div>
            <SuperAdminSideBar />

            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div
                className="body flex-grow-1 px-3"
                style={{ paddingBottom: "20px" }}
              >
                <h1 class="heading-for-every-page">
                  {companyId ? "Edit Company" : "Add Company"}
                </h1>
                <div class="active-trip-outer" id="fare_management_page">
                  <div className="trips-head d-flex justify-content-between">
                    {/* <div className="box-shd d-flex justify-content-between">
                      <div className="left-trip-content">
                        <h2>{companyId?"Edit Company": "Add Company"}</h2>
                      </div>
                      <div className="right-trip-content">
                        <Link to="/taxi/companydetails">
                          <CButton className="company_list">
                            Company List
                          </CButton>
                        </Link>
                      </div>
                    </div> */}
                  </div>
                  <CRow>
                    <CCol xs={12}>
                      <CCard className="mb-4">
                        <CCardBody>
                          <form
                            onSubmit={formik.handleSubmit}
                            noValidate
                            className="row g-3"
                          >
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputcname">
                                Company Name<span class="asterisk-mark">*</span>
                              </CFormLabel>
                              <CFormInput
                                aria-label="vehicle fare"
                                {...formik.getFieldProps("company_name")}

                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.company_name &&
                                      formik.errors.company_name,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.company_name &&
                                      !formik.errors.company_name,
                                  }
                                )}
                                name="company_name"
                                autoComplete="off"
                              />
                              {formik.errors.company_name &&
                                formik.touched.company_name ? (
                                <div className="text-danger">
                                  {formik.errors.company_name}
                                </div>
                              ) : null}
                            </CCol>
                            <CCol xs={6}
                              onBlur={() => {
                                setTouched(true)
                              }}
                            >
                              <CFormLabel htmlFor="inputtripfrom">
                                Address<span class="asterisk-mark">*</span>
                              </CFormLabel>
                              <PlacesAutocomplete
                                value={address}

                                onChange={(data) => {

                                  console.log(data, " from place holder")
                                  setAddress(data);
                                  if (data.length < 1) {
                                    setAddressError(true)
                                  } else {
                                    setAddressError(false)
                                  }
                                }}
                                onSelect={handleSelectAddress}


                              >
                                {({
                                  getInputProps,
                                  suggestions,
                                  getSuggestionItemProps,
                                  loading,
                                }) => (
                                  <div>
                                    <CFormInput
                                      onBlur={() => {
                                        console.log("Blur run")
                                      }}
                                      id="inputtripfrom"
                                      {...getInputProps({
                                        // placeholder: "Enter a location",
                                      })}
                                      className={clsx(
                                        "form-control bg-transparent",
                                        {
                                          "is-invalid":
                                            touched &&
                                            addressError
                                        },
                                        {
                                          "is-valid":
                                            touched &&
                                            !addressError
                                        }
                                      )}

                                    />
                                    {addressError && touched &&
                                      <div className="text-danger">
                                        Address is Required
                                      </div>
                                    }
                                    <div className="suugestion-div">
                                      <div className="suggestion-inner">
                                        {loading && <div>Loading...</div>}
                                        {suggestions
                                          .slice(0, 3)
                                          .map((suggestion) => (
                                            <div
                                              key={suggestion.id}
                                              {...getSuggestionItemProps(
                                                suggestion
                                              )}
                                            >
                                              {suggestion.description}
                                            </div>
                                          ))}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </PlacesAutocomplete>
                              {/* {tripFromCoordinates && (
                                  <div>
                                    <p>Latitude: {tripFromCoordinates.lat}</p>
                                    <p>Longitude: {tripFromCoordinates.lng}</p>
                                    <p>Address: {tripFrom}</p>
                                  </div>
                                )} */}
                              {errors.trip_from && (
                                <span
                                  style={{ color: "red" }}
                                  className="text-danger"
                                >
                                  {errors.trip_from}
                                </span>
                              )}
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputpcode">
                                Post Code<span class="asterisk-mark">*</span>
                              </CFormLabel>
                              <CFormInput
                                aria-label="postcode"
                                {...formik.getFieldProps("post_code")}

                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.post_code &&
                                      formik.errors.post_code,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.post_code &&
                                      !formik.errors.post_code,
                                  }
                                )}
                                name="post_code"
                                autoComplete="off"
                              />
                              {formik.errors.post_code &&
                                formik.touched.post_code ? (
                                <div className="text-danger">
                                  {formik.errors.post_code}
                                </div>
                              ) : null}
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputhousenum">
                                Building Number<span class="asterisk-mark">*</span>
                              </CFormLabel>
                              <CFormInput
                                aria-label="housenumber"
                                {...formik.getFieldProps("house_number")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.house_number &&
                                      formik.errors.house_number,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.house_number &&
                                      !formik.errors.house_number,
                                  }
                                )}
                                name="house_number"
                                autoComplete="off"
                              />
                              {formik.errors.house_number &&
                                formik.touched.house_number ? (
                                <div className="text-danger">
                                  {formik.errors.house_number}
                                </div>
                              ) : null}
                            </CCol>

                            <CCol md={6}>
                              <CFormLabel htmlFor="inputtxinum">
                                Describe Your Taxi Company<span class="asterisk-mark">*</span>
                              </CFormLabel>
                              <CFormInput
                                aria-label="taxi company"
                                {...formik.getFieldProps(
                                  "describe_your_taxi_company"
                                )}

                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched
                                        .describe_your_taxi_company &&
                                      formik.errors.describe_your_taxi_company,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched
                                        .describe_your_taxi_company &&
                                      !formik.errors.describe_your_taxi_company,
                                  }
                                )}
                                name="describe_your_taxi_company"
                                autoComplete="off"
                              />
                              {formik.errors.describe_your_taxi_company &&
                                formik.touched.describe_your_taxi_company ? (
                                <div className="text-danger">
                                  {formik.errors.describe_your_taxi_company}
                                </div>
                              ) : null}
                            </CCol>

                            <CCol md={6}>
                              <CFormLabel htmlFor="inputaffi">
                                Affiliated with
                              </CFormLabel>
                              <CFormInput
                                aria-label="Affiliated"
                                {...formik.getFieldProps("affiliated_with")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.affiliated_with &&
                                      formik.errors.affiliated_with,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.affiliated_with &&
                                      !formik.errors.affiliated_with,
                                  }
                                )}
                                name="affiliated_with"
                                autoComplete="off"
                              />
                              {formik.errors.affiliated_with &&
                                formik.touched.affiliated_with ? (
                                <div className="text-danger">
                                  {formik.errors.affiliated_with}
                                </div>
                              ) : null}
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputphnnum">
                                Phone Number<span class="asterisk-mark">*</span>
                              </CFormLabel>
                              <CFormInput
                                aria-label="phone number"
                                onKeyDown={(e) => {
                                  handleMobile(e, 17);
                                }}
                                {...formik.getFieldProps("phone")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.phone &&
                                      formik.errors.phone,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.phone &&
                                      !formik.errors.phone,
                                  }
                                )}
                                name="phone"
                                autoComplete="off"
                              />
                              {formik.errors.phone && formik.touched.phone ? (
                                <div className="text-danger">
                                  {formik.errors.phone}
                                </div>
                              ) : null}
                            </CCol>

                            <CCol md={6}>
                              <CFormLabel htmlFor="inputwebsite">
                                Website
                              </CFormLabel>
                              <CFormInput
                                id="webt_site"
                                {...formik.getFieldProps("website")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.website &&
                                      formik.errors.website,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.website &&
                                      !formik.errors.website,
                                  }
                                )}
                                name="website"
                                autoComplete="off"
                              />
                              {formik.errors.website &&
                                formik.touched.website ? (
                                <div className="text-danger">
                                  {formik.errors.website}
                                </div>
                              ) : null}
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputquality">
                                TX Quality Mark
                              </CFormLabel>
                              <CFormInput
                                id="iput_quality"
                                {...formik.getFieldProps("tx_quality")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.tx_quality &&
                                      formik.errors.tx_quality,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.tx_quality &&
                                      !formik.errors.tx_quality,
                                  }
                                )}
                                name="tx_quality"
                                autoComplete="off"
                              />
                              {formik.errors.tx_quality &&
                                formik.touched.tx_quality ? (
                                <div className="text-danger">
                                  {formik.errors.tx_quality}
                                </div>
                              ) : null}
                            </CCol>

                            <CCol md={6}>
                              <CFormLabel htmlFor="inputcommision">
                                Commission in (%)<span class="asterisk-mark">*</span>
                              </CFormLabel>
                              <CFormInput
                                type="number"
                                step="0.01"
                                aria-label="commision"


                                {...formik.getFieldProps("commision")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.commision &&
                                      formik.errors.commision,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.commision &&
                                      !formik.errors.commision,
                                  }
                                )}
                                name="commision"
                                autoComplete="off"
                              />
                              {formik.errors.commision && formik.touched.commision ? (
                                <div className="text-danger">
                                  {formik.errors.commision}
                                </div>
                              ) : null}
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputfname">
                                First Name<span class="asterisk-mark">*</span>
                              </CFormLabel>
                              <CFormInput
                                id="f_name"
                                {...formik.getFieldProps("first_name")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.first_name &&
                                      formik.errors.first_name,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.first_name &&
                                      !formik.errors.first_name,
                                  }
                                )}
                                name="first_name"
                                autoComplete="off"
                              />
                              {formik.errors.first_name &&
                                formik.touched.first_name ? (
                                <div className="text-danger">
                                  {formik.errors.first_name}
                                </div>
                              ) : null}
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputlname">
                                Last Name<span class="asterisk-mark">*</span>
                              </CFormLabel>
                              <CFormInput
                                id="l_name"
                                {...formik.getFieldProps("last_name")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.last_name &&
                                      formik.errors.last_name,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.last_name &&
                                      !formik.errors.last_name,
                                  }
                                )}
                                name="last_name"
                                autoComplete="off"
                              />
                              {formik.errors.last_name &&
                                formik.touched.last_name ? (
                                <div className="text-danger">
                                  {formik.errors.last_name}
                                </div>
                              ) : null}
                            </CCol>
                            {/* </CCol> */}

                            <CCol md={6}>
                              <CFormLabel htmlFor="inputcon_num">
                                Telephone Number
                              </CFormLabel>
                              <CFormInput
                                id="tel_Con_nu"
                                onKeyDown={(e) => {
                                  handleMobile(e, 17);
                                }}
                                {...formik.getFieldProps("tel_contact_number")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.tel_contact_number &&
                                      formik.errors.tel_contact_number,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.tel_contact_number &&
                                      !formik.errors.tel_contact_number,
                                  }
                                )}
                                name="tel_contact_number"
                                autoComplete="off"
                              />
                              {formik.errors.tel_contact_number &&
                                formik.touched.tel_contact_number ? (
                                <div className="text-danger">
                                  {formik.errors.tel_contact_number}
                                </div>
                              ) : null}
                            </CCol>
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputmailaddress">
                                Email Address<span class="asterisk-mark">*</span>
                              </CFormLabel>
                              <CFormInput
                                id="email_address"
                                {...formik.getFieldProps("email")}
                                maxLength="50"
                                className={clsx(
                                  "form-control bg-transparent",
                                  {
                                    "is-invalid":
                                      formik.touched.email &&
                                      formik.errors.email,
                                  },
                                  {
                                    "is-valid":
                                      formik.touched.email &&
                                      !formik.errors.email,
                                  }
                                )}
                                name="email"
                                autoComplete="off"
                              />
                              {formik.errors.email && formik.touched.email ? (
                                <div className="text-danger">
                                  {formik.errors.email}
                                </div>
                              ) : null}
                            </CCol>
                            <CCol md={12}>
                              <div
                                className="d-flex justify-content-center"
                                style={{ marginTop: "40px" }}
                              >
                                <CButton type="submit" onClick={() => {
                                  if (address.length < 1) {
                                    setAddressError(true);
                                    setTouched(true);
                                  }
                                }} className="submit-btn">
                                  {submitLoader ?
                                    <ClipLoader color="#000000" /> : "Submit"}
                                </CButton>
                                <CButton
                                  onClick={() =>
                                    navigate(
                                      "/super-admin/all-companies"
                                    )
                                  }
                                  type="button"
                                  className="cancel-btn"
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSuperCompany;