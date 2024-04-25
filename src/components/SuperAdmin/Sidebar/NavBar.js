import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilChartPie,
   cilPuzzle,
  cilSpeedometer,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'
const _NavBar = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/super-admin/dashboard',
    icon: <div className='radius-svg'> <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="26"
    fill="none"
    viewBox="0 0 24 26"
    className='home-svg'
  >
    <path
      fill="#fff"
      d="M13.181 1.204a1.921 1.921 0 00-2.64 0L1.234 10a2.882 2.882 0 00-.901 2.097v10.702a2.882 2.882 0 002.882 2.88h2.882a2.882 2.882 0 002.882-2.882v-4.804a.96.96 0 01.961-.96h3.843a.96.96 0 01.96.96v4.804a2.882 2.882 0 002.883 2.882h2.882a2.882 2.882 0 002.882-2.882V12.095A2.883 2.883 0 0022.487 10L13.18 1.2v.004z"
    ></path>
  </svg></div>
  },
  // {
  //   component: CNavItem,
  //   name: 'Companies',
  //   to: '',
  //   icon:<div className='radius-svg'>
  //     <svg
  //   xmlns="http://www.w3.org/2000/svg"
  //   width="25"
  //   height="25"
  //   fill="none"
  //   viewBox="0 0 25 25"
  // >
  //   <path
  //     fill="#FFD04E"
  //     d="M23.284 2.318h-3.013v3.716c0 .832-.747 1.509-1.665 1.509H17.47c-.918 0-1.664-.676-1.664-1.509V2.318H8.389v3.716c0 .832-.748 1.509-1.664 1.509H5.587c-.918 0-1.664-.676-1.664-1.509V2.318H.908A.909.909 0 000 3.226v20.865c0 .5.407.909.908.909h22.376c.502 0 .91-.41.91-.91V3.227a.908.908 0 00-.91-.908zm-.317 21.405c0 .155-.13.284-.287.284H1.515a.287.287 0 01-.287-.284V10.862c0-.157.128-.287.287-.287h21.164c.157 0 .286.13.286.287l.002 12.861z"
  //   ></path>
  //   <path
  //     fill="#FFD04E"
  //     d="M5.588 6.055h1.135c.418 0 .757-.27.757-.6V.6C7.48.267 7.14 0 6.723 0H5.588c-.419 0-.758.267-.758.6v4.857c0 .329.339.598.758.598zM17.47 6.055h1.136c.419 0 .758-.27.758-.6V.6c0-.332-.338-.599-.758-.599H17.47c-.418 0-.758.267-.758.6v4.857c.003.329.34.598.759.598zM17.297 12.35a.505.505 0 00-.714 0l-5.921 5.924-3.05-3.074a.505.505 0 00-.711 0L5.83 16.27a.505.505 0 000 .71l4.47 4.502a.506.506 0 00.713 0l7.35-7.352a.503.503 0 000-.714l-1.067-1.065z"
  //   ></path>
  // </svg></div>
  // },

  {
    component: CNavGroup,
    name: 'Companies',
    to: '',
    icon: <div className='radius-svg'>
     <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    fill="none"
    viewBox="0 0 25 25"
  >
    <path
      fill="#FFD04E"
      d="M23.284 2.318h-3.013v3.716c0 .832-.747 1.509-1.665 1.509H17.47c-.918 0-1.664-.676-1.664-1.509V2.318H8.389v3.716c0 .832-.748 1.509-1.664 1.509H5.587c-.918 0-1.664-.676-1.664-1.509V2.318H.908A.909.909 0 000 3.226v20.865c0 .5.407.909.908.909h22.376c.502 0 .91-.41.91-.91V3.227a.908.908 0 00-.91-.908zm-.317 21.405c0 .155-.13.284-.287.284H1.515a.287.287 0 01-.287-.284V10.862c0-.157.128-.287.287-.287h21.164c.157 0 .286.13.286.287l.002 12.861z"
    ></path>
    <path
      fill="#FFD04E"
      d="M5.588 6.055h1.135c.418 0 .757-.27.757-.6V.6C7.48.267 7.14 0 6.723 0H5.588c-.419 0-.758.267-.758.6v4.857c0 .329.339.598.758.598zM17.47 6.055h1.136c.419 0 .758-.27.758-.6V.6c0-.332-.338-.599-.758-.599H17.47c-.418 0-.758.267-.758.6v4.857c.003.329.34.598.759.598zM17.297 12.35a.505.505 0 00-.714 0l-5.921 5.924-3.05-3.074a.505.505 0 00-.711 0L5.83 16.27a.505.505 0 000 .71l4.47 4.502a.506.506 0 00.713 0l7.35-7.352a.503.503 0 000-.714l-1.067-1.065z"
    ></path>
  </svg></div>,
    items: [
      {
        component: CNavItem,
        name: 'Add Company',
        to: '/super-admin/add-company',
      }, 
      {
        component: CNavItem,
        name: 'All Companies',
        to: '/super-admin/all-companies',
      }, 
      
    ],
  },
  {
    component: CNavItem,
    name: 'Trips',
    to: '/super-admin/trips/recent-trips',
    icon: <div className='radius-svg'> <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="25"
    fill="none"
    viewBox="0 0 26 25"
  >
    <path
      fill="#FFD04E"
      d="M16.349 24.403c-2.745 0-5.132-2.267-5.132-5.13V6.025c.12-1.79-1.074-3.102-2.506-3.102-1.432 0-2.744 1.312-2.744 3.102v9.07c0 .716-.478 1.193-1.194 1.193S3.58 15.81 3.58 15.095V6.026C3.58 2.924 5.847.537 8.711.537c2.864 0 5.012 2.387 5.012 5.49v13.245c0 1.551 1.194 2.745 2.745 2.745 1.432 0 2.744-1.194 2.744-2.745v-4.176c0-.716.478-1.194 1.194-1.194s1.193.478 1.193 1.194v4.176c-.12 2.864-2.387 5.131-5.25 5.131z"
    ></path>
    <path
      fill="#FFD04E"
      d="M23.866 17.84c-.358 0-.596-.12-.835-.358l-2.744-2.744-2.745 2.744a1.154 1.154 0 01-1.67 0 1.154 1.154 0 010-1.67l3.58-3.58a1.154 1.154 0 011.67 0l3.58 3.58a1.153 1.153 0 010 1.67c-.239.239-.478.358-.836.358zM20.287 10.68a.911.911 0 01-.597-.239c-.478-.238-4.177-2.744-4.177-5.966 0-1.193.478-2.387 1.432-3.222 1.79-1.67 4.893-1.67 6.683 0 .954.835 1.432 2.029 1.432 3.222 0 3.222-3.7 5.728-4.177 5.966a.911.911 0 01-.596.24zm0-8.353c-.597 0-1.313.239-1.671.716-.477.477-.716.955-.716 1.551 0 1.313 1.432 2.745 2.387 3.46.954-.834 2.386-2.147 2.386-3.46 0-.596-.239-1.193-.716-1.551-.358-.477-1.074-.716-1.67-.716zM4.773 25a.911.911 0 01-.596-.239C3.699 24.523 0 22.017 0 18.795c0-1.194.477-2.387 1.432-3.222 1.79-1.67 4.893-1.67 6.683 0 .954.835 1.432 2.028 1.432 3.222 0 3.222-3.7 5.728-4.177 5.966a.911.911 0 01-.597.239zm0-8.353c-.596 0-1.312.238-1.67.716-.478.358-.716.954-.716 1.551 0 1.313 1.432 2.745 2.386 3.46.955-.835 2.387-2.147 2.387-3.46 0-.597-.239-1.193-.716-1.551-.358-.478-1.074-.716-1.67-.716z"
    ></path>
    <path
      fill="#FFD04E"
      d="M20.287 5.907c.716 0 1.193-.477 1.193-1.193 0-.716-.477-1.194-1.193-1.194-.716 0-1.194.478-1.194 1.194s.478 1.193 1.194 1.193zM4.773 20.227c.716 0 1.194-.478 1.194-1.194s-.478-1.193-1.194-1.193-1.193.477-1.193 1.193c0 .716.477 1.194 1.193 1.194z"
    ></path>
  </svg></div>
  },

  {
    component: CNavGroup,
    name: 'Driver',
    to: '',
    icon: <div className='radius-svg'><svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    fill="none"
    viewBox="0 0 25 25"
  >
    <path
      fill="#FFD04E"
      d="M12.5 0C5.597 0 0 5.597 0 12.5S5.597 25 12.5 25 25 19.403 25 12.5 19.403 0 12.5 0zm0 3.125c4.068 0 7.504 2.62 8.802 6.25H3.698c1.298-3.63 4.734-6.25 8.802-6.25zm0 10.938a1.562 1.562 0 110-3.125 1.562 1.562 0 010 3.124zM3.125 12.5c4.27 0 7.727 4.114 7.8 9.216-4.419-.757-7.8-4.586-7.8-9.216zm10.95 9.216c.073-5.102 3.53-9.216 7.8-9.216 0 4.63-3.381 8.46-7.8 9.216z"
    ></path>
  </svg></div>,
    items: [
      // {
      //   component: CNavItem,
      //   name: 'Add New Driver',
      //   to: '/super-admin/driver/addnewdriver',
      // }, 
      {
        component: CNavItem,
        name: 'All Drivers',
        to: '/super-admin/driver/listofdrivers',
      }, 
      
    ],
  },
 
  // {
  //   component: CNavGroup,
  //   name: 'Vehicle',
  //   icon: <div className='radius-svg'> <svg
  //   xmlns="http://www.w3.org/2000/svg"
  //   width="31"
  //   height="20"
  //   fill="none"
  //   viewBox="0 0 31 20"
  // >
  //   <path
  //     fill="#FFD04E"
  //     d="M30.147 5.978c-.072-.21-.328-.374-.542-.374h-2.774c-.213 0-.469.164-.541.374-.07.205-.123.389-.159.561L24.28 1.413A2.147 2.147 0 0022.265 0H8.093c-.899 0-1.708.568-2.014 1.413L4.226 6.54a4.507 4.507 0 00-.159-.562c-.072-.21-.328-.374-.541-.374H.752c-.213 0-.47.164-.541.374-.281.818-.281 1.286 0 2.104.072.21.328.373.541.373h2.782l-.042.116c-.565.188-.974.72-.974 1.349v9.396c0 .378.306.684.684.684h3.44a.684.684 0 00.684-.684V15.99h15.706v3.327c0 .378.305.684.683.684h3.44a.684.684 0 00.684-.684V9.92c0-.629-.408-1.161-.973-1.35l-.042-.115h2.781c.214 0 .47-.163.542-.373.28-.818.28-1.286 0-2.104zM8.355 2.516H22l2.162 5.981H6.193l2.162-5.981zm.38 10.195H5.857a1.118 1.118 0 110-2.236h2.878a1.118 1.118 0 110 2.236zm15.765 0h-2.878a1.118 1.118 0 110-2.236H24.5a1.118 1.118 0 110 2.236z"
  //   ></path>
  // </svg></div>,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Add New Vehicle',
  //       to: '/super-admin/vehicle/addnewvehicle',
        
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'All Vehicles',
  //       to: '/super-admin/vehicle/viewallvehicle',
        
  //     },
      
  //   ],
  // },
  {
    component: CNavItem,
    name: 'Feedback',
    to: '/super-admin/feedback',
    icon: <div className='radius-svg'>
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-chat-right-dots" viewBox="0 0 16 16">
  <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"/>
  <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
</svg>
    </div>,
  }
  ,
  {
    component: CNavItem,
    name: 'Payment',
    to: '/super-admin/payment',
    icon: <div className='radius-svg'> <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-credit-card-fill" viewBox="0 0 16 16">
    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0zm0 3v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7zm3 2h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1"/>
  </svg></div>
  }
  ,
  {
    component: CNavItem,
    name: 'Earning',
    to: '/super-admin/transaction',
    icon: <div className='radius-svg'>  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-card-list" viewBox="0 0 16 16">
    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
    <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
  </svg></div>
  }
]

export default _NavBar;
