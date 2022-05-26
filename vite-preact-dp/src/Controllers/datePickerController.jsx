import { render } from "preact";
import { utcToZonedTime } from "date-fns-tz";
import { SBDatePicker } from "../Components/Datepicker";
export class PreactDatePicker {
  constructor({
    oteContainer,
    defaultDateTime,
    dateFormat,
    minutesIntervals,
    "data-dt-saveTimezone": saveTimeZone,
    "data-dt-timezone": timeZone,
    "data-dt-24h": dt24h,
    apiFormat,
    oteInput,
  }) {
    this._oteContainer = oteContainer;
    this._defaultDateTime = defaultDateTime || "";
    this._selectedDate = defaultDateTime
      ? utcToZonedTime(new Date(defaultDateTime), saveTimeZone)
      : utcToZonedTime(new Date(), saveTimeZone);
    this._dateFormat = dateFormat || "MMMM d, yyyy, HH:mm aa";
    this._hoursFormat = dt24h || 1;
    this._minutesIntervals = minutesIntervals || 5;
    this._timeZone = timeZone || "";
    this._saveTimezone = saveTimeZone;

    this._apiFormat = apiFormat || "yyyy-MM-dd'T'HH:mm:ss";
    this._oteInput = oteInput;

    this._render();
  }

  _render = () =>
    render(
      <SBDatePicker
        oteInput={this._oteInput}
        customInput={this._container}
        selectedDate={this._selectedDate}
        selectDate={this._selectDate}
        dateFormat={this._dateFormat}
        hoursFormat={this._hoursFormat}
        timeZone={this._timeZone}
        timeInterval={this._minutesIntervals}
        apiFormat={this._apiFormat}
        saveTimezone={this._saveTimezone}
        defaultDateTime={this._defaultDateTime}
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
