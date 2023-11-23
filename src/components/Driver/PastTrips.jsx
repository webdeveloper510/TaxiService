import React, { useContext, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import AppHeader from "../TopBar/AppHeader";
import SidebarDriver from "./Sidebar";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Tooltip } from "@mui/material";
import { getPastTripsdriver } from "../../utils/api";
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
      headerName: "Customer Name",
      width: 200,
      
      // type: "number",
    },
    {
      field: "trip_from",
      headerName: "Trip From",
      width: 200,
      renderCell:(params) => renderCellContent( params.row.trip_from.address) ,
      // type: "number",
    },
    {
      field: "trip_to",
      headerName: "Trip To",
      width: 200,
      renderCell:(params) => renderCellContent( params.row.trip_to.address) ,
      // valueGetter: (params) => params.row.trip_to.address ,
      // type: "number",
    },
    {
      field: 'showDetail',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <Link
          
          to={`/trips/view-trip-details/${params.row._id}`}
        >
          <button style={{
            width:"40px",
            height:"40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff2cf"
          }} className="submit-btn">
           
        <svg xmlns="http://www.w3.org/2000/svg" width="90px" height="90px"fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
</svg>
        </button>
        </Link>
      ),
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
      // type: "number",
    },
    {
      field: "trip_to",
      headerName: "Trip To",
      width: 200,
      renderCell:(params) => renderCellContent( params.row.trip_to.address) ,
      // valueGetter: (params) => params.row.trip_to.address ,
      // type: "number",
    },
    {
      field: "pay_option",
      headerName: "Pay option",
      width: 200,
     
    },
    {
      field: "price",
      headerName: "Earning in Euro",
      width: 200,
     
    },
    {
      field: "commission",
      headerName: "Commission",
      width: 200,
      valueGetter: (params) =>"10%"
     
    },
    
    {
      field: 'invoice',
      headerName: 'Invoice',
      width: 150,
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
  },[])

  const getDriverTrips =()=>{
    setLoader(true)
    getPastTripsdriver().then((res)=>{
        console.log("get past trips driver", res)
        if(res?.code === 200 && res?.result){
          const result = res?.result.map((item,index)=>{
            item.serial = index+1
            return item
          })
          
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
                    slots={{ toolbar: GridToolbar }}
                   
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
