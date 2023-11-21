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