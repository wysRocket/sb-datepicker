import { PreactDatePicker } from "./Controllers/datePickerController";

new PreactDatePicker({
  dateContainer: document.getElementById("app"),
  defaultDateTime: "2022-05-11T19:27:05",
  minutesIntervals: "9,17",
  h24: "0",
  timezone: "America/Los_Angeles",
  saveTimezone: "Etc/GMT",
});

window.DatePicker = PreactDatePicker;

// window.Duration = DurationPicker;
