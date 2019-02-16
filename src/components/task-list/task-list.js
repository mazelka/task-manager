import React, { Component } from "react";

import TaskItem from "../task-item";
import "./task-list.css";

export default class TaskList extends Component {
  render() {
    const { tasks, onSave, onDelete, onToggleDone } = this.props;
    const elements = tasks.map(({ id, ...item }) => {
      return (
        <li key={id} className="list-group-item">
          <TaskItem
            {...item}
            onSave={value => onSave(id, value)}
            onDelete={() => onDelete(id)}
            onToggleDone={() => onToggleDone(id)}
          />
        </li>
      );
    });

    return <ul className="list-group task-list">{elements}</ul>;
  }
}
