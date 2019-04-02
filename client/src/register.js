import React, { Component } from 'react';
import {BrowserRouter as Router , Route, Link} from "react-router-dom";

import Root from './root';

class Register extends Component {
  render() {
    return (
        <div>
            <form action="http://localhost:5000/api/users/register" method="post">
                Name: <input type="text" name="name"></input><br />
                Email: <input type="text" name="email"></input><br />
                Password: <input type="text" name="password"></input><br />
                Confirm Password: <input type="text" name="password2"></input><br />
                <input type="submit" value="Submit"></input>
             </form>
        </div>
    );
  }
}

export default Register;
