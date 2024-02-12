import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import deletepopup from "../../../assets/images/deletepopup.png";
import React, { useEffect, useState } from "react";
import Sidebar from "../../Taxi/SiderNavBar/Sidebar";
import AppHeader from "../../TopBar/AppHeader";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import Switch from "react-switch";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModal,
  CModalBody,
  CCardBody,
  CRow,
  CCard,
  CCol,
  CFormInput,
  CFormLabel,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { toast } from "react-toastify";
import editiconimg from "../../../assets/images/editicon.png";
import deleteiconimg from "../../../assets/images/deleteicon.png";
import {
  deleteCompany,
  editCompanyDetail,
  getCompany,
  getCompanydetailId,
  payCommission,
} from "../../../utils/api";
import AppLoader from "../../AppLoader";
import SuperAdminSideBar from "../Sidebar/SideBar";
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import EmptyData from "../../EmptyData";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import toggel from "react-toggle/style.css"

const AllCompanyDetails = () => {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [touched, setTouched] = useState(false);
  const [addressError, setAddressError] = useState(true);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const handleSelectAddress = async (selectedAddress) => {
    try {
      formik.setFieldValue("land", selectedAddress);
      setAddress(selectedAddress);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleAddressError = () => {
    console.log("handle Address error: ", address);
    if (!address) {
      console.log("handle Address error: true");
      formik.setFieldError("land", "Address is required");
      setAddressError(true);
    } else {
      setAddressError(false);
    }
  };
  const [selectedCompany, setSelectedCompany] = useState(null);
  // State variables for popups
  const [deleteVisible, setDeleteVisible] = useState(false);
  useEffect(() => {
    if (!deleteVisible) {
      setSelectedCompany(null);
    }
  }, [deleteVisible]);
  const [editVisible, setEditVisible] = useState(false);
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedPayee, setSelectedPayee] = useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageLimit, setPageLimit] = React.useState(3);
  const [maxPage, setMaxPage] = React.useState(3);
  const [minPage, setMinPage] = React.useState(0);
  const recordPage = 10;
  const lastIndex = currentPage * recordPage;
  const firstIndex = lastIndex - recordPage;
  const data = company?.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(company?.length / recordPage);
  const number = [...Array(nPage + 1).keys()].slice(1);
  useEffect(() => {
    if (!editVisible) {
      setTouched(false);
      formik.resetForm();
    }
  }, [editVisible]);
  const pageNumber = number.map((num, i) => {
    if (num < maxPage + 1 && num > minPage) {
      return (
        <>
          <li
            key={i}
            className={currentPage == num ? `active_btn ` : `unactive_btn`}
          >
            <button onClick={() => changePage(num)}>{num}</button>
          </li>
        </>
      );
    } else {
      return null;
    }
  });

  const handlePrePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      if ((currentPage - 1) % pageLimit == 0) {
        setMaxPage(maxPage - pageLimit);
        setMinPage(minPage - pageLimit);
      }
    }
  };

  const handleNextPage = () => {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
      if (currentPage + 1 > maxPage) {
        setMaxPage(maxPage + pageLimit);
        setMinPage(minPage + pageLimit);
      }
    }
  };

  const changePage = (id) => {
    setCurrentPage(id);
  };

  let pageIncreament = null;
  if (data.length > maxPage) {
    pageIncreament = <li onClick={handleNextPage}>&hellip;</li>;
  }

  useEffect(() => {
    getCompanyDetail();
  }, [search]);

  const getCompanyDetail = () => {
    setLoading(true);
    getCompany({ role: "COMPANY", name: search })
      .then((res) => {
        console.log(res?.result, "company");
        if (res?.code === 200) {
          setCompany(res?.result);
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  };
  const deleteCompanyHandler = async (id) => {
    try {
      const deleteCompanyData = await deleteCompany(id);
      if (deleteCompanyData.code === 200) {
        toast.success(`${deleteCompanyData.message}`, {
          position: "top-right",
          autoClose: 1000,
        });
        const newCompanyData = company.filter((company) => company._id != id);
        setCompany(newCompanyData);
      } else {
        toast.success(`${deleteCompanyData.message}`, {
          position: "top-right",
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setDeleteVisible(false);
  };

  const handleClose = () => setShow(false);
  const handleShow = (company) =>{
     setShow(true);
     setSelectedPayee(company)
    };

  const initialValues = {
    _id: "",
    company_name: "",
    land: "",
    post_code: "",
    house_number: "",
    description: "",
    affiliated_with: "",
    phone: "",
    website: "",
    tx_quality_mark: "",
    first_name: "",
    last_name: "",
    p_number: "",
    email: "",
    commision: "",
  };

  const [inputData, setInputData] = useState({
    _id: "",
    company_name: "",
    land: "",
    post_code: "",
    house_number: "",
    description: "",
    affiliated_with: "",
    phone: "",
    website: "",
    tx_quality_mark: "",
    first_name: "",
    last_name: "",
    p_number: "",
    email: "",
    commision: "",
  });

  const validationSchema = Yup.object().shape({
    company_name: Yup.string()
      .trim()
      .min(2, "Company name should be at least 2 characters")
      .max(20, "Company name should be at most 20 characters")
      .matches(/^[^\d]+$/, "Company Name is not valid")
      .required("Company Name is required"),
    // land: Yup.string().trim().min(4).max(20).required("Land is required"),
    post_code: Yup.string().trim().max(10).required("Postcode is required"),
    house_number: Yup.string()
      .trim()
      .max(20)
      .required("Building number is required"),
    description: Yup.string()
      .trim()
      .min(4, "Description should be at least 4 characters")
      .max(100, "Description should be at most 100 characters")
      .required("Describe your taxi company is required"),
    affiliated_with: Yup.string().trim(),
    phone: Yup.string()
      .trim()
      .matches(/^[0-9]+$/, "Must be only digits")
      .required("Phone Number is required"),
    website: Yup.string()
      .trim()
      .url("Invalid URL format. Please enter a valid URL."),
    tx_quality_mark: Yup.string().trim(),
    first_name: Yup.string().trim().required("First Name is required"),
    last_name: Yup.string().trim().required("Last Name is required"),
    p_number: Yup.string()
      .trim()
      .min(6, "minimum length must be 6")
      .max(18, "max length must be 6")
      .matches(/^[0-9]+$/, "Must be only digits"),
    email: Yup.string().trim().email().required("Email Address is required"),
    commision: Yup.number()
      .typeError("Must be a number")
      // .required('Commision is required')
      .max(100, "Value must be lower than equal to 100"),
  });

  const handleValueCommission = (e) => {
    // console.log("handleValueCommission", e)
    const value = parseFloat(e.target.value);
    if (value > 100) {
      console.log("value must be lower than 100");
      formik.setFieldError("commision", "value must be lower than 100");
    } else {
      formik.setFieldValue(e.target.name, e.target.value);
      formik.setFieldTouched(e.target.name, true);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("values", values);
      if (address.length < 1) {
        setAddressError(true);
        setTouched(true);
        return;
      }
      const id = values._id;
      editCompanyDetail(id, {
        company_name: values.company_name,
        land: address,
        post_code: values.post_code,
        house_number: values.house_number,
        description: values.description,
        affiliated_with: values.affiliated_with,
        phone: values.phone,
        website: values.website,
        tx_quality_mark: values.tx_quality_mark,
        first_name: values.first_name,
        last_name: values.last_name,
        p_number: values.p_number,
        email: values.email,
        commision: values.commision,
      })
        .then((res) => {
          console.log("ressssssssssss", res);
          if (res.data.code == 200) {
            getCompanyDetail();
            setEditVisible(!editVisible);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  const handleInput = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleEdit = (id) => {
    getCompanydetailId(id)
      .then((res) => {
        console.log("company detail by id--------------", res);
        if (res?.code == 200) {
          let values = res.result;
          setAddress(values.land);
          setInputData(res.result);
          formik.setValues({ ...values });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const handleSubimtDetail = (e) => {
  //   e.preventDefault();
  //   console.log("input dataaaaaa", inputData);
  //   const id = inputData._id;
  //   editCompanyDetail(id, {
  //     company_name: inputData.company_name,
  //     land: inputData.land,
  //     post_code: inputData.post_code,
  //     house_number: inputData.house_number,
  //     description: inputData.description,
  //     affiliated_with: inputData.affiliated_with,
  //     phone: inputData.phone,
  //     website: inputData.website,
  //     tx_quality_mark: inputData.tx_quality_mark,
  //     first_name: inputData.first_name,
  //     last_name: inputData.last_name,
  //     tel_contact_number: inputData.p_number,
  //     email: inputData.email,
  //     commision: inputData.commision,
  //   })
  //     .then((res) => {
  //       console.log("ressssssssssss", res);
  //       if (res.data.code == 200) {
  //         getCompanyDetail();
  //         setEditVisible(!editVisible);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  function handleStatusChange(item) {
    editCompanyDetail(item._id, {
      status: !item.status,
    })
      .then((res) => {
        console.log("status changed", res);
        if (res.data.code === 200) {
          const newCompanyData = company.map((i) => {
            if (i._id == item._id) {
              i.status = !item.status;
              return i;
            }
            return i;
          });
          setCompany(newCompanyData);
        }
        toast.success(`${res.data.message}`, {
          position: "top-right",
          autoClose: 1000,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.warning(`${error.message}`, {
          position: "top-right",
          autoClose: 1000,
        });
      });
  }

  const handlePay = async()=>{
    const result = await payCommission({
      company_id: selectedPayee._id,
      amount
    })
    if(result?.code === 200 ){
      toast.success(`${result?.message}`, {
        position: "top-right",
        autoClose: 1000,
      });
      // const newCompany = [...company];
      // newCompany.forEach(item=>{
      //   if(item._id == company._id){
      //     item.totalBalance -= amount;
      //   }
      // })
      // setCompany(newCompany);
      getCompanyDetail();
      
    }else{
      toast.warning(`${result?.message}`, {
        position: "top-right",
        autoClose: 1000,
      });
    }
    handleClose()
    setSelectedPayee(null)
    setAmount("");

  }
  return (
    <>
      <div className="container-fluidd">
        <div className="col-md-12">
          <div>
            <SuperAdminSideBar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div className="body flex-grow-1 px-3">
                <h1 class="heading-for-every-page">Companies Details</h1>
                <div className="serach-left" id="company-search">
                  <MDBInputGroup>
                    <MDBInput
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                      placeholder="Search"
                    />
                    <button className="search-btn" onClick={getCompanyDetail}>
                      <MDBIcon icon="search" />
                    </button>
                  </MDBInputGroup>
                </div>
                <div class="active-trip-outer">
                  <div className="trips-head d-flex justify-content-between">
                    {/* <div className="box-shd d-flex justify-content-between">
                      <div className="left-trip-content">
                        <h2>Listing all Companies</h2>
                      </div>

                      <img src={refreshImg}/>
                      <img src={downarrowImg}/>
                      <img src={crossImg}/>
                      <div className="right-trip-content">
                        <Link to="/taxi/add-company">
                          <CButton className="add_company_btn">
                            Add Company
                          </CButton>
                        </Link>
                      </div>
                    </div> */}
                  </div>
                  {loading ? (
                    <AppLoader />
                  ) : (
                    <>
                      {data.length > 0 ? (
                        <CTable
                          align="middle"
                          className="mb-0"
                          hover
                          responsive
                        >
                          <CTableHead>
                            <CTableRow>
                              {/* <CTableHeaderCell className="text-center">
 <CIcon icon={cilPeople} />
 </CTableHeaderCell> */}
                              <CTableHeaderCell className="text-center">
                                S. No.
                              </CTableHeaderCell>
                              <CTableHeaderCell className="text-center">
                                Company ID
                              </CTableHeaderCell>
                              <CTableHeaderCell className="text-center">
                                Name
                              </CTableHeaderCell>
                              <CTableHeaderCell className="text-center">
                                Email
                              </CTableHeaderCell>
                              <CTableHeaderCell className="text-center">
                                Phone
                              </CTableHeaderCell>
                              <CTableHeaderCell className="text-center">
                                Status
                              </CTableHeaderCell>
                              <CTableHeaderCell className="text-center">
                                Action
                              </CTableHeaderCell>
                              
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            {data?.map((item, index) => (
                              <CTableRow
                                className="text-center"
                                v-for="item in tableItems"
                                key={item._id}
                              >
                                <CTableDataCell>
                                  <div>{firstIndex + index + 1}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                  <div>{item?.company_id}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                  <div>
                                    {item.first_name + " " + item.last_name}
                                  </div>
                                </CTableDataCell>
                                <CTableDataCell>
                                  <div>{item.email}</div>
                                </CTableDataCell>
                                <CTableDataCell>
                                  <div>{item.phone}</div>
                                </CTableDataCell>

                                <CTableDataCell>
                                  <Switch
                                    checkedIcon={false}
                                    uncheckedIcon={false}
                                    height={18}
                                    width={35}
                                    onChange={() => {
                                      handleStatusChange(item);
                                    }}
                                    checked={item.status}
                                  />
                                </CTableDataCell>
                                <CTableDataCell className="text-center company-list-icons">
                                  <CButton
                                    id="edit_company_btn"
                                    onClick={() => setEditVisible(!editVisible)}
                                  >
                                    {/* <div style={{cursor:"pointer"}} 
 onClick={()=>navigate(`/taxi/edit-company/${item._id}`)}
 ></div> */}
                                    <img
                                      src={editiconimg}
                                      alt="edit"
                                      onClick={() => handleEdit(item._id)}
                                    />
                                  </CButton>

                                  {/* <div style={{cursor:"pointer"}} onClick={()=>{
 deleteCompanyHandler(item._id);
 }}> </div> */}
                                  <CButton
                                    id="delete_company_btn"
                                    onClick={() => {
                                      setDeleteVisible(!deleteVisible);
                                      setSelectedCompany(item);
                                    }}
                                  >
                                    <img src={deleteiconimg} alt="delet" />
                                  </CButton>
                                  {/* <button> */}
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="25"
                                      height="25"
                                      fill="currentColor"
                                      className="bi bi-credit-card-fill mx-2 mt-1"
                                      viewBox="0 0 16 16"
                                      onClick={()=>handleShow(item)}
                                    >
                                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0zm0 3v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7zm3 2h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1" />
                                    </svg>
                                  {/* </button> */}
                                </CTableDataCell>
                               
                              </CTableRow>
                            ))}
                          </CTableBody>
                        </CTable>
                      ) : (
                        <EmptyData />
                      )}
                    </>
                  )}

                  {data?.length > 0 ? (
                    <div
                      className="pagination-outer"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div
                        className="prev_btn"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <button onClick={() => handlePrePage()}>
                          Previous
                        </button>
                      </div>
                      <div className="previous-page">
                        <ul>
                          {pageNumber}
                          <button className="dots_btn">{pageIncreament}</button>
                        </ul>
                      </div>
                      <div className="next_btn">
                        <button onClick={() => handleNextPage()}>Next</button>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* deletecompanypopup */}

                  <CModal
                    alignment="center"
                    visible={deleteVisible}
                    onClose={() => setDeleteVisible(false)}
                  >
                    {/* <CModalHeader>
 <CModalTitle>Edit Fare</CModalTitle>
 </CModalHeader> */}
                    <CModalBody>
                      <CRow>
                        <CCol xs={12}>
                          <CCard className="mb-4 delete_vehicle_popup">
                            <CCardBody>
                              <img src={deletepopup} alt="danger" />
                              <h2>Are you Sure</h2>
                              <p>You want to delete this Company ?</p>
                            </CCardBody>
                            <div className="delete_vehicle_popup_outer">
                              <CButton
                                className="delete_popup"
                                onClick={() => {
                                  deleteCompanyHandler(selectedCompany._id);
                                  setDeleteVisible(false);
                                }}
                              >
                                Delete
                              </CButton>
                              <CButton
                                className="cancel_popup"
                                onClick={() => {
                                  setDeleteVisible(false);
                                }}
                              >
                                Cancel
                              </CButton>
                            </div>
                          </CCard>
                        </CCol>
                      </CRow>
                    </CModalBody>
                  </CModal>

                  {/* enddeletecompanypopup */}

                  {/* EditCompanyPopup */}
                  <CModal
                    className="edit_company_popup"
                    alignment="center"
                    visible={editVisible}
                    onClose={() => setEditVisible(false)}
                  >
                    <CModalHeader>
                      <CModalTitle>Edit Company</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CRow>
                        <CCol xs={12}>
                          <CCard className="mb-4 edit_company_popup">
                            <CCardBody>
                              <form
                                noValidate
                                onSubmit={formik.handleSubmit}
                                className="row g-3"
                              >
                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputcname">
                                    Company Name
                                  </CFormLabel>
                                  <CFormInput
                                    aria-label="vehicle fare"
                                    value={inputData.company_name}
                                    // onChange={(e) => handleInput(e)}
                                    maxLength="50"
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
                                <CCol
                                  xs={6}
                                  onBlur={() => {
                                    setTouched(true);
                                  }}
                                >
                                  <CFormLabel htmlFor="inputtripfrom">
                                    Address
                                  </CFormLabel>
                                  <PlacesAutocomplete
                                    value={address}
                                    onChange={(data) => {
                                      console.log(data, " from place holder");
                                      setAddress(data);
                                      if (data.length < 1) {
                                        setAddressError(true);
                                      } else {
                                        setAddressError(false);
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
                                            console.log("Blur run");
                                          }}
                                          id="inputtripfrom"
                                          {...getInputProps({
                                            // placeholder: "Enter a location",
                                          })}
                                          className={clsx(
                                            "form-control bg-transparent",
                                            {
                                              "is-invalid":
                                                touched && addressError,
                                            },
                                            {
                                              "is-valid":
                                                touched && !addressError,
                                            }
                                          )}
                                        />
                                        {addressError && touched && (
                                          <div className="text-danger">
                                            Address is Required
                                          </div>
                                        )}
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
                                </CCol>
                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputpcode">
                                    Post Code
                                  </CFormLabel>
                                  <CFormInput
                                    aria-label="postcode"
                                    value={inputData.post_code}
                                    {...formik.getFieldProps("post_code")}
                                    maxLength="50"
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
                                    Building Number
                                  </CFormLabel>
                                  <CFormInput
                                    aria-label="housenumber"
                                    value={inputData.house_number}
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
                                    Describe Your Taxi Company
                                  </CFormLabel>
                                  <CFormInput
                                    aria-label="taxi company"
                                    value={inputData.description}
                                    {...formik.getFieldProps("description")}
                                    maxLength="50"
                                    className={clsx(
                                      "form-control bg-transparent",
                                      {
                                        "is-invalid":
                                          formik.touched.description &&
                                          formik.errors.description,
                                      },
                                      {
                                        "is-valid":
                                          formik.touched.description &&
                                          !formik.errors.description,
                                      }
                                    )}
                                    name="description"
                                    autoComplete="off"
                                  />
                                  {formik.errors.description &&
                                  formik.touched.description ? (
                                    <div className="text-danger">
                                      {formik.errors.description}
                                    </div>
                                  ) : null}
                                </CCol>
                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputcommision">
                                    Commission in (%)
                                  </CFormLabel>
                                  <CFormInput
                                    type="number"
                                    step="0.01"
                                    aria-label="commision"
                                    value={inputData?.commision}
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
                                  {formik.errors.commision &&
                                  formik.touched.commision ? (
                                    <div className="text-danger">
                                      {formik.errors.commision}
                                    </div>
                                  ) : null}
                                </CCol>
                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputaffi">
                                    Affiliated with
                                  </CFormLabel>
                                  <CFormInput
                                    aria-label="Affiliated"
                                    value={inputData.affiliated_with}
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
                                    Phone Number
                                  </CFormLabel>
                                  <CFormInput
                                    aria-label="phone number"
                                    maxLength="50"
                                    value={inputData.phone}
                                    {...formik.getFieldProps("phone")}
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
                                  {formik.errors.phone &&
                                  formik.touched.phone ? (
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
                                    value={inputData.website}
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
                                    maxLength="50"
                                    value={inputData.tx_quality_mark}
                                    {...formik.getFieldProps("tx_quality_mark")}
                                    className={clsx(
                                      "form-control bg-transparent",
                                      {
                                        "is-invalid":
                                          formik.touched.tx_quality_mark &&
                                          formik.errors.tx_quality_mark,
                                      },
                                      {
                                        "is-valid":
                                          formik.touched.tx_quality_mark &&
                                          !formik.errors.tx_quality_mark,
                                      }
                                    )}
                                    name="tx_quality_mark"
                                    autoComplete="off"
                                  />
                                  {formik.errors.tx_quality_mark &&
                                  formik.touched.tx_quality_mark ? (
                                    <div className="text-danger">
                                      {formik.errors.tx_quality_mark}
                                    </div>
                                  ) : null}
                                </CCol>
                                <CCol md={12} className="row add_company_row">
                                  <CCol md={6}>
                                    <CFormLabel htmlFor="inputfname">
                                      First Name
                                    </CFormLabel>
                                    <CFormInput
                                      id="f_name"
                                      maxLength="50"
                                      value={inputData.first_name}
                                      {...formik.getFieldProps("first_name")}
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
                                      Last Name
                                    </CFormLabel>
                                    <CFormInput
                                      id="l_name"
                                      maxLength="50"
                                      value={inputData.last_name}
                                      {...formik.getFieldProps("last_name")}
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
                                </CCol>

                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputcon_num">
                                    Telephone Number
                                  </CFormLabel>
                                  <CFormInput
                                    id="tel_Con_nu"
                                    maxLength="50"
                                    value={inputData.p_number}
                                    {...formik.getFieldProps("p_number")}
                                    className={clsx(
                                      "form-control bg-transparent",
                                      {
                                        "is-invalid":
                                          formik.touched.p_number &&
                                          formik.errors.p_number,
                                      },
                                      {
                                        "is-valid":
                                          formik.touched.p_number &&
                                          !formik.errors.p_number,
                                      }
                                    )}
                                    name="p_number"
                                    autoComplete="off"
                                  />
                                  {formik.errors.p_number &&
                                  formik.touched.p_number ? (
                                    <div className="text-danger">
                                      {formik.errors.p_number}
                                    </div>
                                  ) : null}
                                </CCol>
                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputmailaddress">
                                    Email Address
                                  </CFormLabel>
                                  <CFormInput
                                    id="email_address"
                                    maxLength="50"
                                    {...formik.getFieldProps("email")}
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
                                  {formik.errors.email &&
                                  formik.touched.email ? (
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
                                    <CButton
                                      type="submit"
                                      // onClick={(e) => handleSubimtDetail(e)}
                                      className="submit-btn"
                                    >
                                      Submit
                                    </CButton>
                                    <CButton
                                      type="button"
                                      onClick={() =>
                                        setEditVisible(!editVisible)
                                      }
                                      className="cancel-btn"
                                    >
                                      Cancel
                                    </CButton>
                                  </div>
                                </CCol>
                              </form>
                            </CCardBody>
                            {/* <div className="delete_vehicle_popup_outer">
 

 <CButton className="delete_popup"
 
 >Delete</CButton>
 <CButton className="cancel_popup" onClick={() => setVisible(false)}>
 Cancel</CButton>
 </div> */}
                          </CCard>
                        </CCol>
                      </CRow>
                    </CModalBody>
                  </CModal>

                  {/* EndEditcompanypopup */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title class="balance-heading">Total Balance: {selectedPayee?.totalBalance}€</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CFormLabel htmlFor="inputcname">
            Pay Commission €<span class="asterisk-mark">*</span>
          </CFormLabel>
          <CFormInput
          type="number"
            aria-label="vehicle fare"
            value={amount}
            onChange={e=>setAmount(e.target.value)}
            className={clsx(
              "form-control bg-transparent",
              {
                "is-invalid":
                  formik.touched.company_name && formik.errors.company_name,
              },
              {
                "is-valid":
                  formik.touched.company_name && !formik.errors.company_name,
              }
            )}
            name="company_name"
            autoComplete="off"
          />
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <button className="pay-btn" onClick={()=>{
            handlePay()
            
          }
          }>
            Pay
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AllCompanyDetails;
