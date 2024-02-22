import axios from "axios"

export const CapitalName = (str)=>{
  str = str.trim()
    return str?.charAt(0)?.toUpperCase() + str?.slice(1)
}
export const capitalLine = (str)=>{
  return str?.split(" ")?.map(wrd=>CapitalName(wrd))?.join(" ")?.trim()
}
export function isValidDate(dateString) {
  const parsedDate = new Date(dateString);
  return !isNaN(parsedDate.getTime());
}
export async function distanceBetweenTwoPoints(origin, destination){
  try {
    
    const service = new window.google.maps.DistanceMatrixService();
    let totalDistance = null
  await service.getDistanceMatrix(
    {
      origins: [{ lat: origin.lat, lng: origin.lng }],
      destinations: [{ lat: destination.lat, lng: destination.lng }],
      travelMode: 'DRIVING',
    },
    (response, status) => {
      
      if (status === 'OK' && response.rows.length > 0) {
        const resultDistance = response?.rows[0]?.elements[0]?.distance?.value;
        console.log("🚀 ~ distanceBetweenTwoPoints ~ resultDistance:", resultDistance)
        totalDistance = resultDistance/1000
      }
    }
  );
  return totalDistance;
  } catch (error) {
    console.error('Error calculating distance:', error);
    return null;
  }
}