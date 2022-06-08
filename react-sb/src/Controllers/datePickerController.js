import { utcToZonedTime, zonedTimeToUtc, toDate } from 'date-fns-tz'
import ReactDOM from "react-dom/client";
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
    this._dateContainer = dateContainer

    this._h24 = h24
    this._dateFormat = dateFormat || { 1: 'MMMM d, yyyy HH:mm' }[h24] || 'MMMM d, yyyy h:mm aa'
    this._defaultDateTime =
      toDate(defaultDateTime, { saveTimezone }) ||
      toDate(new Date().toISOString(), { saveTimezone })
    this._minutesIntervals = minutesIntervals || '5'
    this._timeZone = timeZone
    this._saveTimezone = saveTimezone
    this._oteCallback = oteCallback
    this._apiFormat = apiFormat || "yyyy-MM-dd'T'HH:mm:ss"
    this._selectedDate = zonedTimeToUtc(this._defaultDateTime, saveTimezone)
    this._minDate =
      toDate(minDate, { saveTimezone }) || toDate('2012-01-01T00:00:00', { saveTimezone })
    this._maxDate = toDate(maxDate, { saveTimezone })
    this._render()
  }

  _render = () => {
    this.root = ReactDOM.createRoot(this._dateContainer);
    this.root.render(<SBDatePicker 
      dateContainer={this._dateContainer}
      selectedDate={this._selectedDate}
      oteCallback={this._oteCallback}
      dateFormat={this._dateFormat}
      timeZone={this._timeZone}
      timeInterval={this._minutesIntervals}
      apiFormat={this._apiFormat}
      saveTimezone={this._saveTimezone}
      mindate={this._minDate}
      maxdate={this._maxDate}
      h24={this._h24}
    />)
  }
  
  _selectDate = (date) => {
    this._selectedDate = date
    this._render()
  }

  get dateWithServerTimeZoneOffset() {
    return zonedTimeToUtc(this._selectedDate, this._timeZone).toISOString()
  }

  get dateWithClientTimeZoneOffset() {
    return utcToZonedTime(this._selectedDate, this._saveTimezone)
  }

  get date() {
    return this._selectedDate
  }

  get hoursFormat() {
    return this._h24
  }

  set date(date) {
    this._selectedDate = date
    this._render()
  }

  /**
   * @param {string} format
   */
  set format(format) {
    this._dateFormat = format
    this._render()
  }

  /**
   * @param {number} format
   */
  set hoursFormat(format) {
    this._h24 = format
    this._render()
  }
  destroy() {
    this.root.unmount();
  }
}
