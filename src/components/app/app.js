import React, { Component } from "react";
import "./app.css";

import UserProjects from "../user-projects";
import ApiService from "../../services/api-service";
import UserLogin from "../user-login/user-login";

export default class App extends Component {
  state = {
    error: false,
    authorized: false
  };

  apiService = new ApiService();

  //   componentDidMount() {
  //     this.getProjects();
  //   }
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

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ authorized: true });
    }
  }
  render() {
    const { authorized } = this.state;

    if (!authorized) {
      return <UserLogin onLogin={this.onLogin} />;
    }

    return (
      <div>
        <UserProjects onLogout={this.onLogout} />
      </div>
    );
  }
}
