import React, { useContext, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import AppHeader from "../TopBar/AppHeader";
import SidebarDriver from "./Sidebar";
import { DataGrid, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import { Box, Tooltip } from "@mui/material";
import { getPastTripsdriver, payTripCommission } from "../../utils/api";
import moment from "moment";
import AppLoader from "../AppLoader";
import html2pdf from 'html2pdf.js';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { generateInvoiceHtml } from "../../utils/pdfHtml";
import userContext from "../../utils/context";



const PastTrips = ({type}) => {
  const navigate = useNavigate();
  const {user, setUser} = useContext(userContext)
  const [trips,setTrips] = useState([])
  const CompleteStripePayment= (tripId)=>{
    payTripCommission(tripId).then((res)=>{
      console.log("🚀 ~ file: PastTrips.jsx:25 ~ payTripCommission ~ res:", res)
      if(res?.code == 200){
        const data = res.result;
        console.log("🚀 ~ file: PastTrips.jsx:27 ~ payTripCommission ~ data:", data)
        window.location.href = data.url
      }
    })
  }
  const columns = [
    {
      field: 'serial' , 
      headerName: 'S. No.', 
      width: 100,
      
  },
    { field: "trip_id", headerName: "Trip ID", width: 100 },
    {
      field: "vehicle_type",
      headerName: "Vehicle Type",
      width: 200,
     
    },
    {
      field: "date",
      headerName: "Pickup Date Time",
      width: 300,
      valueGetter: (params) =>moment(params.row.pickup_date_time).format(
        "MMMM Do YYYY, h:mm a"
      )  ,
      
    },
    // {
    //   field: "time",
    //   headerName: "Time",
    //   width: 200,
    //   valueGetter: (params) =>moment(params.row.pickup_date_time).format(
    //     "h:mm a"
    //   )  ,
      
    // },
    {
      field: "company_name",
      headerName: "Customer",
      width: 200,
      
      // type: "number",
    },
    {
      field: "trip_from",
      headerName: "Trip From",
      width: 200,
      renderCell:(params) => renderCellContent( params.row.trip_from.address) ,
      valueGetter: (params) => params.row.trip_from.address
      // type: "number",
    },
    {
      field: "trip_to",
      headerName: "Trip To",
      width: 200,
      renderCell:(params) => renderCellContent( params.row.trip_to.address) ,
      valueGetter: (params) => params.row.trip_to.address ,
      // type: "number",
    },
    {
      field: 'showDetail',
      headerName: 'Action',
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Link
          style={{
            // margin: "auto"
          }}
          to={`/trips/view-trip-details/${params.row._id}`}
        >
          <button style={{
            width:"40px",
            height:"40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff2cf",
            
          }} className="submit-btn">
           
        <svg xmlns="http://www.w3.org/2000/svg" width="90px" height="90px"fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
</svg>
        </button>
        </Link>
      ),
    },
    {
      field: 'pay',
      headerName: 'Pay Commission',
      width: 150,
      filterable: false,
      renderCell: (params) => (
        params.row.is_paid?
        <span style={{
          fontWeight:"bold"
        }}> Paid</span> : <button
          onClick={() =>{
            CompleteStripePayment(params.row._id)
          }}
          style={{
            width:"40px",
            height:"40px",
            display: "flex",
            
            justifyContent: "center",
            backgroundColor: "#fff2cf",
            marginLeft: "0px"
          }} className="submit-btn">
           
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-credit-card-fill" viewBox="0 0 16 16">
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0zm0 3v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7zm3 2h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1"/>
</svg>
        </button>
    
      ),
      valueGetter: (params) =>params.row.is_paid? "Paid" : "Unpaid"
    },
  ];
  const paymentColumns = [
    {
      field: 'serial' , 
      headerName: 'S. No.', 
      width: 100,
      
  },
    { field: "trip_id", headerName: "Trip ID", width: 100 },
    
    {
      field: "date",
      headerName: "Pickup Date Time",
      width: 300,
      valueGetter: (params) =>moment(params.row.pickup_date_time).format(
        "MMMM Do YYYY, h:mm a"
      )  ,
      
    },
    // {
    //   field: "time",
    //   headerName: "Time",
    //   width: 200,
    //   valueGetter: (params) =>moment(params.row.pickup_date_time).format(
    //     "h:mm a"
    //   )  ,
      
    // },
  
    {
      field: "trip_from",
      headerName: "Trip From",
      width: 200,
      renderCell:(params) => renderCellContent( params.row.trip_from.address) ,
      valueGetter: (params) => params.row.trip_from.address ,
      // type: "number",
    },
    {
      field: "trip_to",
      headerName: "Trip To",
      width: 200,
      renderCell:(params) => renderCellContent( params.row.trip_to.address) ,
      valueGetter: (params) => params.row.trip_to.address ,
      // type: "number",
    },
    {
      field: "pay_option",
      headerName: "Pay option",
      width: 200,
     
    },
    {
      field: "price",
      headerName: "Total Price in Euro",
      width: 200,
     
    },
    {
      field: "earning",
      headerName: "Earning in Euro",
      width: 200,
      valueGetter: (params) =>{
        const comType = params.row.commission.commission_type;
        const value = params.row.commission.commission_value;
        if(comType =="Percentage"){
          return `${params.row.price - (params.row.price*value)/100}`;
        }
        return params.row.price - value
      }
     
    },
    {
      field: "commission",
      headerName: "Commission",
      width: 200,
      valueGetter: (params) =>{
        const comType = params.row.commission.commission_type;
        const value = params.row.commission.commission_value;
        if(comType =="Percentage"){
          return `${value}%`;
        }
        return value
      }
     
    },
    
    {
      field: 'invoice',
      headerName: 'Invoice',
      width: 150,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        
          <button style={{
            width:"40px",
            height:"40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff2cf"
          }}
          onClick={()=>downloadPdf(params.row,user)} className="submit-btn"><svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
        </svg></button>
        
      ),
    },
  
  ];
  const [loader, setLoader] = useState(false);

  const downloadPdf = (trip, user) => {
    // Get the HTML content as a string
 
    const data = {
      _id: trip.trip_id,
      tripFrom: trip.trip_from.address,
      tripTo: trip.trip_to.address,
      price: trip.price,
      customerName: trip.company_name,
      driverPhone: user.phone,
      driverName: `${user.first_name} ${user.last_name}`,
      payOption: trip.pay_option,
      vehicleTrip: trip.vehicle_type,
      pickupDate: moment(trip.pickup_date_time).format("MMMM Do YYYY, h:mm a"),
    };
  
    const htmlString = generateInvoiceHtml(data);
  
    const pdf = new jsPDF();
  
    // Create a detached container for rendering the HTML string
    const container = document.createElement("div");

    container.innerHTML = htmlString;
   
    // Append the container to the document body to ensure rendering
    document.body.appendChild(container);
  
    // Wait for a short time for the content to be fully rendered
   
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
  
      // Convert the container's content to a canvas
      html2canvas(container, { scale: 2, width: containerWidth, height: containerHeight })
        .then((canvas) => {
          // Add canvas image to PDF
          const imgData = canvas.toDataURL("image/png");
          pdf.addImage(imgData, "PNG", 15, 15, containerWidth / 8, containerHeight / 6);
  
          // Save the PDF
          pdf.save("my-pdf-document.pdf");
  
          // Remove the temporary container from the DOM
          document.body.removeChild(container);
        })
        .catch((error) => {
          console.error("Error converting HTML to PDF:", error);
          document.body.removeChild(container); // Remove the container in case of an error
        }).finally(()=>{
          
        });
   
    
  };
  
  useEffect(()=>{
    getDriverTrips()
  },[type])

  const getDriverTrips =()=>{
    setLoader(true)
    getPastTripsdriver().then((res)=>{
        console.log("get past trips driver", res)
        if(res?.code === 200 && res?.result){
          let result = res?.result.map((item,index)=>{
            item.serial = index+1
            return item
          })
          if(type == "payment"){
            result = result.filter((item)=>{
              return item.is_paid
            })
          }
         setTrips(result) 
        }
    }).catch((error)=>{
        console.log(error)
    }).finally(()=>{
      setLoader(false)
    })
  }

  const back = () => {
    navigate("/super-admin/driver/listofdrivers");
  };
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton style={{ color: '#f1c40f' }} />
        <GridToolbarFilterButton style={{ color: '#f1c40f' }} />
        <GridToolbarDensitySelector style={{ color: '#f1c40f' }} />
        <GridToolbarExport style={{ color: '#f1c40f' }} />
      </GridToolbarContainer>
    )
  }
    const renderCellContent = (value) => {
      
      return (
        <Tooltip title={value} arrow>
          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {value}
          </div>
        </Tooltip>
      );
    }
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
                <h1 class="heading-for-every-page">{type=="payment"?"Payment History":"Past Trips"}</h1>

                {/* <div class="active-trip-outer"> */}
                 {loader? <AppLoader/>: <Box sx={{ height: 500, width: "100%" }}>
                    <DataGrid
                    slots={{
                      toolbar: CustomToolbar,
                    }}                   
                    checkboxSelection={false}
                      rows={trips}
                      columns= {type == "payment"?paymentColumns:columns}
                      getRowId={(row) => row._id}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 10 },
                        },
                      }}
                      pageSizeOptions={[10, 20, 30, 50, 100]}
                     
                    />
                  </Box>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastTrips;