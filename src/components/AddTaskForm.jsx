import { useState } from 'react';

export default function AddTaskForm({ onAdd }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;
    onAdd(name, description);
    setDescription('');
    // Keep name pre-filled for consecutive submissions
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="add-form-fields">
        <div className="field">
          <label>Your name</label>
          <input
            type="text"
            placeholder="e.g. Alex"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="field field-wide">
          <label>What are you doing?</label>
          <input
            type="text"
            placeholder="e.g. Setting up the landing page design"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={!name.trim() || !description.trim()}
      >
        Add task
      </button>
    </form>
  );
}
