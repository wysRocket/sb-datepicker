import { render } from 'preact'
import { DurationPicker } from '../Components/DurationPicker/durationPicker'

export class SBDurationPicker {
  constructor({ container }) {
    this._durationPickerContainer = container
    this._render()
  }

  _render = () => render(<DurationPicker />, this._durationPickerContainer)

  destroy() {
    render(null, this._durationPickerContainer, this._render())
  }
}
