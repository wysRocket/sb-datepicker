import { render } from "preact";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

import { SBDatePicker } from "../Modules/datePicker";
import "../index.scss";

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
    this._dateContainer = dateContainer;
    this._defaultDateTime = defaultDateTime || "";
    this._selectedDate = defaultDateTime
      ? utcToZonedTime(new Date(defaultDateTime), timeZone)
      : utcToZonedTime(new Date(), timeZone);
    this._h24 = h24;
    this._dateFormat =
      dateFormat || { 1: "MMMM d, yyyy HH:mm" }[h24] || "MMMM d, yyyy h:mm aa";
    this._minutesIntervals = minutesIntervals || "5";
    this._timeZone = timeZone || "";
    this._saveTimezone = saveTimezone;
    this._oteCallback = oteCallback;
    this._apiFormat = apiFormat || "yyyy-MM-dd'T'HH:mm:ss";
    this._minDate = minDate || undefined;
    this._maxDate = maxDate || undefined;
    this._render();
  }

  _render = () =>
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
        defaultDateTime={this._defaultDateTime}
        mindate={this._minDate}
        maxdate={this._maxDate}
      />,
      this._dateContainer
    );

  _selectDate = (date) => {
    this._selectedDate = date;
    this._render();
  };

  get dateWithServerTimeZoneOffset() {
    return zonedTimeToUtc(this._selectedDate, this._saveTimezone).toISOString();
  }

  get dateWithClientTimeZoneOffset() {
    return utcToZonedTime(this._selectedDate, this._timeZone);
  }

  get date() {
    return this._selectedDate;
  }

  get hoursFormat() {
    return this._h24;
  }

  set date(date) {
    this._selectedDate = date;
    this._render();
  }

  /**
   * @param {string} format
   */
  set format(format) {
    this._dateFormat = format;
    this._render();
  }

  /**
   * @param {number} format
   */
  set hoursFormat(format) {
    this._h24 = format;
    this._render();
  }

  destroy() {
    render(null, this._container, this._render());
  }
}
