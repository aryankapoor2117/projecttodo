import { useState } from 'react';
import { createProject, joinProject } from '../store';

export default function Home({ onEnter }) {
  const [mode, setMode] = useState(null); // 'create' | 'join'
  const [projectName, setProjectName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [error, setError] = useState('');

  function handleCreate(e) {
    e.preventDefault();
    if (!projectName.trim()) return;
    const project = createProject(projectName);
    onEnter(project);
  }

  function handleJoin(e) {
    e.preventDefault();
    const project = joinProject(joinCode);
    if (!project) {
      setError('No project found with that code.');
      return;
    }
    onEnter(project);
  }

  return (
    <div className="home">
      <div className="home-card">
        <h1 className="logo">projectodo</h1>
        <p className="tagline">Simple project tracking — who's doing what, nothing else.</p>

        {!mode && (
          <div className="home-actions">
            <button className="btn btn-primary" onClick={() => setMode('create')}>
              Create a project
            </button>
            <button className="btn btn-ghost" onClick={() => setMode('join')}>
              Join a project
            </button>
          </div>
        )}

        {mode === 'create' && (
          <form className="home-form" onSubmit={handleCreate}>
            <label>Project name</label>
            <input
              autoFocus
              type="text"
              placeholder="e.g. Q2 Launch"
              value={projectName}
              onChange={e => setProjectName(e.target.value)}
            />
            <div className="form-row">
              <button type="button" className="btn btn-ghost" onClick={() => setMode(null)}>
                Back
              </button>
              <button type="submit" className="btn btn-primary" disabled={!projectName.trim()}>
                Create
              </button>
            </div>
          </form>
        )}

        {mode === 'join' && (
          <form className="home-form" onSubmit={handleJoin}>
            <label>Project code</label>
            <input
              autoFocus
              type="text"
              placeholder="e.g. q2-launch-ab3f"
              value={joinCode}
              onChange={e => { setJoinCode(e.target.value); setError(''); }}
            />
            {error && <p className="error">{error}</p>}
            <div className="form-row">
              <button type="button" className="btn btn-ghost" onClick={() => { setMode(null); setError(''); }}>
                Back
              </button>
              <button type="submit" className="btn btn-primary" disabled={!joinCode.trim()}>
                Join
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
