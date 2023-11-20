
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import SimpleBar from 'simplebar-react';
//import { AppSidebarNav } from './AppSidebarNav'
import 'simplebar-react/dist/simplebar.min.css';
import applogo from '../../../assets/images/taxi-logo.png'
// sidebar nav config
//import navigation from '../../_nav';
//import { SuperNavBar } from './Appsidenavbar';
import navigation from '../../SuperAdmin/Sidebar/NavBar';
import { SuperBar } from './AppSideNavBar';
import { Link } from "react-router-dom";
console.log(navigation,'nav')
//const SideBar2 = () => (
//   <SimpleBar style={{ maxHeight: 300 }}>
//   <AppSidebarNav items={navigation} />
//     </SimpleBar>
//);

const SuperAdminSideBar = () => {
     const dispatch = useDispatch()
     const unfoldable = useSelector((state) => state.sidebarUnfoldable)
     const sidebarShow = useSelector((state) => state.sidebarShow)
  
    return (
      <CSidebar
        position="fixed"
        unfoldable={unfoldable}
      visible={sidebarShow}
        onVisibleChange={(visible) => {
          dispatch({ type: 'set', sidebarShow: visible })
        }}
      >
        <CSidebarBrand className="d-none d-md-flex" to="/">
          {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
          <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
           <Link to={`/dashboard`} >
          <img src={applogo} height={50} width={100}/>
          </Link>
        </CSidebarBrand>
        <CSidebarNav>
          <SimpleBar>
            {/* <AppSidebarNav items={navigation} /> */}
            {/* <SuperNavBar className="sidebar_outer" items={navigation}/> */}
            <SuperBar className="sidebar_outer" items={navigation}/>
          </SimpleBar>
        </CSidebarNav>
        {/* <CSidebarToggler
          className="d-none d-lg-flex"
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        /> */}
      </CSidebar>
    )
  }

export default SuperAdminSideBar;