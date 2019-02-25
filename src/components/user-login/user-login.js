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

  signIn = () => {
    if (!this.validateInput()) {
      return;
    }
    const { email, password } = this.state;
    this.signInUser({ email, password });
    this.setState({
      email: "",
      password: ""
    });
  };

  signUp = e => {
    if (!this.validateInput()) {
      return;
    }
    const { email, password } = this.state;
    this.signUpUser({ email, password });
    this.setState({
      email: "",
      password: ""
    });
  };

  changeEmailValue = e => {
    this.setState({
      email: e.target.value,
      error: false
    });
  };

  changePasswordValue = e => {
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

  signInUser = async (email, password) => {
    try {
      const token = await this.apiService.userLogin(email, password);
      await this.setToken(token);
    } catch (e) {
      this.onError(e);
    }
  };

  signUpUser = async (email, password) => {
    try {
      const token = await this.apiService.createUser(email, password);
      await this.setToken(token);
    } catch (e) {
      this.onError(e);
    }
  };

  setToken = token => {
    localStorage.setItem("token", `Bearer ${token.jwt}`);
    this.props.onLogin();
  };

  validateInput = () => {
    const { email, password } = this.state;
    if (email === "" || password === "") {
      this.setState({
        error: true
      });
      return false;
    }
    return true;
  };

  render() {
    const { email, password, error } = this.state;

    let inputClassName = "form-control d-flex";
    if (error) {
      inputClassName += " is-invalid";
    }

    return (
      <div className="form-group user-login">
        <div className="list-group-item list-group-item-action active project-item">
          <span>Enter your credentials</span>
        </div>
        {error ? <ErrorIndicator /> : null}
        <label className="form-control-label">Enter your email</label>
        <input
          type="email"
          value={email}
          onChange={this.changeEmailValue}
          className={inputClassName}
        />
        <label className="form-control-label">
          Enter your password (min 6 characters)
        </label>
        <input
          type="password"
          value={password}
          onChange={this.changePasswordValue}
          className={inputClassName}
        />
        <div className="user-btn">
          <button className="btn btn-primary" onClick={this.signIn}>
            Sign In
          </button>
          <span>OR</span>
          <button className="btn btn-secondary" onClick={this.signUp}>
            Sign Up
          </button>
        </div>
      </div>
    );
  }
}
