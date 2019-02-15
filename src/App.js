import React, { Component } from "react";
import ApiService from "./services/api-service";
import TaskList from ".components/task-list";

import "./app.css";

export default class App extends Component {
  apiService = new ApiService();

  getProjectTasks = async () => {
    const res = await this.apiService.getProjectTasks(1);
    console.log(res);
  };

  render() {
    this.getProjectTasks(1);
    return (
      <div className="task-app">
        <TaskList tasks={this.getProjectTasks} />
      </div>
    );
  }
}
