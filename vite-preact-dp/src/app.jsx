import { useState } from "preact/hooks";
import DatePicker from "react-datepicker";

import { Logo } from "./logo";

export function App() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <Logo />

      <DatePicker
        selected={startDate}
        showTimeSelect
        onChange={(date) => setStartDate(date)}
        wrapperClassName="wrapperClassName"
        popperClassName="popperClassName"
        popperPlacement="bottom-end"
        popperModifiers={[
          {
            name: "offset",
            options: {
              offset: [500, 2],
            },
          },
          {
            name: "preventOverflow",
            options: {
              rootBoundary: "viewport",
              tether: false,
              altAxis: true,
            },
          },
        ]}
      />
    </>
  );
}
