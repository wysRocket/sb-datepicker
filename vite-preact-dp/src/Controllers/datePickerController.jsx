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
    this._defaultDateTime =
      typeof defaultDateTime === 'object'
        ? toDate(defaultDateTime.toISOString(), { timeZone: saveTimezone })
        : toDate(defaultDateTime) || toDate(new Date().toISOString(), { timeZone: saveTimezone })
    this._dateContainer = dateContainer
    this._h24 = h24 ? Number(h24) : 0
    this._dateFormat = dateFormat || this._h24 ? 'MMMM d, yyyy HH:mm' : 'MMMM d, yyyy h:mm aa'
    this._minutesIntervals = minutesIntervals
    this._timeZone = timeZone
    this._saveTimezone = saveTimezone
    this._oteCallback = oteCallback.bind(this)
    this._apiFormat = apiFormat || "yyyy-MM-dd'T'HH:mm:ss"
    this._selectedDate = zonedTimeToUtc(this._defaultDateTime, saveTimezone)
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

  update = (value) => {
    if (!value) return

    this._defaultDateTime =
      typeof value === 'object'
        ? toDate(value.toISOString(), { timeZone: saveTimezone })
        : toDate(value)
    this._selectedDate = zonedTimeToUtc(this._defaultDateTime, this._saveTimezone)
    const formatedDate = format(this._defaultDateTime, this._apiFormat, this._saveTimezone)
    this._oteCallback(formatedDate)
    this._render()
  }

  _render = () => {
    render(
      <SBDatePicker
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
        toTimeZone={this._toTimeZone.bind(this)}
      />,
      this._dateContainer
    )
  }

  _selectDate = (date) => {
    this._selectedDate = date
    this._render()
  }

  _toTimeZone(date, timeZone) {
    // ISO string or existing date object
    date = new Date(date)
    var options = {
      timeZone: timeZone,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      fractionalSecondDigits: 3,
    }

    var tzOptions = Object.assign({ timeZoneName: 'long' }, options)

    // Every country uses the same year and months, right?
    var formater = new Intl.DateTimeFormat('default', tzOptions)
    var parts = formater.formatToParts(date)

    // millisecond is explicitly 0 for iOS' lack of fractionalSecond support
    var whole = { millisecond: 0 }
    parts.forEach(function (part) {
      var val = part.value
      switch (part.type) {
        case 'literal':
          // ignore separators and whitespace characters
          return
        case 'timeZoneName':
          // keep as is - it's a string
          break
        case 'month':
          // months are 0-indexed for new Date()
          val = parseInt(val, 10)
          break
        case 'hour':
          // because sometimes 24 is used instead of 0, make 24 0
          val = parseInt(val, 10) % 24
          break
        case 'fractionalSecond':
          // fractionalSecond is a dumb name - should be millisecond
          whole.millisecond = parseInt(val, 10)
          return
        default:
          val = parseInt(val, 10)
      }
      // ex: whole.month = 0;
      whole[part.type] = val
    })

    whole.timeZone = timeZone
    whole.offset = this._getOffset(date, whole)
    whole.toISOString = this._toOffsetISOString
    return whole
  }

  _toTimeZoneISOString(date, timeZone) {
    var whole = this._toTimeZone(date, timeZone)
    return this._formatAsOffsetISOString(whole)
  }

  _toOffsetISOString() {
    /* jshint validthis: true */
    return this._formatAsOffsetISOString(this)
  }

  _getOffset(utcDate, tzD2) {
    var tzDate = new Date(this._formatAsOffsetISOString(tzD2))
    var diff = Math.round((tzDate.valueOf() - utcDate.valueOf()) / (60 * 1000))
    return diff
  }

  _p2(x) {
    return String(x).padStart(2, '0')
  }

  _p3(x) {
    return String(x).padStart(3, '0')
  }

  _formatOffset(minutes) {
    if (!minutes) {
      return 'Z'
    }

    var h = Math.floor(Math.abs(minutes) / 60)
    var m = Math.abs(minutes) % 60
    var offset = ''
    if (minutes > 0) {
      offset = '+'
    } else if (minutes < 0) {
      offset = '-'
    }

    // +0500, -0730
    return offset + h.toString().padStart(2, '0') + m.toString().padStart(2, '0')
  }

  _toOffsetISOString(date, timeZone) {
    if ('object' === typeof date && 'offset' in date && 'year' in date) {
      return this._formatAsOffsetISOString(date)
    }

    var whole = fromTimeZone(date, timeZone)
    return this._formatAsOffsetISOString(whole)
  }

  _formatAsOffsetISOString(d) {
    var offset = this._formatOffset(d.offset)
    return (
      `${d.year}-${this._p2(d.month)}-${this._p2(d.day)}` +
      `T${this._p2(d.hour)}:${this._p2(d.minute)}:${this._p2(d.second)}.${this._p3(
        d.millisecond
      )}${offset}`
    )
  }

  _fromTimeZone(dt, tz) {
    if ('string' === typeof dt) {
      // Either of these formats should work:
      // 2021-03-14 01:15:59
      // 2021-03-14T01:15:59Z
      dt = dt.replace('T', ' ').replace('Z', '').replace(' ', 'T').replace(/$/, 'Z')
    }
    var utcDate = new Date(dt)
    var tzD2 = this._toTimeZone(utcDate, tz)
    var offset = tzD2.offset
    tzD2.offset = 0

    var deltaDate = new Date(utcDate)
    deltaDate.setUTCMinutes(deltaDate.getUTCMinutes() - offset)
    var tzD3 = this._toTimeZone(deltaDate, tz)

    if (tzD3.hour === utcDate.getUTCHours() && tzD3.minute === utcDate.getUTCMinutes()) {
      return tzD3
    }

    var diff = tzD3.offset - offset
    var h = Math.floor(Math.abs(diff) / 60)
    var m = Math.abs(diff) % 60
    var sign = Math.abs(diff) / diff
    tzD3.hour -= h * sign
    tzD3.minute -= m * sign

    return tzD3
  }

  _toLocalISOString(dateOrStr) {
    var d
    if (dateOrStr) {
      d = new Date(dateOrStr)
    } else {
      d = new Date()
    }

    var YYYY = d.getFullYear()
    var MM = p2(d.getMonth())
    var DD = p2(d.getDate())
    var hh = p2(d.getHours())
    var mm = p2(d.getMinutes())
    var ss = p2(d.getSeconds())
    var sss = d.getMilliseconds().toString().padStart(3, '0')

    var offset = formatOffset(-d.getTimezoneOffset())

    return `${YYYY}-${MM}-${DD}T${hh}:${mm}:${ss}.${sss}${offset}`
  }

  _getTimeZone() {
    return new Intl.DateTimeFormat().resolvedOptions().timeZone
  }

  destroy() {
    render(null, this._container, this._render())
  }
}
