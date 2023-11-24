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
