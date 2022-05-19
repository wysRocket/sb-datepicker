import { render } from "preact";
import { utcToZonedTime } from "date-fns-tz";

import { App } from "./app";
import "./index.scss";

const hoursFormat = "_hoursFormat";
const intervals = "_minutesIntervals";

class PreactDataPicker {
  constructor({
    oteContainer,
    defaultDateTime,
    dateFormat,
    minutesIntervals,
    "data-dt-saveTimezone": saveTimeZone,
    "data-dt-timezone": timeZone,
    "data-dt-24h": dt24h,
  }) {
    this._oteContainer = oteContainer;
    this._selectedDate =
      (defaultDateTime &&
        utcToZonedTime(new Date(defaultDateTime), timeZone)) ||
      utcToZonedTime(new Date(), timeZone);
    this._dateFormat = dateFormat || "yyyy-MM-dd";
    this[hoursFormat] = dt24h;
    this[intervals] = minutesIntervals || 5;
    this._timeZone = timeZone || "";
    this._saveTimezone = saveTimeZone;

    this._render();
  }

  _render = () =>
    render(
      <App
        customInput={this._container}
        selectedDate={this._selectedDate}
        selectDate={this._selectDate}
        dateFormat={this._dateFormat}
        hoursFormat={this[hoursFormat]}
        timeZone={this._timeZone}
        timeInterval={this[intervals]}
      />,
      this._oteContainer
    );

  _selectDate = (date) => {
    this._selectedDate = date;
    this._render();
  };

  get dateWithServerTimeZoneOffset() {
    return utcToZonedTime(this._selectedDate, this._saveTimezone);
  }

  get dateWithClientTimeZoneOffset() {
    return utcToZonedTime(new Date(), this._timeZone);
  }

  get date() {
    return this._selectedDate;
  }

  get hours() {
    return this[hoursFormat];
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
  set hours(format) {
    this[hoursFormat] = format;
    this._render();
  }

  destroy() {
    render(null, this._container, this._render());
  }
}

window.DatePicker = PreactDataPicker;
