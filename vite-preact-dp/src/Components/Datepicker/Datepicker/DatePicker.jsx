import ReactDatePicker from "react-datepicker";
import { useState } from "preact/hooks";
import { utcToZonedTime } from "date-fns-tz";
import flatpickr from "flatpickr";
import { Container } from "../Container/Container";
import { Header } from "../Header/Header";
import './Datepicker.scss'

export function SBDatePicker({
  dateFormat,
  timeInterval,
  selectDate,
  selectedDate,
  timeZone,
  apiFormat,
  saveTimezone,
}) {
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(null);

  const dateWithClientOffset = utcToZonedTime(selectedDate, timeZone);
  const dateWithServerOffset = utcToZonedTime(selectedDate, saveTimezone);

  const arrOfIntervals =
    timeInterval?.length &&
    timeInterval
      ?.split(",")
      .map((i) => Number(i))
      .sort((a, b) => a - b);

  const setTimeIntervals = () => (arrOfIntervals?.length > 1 ? 60 : 5);

  const setIncludedTimes = (timeZone) =>
    [...Array(24).keys()].flatMap((int) =>
      arrOfIntervals.map((minutes) =>
        utcToZonedTime(new Date().setHours(int, minutes), timeZone)
      )
    );

  const onCalendarClose = () => {
    setCalendarVisible(false);
    currentDate && selectDate(currentDate);
    setCurrentDate(null);
  };

  const handleColor = (time) =>
    arrOfIntervals?.includes(time.getMinutes()) ? "" : "hide__time";

  const setFilteredTime = (time) =>
    time.getTime() > utcToZonedTime(new Date(), timeZone).getTime() && time;

  return (
    <ReactDatePicker
      timeCaption=""
      calendarContainer={Container}
      renderCustomHeader={Header}
      onChange={(date) => setCurrentDate(date)}
      timeClassName={handleColor}
      onCalendarClose={onCalendarClose}
      onCalendarOpen={() => setCalendarVisible(true)}
      wrapperClassName="datePicker"
      className="datepicker-input"
      data-name="picker"
      calendarClassName="rasta-stripes"
      id="dddd-13"
      showDisabledMonthNavigation
      showTimeSelect
      showPopperArrow={false}
      selected={
        calendarVisible
          ? currentDate || dateWithClientOffset
          : dateWithServerOffset
      }
      minDate={new Date()}
      timeIntervals={setTimeIntervals?.()}
      filterTime={setFilteredTime}
      injectTimes={arrOfIntervals?.length && setIncludedTimes()}
      dateFormat={calendarVisible ? dateFormat : apiFormat}
    />
  );
}

function getFormat(dateFormat, hoursFormat) {
  return dateFormat.includes("HH:mm")
    ? { dateFormat }
    : hoursFormat
    ? {
        timeFormat: "HH:mm",
        dateFormat: `${dateFormat} HH:mm`,
      }
    : {
        dateFormat: `${dateFormat} h:mm aa`,
      };
}
