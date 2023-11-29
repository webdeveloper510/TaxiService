import React, {useContext, useState} from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CAvatar
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons';
import menubar from '../../assets/images/menu-bar.png'
import expandicon from '../../assets/images/hedercrossicon.png'
// import { logo } from 'src/assets/brand/logo'
import AppHeaderDropdown from './AppHeaderdropdown'
import userContext from '../../utils/context';
//import profilepic from '../../assets/images/avtar1.jpg'

const AppHeader = () => {
  const dispatch = useDispatch()
  const {user, setUser} = useContext(userContext);
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          {/* <CIcon icon={cilMenu} size="lg" /> */}
          <img src={menubar}/>
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          {/* <CIcon icon={logo} height={48} alt="Logo" /> */}
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          {/* <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
            <img src={expandicon}/>
            </CNavLink>
          </CNavItem> */}
          {/* <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem> */}
        </CHeaderNav>
        
        {user?.role == "HOTEL" && <span className='welcome_line'>{user?.company_detail?.company_name} as Hotel!</span>}
        {user?.role  == "COMPANY" && <span className='welcome_line'>{`${user?.first_name} ${user?.lastName ? user.lastName : ""}`} as Taxi Company!</span>}
        {user?.role  == "SUPER_ADMIN" && <span className='welcome_line'>{`${user?.first_name} ${user?.last_name ? user.last_name : ""}`} as Admin!</span>}
        <CHeaderNav className='bell-icon'>
        
          
         
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          
          {/* <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem> */}
          {/* <button className='btn btn-warning text-white  '  onClick={logout} >Logout</button> */}
        </CHeaderNav>

        {/* <CHeaderNav className="profile-pic">
        <CNavItem>
        
            <Link to="/edit-profile">
             <CAvatar src={profilepic} size="md" />
             </Link>
           
          </CNavItem>
          </CHeaderNav> */}
          

        <CHeaderNav className="top-bar-right">
          <AppHeaderDropdown />
        </CHeaderNav>
      
      </CContainer>
      <CHeaderDivider />
      {/* <CContainer fluid>
        <AppBreadCrumb />
      </CContainer> */}
    </CHeader>
  )
}

export default AppHeader
