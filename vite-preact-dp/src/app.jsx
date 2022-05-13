import DatePicker from "react-datepicker";

export function App({
  dateFormat,
  hoursFormat,
  timeIntervals,
  selectDate,
  selectedDate,
}) {
  return (
    <>
      <DatePicker
        id="dddd-13"
        showDisabledMonthNavigation
        showTimeSelect
        timeIntervals={timeIntervals}
        selected={selectedDate}
        minDate={new Date()}
        excludeTimes={[]}
        onChange={(date) => selectDate(date)}
        {...getFormat(dateFormat, hoursFormat)}
      />
    </>
  );
}

function getFormat(dateFormat, hoursFormat) {
  return hoursFormat
    ? {
        timeFormat: "HH:mm",
        dateFormat: `${dateFormat} HH:mm`,
      }
    : {
        dateFormat: `${dateFormat} hh:mm aa`,
      };
}
