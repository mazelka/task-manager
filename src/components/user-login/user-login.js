import React, { Component } from "react";

import "./user-login.css";

export default class UserLogin extends Component {
  state = {
    error: false,
    email: "",
    password: ""
  };

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

    this.props.onLogin(email, password);
    this.setState({
      email: "",
      password: ""
    });
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
