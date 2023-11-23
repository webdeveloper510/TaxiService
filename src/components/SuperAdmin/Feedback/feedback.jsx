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
                                                    {feedback.map((item) => {
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