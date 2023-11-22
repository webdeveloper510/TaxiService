import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import AppHeader from "../TopBar/AppHeader";
import SidebarDriver from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { getPastTripsdriver } from "../../utils/api";
import moment from "moment";
import AppLoader from "../AppLoader";

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
    headerName: "Date",
    width: 200,
    valueGetter: (params) =>moment(params.row.pickup_date_time).format(
      "MMMM Do YYYY"
    )  ,
    
  },
  {
    field: "time",
    headerName: "Time",
    width: 200,
    valueGetter: (params) =>moment(params.row.pickup_date_time).format(
      "h:mm a"
    )  ,
    
  },
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
    valueGetter: (params) => params.row.trip_from.address ,
  
    // type: "number",
  },
  {
    field: "trip_to",
    headerName: "Trip To",
    width: 200,
    
    valueGetter: (params) => params.row.trip_to.address ,
    // type: "number",
  },
  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   width: 200, 
  //   sortable: true,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  // },
];
const paymentColumns = [
  {
    field: 'serial' , 
    headerName: 'S. No.', 
    width: 100,
    
},
  { field: "trip_id", headerName: "Trip ID", width: 100 },
  {
    field: "pay_option",
    headerName: "Pay option",
    width: 200,
   
  },
  {
    field: "price",
    headerName: "Earning",
    width: 200,
   
  },
  {
    field: "date",
    headerName: "Date",
    width: 200,
    valueGetter: (params) =>moment(params.row.pickup_date_time).format(
      "MMMM Do YYYY"
    )  ,
    
  },
  {
    field: "time",
    headerName: "Time",
    width: 200,
    valueGetter: (params) =>moment(params.row.pickup_date_time).format(
      "h:mm a"
    )  ,
    
  },

  // {
  //   field: "company_name",
  //   headerName: "Customer Name",
  //   width: 200,
    
  //   // type: "number",
  // },
  {
    field: "trip_from",
    headerName: "Trip From",
    width: 200,
    valueGetter: (params) => params.row.trip_from.address ,
  
    // type: "number",
  },
  {
    field: "trip_to",
    headerName: "Trip To",
    width: 200,
    
    valueGetter: (params) => params.row.trip_to.address ,
    // type: "number",
  },

];
const PastTrips = ({type}) => {
  const navigate = useNavigate();
  const [trips,setTrips] = useState([])
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

  const [loader, setLoader] = useState(false);
  const back = () => {
    navigate("/super-admin/driver/listofdrivers");
  };

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
                    checkboxSelection={false}
                      rows={trips}
                      columns={type == "payment"?paymentColumns:columns}
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
