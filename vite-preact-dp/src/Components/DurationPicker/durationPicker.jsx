import { useState, useRef } from 'preact/hooks'
import TimeField from 'react-simple-timefield'
import { ReactComponent as ArrowUp } from '../../assets/arrow-up.svg'
import { ReactComponent as ArrowDown } from '../../assets/arrow-down.svg'
import './durationPicker.scss'
import DurationInput from 'react-duration'

export const DurationPicker = ({}) => {
  const [durationTime, setDurationTime] = useState({ h: 3, m: 5, s: 45 })
  const intervalRef = useRef(null)

  const convertToStringTime = () =>
    Object.keys(durationTime).reduce(
      (acc, key, idx) =>
        durationTime[key].toString().length < 2
          ? acc + `0${durationTime[key]}` + (idx !== 2 ? ':' : '')
          : acc + durationTime[key] + (idx !== 2 ? ':' : ''),
      ''
    )

  const onChange = (e) => {
    if (/^(?=.*?[1-9])[0-9()-:]+$/.test(e.target.value)) {
      const time = e.target.value.split(':').map((i) => Number(i))
      console.log(time)
      setDurationTime((prevState) => ({
        ...prevState,
        h: time[0],
        m: time[1],
        s: time[2],
      }))
    } else {
    }
  }

  const increaseSeconds = () =>
    setDurationTime((prevState) => ({
      ...prevState,
      s: prevState.s + 1 > 59 ? 0 : prevState.s + 1,
    }))

  const decreaseSeconds = () =>
    setDurationTime((prevState) => ({
      ...prevState,
      s: prevState.s - 1 < 0 ? 59 : prevState.s - 1,
    }))

  const wrappedInterval = (fn) => {
    if (intervalRef.current) return
    intervalRef.current = setInterval(() => {
      fn()
    }, 120)
  }

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  return (
    <>
      <div className={'durationPickerContainer'}>
        <DurationInput
          value={125.4}
          // onChange={(new_duration) => this.setState({ duration: new_duration })}
        />
        {/* <input
          type="text"
          value={convertToStringTime()}
          onChange={onChange}
          className={'durationPickerInput'}
          colon=":"
          showSeconds
          input={<input type="text" className="custom-input" />}
        /> */}
        <div className={'buttonGroupControl'}>
          <button
            className={'inputButton'}
            onClick={increaseSeconds}
            onMouseDown={() => {
              wrappedInterval(increaseSeconds)
            }}
            onMouseUp={stopCounter}
            onMouseOut={stopCounter}
          >
            <ArrowUp />
          </button>
          <button
            onClick={decreaseSeconds}
            onMouseDown={() => {
              wrappedInterval(decreaseSeconds)
            }}
            onMouseUp={stopCounter}
            onMouseOut={stopCounter}
            className={'inputButton'}
          >
            <ArrowDown />
          </button>
        </div>
      </div>
    </>
  )
}