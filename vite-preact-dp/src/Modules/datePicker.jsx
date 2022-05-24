import ReactDatePicker from "react-datepicker";
import { useState } from "preact/hooks";
import { utcToZonedTime } from "date-fns-tz";
import flatpickr from "flatpickr";

import { Header } from "../Components/Header/header";

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

  const arrOfIntervals = timeInterval?.length && timeInterval?.split(",");
  const setTimeIntervals = () =>
    arrOfIntervals?.length > 1 ? 60 : arrOfIntervals?.[0];

  const setIncludedTimes = (timeZone) =>
    arrOfIntervals?.length &&
    Array(23).map((int) =>
      utcToZonedTime(new Date(), timeZone)
        .setHours(int)
        .flatMap((hour) =>
          arrOfIntervals.map((minutes) => hour.setMinutes(minutes))
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
      renderCustomHeader={Header}
      onChange={(date) => setCurrentDate(date)}
      timeClassName={handleColor}
      onCalendarClose={onCalendarClose}
      onCalendarOpen={() => setCalendarVisible(true)}
      wrapperClassName="datePicker"
      className="datepicker-input1"
      data-name="picker"
      calendarClassName="rasta-stripes"
      popperPlacement="top-start"
      popperModifiers={[
        {
          name: "offset",
          options: {
            offset: [0, -10],
          },
        },
        {
          name: "preventOverflow",
          options: {
            rootBoundary: "viewport",
            tether: false,
            altAxis: true,
          },
        },
      ]}
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
      timeIntervals={setTimeIntervals?.() || 5}
      filterTime={setFilteredTime}
      injectTimes={setIncludedTimes(timeZone)}
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
