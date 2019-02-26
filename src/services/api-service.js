export default class ApiService {
  apiBase = "https://task-api-manager.herokuapp.com";

  headers = new Headers({
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token")
  });

  transformInit = (method, body) => {
    return {
      method: method,
      headers: this.headers,
      body: this.createBody(body)
    };
  };

  getResource = async url => {
    const res = await fetch(`${this.apiBase}/${url}`, {
      headers: this.headers
    });
    if (!res.ok) {
      throw new Error(`Could not fetch basic, received ${res.status}`);
    }
    return res.json();
  };

  putResource = async (url, body) => {
    const res = await fetch(
      `${this.apiBase}/${url}`,
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
      `${this.apiBase}/${url}`,
      this.transformInit("POST", body)
    );
    if (!res.ok) {
      throw new Error(`Could not post to ${url}, received ${res.status}`);
    }
    const content = await res.json();
    return content;
  };

  deleteResource = async url => {
    const res = await fetch(`${this.apiBase}/${url}`, {
      method: "DELETE",
      headers: this.headers
    });
    if (!res.ok) {
      throw new Error(`Could not delete ${url}, received ${res.status}`);
    }
  };

  createBody = attr => {
    return JSON.stringify({
      data: {
        attributes: attr
      }
    });
  };

  createUser = async credentials => {
    const res = await this.postResource(`users/create`, credentials);
    if (res.data) {
      return this.userLogin(credentials);
    } else {
      throw new Error(`Could not create user, received ${res.status}`);
    }
  };

  getProjectTasks = async id => {
    const { data } = await this.getResource(`projects/${id}/tasks`);
    return this.normalizeTasks(data);
  };

  getProjects = async () => {
    const { data } = await this.getResource("projects");
    return this.normalizeProjects(data);
  };

  updateTask = async (projectId, taskId, attribute) => {
    const { data } = await this.putResource(
      `projects/${projectId}/tasks/${taskId}`,
      attribute
    );
    return this.transformTask(data);
  };

  updateProject = async (id, attribute) => {
    const { data } = await this.putResource(`projects/${id}`, attribute);
    return this.transformProject(data);
  };

  postTask = async (item, id) => {
    const { data } = await this.postResource(`projects/${id}/tasks`, item);
    return this.transformTask(data);
  };

  postProject = async name => {
    const { data } = await this.postResource(`projects/`, name);
    return this.transformProject(data);
  };

  deleteTask = async (projectId, taskId) => {
    await this.deleteResource(`projects/${projectId}/tasks/${taskId}`);
  };

  userLogin = async credentials => {
    return this.postResource("user_token", credentials);
  };

  deleteProject = async id => {
    await this.deleteResource(`projects/${id}`);
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
