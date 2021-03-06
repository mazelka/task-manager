import React, { Component } from "react";

import "./user-header.css";

export default class UserHeader extends Component {
  render() {
    const { onLogout } = this.props;
    return (
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          Hello Sunshine!
        </a>
        <button
          className="btn btn-secondary my-2 my-sm-0"
          type="button"
          onClick={onLogout}
        >
          Logout
        </button>
      </nav>
    );
  }
}
