import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {combineReducers, createStore} from "redux";
import { Provider } from 'react-redux';
import reducer from "./redux/reducer";
import {counterReducer,loginReducer} from "./redux/reducer";

let rootReducer = combineReducers({
  count:counterReducer,
  logged:loginReducer,
});

let myStore = createStore(rootReducer);

ReactDOM.render(
  <Provider store={myStore}>
    <App />
  </Provider>
    ,
  document.getElementById('root')
);

