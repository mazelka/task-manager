import React, { Component } from "react";
import Spinner from "../spinner";

import "./project-header.css";

export default class ProjectHeader extends Component {
  state = {
    isEditing: false,
    editingValue: null,
    loading: true,
    error: false
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

  saveEditedLabel = () => {
    const { editingValue } = this.state;
    if (editingValue !== "") {
      console.log("saveEditedllbl");
      this.props.onUpdate({ name: editingValue });

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
    const { text, onDelete } = this.props;
    const { isEditing, editingValue } = this.state;

    if (!text) {
      return <Spinner />;
    }

    return (
      <div className="list-group-item list-group-item-action active project-item">
        {isEditing ? (
          <input
            ref={this.input}
            type="data"
            className="form-control editing-input project-edit"
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

        <button
          type="button"
          className="btn btn-outline-danger btn-sm"
          onClick={onDelete}
        >
          <i className="fa fa-trash-o" />
        </button>
      </div>
    );
  }
}
