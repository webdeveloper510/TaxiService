import React from 'react'
import { PulseLoader } from 'react-spinners'

function AppLoader() {
  return (
    <div className=" d-flex justify-content-center align-items-center"
                    style={{ height: 400 }}>
                    <PulseLoader
                      color="#FFD04E"
                      loading={true}
                      margin={4}
                      size={60}
                      speedMultiplier={0.5}
                    />
                  </div>
  )
}

export default AppLoader