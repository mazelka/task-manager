import React, { Component } from "react";
import "./app.css";

import UserProjects from "../user-projects";
import UserLogin from "../user-login/user-login";
import UserHeader from "../user-header/user-header";

export default class App extends Component {
  state = {
    error: false,
    authorized: false
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ authorized: true });
    }
  }

  onLogin = () => {
    this.setState({
      authorized: true
    });
  };

  onLogout = () => {
    localStorage.removeItem("token");
    this.setState({
      authorized: false
    });
  };

  render() {
    const { authorized } = this.state;

    if (!authorized) {
      return <UserLogin onLogin={this.onLogin} />;
    }

    return (
      <div>
        <UserHeader onLogout={this.onLogout} />
        <UserProjects />
      </div>
    );
  }
}
