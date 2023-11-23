export const generateInvoiceHtml = (data) => {
  
    return `<div id="mainPdf" style="height: 1000px; width: 100%; display: flex; font-family: sans-serif; padding-left:40px; justify-content: center;">
    <div style="margin: auto; width:98%; padding: 10px 30px; border: 3px solid #ddd; height: 700px;">
        <div style="text-align: left;">
            <h1 style="text-align: center; color: #000; font-weight:600;">Invoice</h1>
            <p style="letter-spacing: 2px; font-size: 22px;">
                <strong>Driver Name:</strong>
                <span style="color: #4a4a4c; letter-spacing: 2px; margin-left: 10px;  font-size: 22px;">${data.driverName}</span>
            </p>
            <p style="letter-spacing: 2px; font-size: 22px;">
                <strong>Customer Name:</strong>
                <span style="color: #4a4a4c; letter-spacing: 2px; margin-left: 10px;  font-size: 22px;">${data.customerName}</span>
            </p>
            <p style="letter-spacing: 2px; font-size: 22px;">
                <strong>Driver Phone Number:</strong>
                <span style="color: #4a4a4c; letter-spacing: 2px; margin-left: 10px;  font-size: 22px;">${data.driverPhone}</span>
            </p>
            <p style="letter-spacing: 2px; font-size: 22px;">
                <strong>Trip ID:</strong>
                <span style="color: #4a4a4c; letter-spacing: 2px; margin-left: 10px; font-size: 22px;">${data._id}</span>
            </p>
            <p style="letter-spacing: 2px; font-size: 22px;">
                <strong>Pickup Date:</strong>
                <span style="color: #4a4a4c; letter-spacing: 2px; margin-left: 10px; font-size: 22px;">${data.pickupDate}</span>
            </p>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-top: 40px;">
            <thead>
                <tr>
                    <th style="border: 2px solid #6c6969; background: #dbe0e3de; padding: 8px; font-size: 22px; letter-spacing: 2px;">Trip From</th>
                    <th style="border: 2px solid #6c6969; background: #dbe0e3de; padding: 8px; font-size: 22px; letter-spacing: 2px;">Trip To</th>
                    <th style="border: 2px solid #6c6969; background: #dbe0e3de; padding: 8px; font-size: 22px; letter-spacing: 2px;">Price</th>
                </tr>
            </thead>
            <tbody id="items">
                <tr>
                    <td style="border: 2px solid #6c6969; padding: 8px; font-size: 22px; letter-spacing: 2px;">${data.tripFrom}</td>
                    <td style="border: 2px solid #6c6969; padding: 8px; font-size: 22px; letter-spacing: 2px;">${data.tripTo}</td>
                    <td style="border: 2px solid #6c6969; padding: 8px; font-size: 22px; letter-spacing: 2px;">${data.price}</td>
                </tr>
            </tbody>
        </table>
        <div style="text-align: left;">
            <p style="letter-spacing: 2px; font-size: 22px; margin-top: 30px;">
                <strong>Vehicle Type:</strong>
                <span style="color: #4a4a4c; letter-spacing: 2px; margin-left: 10px; font-size: 22px;">${data.vehicleTrip}</span>
            </p>
            <p style="letter-spacing: 2px; font-size: 22px;">
                <strong>Payment Type:</strong>
                <span style="color: #4a4a4c; letter-spacing: 2px; margin-left: 10px; font-size: 22px;">${data.payOption}</span>
            </p>
            <p style="letter-spacing: 2px; font-size: 22px;">
                <strong>Net Total:</strong>
                <span style="color: #4a4a4c; letter-spacing: 2px; margin-left: 10px; font-size: 22px;">${data.price}</span>
            </p>
        </div>
    </div>
</div>`;
  
    // return `<div id="mainPdf" style="height:1000px; width: 100%; display:flex;
    //  padding: 10px; justify-content:center;"><div style=" margin: auto; padding: 30px; border: 3px solid #ddd; height:700px; width: 99%;"><div ><h1 style="text-align: center; color: #333;">Invoice</h1><p style="letter-spacing: 2px;font-size:22px"><strong>Driver Name:</strong> <span style="color: #333;letter-spacing: 2px;">${data.driverName}</span></p><p style="letter-spacing: 2px;font-size:22px"><strong>Customer Name:</strong> <span style="color: #333;letter-spacing: 2px;">${data.customerName}</span></p><p style="letter-spacing: 2px;font-size:22px"><strong>Driver Phone Number:</strong> <span style="color: #333;letter-spacing: 2px;">${data.driverPhone}</span></p><p style="letter-spacing: 2px;font-size:22px"><strong>Trip ID:</strong> <span style="color: #333;letter-spacing: 2px;">${data._id}</span></p><p style="letter-spacing: 2px;font-size:22px"><strong>Pickup Date:</strong> <span style="color: #333;letter-spacing: 2px;">${data.pickupDate}</span></p></div><table style="width: 100%; border-collapse: collapse; margin-top: 20px;"><thead><tr><th style="border: 2px solid #ddd; padding: 8px; font-size:22px;letter-spacing: 2px;">Trip From</th><th style="border: 2px solid #ddd; padding: 8px;font-size:22px;letter-spacing: 2px;">Trip To</th><th style="border: 2px solid #ddd; padding: 8px;font-size:22px;letter-spacing: 2px;">Price</th></tr></thead><tbody id="items"><tr><td style="border: 2px solid #ddd; padding: 8px; font-size:22px;letter-spacing: 2px;">${data.tripFrom}</td><td style="border: 2px solid #ddd; padding: 8px; font-size:22px;letter-spacing: 2px;">${data.tripTo}</td><td style="border: 2px solid #ddd; padding: 8px; font-size:22px;letter-spacing: 2px;">${data.price}</td></tr></tbody></table><p style="letter-spacing: 2px;font-size:22px; margin-top:5px;"><strong>Vehicle Type:</strong> <span style="color: #333;letter-spacing: 2px;font-size:22px">${data.vehicleTrip}</span></p><p style="letter-spacing: 2px;font-size:22px"><strong>Payment Type:</strong> <span style="color: #333;letter-spacing: 2px;font-size:22px">${data.payOption}</span></p><p style="letter-spacing: 2px;font-size:22px"><strong>Net Total:</strong> <span style="color: #333;letter-spacing: 2px;font-size:22px">${data.price}</span></p></div></div>`;
  };
  