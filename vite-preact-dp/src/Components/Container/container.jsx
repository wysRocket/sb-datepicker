import './Container.scss'

export const Container = ({ className, children }) => {
  return (
    <div className="calendar__container__wrapper">
      <div className={className}>{children}</div>
    </div>
  )
}
