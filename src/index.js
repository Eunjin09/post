import React from 'react';
import * as ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux"; // 제공한다
import store from "./redux/configStore"; // 스토어 불러오기




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);



reportWebVitals();