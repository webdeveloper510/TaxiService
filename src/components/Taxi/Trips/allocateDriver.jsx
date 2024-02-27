import React from 'react'
import SuperSideBar from '../SiderNavBar/Sidebar'
import AppHeader from '../../TopBar/AppHeader'
import Allocatemap from './allocatemap'

const AllocateDriver = () => {
  
    return (
        <>
            <div className="container-fluidd">
                <div className="col-md-12">
                    <div>
                        <SuperSideBar />
                        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                            <AppHeader />
                            <div className="body flex-grow-1 px-3">
                                <h1 className="heading-for-every-page">Allocate Trips</h1>
                                <Allocatemap/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default AllocateDriver