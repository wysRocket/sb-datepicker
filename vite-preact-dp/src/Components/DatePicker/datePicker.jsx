import ReactDatePicker, { dateTimeToTime, safeDateFormat } from 'react-datepicker-tz'
import { useState, useEffect } from 'preact/hooks'
import { utcToZonedTime, toDate, zonedTimeToUtc, format } from 'date-fns-tz'
import './datePicker.scss'

export function SBDatePicker({
  dateFormat,
  timeInterval,
  oteCallback,
  selectedDate,
  selectedTime,
  timeZone,
  saveTimezone,
  mindate,
  apiFormat,
  maxdate,
  h24,
}) {
  if (!maxdate) {
    maxdate = null
  }
  if (!mindate) {
    mindate = null
  }

  const sCD = (date, tz) => { if (date) { return utcToZonedTime(date.toISOString(), tz) } }
  const sCT = (date, time, tz) => { if (date || time) { return utcToZonedTime(time ? time.toISOString() : date.toISOString(), tz) } }

  const [currentDate, setCurrentDate] = useState( sCD(selectedDate, timeZone) )
  const [currentTime, setCurrentTime] = useState( sCT(selectedDate, selectedTime, timeZone) )
  const [isInitialized, setInitialized] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setCurrentDate( sCD(selectedDate, timeZone) )
    setCurrentTime( sCT(selectedDate, selectedTime, timeZone) )
  }, [selectedDate, selectedTime])

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
      var newTime = null

      if (currentTime) {
        const parsedTime = toDate(currentTime, { timeZone })
        const utcTime = zonedTimeToUtc(parsedTime, timeZone)
        newTime = utcToZonedTime(utcTime.toISOString(), saveTimezone)
      }

      const formattedDate = safeDateFormat(newDate, { dateFormat: apiFormat, selectedTime: newTime })
      oteCallback?.(formattedDate)
    }
  }, [currentDate, currentTime])

  const getArrayDefaultIntervals = (minInterval) =>
    [...Array(60 / minInterval).keys()].map((i) => i * minInterval)

  const arrOfIntervals = timeInterval?.length
    ? timeInterval
        ?.split(',')
        .map((i) => Number(i))
        .sort((a, b) => a - b)
    : getArrayDefaultIntervals(5)

  const filterPassedTime = (time) => time === null ? false : true

  const setTimeIntervals = () => {
    if (arrOfIntervals?.length) {
      var found = []
      return [...Array(24).keys()].flatMap((hours) =>
        arrOfIntervals.map((minutes) => {
          var date = dateTimeToTime(currentDate)
          date.setHours(hours, minutes)
          var dateStr = date.toString()
          if (! found[dateStr]) {
            found[dateStr] = 1
            return date
          }
        })
      )
    }
  }

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
      onChange={(date, e, time) => {
        setCurrentDate(toDate(date, { timeZone }))
        setCurrentTime(time ? toDate(time, { timeZone }): null)
        setInitialized(true)
      }}
      timeClassName={handleColor}
      wrapperClassName="datePicker"
      className="datepicker-input1"
      data-name="picker"
      calendarClassName="react-calendar"
      showTimeSelect
      fixedHeight
      timeFormat={h24 ? 'HH:mm' : 'h:mm aa'}
      showPopperArrow={false}
      selected={currentDate}
      selectedTime={currentTime}
      minDate={mindate}
      maxDate={maxdate}
      timeIntervals={100000}
      filterTime={filterPassedTime}
      injectTimes={setTimeIntervals?.()}
      dateFormat={dateFormat}
    />
  )
}
