import React, { Component } from "react";
import "./app.css";
import AddProject from "../add-project/add-project";
import Project from "../project";

export default class App extends Component {
  state = {
    error: false,
    loading: false,
    projects: null
  };

  render() {
    // const { tasks, project } = this.state;
    // if (!project) {
    //   return <Spinner />;
    // }
    return (
      <div className="project-app">
        <Project />
        <div className="add-project">
          <AddProject />
        </div>
      </div>
    );
  }
}
