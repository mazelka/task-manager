import React, { Component } from "react";

import "./add-task.css";

export default class AddTask extends Component {
  state = {
    text: "",
    error: false
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

    this.props.onAddNewTask({ text: text });
    this.setState({
      text: ""
    });
  };

  render() {
    const { error } = this.state;

    return (
      <form
        className={`" ${
          error ? "item-add-form d-flex error" : "item-add-form d-flex"
        }`}
        onSubmit={this.submit}
        onBlur={this.focusOut}
      >
        <input
          type="text"
          className="form-control"
          value={this.state.text}
          onChange={this.labelChange}
          placeholder="+ Add Task"
        />
        <button className="btn btn-primary">Add</button>
      </form>
    );
  }
}
