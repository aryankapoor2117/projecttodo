const STATUS_OPTIONS = [
  { value: 'in-progress', label: 'In Progress', color: '#3b82f6' },
  { value: 'blocked', label: 'Blocked', color: '#ef4444' },
  { value: 'done', label: 'Done', color: '#22c55e' },
];

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function TaskCard({ task, onStatusChange, onDelete }) {
  const current = STATUS_OPTIONS.find(s => s.value === task.status);

  return (
    <div className={`task-card task-card--${task.status}`}>
      <div className="task-card-top">
        <div className="task-card-left">
          <span className="task-member">{task.memberName}</span>
          <p className="task-description">{task.description}</p>
        </div>
        <div className="task-card-right">
          <select
            className="status-select"
            value={task.status}
            style={{ '--status-color': current.color }}
            onChange={e => onStatusChange(e.target.value)}
          >
            {STATUS_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <button
            className="delete-btn"
            onClick={onDelete}
            title="Remove task"
            aria-label="Delete task"
          >
            ×
          </button>
        </div>
      </div>
      <div className="task-card-footer">
        <span className="task-time">{timeAgo(task.createdAt)}</span>
        <span
          className="status-dot"
          style={{ background: current.color }}
          title={current.label}
        />
      </div>
    </div>
  );
}
