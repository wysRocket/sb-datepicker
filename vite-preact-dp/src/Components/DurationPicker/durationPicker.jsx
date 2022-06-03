import { useState, useRef } from 'preact/hooks'
import TimeField from 'react-simple-timefield'

import { SBDatePicker } from '../DatePicker/datePicker'
import srcArrowUp from '../../assets/arrow-up.svg'
import srcArrowDown from '../../assets/arrow-down.svg'

import styles from './durationPicker.scss'

const opt = ['Tungsten', 'Titanium', 'Platinum', 'Gold', 'Silver', 'Bronze', 'Copper', 'Tin']

let b = false

export const DurationPicker = ({}) => {
  const [durationTime, setDurationTime] = useState('22:33:55')
  const intervalRef = useRef(null)

  const onChange = (e, value) => {
    setDurationTime(value)
  }

  const increaseSeconds = () => {
    if (intervalRef.current) return
    intervalRef.current = setInterval(() => {
      setDurationTime((prevState) => {
        console.log(prevState)
        const b = Number(prevState.slice(prevState.length - 2)) + 1
        const replacer = b > 59 ? (b.toString().length < 2 ? `0${b}` : b.toString()) : b.toString()
        return prevState.replace(prevState.slice(prevState.length - 2), replacer)
      })
    }, 100)
  }

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  return (
    <>
      <div className={styles.header}>
        <h4 className={styles.title}>Tier Delay</h4>
        <div className={styles.durationPickerContainer}>
          <TimeField
            value={durationTime}
            onChange={onChange}
            className={styles.durationPickerInput}
            inputRef={(ref) => {}}
            colon=":"
            showSeconds
          />
          <div className={styles.buttonGroupControl}>
            <button
              className={styles.inputButton}
              onMouseDown={() => {
                increaseSeconds()
              }}
              onMouseUp={() => {
                stopCounter(false)
              }}
              onMouseOut={() => stopCounter(false)}
            >
              <img className={styles.buttonIcon} src={srcArrowUp} />
            </button>
            <button className={styles.inputButton}>
              <img className={styles.buttonIcon} src={srcArrowDown} />
            </button>
          </div>
        </div>
      </div>
      <div className="">
        {opt.map((option) => (
          <div className={styles['list__item']}>
            <input type="checkbox" />
            <span>{option}</span>
            <SBDatePicker selectedDate={new Date()} />
          </div>
        ))}
      </div>
    </>
  )
}
