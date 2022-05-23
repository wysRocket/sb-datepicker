import { PreactDatePicker } from "./Controllers/datePickerController";

const picker = new PreactDatePicker({
  oteContainer: document.getElementById("app"),
  defaultDateTime: "2022-05-16T17:03:05",
  minutesIntervals: 15,
  "data-dt-24h": 0,
  "data-dt-timezone": "America/Los_Angeles",
  "data-dt-saveTimezone": "Etc/GMT",
});

window.DatePicker = PreactDatePicker;

window.Duration = DurationPicker;
