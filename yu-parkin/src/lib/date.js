export const getFormattedDate = (date) => {
  // Extracting date components
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear()).slice(-2) // Last two digits of year
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const dayOfWeek = daysOfWeek[date.getDay()]

  // Extracting time components
  const hours = String(date.getHours()).padStart(2, '0')
  const hours12 = hours > 12 ? hours - 12 : hours
  const amPm = hours >= 12 ? 'PM' : 'AM'
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return {
    dayOfWeek: dayOfWeek,
    date: `${day}/${month}/${year}`,
    time: `${hours12}:${minutes}:${seconds}${amPm}`,
  }

  /*
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "Australia/Sydney",
  }).format(date),*/
}
export const getFormattedDateString = (date) => {
  const formattedDate = getFormattedDate(date)
  return `${formattedDate.time} (${formattedDate.dayOfWeek}-${formattedDate.date})`
}
