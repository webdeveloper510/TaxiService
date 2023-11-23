import React, { useEffect, useState } from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Accordion from 'react-bootstrap/Accordion';
import clsx from "clsx";
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
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBInput,
    MDBCheckbox,
} from "mdb-react-ui-kit";
import { useNavigate } from 'react-router';
import SuperAdminSideBar from '../Sidebar/SideBar';
import AppHeader from '../../TopBar/AppHeader';
import { getFeedback } from '../../../utils/api';
import moment from 'moment';

const FeedbackMsj = () => {

    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState([]);
    useEffect(() => {
        setLoading(true);
        getFeedback().then((res) => {
            if (res?.code === 200) {
                setFeedback(res?.result);
                console.log(res?.result, "feedbacks");
            }
        }).finally(() => { setLoading(false); });
    }, [])

    const [currentPage, setCurrentPage] = React.useState(1);
    const [pageLimit, setPageLimit] = React.useState(3);
    const [maxPage, setMaxPage] = React.useState(3);
    const [minPage, setMinPage] = React.useState(0);
    const recordPage = 10;
    const lastIndex = currentPage * recordPage;
    const firstIndex = lastIndex - recordPage;
    const data = feedback?.slice(firstIndex, lastIndex);
    const nPage = Math.ceil(feedback?.length / recordPage);
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


    return (
        <>
            <div>
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
                                    <h1 class="heading-for-every-page">Feedback</h1>

                                    <CRow>
                                        {/* <CCol xs={2}></CCol> */}
                                        <CCol xs={12}>
                                            <div class="active-trip-outer mx-5 p-4">
                                                <Accordion>
                                                    {data?.map((item) => {
                                                        return <Accordion.Item
                                                            key={item._id} eventKey={item._id}>
                                                            <Accordion.Header><span>{item?.company_name} </span><span>{moment(item?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span></Accordion.Header>
                                                            <Accordion.Body>
                                                                {item.comment}
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    })}
                                                </Accordion>

                                              
                                            </div>
                                            {data?.length > 0 ? (
                                                    <div
                                                        className="pagination-outer me-5"
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
                                                            {
                                                                currentPage == 1?" ":  <button onClick={() => handlePrePage()}>
                                                                Previous
                                                            </button>
                                                            }
                                                          
                                                        </div>
                                                        <div className="previous-page">
                                                            <ul>
                                                                {pageNumber}
                                                                <button className="dots_btn">{pageIncreament}</button>
                                                            </ul>
                                                        </div>
                                                        <div className="next_btn">
                                                        {
                                                                currentPage !== 1?" ":  <button onClick={() => handleNextPage()}>Next</button>
                                                            }
                                                            
                                                        </div>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                        </CCol>
                                        {/* <CCol xs={2}></CCol> */}
                                    </CRow>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeedbackMsj