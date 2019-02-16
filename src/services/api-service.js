export default class ApiService {
  apiBase = "http://localhost:3000";

  getResource = async url => {
    const res = await fetch(`${this.apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch basics, received ${res.status}`);
    }
    return res.json();
  };

  getResourceByUrl;

  putResource = async (url, body) => {
    const res = await fetch(`${this.apiBase}${url}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: body
    });
    if (!res.ok) {
      throw new Error(`Could not put to ${url}, received ${res.status}`);
    }
    const content = await res.json();
    return content;
  };

  postResource = async (url, body) => {
    const res = await fetch(`${this.apiBase}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body
    });
    if (!res.ok) {
      throw new Error(`Could not post to ${url}, received ${res.status}`);
    }
    const content = await res.json();
    console.log(content);
    return content;
  };

  deleteResource = async url => {
    const res = await fetch(`${this.apiBase}${url}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    if (!res.ok) {
      throw new Error(`Could not delete ${url}, received ${res.status}`);
    }
    const content = await res.status;
    return content;
  };

  body = attr => {
    return JSON.stringify({
      data: {
        attributes: attr
      }
    });
  };
  getProjectTasks = async id => {
    const tasks = await this.getResource(`/projects/${id}/tasks`);
    return this.normalizeTasks(tasks.data);
  };

  getProjects = async () => {
    const projects = await this.getResource("/projects");
    const project = this.normalizeProjects(projects.data);
    console.log(project[0]);
    return project[0];
  };

  updateTask = async (projectId, taskId, attribute) => {
    // console.log(projectId, taskId, attribute);
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const result = await this.putResource(url, this.body(attribute));
    const newTask = this.transformTask(result.data);
    return newTask;
  };

  updateProject = async (id, attribute) => {
    const body = this.body(attribute);
    const url = `/projects/${id}`;
    const result = await this.putResource(url, body);
    const newProject = this.transformProject(result.data);
    return newProject;
  };

  postTask = async (item, id) => {
    const url = `/projects/${id}/tasks`;
    const result = await this.postResource(url, this.body(item));
    const newTask = this.transformTask(result.data);
    return newTask;
  };

  deleteTask = async (projectId, taskId) => {
    const url = `/projects/${projectId}/tasks/${taskId}`;
    const result = await this.deleteResource(url);
    return result;
  };

  deleteProject = async id => {
    const url = `/projects/${id}`;
    const result = await this.deleteResource(url);
    return result;
  };

  normalizeTasks = tasks => {
    return tasks.map(task => this.transformTask(task));
  };

  normalizeProjects = projects => {
    return projects.map(project => this.transformProject(project));
  };

  transformTask = task => {
    const {
      id,
      attributes: { text, priority, deadline, done }
    } = task;
    return {
      id: id,
      text: text,
      priority: priority,
      deadline: deadline,
      done: done
    };
  };

  transformProject = project => {
    const {
      id,
      attributes: { name }
    } = project;
    return {
      id: id,
      name: name
    };
  };
}
