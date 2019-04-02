import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router , Route, Link} from "react-router-dom";

import Root from './root';
import Register from './register';
import Login from './login';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Root}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/login" component={Login}></Route>
      </Router>
    );
  }
}

export default App;
