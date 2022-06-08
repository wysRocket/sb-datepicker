import ReactDOM from "react-dom/client";
import { DelayWidget as DelayDateWidget } from "../Widgets/DelayWidget";

export class DelayWidget {
  constructor({ container }) {
    this._container = container;
    this._render();
  }

  _render = () => {
    this.root = ReactDOM.createRoot(this._container);
    this.root.render(<DelayDateWidget />);
  };

  destroy() {
    this.root.unmount()
  }
}
