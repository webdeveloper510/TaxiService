import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import AppHeader from "../TopBar/AppHeader";
import SidebarDriver from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { getPastTripsdriver } from "../../utils/api";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "firstName",
    headerName: "First name",
    width: 200,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 200,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    width: 200,
    editable: true,
    // type: "number",
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    width: 200, 
    sortable: true,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 22 },
  { id: 6, lastName: "Melisandre", firstName: "Tester", age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const PastTrips = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    getDriverTrips()
  },[])

  const getDriverTrips =()=>{
    getPastTripsdriver().then((res)=>{
        console.log("get past trips driver", res)
    }).catch((error)=>{
        console.log(error)
    })
  }

  const [submitLoader, setSubmitLoader] = useState(false);
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
                <h1 class="heading-for-every-page">Past Trips</h1>

                {/* <div class="active-trip-outer"> */}
                  <Box sx={{ height: 500, width: "100%" }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 10 },
                        },
                      }}
                      pageSizeOptions={[10, 20, 30, 50, 100]}
                      checkboxSelection
                      
                    />
                  </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastTrips;
