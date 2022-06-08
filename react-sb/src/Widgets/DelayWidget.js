import { SBDatePicker } from '../Components/DatePicker/datePicker'
import { DurationPicker } from '../Components/DurationPicker/durationPicker'
import './DelayWidget.scss'
const opt = ['Tungsten', 'Titanium', 'Platinum', 'Gold', 'Silver', 'Bronze', 'Copper', 'Tin']

export const DelayWidget = () => {
  
  return (
    <div className='delay-widget'>
      <div className='delay-widget__header'>
        <h4 className='delay-widget__title'>Tier Delay</h4>
        <DurationPicker/>
      </div>
      <ul className="options-list">
        {opt.map((option, idx) => (
          <li key={`${idx}-${option}`}className='options-list__item'>
            <input type="checkbox" />
            <span>{option}</span>
            <SBDatePicker selectedDate={new Date()} />
          </li>
        ))}
      </ul>
    </div>
  )
}
