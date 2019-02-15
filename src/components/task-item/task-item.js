import React, { Component } from "react";
import "./task-item.css";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default class TaskItem extends Component {
  state = {
    isEditing: false,
    editingValue: null
  };
  input = React.createRef();
  // toggleDone = () => {
  //   this.setState(state => ({
  //     done: !state.done
  //   }));
  // };
  // toggleImportant = () => {
  //   this.setState(state => ({
  //     important: !state.important
  //   }));
  // };
  toggleEdit = () => {
    this.setState({
      isEditing: true,
      editingValue: this.props.text
    });
  };

  handleChange = e => {
    const editingValue = e.target.value;

    this.setState({
      editingValue
    });
  };

  saveEditedLabel = () => {
    const { editingValue } = this.state;
    if (editingValue !== "") {
      this.props.onSave({ text: editingValue });

      this.setState({
        isEditing: false,
        editingValue: null
      });
    }
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.saveEditedLabel();
    }
  };

  handleFocusOut = () => {
    this.saveEditedLabel();
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isEditing && !prevState.isEditing) {
      this.input.current.focus();
    }
  }

  render() {
    const { text, done, deadline, priority } = this.props;

    const { isEditing, editingValue } = this.state;
    let classNames = "task-item";
    if (done) {
      classNames += " done";
    }

    if (priority === 1) {
      classNames += " priority";
    }

    return (
      <div className={classNames}>
        <button
          type="button"
          className="btn btn-outline-success btn-sm"
          // onClick={onToggleDone}
        >
          <i className="fa fa-check" />
        </button>

        {isEditing ? (
          <input
            ref={this.input}
            type="text"
            className="form-control editing-input"
            value={editingValue}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            onBlur={this.handleFocusOut}
          />
        ) : (
          <span className="task-item-label" onDoubleClick={this.toggleEdit}>
            {text}
          </span>
        )}
        {deadline ? (
          <DatePicker selected={deadline} />
        ) : (
          <button type="button" className="btn btn-outline-info btn-sm">
            <i className="fa fa-calendar" />
          </button>
        )}

        <div className="btn-group" role="group" aria-label="sorting">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            // onClick={onToggleImportant}
          >
            <i className="fa fa-arrow-up" />
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            // onClick={onToggleImportant}
          >
            <i className="fa fa-arrow-down" />
          </button>
        </div>

        <button
          type="button"
          className="btn btn-outline-danger btn-sm"
          // onClick={onDelete}
        >
          <i className="fa fa-trash-o" />
        </button>
      </div>
    );
  }
}
