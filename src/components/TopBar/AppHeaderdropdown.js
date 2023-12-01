import React, { useContext } from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilLockLocked,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import threedots from '../../assets/images/threedots.png'
import UsersStats from '../Taxi/DashboardStats/UsersStats'
import userContext from '../../utils/context'
const AppHeaderDropdown = () => {
  const {user, setUser} = useContext(userContext);
    const navigate = useNavigate()

 const  logout = () => {
  console.log("logout run please")
    setUser(null);
    localStorage.clear()
    navigate("/")
  }

  return (
    <CDropdown variant="nav-item" className='header-drop-down'>
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <img className="three-dots" src={threedots} size="md" />

      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {/* <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownDivider /> */}
       {user?.role === "COMPANY" && <CDropdownItem className='edit_profile'>
        {/* <CIcon icon={cilUser} className="me-2" /> */}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sliders2" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10.5 1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4H1.5a.5.5 0 0 1 0-1H10V1.5a.5.5 0 0 1 .5-.5M12 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m-6.5 2A.5.5 0 0 1 6 6v1.5h8.5a.5.5 0 0 1 0 1H6V10a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5M1 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 1 8m9.5 2a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V13H1.5a.5.5 0 0 1 0-1H10v-1.5a.5.5 0 0 1 .5-.5m1.5 2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
</svg>
        <Link to="/taxi/booking/edit" style={{marginLeft:"8px"}}>
          <span>Edit Booking Page</span>
       </Link>
        </CDropdownItem>}
        {user?.role != "DRIVER" && <CDropdownItem className='edit_profile'>
        <CIcon icon={cilUser} className="me-2" />
        <Link to="/edit-profile">
          <span>Edit Profile</span>
       </Link>
        </CDropdownItem>}
        <CDropdownItem onClick={()=>{
            logout()
          }} className='logout-dropdown'>
          <CIcon icon={cilLockLocked} className="me-2" />
          <button className='text-black btn-logout '   >Logout</button>
       
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
