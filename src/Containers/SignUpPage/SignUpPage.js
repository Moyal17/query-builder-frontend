import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Button } from "antd";
import { signUpUser } from '../../store/actions';
import { toast } from 'react-toastify';

const SignUpPage = (props) => {
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);

  const handleInputChange = (key, e) => {
    const value = e.target.value;
    if (key === 'email') {
      setEmail(value)
    } else if (key === 'name') {
      setName(value)
    } else setPassword(value);
  }

  const handleSignup = async () => {
    try {
      if (email && password && name ) {
        const userCreds = { email, password, name }
        const data = await props.signUpUser(userCreds);
        if (data && data.token) props.history.push('/queryBuilder')
      } else {
        toast.error('Please fill all the fields to register', {
          closeOnClick: true,
          pauseOnHover: true
        });
      }
    } catch (e) {
      toast.error('An error occurred while signing up', {
        closeOnClick: true,
        pauseOnHover: true
      });
    }
  }

  return (
      <div className="SignUpPage flex-100 layout-row layout-wrap layout-align-center-center">
        <div className="login-container card-container flex-initial layout-row layout-wrap layout-align-center-center">
          <h2 className="margin-bottom-10px">Register</h2>
          <form className="login-form flex-100 layout-row layout-wrap layout-align-center-center padd-10px">
            <input type="text" placeholder="name" maxLength="100"
                   className="margin-bottom-10px"
                   onChange={(e) => {handleInputChange('name', e)}}/>
            <input type="email" placeholder="email"
                   className="margin-bottom-10px"
                   onChange={(e) => {handleInputChange('email', e)}}/>
            <input type="password" placeholder="password"
                   className="margin-bottom-10px"
                   onChange={(e) => {handleInputChange('password', e)}}/>
            <div className="login-form flex-100 layout-row layout-wrap layout-align-center-center action-btns padd-10px">
              <Button type="primary font16" onClick={() => handleSignup()}>Sign up</Button>
            </div>
            <p className="message">Already registered? <Link to={'/login'}>Sign In</Link></p>
          </form>
        </div>
      </div>
  );

}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  signUpUser: (body) => dispatch(signUpUser(body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
