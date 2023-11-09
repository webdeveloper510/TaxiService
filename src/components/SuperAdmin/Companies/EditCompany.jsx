import deletepopup from "../../../assets/images/deletepopup.png";
import React, { useEffect, useState } from "react";
import AppHeader from "../../TopBar/AppHeader";
import { Link, useNavigate } from "react-router-dom";
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
import SuperAdminSideBar from "../Sidebar/SideBar";
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
    // action: { checkicon: checkiconimg },
  },
];
const EditCompanyDetails = () => {
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
  }, []);

  const getCompanyDetail = () => {
    setLoading(true);
    getCompany()
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
    tel_contact_number: "",
    email: "",
  });

  const handleInput = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleEdit = (id) => {
    getCompanydetailId(id)
      .then((res) => {
        console.log("company detail by id--------------", res);
        if (res?.code == 200) {
          setInputData(res.result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubimtDetail = (e) => {
    e.preventDefault();
    console.log("input dataaaaaa", inputData);
    const id = inputData._id;
    editCompanyDetail(id, {
      company_name: inputData.company_name,
      land: inputData.land,
      post_code: inputData.post_code,
      house_number: inputData.house_number,
      description: inputData.description,
      affiliated_with: inputData.affiliated_with,
      phone: inputData.phone,
      website: inputData.website,
      tx_quality_mark: inputData.tx_quality_mark,
      first_name: inputData.first_name,
      last_name: inputData.last_name,
      tel_contact_number: inputData.p_number,
      email: inputData.email,
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
  };
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
          <SuperAdminSideBar/>
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
              <AppHeader />
              <div className="body flex-grow-1 px-3">
                <h1 class="heading-for-every-page">Edit Company Details</h1>
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

                  {/* <CModal
                    alignment="center"
                    visible={deleteVisible}
                    onClose={() => setDeleteVisible(false)}
                  > */}
                    {/* <CModalHeader>
 <CModalTitle>Edit Fare</CModalTitle>
 </CModalHeader> */}
                    {/* <CModalBody>
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
                  </CModal> */}

                  {/* enddeletecompanypopup */}
                      <CRow>
                        <CCol xs={12}>
                          <CCard className="mb-4 edit_company_popup">
                            <CCardBody>
                              <form noValidate className="row g-3">
                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputcname">
                                    Company Name
                                  </CFormLabel>
                                  <CFormInput
                                    aria-label="vehicle fare"
                                    value={inputData.company_name}
                                    onChange={(e) => handleInput(e)}
                                    maxLength="50"
                                    className="form-control bg-transparent"
                                    name="company_name"
                                    autoComplete="off"
                                  />
                                </CCol>
                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputland">
                                    Land
                                  </CFormLabel>
                                  <CFormInput
                                    aria-label="land"
                                    maxLength="50"
                                    value={inputData.land}
                                    onChange={(e) => handleInput(e)}
                                    className="form-control bg-transparent"
                                    name="land"
                                    autoComplete="off"
                                  />
                                </CCol>
                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputpcode">
                                    Post Code
                                  </CFormLabel>
                                  <CFormInput
                                    aria-label="postcode"
                                    maxLength="50"
                                    value={inputData.post_code}
                                    onChange={(e) => handleInput(e)}
                                    className="form-control bg-transparent"
                                    name="post_code"
                                    autoComplete="off"
                                  />
                                </CCol>
                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputhousenum">
                                    Building Number
                                  </CFormLabel>
                                  <CFormInput
                                    aria-label="housenumber"
                                    value={inputData.house_number}
                                    onChange={(e) => handleInput(e)}
                                    maxLength="50"
                                    className="form-control bg-transparent"
                                    name="house_number"
                                    autoComplete="off"
                                  />
                                </CCol>

                                <CCol md={12}>
                                  <CFormLabel htmlFor="inputtxinum">
                                    Describe Your Taxi Company
                                  </CFormLabel>
                                  <CFormInput
                                    aria-label="taxi company"
                                    maxLength="50"
                                    value={inputData.description}
                                    onChange={(e) => handleInput(e)}
                                    className="form-control bg-transparent"
                                    name="description"
                                    autoComplete="off"
                                  />
                                </CCol>

                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputaffi">
                                    Affiliated with
                                  </CFormLabel>
                                  <CFormInput
                                    aria-label="Affiliated"
                                    maxLength="50"
                                    value={inputData.affiliated_with}
                                    onChange={(e) => handleInput(e)}
                                    className="form-control bg-transparent"
                                    name="affiliated_with"
                                    autoComplete="off"
                                  />
                                </CCol>
                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputphnnum">
                                    Phone Number
                                  </CFormLabel>
                                  <CFormInput
                                    aria-label="phone number"
                                    maxLength="50"
                                    value={inputData.phone}
                                    onChange={(e) => handleInput(e)}
                                    className="form-control bg-transparent"
                                    name="phone"
                                    autoComplete="off"
                                  />
                                </CCol>
                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputwebsite">
                                    Website
                                  </CFormLabel>
                                  <CFormInput
                                    id="webt_site"
                                    maxLength="50"
                                    value={inputData.website}
                                    onChange={(e) => handleInput(e)}
                                    className="form-control bg-transparent"
                                    name="website"
                                    autoComplete="off"
                                  />
                                </CCol>
                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputquality">
                                    TX Quality Mark
                                  </CFormLabel>
                                  <CFormInput
                                    id="iput_quality"
                                    maxLength="50"
                                    value={inputData.tx_quality_mark}
                                    onChange={(e) => handleInput(e)}
                                    className="form-control bg-transparent"
                                    name="tx_quality_mark"
                                    autoComplete="off"
                                  />
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
                                      onChange={(e) => handleInput(e)}
                                      className="form-control bg-transparent"
                                      name="first_name"
                                      autoComplete="off"
                                    />
                                  </CCol>
                                  <CCol md={6}>
                                    <CFormLabel htmlFor="inputlname">
                                      Last Name
                                    </CFormLabel>
                                    <CFormInput
                                      id="l_name"
                                      maxLength="50"
                                      value={inputData.last_name}
                                      onChange={(e) => handleInput(e)}
                                      className="form-control bg-transparent"
                                      name="last_name"
                                      autoComplete="off"
                                    />
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
                                    onChange={(e) => handleInput(e)}
                                    className="form-control bg-transparent"
                                    name="p_number"
                                    autoComplete="off"
                                  />
                                </CCol>
                                <CCol md={6}>
                                  <CFormLabel htmlFor="inputmailaddress">
                                    Email Address
                                  </CFormLabel>
                                  <CFormInput
                                    id="email_address"
                                    maxLength="50"
                                    className="form-control bg-transparent"
                                    name="email"
                                    value={inputData.email}
                                    onChange={(e) => handleInput(e)}
                                    autoComplete="off"
                                  />
                                </CCol>

                                <CCol md={12}>
                                  <div
                                    className="d-flex justify-content-center"
                                    style={{ marginTop: "40px" }}
                                  >
                                    <CButton
                                      type="button"
                                      onClick={(e) => handleSubimtDetail(e)}
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

export default EditCompanyDetails;