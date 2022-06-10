exports.getCurrentTime = () => {
  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let current_datetime = new Date();
  return (formatted_date =
    current_datetime.getFullYear() +
    "-" +
    (current_datetime.getMonth() + 1) +
    "-" +
    current_datetime.getDate() +
    " " +
    current_datetime.getHours() +
    ":" +
    current_datetime.getMinutes() +
    ":" +
    current_datetime.getSeconds());
};
