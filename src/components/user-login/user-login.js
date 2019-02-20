import React, { Component } from "react";
import ApiService from "../../services/api-service";

import "./user-login.css";

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

  submit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    if (email === "" || password === "") {
      this.setState({
        error: true
      });
      return;
    }
    console.log(email, password);
    this.login(email, password);

    this.setState({
      email: "",
      password: ""
    });
  };

  login = async (email, password) => {
    console.log("inLogin ", email, password);
    const token = await this.apiService.userLogin(email, password);
    await this.setToken(token);
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
        <div className="form-group has-success">
          <label className="form-control-label">Enter your email</label>
          <input
            type="email"
            value={email}
            onChange={this.emailChange}
            className={`" ${
              error ? "form-control is-invalid" : "form-control d-flex"
            }`}
            id="inputValid"
          />
          <div className="valid-feedback" />
        </div>

        <div className="form-group has-danger">
          <label className="form-control-label" />
          Enter your password (min 6 characters)
          <input
            type="password"
            value={password}
            onChange={this.passwordChange}
            className="form-control is-invalid"
            id="inputInvalid"
          />
          <div className="invalid-feedback">
            Sorry, that username's taken. Try another?
          </div>
          <div className="user-btn">
            <button className="btn btn-primary" onClick={this.submit}>
              Start Using App
            </button>
          </div>
        </div>
      </div>
    );
  }
}
