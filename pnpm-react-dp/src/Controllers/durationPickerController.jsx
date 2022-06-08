import { DurationPicker } from '../Components/DurationPicker/durationPicker'

import * as ReactDOM from 'react-dom';

export class SBDurationPicker {
  constructor({ container }) {
    this._durationPickerContainer = container
    this._render()
  }
   
  _render = () => {
    ReactDOM.render(<DurationPicker />, this._durationPickerContainer)
  }

  destroy() {
    ReactDOM.render(null, this._durationPickerContainer, this._render())
  }
}
