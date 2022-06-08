import { render } from 'preact'
import { DelayWidget as DelayDateWidget} from '../Widgets/DelayWidget'

export class DelayWidget {
  constructor({ container }) {
    this._container = container
    this._render()
  }

  _render = () => render(<DelayDateWidget  />, this._container)

  destroy() {
    render(null, this._container, this._render())
  }
}
