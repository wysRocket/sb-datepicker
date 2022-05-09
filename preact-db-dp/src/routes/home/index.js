import { h } from "preact";
import { useState } from "preact/hooks";
import style from "./style.css";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className={style.home}>
      <DatePicker
        selected={startDate}
        showTimeSelect
        onChange={(date) => setStartDate(date)}
      />
    </div>
  );
};

export default Home;
