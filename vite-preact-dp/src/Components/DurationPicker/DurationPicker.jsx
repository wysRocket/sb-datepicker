import { useState } from "preact/hooks";
import TimeField from "react-simple-timefield";
import styles from "./DurationPicker.module.scss";
import { SBDatePicker } from "../Datepicker";

const opt = [
  "Tungsten",
  "Titanium",
  "Platinum",
  "Gold",
  "Silver",
  "Bronze",
  "Copper",
  "Tin",
];

export const DurationPicker = ({}) => {
  const [durationTime, setDurationTime] = useState("22:33:55");

  const onChange = (e, value) => {
    setDurationTime(value);
  };

  return (
    <>
      <div className={styles.header}>
        <h4 className={styles.title}>Tier Delay</h4>
        <div className={styles["duration-picker__input__container"]}>
          <TimeField
            value={durationTime}
            onChange={onChange}
            className="duration-picker__input"
            inputRef={(ref) => {}}
            colon=":"
            showSeconds
          />
          <div className="duration-picker__input__btn-group">
            <button className={"duration-picker__input-button"}>&#9206;</button>
            <button className={"duration-picker__input-button"}>&#9207;</button>
          </div>
        </div>
      </div>
      <div className="">
        {opt.map((option) => (
          <div className={styles["list__item"]}>
            <input type="checkbox" />
            <span>{option}</span>
            <SBDatePicker selectedDate={new Date()} />
          </div>
        ))}
      </div>
    </>
  );
};
