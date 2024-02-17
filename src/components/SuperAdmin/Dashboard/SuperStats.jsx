import React, { useEffect, useState } from "react";
import {

  MDBRow,
  MDBCol,

} from 'mdb-react-ui-kit';
import NewUsers from '../../Stats/NewUsers'
import TotalEarnings from "../../Stats/TotalEarnings";
import ActiveTrips from "../../Stats/ActiveTrips";
import PendingTrips from "../../Stats/PendingTrips";
import { Link } from "react-router-dom";
import { getCountDashboard, getTripCompleted } from "../../../utils/api";

const SuperStats = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    getCountDashboard().then((res) => {
      console.log("response get book getCountDashboard", res)
      if (res?.code == 200) {
        setData(res.result)
      }
    }).catch((error) => {
      console.log(error)
    })
  }, [])
  return (
    <>
      <br />
      <div className="container-fluidd">

        <div className="col-md-12 body flex-grow-1 px-0">

          <div>

            <div className="row">

              <div className="col-md-12">

                <div className="booked-trips-outer">
                  <MDBRow>
                    <MDBCol sm='6' className="booked-trips all_same">
                      <Link to={"/super-admin/trips/recent-trips?filter=Booked"}><ActiveTrips data={data} /></Link>
                    </MDBCol>
                    <MDBCol sm='6' className="cancelledtrips all_same">
                      <Link to={"/super-admin/trips/recent-trips?filter=Pending"}><PendingTrips data={data} /></Link>
                    </MDBCol>
                    <MDBCol sm='6' className="newUsers all_same">
                      <Link to={"/super-admin/trips/recent-trips?filter=Completed"}>< NewUsers data={data} /></Link>
                    </MDBCol>
                    <MDBCol sm='6' className="totalEarnings all_same">
                    <Link to={"/super-admin/transaction"}>< TotalEarnings /></Link>
                      
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

export default SuperStats; 