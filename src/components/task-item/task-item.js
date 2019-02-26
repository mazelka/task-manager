import React, { Component } from "react";
import "./task-item.css";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default class TaskItem extends Component {
  state = {
    isEditing: false,
    editingValue: null,
    showCustomizeTask: false
  };
  input = React.createRef();

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

  saveEditedText = () => {
    const { editingValue } = this.state;

    if (editingValue !== "") {
      this.props.onSave({ text: editingValue });
      this.setState({
        isEditing: false,
        editingValue: null
      });
    } else {
      this.setState({
        isEditing: false
      });
    }
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.saveEditedText();
    }
  };

  saveChanges = () => {
    this.saveEditedText();
  };

  setPriorityClassName = id => {
    const { priority } = this.props;
    if (priority === id) return "btn btn-secondary btn-sm";
    else return "btn btn-outline-secondary btn-sm";
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isEditing && !prevState.isEditing) {
      this.input.current.focus();
    }
  }

  render() {
    const {
      text,
      done,
      deadline,
      onDelete,
      onToggleDone,
      onChangeDeadline,
      onChangePriority
    } = this.props;

    const { isEditing, editingValue } = this.state;
    let itemClassNames = "task-item";
    let buttonClassNames = "btn btn-outline-success btn-sm";

    if (done) {
      itemClassNames += " done";
      buttonClassNames = "btn btn-success btn-sm";
    }

    return (
      <div>
        <div className={itemClassNames}>
          <button
            type="button"
            className={buttonClassNames}
            onClick={onToggleDone}
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
              onBlur={this.saveChanges}
            />
          ) : (
            <span className="task-item-label" onDoubleClick={this.toggleEdit}>
              {text}
            </span>
          )}
          <div className="customize-task">
            <DatePicker
              selected={deadline ? new Date(deadline) : deadline}
              onChange={onChangeDeadline}
              timeCaption="Time"
              placeholderText="Set deadline"
            />

            <div
              className="btn-group mr-2"
              role="group"
              aria-label="Second group"
            >
              <button
                type="button"
                id="1"
                className={this.setPriorityClassName(1)}
                onClick={() => onChangePriority(1)}
              >
                <span> ! </span>
              </button>
              <button
                type="button"
                id="2"
                className={this.setPriorityClassName(2)}
                onClick={() => onChangePriority(2)}
              >
                !!
              </button>
              <button
                type="button"
                id="3"
                className={this.setPriorityClassName(3)}
                onClick={() => onChangePriority(3)}
              >
                !!!
              </button>
            </div>

            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={onDelete}
            >
              <i className="fa fa-trash-o" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
