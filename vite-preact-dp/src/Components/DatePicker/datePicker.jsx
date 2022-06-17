import ReactDatePicker from 'react-datepicker'
import { useState, useEffect, useRef } from 'preact/hooks'
import { utcToZonedTime, toDate, zonedTimeToUtc, format } from 'date-fns-tz'
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
  toTimeZone,
}) {
  const [currentDate, setCurrentDate] = useState(utcToZonedTime(selectedDate, timeZone))
  const [isInitialized, setInitialized] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setCurrentDate(utcToZonedTime(selectedDate, timeZone))
  }, [selectedDate])

  useEffect(() => {
    open &&
      document
        .querySelector('.react-datepicker__time-list-item--selected')
        ?.scrollIntoView({ block: 'center' })
  }, [open])

  useEffect(() => {
    if (currentDate && isInitialized) {
      const parsedDate = toDate(currentDate, { timeZone })
      const utcDate = zonedTimeToUtc(parsedDate, timeZone)
      const newDate = utcToZonedTime(utcDate.toISOString(), saveTimezone)
      const formatedDate = format(newDate, apiFormat, saveTimezone)
      oteCallback?.(formatedDate)
    }
  }, [currentDate, isInitialized])

  const getArrayDefaultIntervals = (minInterval) =>
    [...Array(60 / minInterval).keys()].map((i) => i * minInterval)

  const arrOfIntervals = timeInterval?.length
    ? timeInterval
        ?.split(',')
        .map((i) => Number(i))
        .sort((a, b) => a - b)
    : getArrayDefaultIntervals(5)

  const setTimeIntervals = () =>
    arrOfIntervals?.length &&
    [...Array(24).keys()].flatMap((int) =>
      arrOfIntervals.map((minutes) => {
        const intervalDateTime = toDate(new Date(currentDate).setHours(int, minutes), {
          timeZone,
        })
        return utcToZonedTime(intervalDateTime.toISOString(), timeZone)
      })
    )

  const handleColor = (time) => (arrOfIntervals.includes(time.getMinutes()) ? '' : 'hide__time')

  return (
    <ReactDatePicker
      onCalendarOpen={() => setOpen(true)}
      onCalendarClose={() => {
        setOpen(false)
        setInitialized(false)
      }}
      calendarContainer={({ className, children }) => (
        <div className="calendar__container__wrapper">
          <div className={className}>{children}</div>
        </div>
      )}
      onChange={(date) => {
        setCurrentDate(toDate(date, { timeZone }))
        setInitialized(true)
      }}
      timeClassName={handleColor}
      wrapperClassName="datePicker"
      className="datepicker-input1"
      data-name="picker"
      calendarClassName="react-calendar"
      id="dddd-13"
      showTimeSelect
      fixedHeight
      timeFormat={h24 ? 'HH:mm' : 'h:mm aa'}
      showPopperArrow={false}
      selected={currentDate}
      minDate={mindate}
      maxDate={maxdate}
      timeIntervals={60}
      injectTimes={setTimeIntervals?.()}
      dateFormat={dateFormat}
    />
  )
}
