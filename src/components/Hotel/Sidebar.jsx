import React from "react";
import { Nav, NavDropdown, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
const Sidebar = () => {

   
    return (
  
      <>
        <Nav className="col-md-12 d-none d-md-block sidebar">
                <div className="sidebar-sticky"></div>
            <Nav.Item>
                <NavLink className="navv-link" to="/dashboard">Dashboard</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink className="navv-link" to="/Companydetails">Company Details</NavLink>
               
            </Nav.Item>





            <NavDropdown title="Trips" id="basic-nav-dropdown">
        <NavDropdown.Item as={NavLink} to="/trips" className="navv-link">
          All Trips
        </NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/upcoming-trips" className="navv-link">
          Upcoming Trips
        </NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/past-trips" className="navv-link">
          Past Trips
        </NavDropdown.Item>
      </NavDropdown>

        
            <Nav.Item>
                <NavLink className="navv-link" to="link-2">Driver</NavLink>
            </Nav.Item>
            </Nav>
   
      </>
    )
  }
  
  
  
  export default Sidebar;