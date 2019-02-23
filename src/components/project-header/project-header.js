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
      editingValue: this.props.name
    });
  };

  handleChange = e => {
    const editingValue = e.target.value;
    this.setState({
      editingValue
    });
  };

  saveName = () => {
    const { editingValue } = this.state;
    if (editingValue !== "") {
      this.props.onUpdate({ name: editingValue });
      this.setState({
        isEditing: false,
        editingValue: null
      });
    }
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.saveName();
    }
  };

  handleDelete = () => {
    if (
      window.confirm(
        "Are you sure you want to delete this project and all its tasks?"
      )
    )
      this.props.onDelete();
  };

  cancelEdit = () => {
    this.setState({
      isEditing: false
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isEditing && !prevState.isEditing) {
      this.input.current.focus();
    }
  }

  render() {
    const { name } = this.props;
    const { isEditing, editingValue } = this.state;

    if (!name) {
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
            onBlur={this.cancelEdit}
          />
        ) : (
          <span className="task-item-label" onDoubleClick={this.toggleEdit}>
            {name}
          </span>
        )}

        <button
          type="button"
          className="btn btn-primary my-2 my-sm-0"
          onClick={this.handleDelete}
        >
          <i className="fa fa-trash-o" />
        </button>
      </div>
    );
  }
}
