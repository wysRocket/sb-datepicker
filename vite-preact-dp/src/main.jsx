import { render } from "preact";
import { App } from "./app";
import "./index.scss";

const init = (el) => render(<App />, el);
window.initDataPicker = init;
