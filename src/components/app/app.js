import React, { Component } from "react";
import TaskList from "../task-list";
import ApiService from "../../services/api-service";

import "./app.css";

export default class App extends Component {
  state = {
    tasks: []
  };
  apiService = new ApiService();
  onTasksLoaded = tasks => {
    this.setState({ tasks });
  };

  onTaskUpdated = task => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex(el => el.id === task.id);
      // const item = tasks[index];
      const newTasks = [
        ...tasks.slice(0, index),
        task,
        ...tasks.slice(index + 1)
      ];
      return { tasks: newTasks };
    });
  };

  getProjectTasks = async () => {
    try {
      const res = await this.apiService.getProjectTasks(1);
      this.onTasksLoaded(res);
    } catch (e) {
      this.onError(e);
    }
  };

  componentDidMount() {
    this.getProjectTasks();
  }

  updateTask = async (id, value) => {};

  handleSave = async (id, value) => {
    try {
      const newTask = await this.apiService.returnTransformedTask(id, value);
      this.onTaskUpdated(newTask);
      //   console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    const { tasks } = this.state;
    return (
      <div className="task-app">
        <TaskList tasks={tasks} onSave={this.handleSave} />
      </div>
    );
  }
}
