import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import WorkPage from './pages/WorkPage';
import ArenaPage from './pages/ArenaPage';
import SystemsPage from './pages/SystemsPage';
import VaultPage from './pages/VaultPage';
import WritingsPage from './pages/WritingsPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/arena" element={<ArenaPage />} />
          <Route path="/systems" element={<SystemsPage />} />
          <Route path="/vault" element={<VaultPage />} />
          <Route path="/writings" element={<WritingsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;