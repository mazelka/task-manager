import React, { Component } from "react";

import "./add-task.css";

export default class AddTask extends Component {
  state = {
    text: "",
    error: false
  };

  changeText = e => {
    this.setState({
      text: e.target.value,
      error: false
    });
  };

  clearError = () => {
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
        onBlur={this.clearError}
      >
        <input
          type="text"
          className="form-control"
          value={this.state.text}
          onChange={this.changeText}
          placeholder="+ Add Task"
        />
        <button className="btn btn-info">Add</button>
      </form>
    );
  }
}
