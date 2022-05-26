import { PreactDatePicker } from "./Controllers/datePickerController";
import { SBDurationPicker } from "./Controllers/DurationPickerController";

new PreactDatePicker({
  oteContainer: document.getElementById("datepicker"),
  // dateFormat: defaultFormat,
  minutesIntervals: "9,17",
  "data-dt-24h": 0,
  "data-dt-timezone": "America/Los_Angeles",
  "data-dt-saveTimezone": "Etc/GMT",
});

new SBDurationPicker({
    container: document.getElementById("duration-picker"),
});


window.DatePicker = PreactDatePicker;
// window.Duration = DurationPicker;
// window.Delay = DelayWidget;
