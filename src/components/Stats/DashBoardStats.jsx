import React, { useEffect, useState } from "react";
import {

  MDBRow,
  MDBCol,

} from 'mdb-react-ui-kit';
import BookedTrips from "./BookedTrips";
import CancelledTrips from "./CancelledTrips";
import NewUsers from "./NewUsers";
import DashboardGraph from "../Hotel/DashboardChart/dashboardgraph";
import PendingTrips from "./PendingTrips";
import { getTripCompleted } from "../../utils/api";
import { Link } from "react-router-dom";
import AppLoader from "../AppLoader";
const DashboardStats = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTripCompleted().then((res) => {
      console.log("response get book trip", res)
      if (res?.code == 200) {
        setData(res.result)
      }
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <AppLoader></AppLoader>
  }
  return (
    <>
      <br />
      <div className="container-fluidd">

        <div className="col-md-12 body flex-grow-1 px-0">

          <div>

            <div className="row">

              {/* <div className="col-md-6 dashboard-grph-img">
        <DashboardGraph/>
        
        </div> */}
              <div className="col-md-12 hotel-stats">

                <div className="booked-trips-outer">
                  <MDBRow>
                    <MDBCol md='6' className="booked-trips all_same">
                      <Link to={"/trips/requestbookings"}>
                        < BookedTrips data={data} />
                      </Link>
                    </MDBCol>
                    <MDBCol sm='6' className="pendingtrips all_same">
                      <Link to={"/trips/pendingtrips"}>
                        <PendingTrips data={data} />
                      </Link>
                    </MDBCol>
                    <MDBCol md='6' className="cancelledtrips all_same">
                      <Link to={"/trips/cancelled"}>
                        < CancelledTrips data={data} />
                      </Link>
                    </MDBCol>
                    <MDBCol md='6' className="newUsers all_same">
                      <Link to={"/trips/completetrips"}>
                        < NewUsers data={data}/>
                      </Link>
                    </MDBCol>

                  </MDBRow>

                </div>
              </div>


            </div>
          </div>

        </div>
      </div>
      <br />


    </>
  );
};

export default DashboardStats; 