import React, { Component } from "react";
import ApiService from "../../services/api-service";

import "./user-login.css";
import ErrorIndicator from "../error-indicator/error-indicator";

export default class UserLogin extends Component {
  state = {
    error: false,
    email: "",
    password: ""
  };
  apiService = new ApiService();

  emailChange = e => {
    this.setState({
      email: e.target.value,
      error: false
    });
  };

  passwordChange = e => {
    this.setState({
      password: e.target.value,
      error: false
    });
  };

  onError = e => {
    this.setState({
      error: true
    });
  };

  authorize = e => {
    e.preventDefault();
    const { email, password } = this.state;

    if (email === "" || password === "") {
      this.setState({
        error: true
      });
      return;
    }
    console.log({ email, password });
    if (e.target.id.includes("signup")) {
      this.signUp({ email, password });
    } else {
      this.login({ email, password });
    }

    this.setState({
      email: "",
      password: ""
    });
  };

  login = async (email, password) => {
    try {
      const token = await this.apiService.userLogin(email, password);
      await this.setToken(token);
    } catch (e) {
      this.onError(e);
    }
  };

  signUp = async (email, password) => {
    try {
      const token = await this.apiService.createUser(email, password);
      await this.setToken(token);
    } catch (e) {
      this.onError(e);
    }
  };

  setToken = token => {
    console.log(token.jwt);
    localStorage.setItem("token", `Bearer ${token.jwt}`);
    this.props.onLogin();
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <div className="form-group user-login">
        <div className="list-group-item list-group-item-action active project-item">
          <span>Sign In to manage your tasks</span>
        </div>
        {error ? <ErrorIndicator /> : null}
        <label className="form-control-label">Enter your email</label>
        <input
          type="email"
          value={email}
          onChange={this.emailChange}
          className={`${
            error ? "form-control is-invalid" : "form-control d-flex"
          }`}
        />
        <label className="form-control-label">
          Enter your password (min 6 characters)
        </label>
        <input
          type="password"
          value={password}
          onChange={this.passwordChange}
          className={`${
            error ? "form-control is-invalid" : "form-control d-flex"
          }`}
        />
        <div className="user-btn">
          <button
            className="btn btn-primary"
            id="signin"
            onClick={this.authorize}
          >
            Sign In
          </button>
        </div>
        <div id="no-account">
          <span>Do not have account?</span>
        </div>
        <div className="user-btn">
          <button
            className="btn btn-secondary"
            id="signup"
            onClick={this.authorize}
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }
}
