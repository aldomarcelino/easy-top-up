import moment from "moment";

// Handle Format Date
const TimeFormatter = (date: Date) => {
  return moment(date).locale("en").format("HH:MM - DD MMMM YYYY");
};

export default TimeFormatter;
