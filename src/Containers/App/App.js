/* eslint-disable react/destructuring-assignment */
import React, { Component, Suspense } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import 'antd/dist/antd.variable.min.css';
import './ant-input-css.css';
import './App.css';
/* Views */

const HomePage = React.lazy(() => import('../HomePage/HomePage'));
const LoginPage = React.lazy(() => import('../LoginPage/LoginPage'));
const QueryBuilderPage = React.lazy(() => import('../../Containers/QueryBuilderPage/QueryBuilderPage'));


const AuthRoute = ({ component: Component, userAuth, ...rest }) => {
  return (
    <Route
      {...rest} render={(props) => (userAuth ? <Component {...props} /> : <Redirect to="/intro" />)}
    />
  );
};

class App extends Component {
  async componentDidMount() {
    try {

    } catch (e) {
      console.log('handle error');
    }
  }


  render() {
    const auth = this.props.authenticated;

    return (
      <div>
        <div>
          <Suspense fallback={<div className="gogo-loading" />}>
            <div className="">
              <Switch>
                <AuthRoute path="/query_builder" userAuth={auth} component={QueryBuilderPage} />
                <Route path="/" exact render={props => <QueryBuilderPage {...props} />}/>
                <Route path="/login" render={props => <LoginPage {...props} />}/>
                <Redirect to={'/'} render={props => <HomePage {...props} />}/>
              </Switch>
            </div>
          </Suspense>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.userR.authenticated,
});

const mapDispatchToProps = dispatch => ({
 });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
