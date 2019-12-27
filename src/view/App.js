import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
// import HomePage from './homePage'
import Root from './root'
import { Provider } from "react-redux";
import { store } from '../redux'

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Root />
      </Router>
    </Provider>
  )
}
