import ReactDatePicker from 'react-datepicker'
import { useState, useEffect } from 'preact/hooks'
import { utcToZonedTime, toDate, zonedTimeToUtc, format, formatInTimeZone } from 'date-fns-tz'
import './datePicker.scss'

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
  h24,
}) {
  const [currentDate, setCurrentDate] = useState(utcToZonedTime(selectedDate, timeZone))
  const [incTimes, setIncTimes] = useState([])

  useEffect(() => {
    if (currentDate && saveTimezone) {
      setIncludedTimes()
      const parsedDate = toDate(currentDate, { timeZone })
      const utcDate = zonedTimeToUtc(parsedDate, timeZone)
      const newDate = utcToZonedTime(utcDate.toISOString(), saveTimezone)
      const formatedDate = format(newDate, apiFormat, saveTimezone)
      oteCallback?.(formatedDate)
    }
  }, [currentDate, oteCallback])

  const arrOfIntervals =
    timeInterval?.length &&
    timeInterval
      ?.split(',')
      .map((i) => Number(i))
      .sort((a, b) => a - b)

  const setTimeIntervals = () => (arrOfIntervals?.length > 1 ? 60 : timeInterval || 5)

  const setIncludedTimes = () =>
    setIncTimes(
      [...Array(24).keys()].flatMap((int) =>
        arrOfIntervals.reduce((acc, minutes) => {
          const intervalDateTime = toDate(new Date(currentDate).setHours(int, minutes), {
            timeZone,
          })
          const formatedIntervalDT = utcToZonedTime(
            new Date(intervalDateTime).toISOString(),
            timeZone
          )
          const isAmbiguous =
            intervalDateTime.toUTCString() !=
            zonedTimeToUtc(formatedIntervalDT, timeZone).toUTCString()
          console.log(isAmbiguous, intervalDateTime.toUTCString(), acc)
          return isAmbiguous
            ? acc
            : [...acc, utcToZonedTime(intervalDateTime.toISOString(), timeZone)]
        }, [])
      )
    )

  const handleColor = (time) =>
    !arrOfIntervals || arrOfIntervals?.length === 1 || arrOfIntervals?.includes(time.getMinutes())
      ? ''
      : 'hide__time'

  return (
    <ReactDatePicker
      calendarContainer={({ className, children }) => (
        <div className="calendar__container__wrapper">
          <div className={className}>{children}</div>
        </div>
      )}
      renderCustomHeader={({
        decreaseMonth,
        increaseMonth,
        monthDate,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="calendar__nav">
          <button
            aria-label="Previous Month"
            className="calendar__nav__button calendar__nav__button--prev"
            disabled={prevMonthButtonDisabled}
            onClick={decreaseMonth}
          >
            &#9664;
          </button>
          <span className="calendar__nav__month__name">
            {monthDate.toLocaleString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
          <button
            aria-label="Next Month"
            className="calendar__nav__button calendar__nav__button--next"
            disabled={nextMonthButtonDisabled}
            onClick={increaseMonth}
          >
            &#9654;
          </button>
        </div>
      )}
      onChange={(date) => setCurrentDate(toDate(date, { timeZone }))}
      timeClassName={handleColor}
      wrapperClassName="datePicker"
      className="datepicker-input1"
      data-name="picker"
      calendarClassName="rasta-stripes"
      id="dddd-13"
      showDisabledMonthNavigation
      showTimeSelect
      timeFormat={h24 ? 'HH:mm' : 'h:mm aa'}
      showPopperArrow={false}
      selected={currentDate}
      minDate={mindate}
      maxDate={maxdate}
      timeIntervals={setTimeIntervals?.()}
      injectTimes={arrOfIntervals?.length && incTimes}
      dateFormat={dateFormat}
    />
  )
}
