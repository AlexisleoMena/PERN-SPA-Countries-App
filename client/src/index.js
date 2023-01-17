import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App.js";
import store from "./redux/store";

import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();
axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);