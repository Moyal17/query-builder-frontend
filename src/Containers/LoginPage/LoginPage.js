import React, { Component } from 'react';
import {Link} from "react-router-dom";

class LoginPage extends Component {


  render() {
    return (
      <main id="main">
        <h1>LoginPage</h1>
        <Link to={'/'}>hoME</Link>
      </main>
    );
  }
}

export default LoginPage;
