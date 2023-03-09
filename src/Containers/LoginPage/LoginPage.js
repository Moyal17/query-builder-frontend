import React, { useState } from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import { Button} from "antd";
import { loginUser} from '../../store/actions';
import {toast} from 'react-toastify';

const LoginPage = (props) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleInputChange = (key, e) => {
    const value = e.target.value;
    if (key === 'email') {
      setEmail(value)
    } else setPassword(value);
  }


  const handleLogin = async () => {
    try {
      if (email && password ) {
        const userCreds = { email, password }
        const data = await props.loginUser(userCreds);
        if (data && data.token) props.history.push('/queryBuilder')
      } else props.history.push('/')
    } catch (e) {
      toast.error('An error occurred while login', {
        closeOnClick: true,
        pauseOnHover: true
      });
    }
  }

  return (
    <div className="LoginPage flex-100 layout-row layout-wrap layout-align-center-center">
      <div className="login-container card-container flex-initial layout-row layout-wrap layout-align-center-center">
        <h2 className="margin-bottom-10px">LoginPage</h2>
        <form className="login-form flex-100 layout-row layout-wrap layout-align-center-center padd-10px">
          <input type="email" placeholder="email"
                 className="flex-100 margin-bottom-10px"
                 onChange={(e) => {handleInputChange('email', e)}}/>
          <input type="password" placeholder="password"
                 className="flex-100 margin-bottom-10px"
                 onChange={(e) => {handleInputChange('password', e)}}/>
          <div className="login-form flex-100 layout-row layout-wrap layout-align-center-center action-btns padd-10px">
            <Button type="primary font16" onClick={() => handleLogin()}>login</Button>
          </div>

          <p className="message">Not registered? <Link to={'/signUp'}>Create an account</Link></p>
        </form>
      </div>
    </div>
  );

}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  loginUser: (body) => dispatch(loginUser(body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
