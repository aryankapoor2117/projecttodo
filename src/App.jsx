import { useState } from 'react';
import Home from './pages/Home';
import Room from './pages/Room';

export default function App() {
  const [project, setProject] = useState(null);

  return project
    ? <Room project={project} onLeave={() => setProject(null)} onUpdate={setProject} />
    : <Home onEnter={setProject} />;
}
