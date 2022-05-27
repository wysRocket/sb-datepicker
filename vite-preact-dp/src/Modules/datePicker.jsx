import ReactDatePicker from "react-datepicker";
import { useState, useEffect } from "preact/hooks";
import { utcToZonedTime, format } from "date-fns-tz";

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
  const [currentDate, setCurrentDate] = useState(selectedDate);

  useEffect(() => {
    if (currentDate && saveTimezone) {
      const zonedTime = format(currentDate, apiFormat, { saveTimezone });
      oteCallback?.(zonedTime);
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
      arrOfIntervals.map((minutes) =>
        utcToZonedTime(new Date().setHours(int, minutes), timeZone)
      )
    );

  const handleColor = (time) =>
    arrOfIntervals?.includes(time.getMinutes()) ? "" : "hide__time";

  const setFilteredTime = (time) =>
    time?.getTime() > utcToZonedTime(new Date(), timeZone)?.getTime() && time;

  return (
    <ReactDatePicker
      calendarContainer={({ children, className }) => (
        <div className="calendar__container__wrapper">
          <div className={className}>{children}</div>
        </div>
      )}
      renderCustomHeader={Header}
      onChange={(date) => setCurrentDate(date)}
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
      minDate={mindate || new Date(2012, 1, 1)}
      maxDate={maxdate || undefined}
      timeIntervals={setTimeIntervals?.()}
      filterTime={setFilteredTime}
      injectTimes={arrOfIntervals?.length && setIncludedTimes()}
      dateFormat={dateFormat}
    />
  );
}
