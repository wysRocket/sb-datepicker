import { PreactDatePicker } from './Controllers/datePickerController'
import { SBDurationPicker } from './Controllers/durationPickerController'
import { DelayWidget } from './Controllers/delayWidgetController'

// const oteId = 'datetime1a'
// var oteContainer = document.getElementById(oteId)
// var nteId = oteId + '-dt'
// oteContainer.outerHTML += '<div id="' + nteId + '"></div>'
// const nteContainer = document.getElementById(nteId)
// var oteData = oteContainer.dataset

// new PreactDatePicker({
//   dateContainer: document.getElementById('app'),
//   minutesIntervals: '30',
//   h24: '1',
//   timezone: 'America/Los_Angeles',
//   saveTimezone: 'America/New_York',
//   defaultDateTime: '2022-05-31T22:00:00',
//   minDate: '2012-01-01T00:00:00',
// })

// new SBDurationPicker({  container: document.getElementById('duration-picker')})

// new DelayWidget({
//   container: document.getElementById('delay-widget')
// })

window.DatePicker = PreactDatePicker
window.DurationPicker = SBDurationPicker
window.DelayWidget = DelayWidget
