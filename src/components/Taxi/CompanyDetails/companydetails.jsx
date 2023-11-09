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
} from "../../../utils/api";
import AppLoader from "../../AppLoader";
import { capitalLine } from "../../../utils/helpingFunction";
import { ClipLoader } from "react-spinners";
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
// import toggel from "react-toggle/style.css"
const tableExample = [
  {
    SrNo: "1",
    companyId: "ID123",
    companyname: "Mahindra",
    postcode: "45622",
    vehiclenumber: "12",
    address: "34,Alex Street",
    // action: { checkicon: checkiconimg },
  },

  {
    SrNo: "1",
    companyId: "ID456",
    companyname: "TATA",
    postcode: "45236",
    vehiclenumber: "10",
    address: "34,Alex Street",
    requestTrip: "richa",
    // action: { checkicon: checkiconimg },
  },
];
const CompanyDetails = () => {
 const [address, setAddress] = useState("");
  const [touched, setTouched] = useState(false)
  const [addressError, setAddressError] = useState(true);
  const handleSelectAddress = async (selectedAddress) => {
    try {
      formik.setFieldValue("land", selectedAddress )
      setAddress(selectedAddress)
      
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleAddressError = ()=>{
    console.log("handle Address error: ", address)
    if(!address){
      console.log("handle Address error: true")
      formik.setFieldError("land","Address is required")
      setAddressError(true);
    }
    else{
      setAddressError(false)
    }
  }
  const [confirmationVisible, setconfirmationVisible] = useState(false);
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
  const [inputData, setInputData] = useState({
    _id: "",
    company_name: "",
    land: "",
    post_code: "",
    description: "",
    phone: "",
    website: "",
    first_name: "",
    last_name: "",
    tel_contact_number: "",
    email: "",
    commision: "",
    requestTrip: "",
  });

  console.log("input dataaaaaaaaaaa", inputData)

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
    tel_contact_number: "",
    email: "",
    commision: "",
    requestTrip: "",
  };

  const validationSchema = Yup.object().shape({
    company_name: Yup.string()
      // .min(2,"Customer Name is must be greater than 2")
      .max(50,"Customer Name is must be less than 50")
      .required("Customer Name is required"),
    // land: Yup.string().min(4).max(20).required("Land is required"),
    post_code: Yup.string().max(10).required("Postcode is required"),
    // description: Yup.string()
    //   .min(4)
    //   .max(100)
    //   .required("Describe your hotel is required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .required("Phone number is required"),
    // website: Yup.string()
    //   .url("Invalid URL format. Please enter a valid URL.")
    //   .required("Website is required"),
    // first_name: Yup.string().required("First Name is required"),
    // last_name: Yup.string().required("Last Name is required"),
    // p_number: Yup.string()
    //   .min(6, "minimum length must be 6")
    //   .max(18, "max length must be 6")
    //   .matches(/^[0-9]+$/, "Must be only digits")
    //   .required("Tel Contact Number is required"),
    email: Yup.string().email().required("Email Address is required"),
    // commision: Yup.number()
    //   .typeError('Must be a number')
    //   .required('Number is required')
    //   .max(100, 'Value must be lower than equal to 100')
  });
  const [formLoader , setFormLoader] = useState(false)
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setFormLoader(true)
      console.log("values", values);
      const id = values._id
      editCompanyDetail(id, {
        company_name: values.company_name,
        land: values.land,
        post_code: values.post_code,
        // house_number: values.house_number,
        // description: values.description,
        // affiliated_with: values.affiliated_with,
        phone: values.phone,
        // website: values.website,
        // tx_quality_mark: values.tx_quality_mark,
        // first_name: values.first_name,
        // last_name: values.last_name,
        // tel_contact_number: values.p_number,
        email: values.email,
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
        }).finally(()=>{
          setFormLoader(false)
        });
    },
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
  const [search , setSearch] = useState("");
useEffect(() =>{getCompanyDetail()},[])
  const getCompanyDetail = () => {
    setLoading(true);
    getCompany({role:"HOTEL",name:search})
      .then((res) => {
        console.log(res?.result, "company");

        if (res?.code === 200) {
          const values = res?.result
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

  

  const handleInput = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleEdit = (id) => {
    getCompanydetailId(id)
      .then((res) => {
        console.log("company detail by id--------------", res);
        if (res?.code == 200) {
          setInputData(res.result);
          setAddress(res?.result?.land)
          const values = res.result
          formik.setValues({ ...values })
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
          const newCompanyData = company.map((i)=>{
            if(i._id == item._id) {
              i.status = !item.status;
              return i;
            }
            return i
          })
          setCompany(newCompanyData)
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
  return (
    <>
      <div className="container-fluidd">
        <div className="col-md-12">
          <div>
            <Sidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div className="body flex-grow-1 px-3">
                <h1 class="heading-for-every-page">All Customers</h1>
                <div className="serach-left" id="customers-search">
                <MDBInputGroup>
      <MDBInput placeholder="Search"
      value={search} onChange={(e)=>{
        if(e.target.value === "") getCompanyDetail()
        setSearch(e.target.value)
      }} 
      />
    <button className="search-btn"
    onClick={getCompanyDetail}
    >
        <MDBIcon icon='search' />
      </button>
    </MDBInputGroup></div>
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
                    <CTable align="middle" className="mb-0" hover responsive>
                      <CTableHead>
                        <CTableRow>
                          {/* <CTableHeaderCell className="text-center">
 <CIcon icon={cilPeople} />
 </CTableHeaderCell> */}
                          <CTableHeaderCell className="text-center">
                            S. No.
                          </CTableHeaderCell>
                          <CTableHeaderCell className="text-center">
                            Hotel ID
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
                          <CTableHeaderCell className="text-center">
                           Request Trip
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
                                {capitalLine(item?.company_name)}
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
             
                                <img
                                  src={editiconimg}
                                  alt="edit"
                                  onClick={() => handleEdit(item._id)}
                                />{" "}
                              </CButton>
                              <CButton
                                id="delete_company_btn"
                                onClick={() => {
                                  setDeleteVisible(!deleteVisible);
                                  setSelectedCompany(item);
                                }}
                              >
                                <img src={deleteiconimg} alt="delet" />
                              </CButton>
                            </CTableDataCell>

                            <CTableDataCell>
                              <div><span><CButton  id="confirmation_btn" onClick={() => {
                                  setconfirmationVisible(!confirmationVisible);
                                  
                                }}><a href="#">Request Trip</a></CButton></span></div>
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>
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
                              <p>You want to delete this Hotel ?</p>
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
                  <CModal className="edit_company_popup"
                    alignment="center"
                    visible={editVisible}
                    onClose={() => setEditVisible(false)}
                  >
                    <CModalHeader>
                      <CModalTitle>Edit Customer</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CRow>
                        <CCol xs={12}>
                          <CCard className="mb-4 edit_company_popup">
                            <CCardBody>
                              <form noValidate onSubmit={formik.handleSubmit} className="row g-3">
                              <CCol md={6}>
                              <CFormLabel htmlFor="inputcname">
                                Hotel ID
                              </CFormLabel>
                              <CFormInput
                                aria-label="Hotel ID"
                                maxLength="50"
                                className=
                                  "form-control bg-transparent"  
                                name="hotel_name"
                                autoComplete="off"
                              />
                            
                            </CCol>
                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputcname">
                                    Customer Name
                                  </CFormLabel>
                                  <CFormInput
                                    aria-label="vehicle fare"
                                    value={inputData.company_name}
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
                            onBlur={()=>{
                              setTouched(true)
                            }}
                            >
                              <CFormLabel htmlFor="inputtripfrom">
                                Address
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
                             
                              
                              </CCol>
                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputpcode">
                                    Post Code
                                  </CFormLabel>
                                  <CFormInput
                                    aria-label="postcode"
                                    maxLength="50"
                                    value={inputData.post_code}
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
                                  <CFormLabel htmlFor="inputphnnum">
                                    Phone Number
                                  </CFormLabel>
                                  <CFormInput
                                  type="number"
                                    aria-label="phone number"
                                  
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
                                  <CFormLabel htmlFor="inputmailaddress">
                                    Email Address
                                  </CFormLabel>
                                  <CFormInput
                                    id="email_address"
                                    value={inputData.email}
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
                                   <CButton type="submit" className="submit-btn">
                                  {formLoader?<ClipLoader color="#000000" />:"Submit"}
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
                      
                          </CCard>
                        </CCol>
                      </CRow>
                    </CModalBody>
                  </CModal>

                  {/* EndEditcompanypopup */}


                  {/* Confirmationcompanypopup */}


                  <CModal
                    alignment="center"
                    visible={confirmationVisible}
                    onClose={() => setconfirmationVisible(false)}
                  >
                    {/* <CModalHeader>
 <CModalTitle>Edit Fare</CModalTitle>
 </CModalHeader> */}
                    <CModalBody>
                      <CRow>
                        <CCol xs={12}>
                          <CCard className="mb-4 delete_vehicle_popup" id="confirmation_customer_popup">
                            <CCardBody>
                              <img src={deletepopup} alt="danger" />
                              <h2>Are you Sure</h2>
                              <p>You want to Request a new Trip ?</p>
                            </CCardBody>
                            <div className="delete_vehicle_popup_outer">
                              <CButton
                                className="delete_popup"
                                onClick={() => {
                                  
                                  setconfirmationVisible(false);
                                }}
                              >
                                Delete
                              </CButton>
                              <CButton
                                className="cancel_popup"
                                onClick={() => {
                                  setconfirmationVisible(false);
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

                  {/* Endcompanycompanypopup */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyDetails;