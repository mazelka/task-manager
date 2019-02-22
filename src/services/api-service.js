export default class ApiService {
  apiBase = "http://localhost:3000";

  headers = new Headers({
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token")
  });

  transformInit = (method, body) => {
    return {
      method: method,
      headers: this.headers,
      body: this.body(body)
    };
  };

  getResource = async url => {
    const res = await fetch(`${this.apiBase}${url}`, {
      headers: this.headers
    });
    if (!res.ok) {
      throw new Error(`Could not fetch basic, received ${res.status}`);
    }
    return res.json();
  };

  putResource = async (url, body) => {
    const res = await fetch(
      `${this.apiBase}${url}`,
      this.transformInit("PUT", body)
    );
    if (!res.ok) {
      throw new Error(`Could not put to ${url}, received ${res.status}`);
    }
    const content = await res.json();
    return content;
  };

  postResource = async (url, body) => {
    const res = await fetch(
      `${this.apiBase}${url}`,
      this.transformInit("POST", body)
    );
    console.log(body);
    if (!res.ok) {
      throw new Error(`Could not post to ${url}, received ${res.status}`);
    }
    const content = await res.json();
    return content;
  };

  deleteResource = async url => {
    const res = await fetch(`${this.apiBase}${url}`, {
      method: "DELETE",
      headers: this.headers
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

  createUser = async credentials => {
    const res = await this.postResource(`/users/create`, credentials);
    if (res.data) {
      return this.userLogin(credentials);
    } else {
      console.log(res);
    }
  };

  getProjectTasks = async id => {
    const tasks = await this.getResource(`/projects/${id}/tasks`);
    return this.normalizeTasks(tasks.data);
  };

  getProjects = async () => {
    const projects = await this.getResource("/projects");
    return this.normalizeProjects(projects.data);
  };

  updateTask = async (projectId, taskId, attribute) => {
    const result = await this.putResource(
      `/projects/${projectId}/tasks/${taskId}`,
      attribute
    );
    const newTask = this.transformTask(result.data);
    return newTask;
  };

  updateProject = async (id, attribute) => {
    const result = await this.putResource(`/projects/${id}`, attribute);
    const newProject = this.transformProject(result.data);
    return newProject;
  };

  postTask = async (item, id) => {
    const result = await this.postResource(`/projects/${id}/tasks`, item);
    const newTask = this.transformTask(result.data);
    return newTask;
  };

  postProject = async name => {
    const result = await this.postResource(`/projects/`, name);
    const newProject = this.transformProject(result.data);
    return newProject;
  };

  deleteTask = async (projectId, taskId) => {
    const result = await this.deleteResource(
      `/projects/${projectId}/tasks/${taskId}`
    );
    return result;
  };

  userLogin = async credentials => {
    console.log("api-service user login", credentials);
    const token = this.postResource("/user_token", credentials);
    return token;
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
