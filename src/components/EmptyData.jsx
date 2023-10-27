import React from 'react'

function EmptyData() {


    const messageStyle = {
      textAlign: 'center',
      fontWeight: 'bold',
      padding: '20px',
    //   background: '#f2f2f2',
      color: '#666666',
    //   border: '1px solid #ccc',
      borderRadius: '5px',
    };

    return (
      <div style={messageStyle}>
        <p>No data available.</p>
      </div>
    );


};

export default EmptyData

