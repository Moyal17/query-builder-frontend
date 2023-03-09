/* eslint-disable react/destructuring-assignment */
import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { checkIfLoggedIn } from '../../store/actions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.variable.min.css';
import './ant-input-css.css';
import './App.css';

/* Views */
const LoginPage = React.lazy(() => import('../LoginPage/LoginPage'));
const SignUpPage = React.lazy(() => import('../SignUpPage/SignUpPage'));
const QueryBuilderPage = React.lazy(() => import('../../Containers/QueryBuilderPage/QueryBuilderPage'));


const AuthRoute = ({ component: Component, userAuth, ...rest }) => {
  return (
    <Route
      {...rest} render={(props) => (userAuth ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  );
};

class App extends Component {
  async componentDidMount() {
    try {
      const data = await this.props.checkIfLoggedIn();
      if (!data || !data.name) this.props.history.push('/login');
      else this.props.history.push('/queryBuilder');
    } catch (e) {
      this.props.history.push('/login');
    }
  }


  render() {
    const { authorized } = this.props;
    return (
      <div>
        <div>
          <Suspense fallback={<div className="gogo-loading" />}>
            <div className="">
              <Switch>
                <AuthRoute path="/queryBuilder" userAuth={authorized} component={QueryBuilderPage} />
                <Route path="/" render={props => <LoginPage {...props} />}/>
                <Route path="/signUp" render={props => <SignUpPage {...props} />}/>
                <Redirect to={'/'} render={props => <LoginPage {...props} />}/>
              </Switch>
            </div>
          </Suspense>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          theme="dark"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authorized: state.userR.authorized,
});

const mapDispatchToProps = dispatch => ({
  checkIfLoggedIn: () => dispatch(checkIfLoggedIn()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
