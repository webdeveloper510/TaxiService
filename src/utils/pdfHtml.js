export const generateInvoiceHtml = (data) => {
    let itemsHtml = "";
    itemsHtml += `<tr>`;
    itemsHtml += `<td style="border: 1px solid #ddd; padding: 8px;">${data.tripFrom}</td>`;
    itemsHtml += `<td style="border: 1px solid #ddd; padding: 8px;">${data.tripTo}</td>`;
    itemsHtml += `<td style="border: 1px solid #ddd; padding: 8px;">${data.price}</td>`;
    itemsHtml += `</tr>`;
  
    return `<div id="mainPdf" style="font-family: Arial, sans-serif; max-width: 1500px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;"><div><h1 style="text-align: center; color: #333;">Invoice</h1><p><strong>Driver Name:</strong> <span style="color: #333;">${data.driverName}</span></p><p><strong>Customer Name:</strong> <span style="color: #333;">${data.customerName}</span></p><p><strong>Driver Phone Number:</strong> <span style="color: #333;">${data.driverPhone}</span></p><p><strong>Trip ID:</strong> <span style="color: #333;">${data._id}</span></p><p><strong>Pickup Date:</strong> <span style="color: #333;">${data.pickupDate}</span></p></div><table style="width: 100%; border-collapse: collapse; margin-top: 20px;"><thead><tr><th style="border: 1px solid #ddd; padding: 8px;">Trip From</th><th style="border: 1px solid #ddd; padding: 8px;">Trip To</th><th style="border: 1px solid #ddd; padding: 8px;">Price</th></tr></thead><tbody id="items">${itemsHtml}</tbody></table><p><strong>Vehicle Type:</strong> <span style="color: #333;">${data.vehicleTrip}</span></p><p><strong>Payment Type:</strong> <span style="color: #333;">${data.payOption}</span></p><p><strong>Net Total:</strong> <span style="color: #333;">${data.price}</span></p></div>`;
  };
  