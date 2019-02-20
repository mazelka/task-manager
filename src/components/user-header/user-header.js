import React, { Component } from "react";

import "./user-header.css";

export default class UserHeader extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="http://localhost:3001/#">
          Hello Sunshine!
        </a>
        <button className="btn btn-secondary my-2 my-sm-0" type="button">
          Logout
        </button>
      </nav>
    );
  }
}
