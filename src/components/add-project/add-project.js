import React, { Component } from "react";

import "./add-project.css";

export default class AddProject extends Component {
  state = {
    active: true,
    name: "",
    error: false
  };

  changeActiveState = () => {
    const { active } = this.state;
    this.setState({ active: !active });
  };

  changeName = e => {
    this.setState({
      name: e.target.value,
      error: false
    });
  };

  submit = e => {
    e.preventDefault();
    const { name } = this.state;
    if (name === "") {
      this.setState({
        error: true
      });
      return;
    }
    this.props.onAddNewProject({ name: name });
    this.setState({
      name: "",
      active: true
    });
  };

  clearError = () => {
    this.setState({
      error: false
    });
  };

  render() {
    const { error, active } = this.state;
    if (active) {
      return (
        <button
          className="btn btn-primary btn-lg"
          onClick={this.changeActiveState}
        >
          Add New Project
        </button>
      );
    }
    return (
      <form
        className={`${
          error ? "project-add-form d-flex error" : "project-add-form d-flex"
        }`}
        onSubmit={this.submit}
        onBlur={this.clearError}
      >
        <input
          type="text"
          className="form-control"
          value={this.state.name}
          onChange={this.changeName}
          placeholder="+ Add Project"
        />
        <button className="btn btn-primary">Add Project</button>
      </form>
    );
  }
}
