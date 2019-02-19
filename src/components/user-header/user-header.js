import React, { Component } from "react";

import "./user-header.css";

export default class UserHeader extends Component {
  state = {
    authorized: true
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="http://localhost:3001/#">
                Hello, Mary
              </a>
            </li>
            <li className="nav-item">
              <button class="btn btn-secondary my-2 my-sm-0" type="submit">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
