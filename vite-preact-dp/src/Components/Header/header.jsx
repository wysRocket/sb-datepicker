import './header.scss'

export const Header = ({
  decreaseMonth,
  increaseMonth,
  monthDate,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}) => {
  return (
    <div className="calendar__nav">
      <button
        // aria-label="Previous Month"
        className="calendar__nav__button calendar__nav__button--prev"
        disabled={prevMonthButtonDisabled}
        onClick={decreaseMonth}
      >
        &#9664;
      </button>
      <span className="calendar__nav__month__name">
        {monthDate.toLocaleString('en-US', {
          month: 'long',
          year: 'numeric',
        })}
      </span>
      <button
        // aria-label="Next Month"
        className="calendar__nav__button calendar__nav__button--next"
        disabled={nextMonthButtonDisabled}
        onClick={increaseMonth}
      >
        &#9654;
      </button>
    </div>
  )
}
