import React, { Component } from "react";
import "./app.css";
import AddProject from "../add-project/add-project";
import Project from "../project";
import Spinner from "../spinner";
import ApiService from "../../services/api-service";
import UserHeader from "../user-header/user-header";
import UserLogin from "../user-login/user-login";

export default class App extends Component {
  state = {
    error: false,
    loading: false,
    authorized: false,
    projects: []
  };

  apiService = new ApiService();

  onProjectLoaded = projects => {
    this.setState({ projects });
  };

  onProjectAdded = newProject => {
    this.setState(({ projects }) => {
      return {
        projects: [...projects, newProject]
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
      console.log(newProjects);
      return { projects: newProjects };
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
        projects: newProjects
      };
    });
  };

  getProjects = async () => {
    try {
      const projects = await this.apiService.getProjects();
      this.onProjectLoaded(projects);
    } catch (e) {
      console.log(e);
    }
  };

  updateProject = async (id, name) => {
    try {
      const updatedProject = await this.apiService.updateProject(id, name);
      this.onProjectsUpdated(updatedProject);
    } catch (e) {
      console.log(e);
    }
  };

  onDelete = async id => {
    try {
      await this.apiService.deleteProject(id);
      this.onProjectDeleted(id);
    } catch (e) {
      console.log(e);
    }
  };

  addNewProject = async name => {
    try {
      const newProject = await this.apiService.postProject(name);
      this.onProjectAdded(newProject);
    } catch (e) {
      console.log(e);
    }
  };

  login = async (email, password) => {
    const token = await this.apiService.userLogin(email, password);
    await this.setToken(token);
    this.setState({
      authorized: true
    });
  };

  setToken = token => {
    console.log(token.jwt);
    localStorage.setItem("token", `Bearer ${token.jwt}`);
  };

  //   componentDidMount() {
  //     this.getProjects();
  //   }

  render() {
    const { projects, authorized } = this.state;

    if (!projects) {
      return <Spinner />;
    }

    const elements = projects.map(project => {
      return (
        <Project
          key={project.id}
          project={project}
          onUpdate={name => this.updateProject(project.id, name)}
          onDelete={() => this.onDelete(project.id)}
        />
      );
    });

    return (
      <div>
        {/* <div className="invalid-feedback" value={loginError} /> */}
        <UserLogin authorized={authorized} onLogin={this.login} />
        <div className="project-app">
          {elements}
          <div className="add-project">
            <AddProject onAddNewProject={this.addNewProject} />
          </div>
        </div>
      </div>
    );
  }
}
