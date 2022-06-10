import { DurationPicker } from '../Components/DurationPicker/durationPicker'
import ReactDOM from "react-dom/client";
 
export class SBDurationPicker {
  constructor({ container }) {
    this._durationPickerContainer = container
    this._render()
  }
   
  _render = () => {
    this.root = ReactDOM.createRoot(this._durationPickerContainer);
    this.root.render(<DurationPicker />)
  }

  destroy() {
    this.root.unmount();
  }
}
