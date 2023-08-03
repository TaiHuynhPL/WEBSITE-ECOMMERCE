import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/index";
import axios from "axios";

import "./index.css";
import App from "./App";

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
