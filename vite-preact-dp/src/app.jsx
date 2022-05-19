import DatePicker from "react-datepicker";
import { useEffect, useRef, useState } from "preact/hooks";
import { forwardRef } from "preact/compat";
import { utcToZonedTime } from "date-fns-tz";

const CustomInput = forwardRef((props, ref) => (
  <input className="custom-input" {...props} ref={ref} />
));

export function App({
  dateFormat,
  hoursFormat,
  timeInterval,
  selectDate,
  selectedDate,
  timeZone,
}) {
  const inputRef = useRef();
  const [centerTrigger, setCenterTrigger] = useState(0);

  const filterPassedTime = (time) =>
    time.getTime() > utcToZonedTime(new Date(), timeZone).getTime() && time;

  useEffect(() => {
    inputRef.current && setCenterTrigger(inputRef.current.base.offsetWidth / 2);
  }, [inputRef.current]);

  return (
    <div className="wrapper-dt-pick">
      <DatePicker
        customInput={<CustomInput ref={inputRef} />}
        onChange={(date) => selectDate(date)}
        wrapperClassName="datePicker"
        className="datepicker-input"
        data-name="picker"
        calendarClassName="datepicker-calendar"
        popperPlacement="top-end"
        popperModifiers={[
          {
            name: "offset",
            options: {
              offset: [centerTrigger, 2],
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
        timeIntervals={timeInterval}
        selected={selectedDate}
        minDate={new Date()}
        filterTime={filterPassedTime}
        {...getFormat(dateFormat, hoursFormat)}
      />
    </div>
  );
}

function getFormat(dateFormat, hoursFormat) {
  return dateFormat.includes("HH:mm")
    ? { dateFormat: dateFormat }
    : hoursFormat
        ? {
            timeFormat: "HH:mm",
            dateFormat: `${dateFormat} HH:mm`,
          }
        : {
            dateFormat: `${dateFormat} h:mm aa`,
          };
}
