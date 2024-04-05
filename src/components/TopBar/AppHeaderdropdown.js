import React, { useContext } from "react";
import {
  CAvatar,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import threedots from "../../assets/images/threedots.png";
import UsersStats from "../Taxi/DashboardStats/UsersStats";
import userContext from "../../utils/context";
import { switchCompany, switchDriver } from "../../utils/api";
const AppHeaderDropdown = () => {
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();

  const logout = () => {
    console.log("logout run please");
    setUser(null);
    localStorage.clear();
    navigate("/");
  };

  return (
    <CDropdown variant="nav-item" className="header-drop-down">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <img className="three-dots" src={threedots} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {/* <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownDivider /> */}
        {user?.role === "COMPANY" && (
          <CDropdownItem className="edit_profile">
            {/* <CIcon icon={cilUser} className="me-2" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-sliders2"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M10.5 1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4H1.5a.5.5 0 0 1 0-1H10V1.5a.5.5 0 0 1 .5-.5M12 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m-6.5 2A.5.5 0 0 1 6 6v1.5h8.5a.5.5 0 0 1 0 1H6V10a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5M1 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 1 8m9.5 2a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V13H1.5a.5.5 0 0 1 0-1H10v-1.5a.5.5 0 0 1 .5-.5m1.5 2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"
              />
            </svg>
            <Link to="/taxi/booking/edit" style={{ marginLeft: "8px" }}>
              <span>Edit Booking Page</span>
            </Link>
          </CDropdownItem>
        )}
        {user?.role != "DRIVER" && (
          <CDropdownItem className="edit_profile">
            <CIcon icon={cilUser} className="me-2" />
            <Link to="/edit-profile">
              <span>Edit Profile</span>
            </Link>
          </CDropdownItem>
        )}
        {user?.role === "COMPANY" && !user?.isDriver && (
          <CDropdownItem className="edit_profile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pencil-square me-2"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              />
            </svg>
            <Link to="/taxi/driver-register">
              <span>Register as a driver</span>
            </Link>
          </CDropdownItem>
        )}
        {user?.role === "COMPANY" && user?.isDriver && (
          <CDropdownItem onClick={async()=>{
            const result = await switchDriver()
            console.log("🚀 ~ <CDropdownItemonClick={async ~ result:", result)
            setUser(result.data.result)
            navigate("/")
            
          }}  className="edit_profile">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5"/>
</svg>

            <span style={{
              fontFamily: "Poppins, sans-serif",
              color:"#000",
              marginLeft: "8px"
            }}>Switch to driver</span>
          </CDropdownItem>
        )}
        {user?.role === "DRIVER" && user?.isCompany && (
          <CDropdownItem  className="edit_profile">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5"/>
</svg>

            <span style={{
              fontFamily: "Poppins, sans-serif",
              color:"#000",
              marginLeft: "8px"
            }}>Switch to company</span>
          </CDropdownItem>
        )}
        <CDropdownItem
          onClick={() => {
            logout();
          }}
          className="logout-dropdown"
        >
          <CIcon icon={cilLockLocked} className="me-2" />
          <button className="text-black btn-logout ">Logout</button>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
