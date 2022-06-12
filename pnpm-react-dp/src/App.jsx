import React, { useState } from "react";
import { Popup, DatePicker } from "react-date-time-picker-popup";
import ReactDatePicker from "react-datepicker";

import "react-date-time-picker-popup/dist/index.css";
import "./stylesheets/datepicker.scss";

const App = () => {
  const [visible, setVisible] = useState(false);
  const [day, setDay] = useState(new Date());

  return (
    <div className="App">
      <ReactDatePicker />
      <button onClick={() => setVisible(true)}>show</button>
      <Popup visible={visible} setVisible={setVisible} BGColor={"tomato"}>
        <DatePicker
          lang="en"
          selectedDay={day}
          setSelectedDay={setDay}
          timeSelector={true}
        />
      </Popup>
    </div>
  );
};

export default App;
