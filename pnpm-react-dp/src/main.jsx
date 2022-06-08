// import { PreactDatePicker } from './Controllers/datePickerController'
import { SBDurationPicker } from './Controllers/durationPickerController'
// import { DelayWidget } from './Controllers/delayWidgetController'

// const oteId = 'datetime1a'
// var oteContainer = document.getElementById(oteId)
// var nteId = oteId + '-dt'
// oteContainer.outerHTML += '<div id="' + nteId + '"></div>'
// const nteContainer = document.getElementById(nteId)
// var oteData = oteContainer.dataset

// const picker = new PreactDatePicker({
//   dateContainer: nteContainer,
//   defaultDateTime: oteContainer.value,
//   minutesIntervals: oteData['dtMinutesIntervals'],
//   h24: oteData['dtH24'],
//   timezone: oteData['dtTimezone'],
//   saveTimezone: oteData['dtSaveTimezone'],
//   oteCallback: function (dateString) {
//     oteContainer.value = dateString
//     console.log(oteContainer.value)
//   },
// })

// new SBDurationPicker({
//   container: document.getElementById('duration-picker'),
// })

// new DelayWidget({
//   container: document.getElementById('delay-widget')
// })


// window.DatePicker = PreactDatePicker
window.DurationPicker = SBDurationPicker
// window.DelayWidget = DelayWidget