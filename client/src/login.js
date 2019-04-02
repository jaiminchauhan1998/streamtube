import React, { Component } from 'react';
import {BrowserRouter as Router , Route, Link} from "react-router-dom";

import Root from './root';

class Login extends Component {
  render() {
    return (
        <div>
            <form action="http://localhost:5000/api/users/login" method="post">
                Email:<input type="text" name="email"></input><br />
                Password:<input type="text" name="password"></input><br />
                <input type="submit" value="Submit"></input>
             </form>
        </div>
    );
  }
}

export default Login;
