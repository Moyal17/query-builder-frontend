import React from 'react';
import { connect } from 'react-redux';
import { Button } from "antd";
import { logoutUser } from '../../store/actions';
import { toast } from 'react-toastify';

const UserInfo = (props) => {
  const handleLogout = async () => {
    try {
      props.logoutUser();
      props.history.push('/')
    } catch (e) {
      toast.error('An error occurred while logging out', {
        closeOnClick: true,
        pauseOnHover: true
      });
    }
  }

  return (
    <div className="UserInfo flex-100 layout-row layout-wrap layout-align-center-center">
      <div className="login-container flex-initial layout-row layout-align-center-center padd-10">
        <p>{`Hello ${ props.userInfo.name }`}</p>
        <div className="side-padd-5px flex-initial layout-row layout-align-center-center side-padd-15px">
          <Button type="dashed" onClick={() => handleLogout()}>Logout</Button>
        </div>
      </div>
    </div>
  );

}

const mapStateToProps = state => ({
  userInfo: state.userR.userInfo
});
const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
