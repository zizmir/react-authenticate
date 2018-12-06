import { Menu, Icon } from "antd";
import React from "react";
import Plop from "./Plop";
import "antd/dist/antd.css";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect
} from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";

export default class App extends React.Component {
  state = {
    current: "home",
    user: null,
    isConnected: false
  };

  componentDidMount() {
    this.checkUser();
  }
  handleUser = (user, meta) => {
    this.setState({ user, isConnected: true });
    localStorage.setItem(process.env.REACT_APP_STORAGE_KEY_ITEM, meta.token);
    localStorage.setItem(
      process.env.REACT_APP_STORAGE_USER,
      JSON.stringify(user)
    );
  };
  checkUser() {
    const user = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_STORAGE_USER)
    );
    if (user) {
      this.setState({ isConnected: true, user });
    }
  }

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };

  // displayDashboard() {
  //   if (this.state.isConnected) {
  //     return <Route path="/dashboard" component={Dashboard} />;
  //   }
  // }

  render() {
    const { isConnected, user } = this.state;
    return (
      <Router>
        <>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
          >
            <Menu.Item key="home">
              <Link to="/home">
                <Icon type="home" />
                Home
              </Link>
            </Menu.Item>

            <Menu.Item key="sign-in">
              <Link to="/sign-in">
                <Icon type="sign-in" />
                Sign in
              </Link>
            </Menu.Item>

            <Menu.Item key="sign-up">
              <Link to="/sign-up">
                <Icon type="sign-up" />
                Sign up
              </Link>
            </Menu.Item>

            <Menu.Item key="sign-out">
              <Link to="/sign-out">
                <Icon type="sign-out" />
                Sign out
              </Link>
            </Menu.Item>
          </Menu>
          <section>
            <Route exact path="/" component={Home} />
            {!isConnected && (
              <>
                <Route
                  path="/sign-up"
                  render={props => (
                    <SignUp {...props} saveUser={this.handleUser} />
                  )}
                />
                <Route
                  path="/sign-in"
                  render={props => {
                    return !isConnected ? (
                      <SignIn {...props} saveUser={this.handleUser} />
                    ) : (
                      <Redirect
                        to={{
                          pathname: "/dashboard",
                          state: { from: props.location },
                          props: { nickname: user.nickname }
                        }}
                      />
                    );
                  }}
                />
              </>
            )}
            {/* by method {this.displayDashboard()} */}
            {isConnected && (
              <Route
                path="/dashboard"
                render={props => (
                  <Dashboard {...props} nickname={user.nickname} />
                )}
              />
            )}
          </section>
        </>
      </Router>
    );
  }
}
