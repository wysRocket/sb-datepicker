import { dateTimeToTime, setDateTimeFromString, safeDateFormat } from 'react-datepicker-tz'
import { render } from 'preact'
import { zonedTimeToUtc, toDate, format } from 'date-fns-tz'

import { SBDatePicker } from '../Components/DatePicker/datePicker'

export class PreactDatePicker {
  constructor({
    dateContainer,
    defaultDateTime,
    dateFormat,
    minutesIntervals,
    saveTimezone,
    timezone: timeZone,
    h24,
    oteCallback,
    apiFormat,
    minDate,
    maxDate,
  }) {
    this._defaultDateTime = _getDateTime(defaultDateTime, saveTimezone)
    this._defaultTime = _getTime(defaultDateTime, saveTimezone)
    this._dateContainer = dateContainer
    this._h24 = h24 ? Number(h24) : 0
    this._dateFormat = dateFormat || this._h24 ? 'MMMM d, yyyy HH:mm' : 'MMMM d, yyyy h:mm aa'
    this._minutesIntervals = minutesIntervals
    this._timeZone = timeZone
    this._saveTimezone = saveTimezone
    this._oteCallback = oteCallback.bind(this)
    this._apiFormat = apiFormat || "yyyy-MM-dd'T'HH:mm:ss"
    this._selectedDate = zonedTimeToUtc(this._defaultDateTime, saveTimezone)
    this._selectedTime = zonedTimeToUtc(this._defaultTime, saveTimezone)
    this._minDate = minDate
      ? toDate(minDate, { timeZone: saveTimezone })
      : toDate(new Date('2012-01-01T00:00:00'), { timeZone: saveTimezone })
    this._maxDate = maxDate ? toDate(maxDate, { timeZone: saveTimezone }) : ''
    this._render()
  }

  set hours24(h24) {
    if (Number(h24) === this._24) return
    this._h24 = Number(h24)
    this._dateFormat = this._h24 ? 'MMMM d, yyyy HH:mm' : 'MMMM d, yyyy h:mm aa'
    this._render()
  }

  update = (defaultDateTime) => {
    if (!defaultDateTime) return;

    this._defaultDateTime = _getDateTime(defaultDateTime, this._saveTimezone)
    this._defaultTime = _getTime(defaultDateTime, this._saveTimezone)
    this._selectedDate = zonedTimeToUtc(this._defaultDateTime, this._saveTimezone)
    this._selectedTime = zonedTimeToUtc(this._defaultTime, this._saveTimezone)

    this._render()
  }

  _render = () => {
    render(
      <SBDatePicker
        dateContainer={this._dateContainer}
        selectedDate={this._selectedDate}
        selectedTime={this._selectedTime}
        oteCallback={this._oteCallback}
        dateFormat={this._dateFormat}
        timeZone={this._timeZone}
        timeInterval={this._minutesIntervals}
        apiFormat={this._apiFormat}
        saveTimezone={this._saveTimezone}
        mindate={this._minDate}
        maxdate={this._maxDate}
        h24={this._h24}
      />,
      this._dateContainer
    )
  }

  destroy() {
    render(null, this._container, this._render())
  }
}

function _getDateTime(value, timezone) {
    return typeof value === 'object'
      ? toDate(value.toISOString(), { timeZone: timezone })
      : toDate(value) || toDate(new Date().toISOString(), { timeZone: timezone })
}

function _getTime(value, timezone) {
    return typeof value === 'object'
      ? toDate(value.toISOString(), { timeZone: timezone })
      : setDateTimeFromString(
          dateTimeToTime(
            toDate(value) || toDate(new Date().toISOString(), { timeZone: timezone })
          ),
          value
        )
}
