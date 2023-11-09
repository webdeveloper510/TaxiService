import React, {useEffect, useState} from "react";
import Header from "../Header/Header";
import Footer from "../Footer/footer";
import bookingCar from '../../assets/images/booking-car.png'
import bookingImg from '../../assets/images/booking-header.png';
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
    CRow,
  } from '@coreui/react'
  import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
//import background from '../assets/images/heroimg.png';
    const BookingForm = () => {
        function customSetHours(date, hour) {
          if (date instanceof Date) {
            const newDate = new Date(date);
            newDate.setHours(hour);
            return newDate;
          } else {
            throw new Error('Invalid Date object');
          }
        }
      
        function customSetMinutes(date, minute) {
          if (date instanceof Date) {
            const newDate = new Date(date);
            newDate.setMinutes(minute);
            return newDate;
          } else {
            throw new Error('Invalid Date object');
          }
        }
      
        const [pickupDate, setPickupDate] = useState(new Date());
        useEffect(() => {
          const today = new Date();
          if (pickupDate.toDateString() === today.toDateString()) {
            setCurrentTime({
              hour: today.getHours(),
              minute: today.getMinutes() + 1,
            });
          } else {
            setCurrentTime({
              hour: 0,
              minute: 0
            });
          }
        }, [pickupDate]);
      
        const [currentTime, setCurrentTime] = useState({
          hour: (new Date()).getHours(),
          minute: (new Date()).getMinutes() + 1,
        });

      return (
        <>
        <Header />
        <div className="main-page">
        <div class="container-outer">
            <section className="booking-section-form">
        <div className="hero-banner" id="bookimg-header">
          <div className="hero"><img src={bookingImg} className="heri-img" alt="banner" /></div>
          <div class="row booking-content col-md-12">
              <div class="banner-inner-text col-md-6">
            <h3>Welcome to Hotel Sky </h3>

            <CRow>
                    <CCol xs={12}>
                      <CCard className="mb-4">
                        {/* <CCardHeader>
                          <strong>Add Trip Details</strong>
                        </CCardHeader> */}
                        <CCardBody>
                          <CForm className="row g-3">
                            <CCol md={6}>
                              <CFormLabel htmlFor="inputvehicletype">
                                Vehicle Type
                              </CFormLabel>
                              <CFormSelect
                                name="vehicle"
                              >
                                <option default>Select Vehicle</option>                              
                              </CFormSelect> 
                            </CCol>

                            <CCol md={6}>
                              <CFormLabel htmlFor="inputpickupdate">
                                Pickup Date and Time
                              </CFormLabel>
                              <br />
                              <DatePicker
                                selected={pickupDate}
                                className="form-control"
                                showTimeSelect
                                timeIntervals={5}
                                minTime={customSetHours(customSetMinutes(new Date(), currentTime.minute), currentTime.hour)}
                                maxTime={customSetHours(customSetMinutes(new Date(), 59), 23)}
                                dateFormat="MM/dd/yyyy hh:mm a"
                                minDate={new Date()}
                                onChange={(date) => setPickupDate(date)}
                              />
                            </CCol>

                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputtripfrom">
                                Trip From
                              </CFormLabel>
                          
                               <CFormInput id="inputtripfrom" name="trip_from" />        
                           
                           
                            </CCol>
                            <CCol xs={6}>
                              <CFormLabel htmlFor="inputtripto">
                                Trip To
                              </CFormLabel>
                             <CFormInput id="inputtripto" name="trip_to" /> 
                             
                            
                            </CCol>

                            <CCol xs={12}>
                      <div
                        className="d-flex justify-content-center"
                        style={{ marginTop: "40px" }}
                      >
                        <CButton
                          type="button"
                          className="confirm_boking_btn"
                        >
                         Confirm Booking
                        </CButton>
                      </div>
                    </CCol>
                          </CForm>
                        </CCardBody>
                      </CCard>
                    </CCol>
                  </CRow>
            
            </div>

            <div className="booking-right-content col-md-6">
                <img src={bookingCar} />
            </div>
       
          </div>
        </div>
        </section>
        
        
        </div>
        </div>
        <div class="booking-footer">
        <Footer />
        </div>
        </>
      );
    };
  
   export default BookingForm; 