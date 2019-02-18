import React, { Component } from "react";

import "./add-project.css";

export default class AddProject extends Component {
  state = {
    active: true,
    text: "",
    error: false
  };

  changeActiveState = () => {
    const { active } = this.state;
    this.setState({ active: !active });
  };

  labelChange = e => {
    this.setState({
      text: e.target.value,
      error: false
    });
  };

  focusOut = () => {
    this.setState({
      error: false
    });
  };

  submit = e => {
    e.preventDefault();

    const { text } = this.state;

    if (text === "") {
      this.setState({
        error: true
      });
      return;
    }

    this.props.onAddNewProject({ name: text });
    this.setState({
      text: "",
      active: true
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
        className={`" ${
          error ? "project-add-form d-flex error" : "project-add-form d-flex"
        }`}
        onSubmit={this.submit}
        onBlur={this.focusOut}
      >
        <input
          type="text"
          className="form-control"
          value={this.state.text}
          onChange={this.labelChange}
          placeholder="+ Add Project"
        />
        <button className="btn btn-primary">Add Project</button>
      </form>
    );
  }
}
