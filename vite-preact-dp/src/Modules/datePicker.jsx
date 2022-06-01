import ReactDatePicker from "react-datepicker";
import { useState, useEffect } from "preact/hooks";
import { utcToZonedTime, toDate, zonedTimeToUtc, format } from "date-fns-tz";

import { Header } from "../Components/Header/header";

export function SBDatePicker({
  dateFormat,
  timeInterval,
  oteCallback,
  selectedDate,
  timeZone,
  saveTimezone,
  mindate,
  apiFormat,
  maxdate,
}) {
  const [currentDate, setCurrentDate] = useState(
    utcToZonedTime(selectedDate, timeZone)
  );

  useEffect(() => {
    if (currentDate && timeZone) {
      const zonedDate = utcToZonedTime(currentDate.toISOString(), saveTimezone);
      const outputDate = format(zonedDate, apiFormat, saveTimezone);
      oteCallback?.(outputDate);
    }
  }, [currentDate, oteCallback]);

  const arrOfIntervals =
    timeInterval?.length &&
    timeInterval
      ?.split(",")
      .map((i) => Number(i))
      .sort((a, b) => a - b);

  const setTimeIntervals = () => (arrOfIntervals?.length > 1 ? 60 : 5);

  const setIncludedTimes = () =>
    [...Array(24).keys()].flatMap((int) =>
      arrOfIntervals.map((minutes) => {
        const intervalDateTime = toDate(new Date().setHours(int, minutes), {
          timeZone,
        });
        return utcToZonedTime(intervalDateTime, timeZone);
      })
    );

  const handleColor = (time) =>
    arrOfIntervals?.includes(time.getMinutes()) ? "" : "hide__time";

  const setFilteredTime = (time) =>
    time?.getTime() >
    utcToZonedTime(new Date().toISOString(), timeZone)?.getTime();

  return (
    <ReactDatePicker
      calendarContainer={({ children, className }) => (
        <div className="calendar__container__wrapper">
          <div className={className}>{children}</div>
        </div>
      )}
      renderCustomHeader={Header}
      onChange={(date) =>
        setCurrentDate(utcToZonedTime(date.toISOString(), timeZone))
      }
      timeClassName={handleColor}
      wrapperClassName="datePicker"
      className="datepicker-input1"
      data-name="picker"
      calendarClassName="rasta-stripes"
      id="dddd-13"
      showDisabledMonthNavigation
      showTimeSelect
      showPopperArrow={false}
      selected={currentDate}
      minDate={mindate}
      maxDate={maxdate}
      timeIntervals={setTimeIntervals?.()}
      filterTime={setFilteredTime}
      injectTimes={arrOfIntervals?.length && setIncludedTimes()}
      dateFormat={dateFormat}
    />
  );
}
