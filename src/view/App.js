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
import { Writing } from './articles'

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/writing' strict>
            <Writing />
          </Route>
          <Root />
        </Switch>
      </Router>
    </Provider>
  )
}
