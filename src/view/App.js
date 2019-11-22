import React from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import HomePage from './homePage'
import { Provider } from "react-redux";
import { store } from '../redux'

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <HomePage />
      </Router>
    </Provider>
  )
}
