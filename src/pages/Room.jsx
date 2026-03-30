import { useState } from 'react';
import { addTask, updateTaskStatus, deleteTask } from '../store';
import TaskCard from '../components/TaskCard';
import AddTaskForm from '../components/AddTaskForm';

export default function Room({ project, onLeave, onUpdate }) {
  const [copied, setCopied] = useState(false);

  // Supabase returns tasks as a nested array
  const tasks = project.tasks || [];
  const active = tasks.filter(t => t.status !== 'done');
  const done = tasks.filter(t => t.status === 'done');

  async function handleAdd(memberName, description) {
    const task = await addTask(project.code, memberName, description);
    if (task) onUpdate({ ...project, tasks: [task, ...tasks] });
  }

  async function handleStatus(taskId, status) {
    const updated = await updateTaskStatus(project.code, taskId, status);
    if (updated) onUpdate(updated);
  }

  async function handleDelete(taskId) {
    const updated = await deleteTask(project.code, taskId);
    if (updated) onUpdate(updated);
  }

  function copyCode() {
    navigator.clipboard.writeText(project.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="room">
      <header className="room-header">
        <div className="room-header-left">
          <span className="logo-small">projectodo</span>
          <h2 className="room-name">{project.name}</h2>
        </div>
        <div className="room-header-right">
          <button className="code-badge" onClick={copyCode} title="Click to copy project code">
            {copied ? '✓ copied' : project.code}
          </button>
          <button className="btn btn-ghost btn-sm" onClick={onLeave}>Leave</button>
        </div>
      </header>

      <main className="room-main">
        <AddTaskForm onAdd={handleAdd} />

        <section className="feed">
          {active.length === 0 && done.length === 0 && (
            <div className="empty">
              <p>No tasks yet. Add one above to get started.</p>
            </div>
          )}

          {active.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={status => handleStatus(task.id, status)}
              onDelete={() => handleDelete(task.id)}
            />
          ))}

          {done.length > 0 && (
            <details className="done-section">
              <summary>{done.length} completed task{done.length !== 1 ? 's' : ''}</summary>
              {done.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStatusChange={status => handleStatus(task.id, status)}
                  onDelete={() => handleDelete(task.id)}
                />
              ))}
            </details>
          )}
        </section>
      </main>
    </div>
  );
}
