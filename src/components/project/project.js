import React, { Component } from "react";
import TaskList from "../task-list";
import ApiService from "../../services/api-service";
import AddTask from "../add-task/add-task";
import ProjectHeader from "../project-header";
import "./project.css";
import Spinner from "../spinner";

export default class Project extends Component {
  state = {
    error: false,
    project: null,
    tasks: []
  };
  apiService = new ApiService();

  onTasksLoaded = tasks => {
    this.setState({ tasks });
  };

  onProjectLoaded = project => {
    this.setState({ project });
  };

  onTaskUpdated = task => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex(el => el.id === task.id);
      const newTasks = [
        ...tasks.slice(0, index),
        task,
        ...tasks.slice(index + 1)
      ];
      return { tasks: newTasks };
    });
  };

  getProjectTasks = async () => {
    const { project } = this.state;
    try {
      const res = await this.apiService.getProjectTasks(project.id);
      this.onTasksLoaded(res);
    } catch (e) {
      this.onError(e);
    }
  };

  getProjects = async () => {
    try {
      const res = await this.apiService.getProjects();
      this.onProjectLoaded(res);
      return res.id;
    } catch (e) {
      this.onError(e);
    }
  };

  changeToggleDone = id => {
    const { tasks } = this.state;
    const index = tasks.findIndex(el => el.id === id);
    const item = tasks[index];
    return {
      ...item,
      done: !item.done
    };
  };

  loadProject = async () => {
    const id = await this.getProjects();
    await this.getProjectTasks(id);
  };

  componentDidMount() {
    this.loadProject();
  }

  addTask = async text => {
    const { project } = this.state;
    try {
      const newTask = await this.apiService.postTask(text, project.id);
      this.onTaskAdded(newTask);
    } catch (e) {
      console.log(e);
    }
  };

  onTaskAdded = newTask => {
    this.setState(({ tasks }) => {
      return {
        tasks: [...tasks, newTask]
      };
    });
  };

  onTaskDeleted = id => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex(el => el.id === id);
      const newTasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)];
      return {
        tasks: newTasks
      };
    });
  };

  updateTask = async (id, attribute) => {
    const { project } = this.state;
    try {
      const newTask = await this.apiService.updateTask(
        project.id,
        id,
        attribute
      );
      this.onTaskUpdated(newTask);
    } catch (e) {
      console.log(e);
    }
  };

  handleToggleDone = async id => {
    this.updateTask(id, this.changeToggleDone(id));
  };

  deleteTask = async id => {
    const { project } = this.state;
    try {
      await this.apiService.deleteTask(project.id, id);
      this.onTaskDeleted(id);
    } catch (e) {
      console.log(e);
    }
  };

  updateProject = async name => {
    const { id } = this.state.project;
    try {
      const newProject = await this.apiService.updateProject(id, name);
      this.onProjectLoaded(newProject);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { tasks, project } = this.state;
    if (!project) {
      return <Spinner />;
    }
    return (
      <div className="task-app">
        <ProjectHeader text={project.name} onSave={this.updateProject} />
        <TaskList
          tasks={tasks}
          onSave={this.updateTask}
          onDelete={this.deleteTask}
          onToggleDone={this.handleToggleDone}
        />
        <AddTask onAddNewTask={this.addTask} />
      </div>
    );
  }
}