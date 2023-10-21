import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilLockLocked,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'

import threedots from '../../assets/images/threedots.png'
const AppHeaderDropdown = () => {

    const navigate = useNavigate()

 const  logout = () => {
  console.log("herlo")
    localStorage.clear()
    navigate("/")
  }

  return (
    <CDropdown variant="nav-item" className='header-drop-down'>
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar className="three-dots" src={threedots} size="md" />

      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {/* <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownDivider /> */}
        <CDropdownItem href="#" className='logout-dropdown'>
          <CIcon icon={cilLockLocked} className="me-2" />
          <button className='text-black btn-logout '  onClick={logout} >Logout</button>
       
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
