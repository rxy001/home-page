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
import { Writing, Content } from './articles'

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/content/:id' exact strict component={Content} />
          <Route path='/writing' exact component={Writing} />
          <Root />
        </Switch>
      </Router>
    </Provider>
  )
}
