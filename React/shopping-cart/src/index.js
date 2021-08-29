import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App"
import {Provider} from "reat-redux"
import {createStore} from "redux";
import reducer from "./redux/reducers";

let mystore = createStore(reducer);

ReactDOM.render(
  <Provider store = {mystore}>
    <App />
  </Provider>
    ,
  document.getElementById('root')
);

