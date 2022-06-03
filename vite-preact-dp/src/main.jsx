import { PreactDatePicker } from './Controllers/datePickerController'
import { SBDurationPicker } from './Controllers/durationPickerController'

// new PreactDatePicker({
//   dateContainer: document.getElementById('app'),
//   minutesIntervals: '9,17',
//   h24: '1',
//   timezone: 'America/Los_Angeles',
//   saveTimezone: 'America/New_York',
//   defaultDateTime: '2022-05-31T22:00:00',
//   minDate: '2012-01-01T00:00:00',
// })

window.DatePicker = PreactDatePicker

window.DurationPicker = SBDurationPicker
