import { render } from 'preact'
import { DurationPicker } from '../Components/DurationPicker/durationPicker'

export class SBDurationPicker {
  constructor({ container }) {
    this._container = container
    this._render()
  }

  _render = () => render(<DurationPicker />, this._container)

  destroy() {
    render(null, this._container, this._render())
  }
}
