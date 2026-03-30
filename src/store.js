// Data layer — swap these functions for API calls when connecting a backend

const STORAGE_KEY = 'projectodo_data';

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getProject(code) {
  const data = load();
  return data[code] || null;
}

export function createProject(name) {
  const code = name.trim().toLowerCase().replace(/\s+/g, '-') + '-' + Math.random().toString(36).slice(2, 6);
  const data = load();
  data[code] = { code, name: name.trim(), tasks: [] };
  save(data);
  return data[code];
}

export function joinProject(code) {
  return getProject(code.trim().toLowerCase());
}

export function addTask(projectCode, memberName, description) {
  const data = load();
  if (!data[projectCode]) return null;
  const task = {
    id: crypto.randomUUID(),
    memberName: memberName.trim(),
    description: description.trim(),
    status: 'in-progress',
    createdAt: new Date().toISOString(),
  };
  data[projectCode].tasks.unshift(task);
  save(data);
  return task;
}

export function updateTaskStatus(projectCode, taskId, status) {
  const data = load();
  if (!data[projectCode]) return;
  const task = data[projectCode].tasks.find(t => t.id === taskId);
  if (task) {
    task.status = status;
    save(data);
  }
  return data[projectCode];
}

export function deleteTask(projectCode, taskId) {
  const data = load();
  if (!data[projectCode]) return;
  data[projectCode].tasks = data[projectCode].tasks.filter(t => t.id !== taskId);
  save(data);
  return data[projectCode];
}
