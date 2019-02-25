import React, { Component } from "react";
import "./user-projects.css";
import AddProject from "../add-project/add-project";
import Project from "../project";
import Spinner from "../spinner";
import ApiService from "../../services/api-service";
import ErrorIndicator from "../error-indicator/error-indicator";

export default class UserProjects extends Component {
  state = {
    error: false,
    loading: true,
    projects: []
  };

  apiService = new ApiService();

  componentDidMount() {
    this.getProjects();
  }

  updateProject = async (id, name) => {
    try {
      const updatedProject = await this.apiService.updateProject(id, name);
      this.onProjectsUpdated(updatedProject);
      console.log(this.state.error);
    } catch (e) {
      this.onError(e);
    }
  };

  handleDelete = async id => {
    try {
      await this.apiService.deleteProject(id);
      this.onProjectDeleted(id);
    } catch (e) {
      this.onError(e);
    }
  };

  handleError = e => {
    this.setState({
      error: true
    });
  };

  addNewProject = async name => {
    try {
      const newProject = await this.apiService.postProject(name);
      this.onProjectAdded(newProject);
    } catch (e) {
      this.onError(e);
    }
  };

  onProjectLoaded = projects => {
    this.setState({ projects, loading: false });
  };

  onProjectAdded = newProject => {
    this.setState(({ projects }) => {
      return {
        projects: [...projects, newProject],
        error: false
      };
    });
  };

  onProjectsUpdated = project => {
    this.setState(({ projects }) => {
      const index = projects.findIndex(el => el.id === project.id);
      const newProjects = [
        ...projects.slice(0, index),
        project,
        ...projects.slice(index + 1)
      ];
      return { projects: newProjects, error: false };
    });
  };

  onProjectDeleted = id => {
    this.setState(({ projects }) => {
      const index = projects.findIndex(el => el.id === id);
      const newProjects = [
        ...projects.slice(0, index),
        ...projects.slice(index + 1)
      ];
      return {
        projects: newProjects,
        error: false
      };
    });
  };

  getProjects = async () => {
    try {
      const projects = await this.apiService.getProjects();
      this.onProjectLoaded(projects);
      console.log("I get projects");
    } catch (e) {
      this.onError(e);
    }
  };

  render() {
    const { projects, error, loading } = this.state;
    const errorMessage = error ? <ErrorIndicator /> : null;

    const elements = projects.map(project => {
      return (
        <Project
          key={project.id}
          project={project}
          onUpdate={name => this.updateProject(project.id, name)}
          onDelete={() => this.handleDelete(project.id)}
          onError={this.handleError}
        />
      );
    });

    const userProjects = (
      <div className="project-app">
        {elements}
        <div className="add-project">
          <AddProject onAddNewProject={this.addNewProject} />
        </div>
      </div>
    );

    return (
      <div>
        {errorMessage}
        {loading ? <Spinner /> : userProjects}
      </div>
    );
  }
}
