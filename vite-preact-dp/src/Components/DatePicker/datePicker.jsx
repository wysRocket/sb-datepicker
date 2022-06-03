import ReactDatePicker from 'react-datepicker'
import { useState, useEffect } from 'preact/hooks'
import { utcToZonedTime, toDate, zonedTimeToUtc, format } from 'date-fns-tz'

import { Header } from '../Header/header'
import { Container } from '../Container/container'
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

  useEffect(() => {
    if (currentDate && saveTimezone) {
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

  const setTimeIntervals = () => (arrOfIntervals?.length > 1 ? 60 : 5)

  const setIncludedTimes = () =>
    [...Array(24).keys()].flatMap((int) =>
      arrOfIntervals.map((minutes) => {
        const intervalDateTime = toDate(new Date().setHours(int, minutes), {
          timeZone,
        })
        return utcToZonedTime(intervalDateTime, timeZone)
      })
    )

  const handleColor = (time) => (arrOfIntervals?.includes(time.getMinutes()) ? '' : 'hide__time')

  return (
    <ReactDatePicker
      calendarContainer={Container}
      renderCustomHeader={Header}
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
      injectTimes={arrOfIntervals?.length && setIncludedTimes()}
      dateFormat={dateFormat}
    />
  )
}
