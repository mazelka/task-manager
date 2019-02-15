export default class ApiService {
  apiBase = "http://localhost:3000/projects";

  getResource = async url => {
    const res = await fetch(`${this.apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return res.json();
  };

  taskBody = task => {
    return JSON.stringify({
      data: {
        attributes: task
      }
    });
  };

  updateTask = async (id, task) => {
    const res = await fetch(`${this.apiBase}/1/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: this.taskBody(task)
    });

    if (!res.ok) {
      throw new Error(`Could not fetch task ${id}, received ${res.status}`);
    }
    const content = await res.json();
    console.log(content);
    return content;
  };
  returnTransformedTask = async (id, task) => {
    const result = await this.updateTask(id, task);
    const newTask = this.transformTask(result.data);
    console.log(newTask);
    return newTask;
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

  normalizeTasks = tasks => {
    return tasks.map(task => this.transformTask(task));
  };

  getProjectTasks = async id => {
    const tasks = await this.getResource(`/${id}/tasks`);
    return this.normalizeTasks(tasks.data);
  };
  //   async run() {
  //     const result = await getResource(
  //       "http://localhost:3000/projects/1/tasks"
  //     );
  //     return result.data.forEach(task => {
  //       console.log(transformTask(task));
  //     });
  //   }
}
