import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Pages
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import WorkPage from './pages/WorkPage';
import ArenaPage from './pages/ArenaPage';
import SystemsPage from './pages/SystemsPage';
import VaultPage from './pages/VaultPage';
import WritingsPage from './pages/WritingsPage';
import WritingDetailPage from './pages/WritingDetailPage';

// Admin Pages
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import ProtectedRoute from './components/admin/ProtectedRoute';
import ProjectsAdminPage from './pages/admin/ProjectsAdminPage';
import ProjectEditorPage from './pages/admin/ProjectEditorPage';
import WritingsAdminPage from './pages/admin/WritingsAdminPage';
import WritingEditorPage from './pages/admin/WritingEditorPage';
import SystemsAdminPage from './pages/admin/SystemsAdminPage';
import SystemEditorPage from './pages/admin/SystemEditorPage';
import VaultAdminPage from './pages/admin/VaultAdminPage';
import VaultEditorPage from './pages/admin/VaultEditorPage';
import ArenaAdminPage from './pages/admin/ArenaAdminPage';
import ArenaThreadEditorPage from './pages/admin/ArenaThreadEditorPage';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            {/* <Route path="/arena" element={<ArenaPage />} /> */}
            <Route path="/systems" element={<SystemsPage />} />
            <Route path="/vault" element={<VaultPage />} />
            <Route path="/writings" element={<WritingsPage />} />
            <Route path="/writings/:slug" element={<WritingDetailPage />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            {/* Project Admin Routes */}
            <Route
              path="/admin/projects"
              element={
                <ProtectedRoute>
                  <ProjectsAdminPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/projects/new"
              element={
                <ProtectedRoute>
                  <ProjectEditorPage />
                </ProtectedRoute>
              }
            />

            {/* Writings Admin Routes */}
            <Route path="/admin/writings" element={<ProtectedRoute><WritingsAdminPage /></ProtectedRoute>} />
            <Route path="/admin/writings/new" element={<ProtectedRoute><WritingEditorPage /></ProtectedRoute>} />
            <Route path="/admin/writings/:id" element={<ProtectedRoute><WritingEditorPage /></ProtectedRoute>} />

            {/* Systems Admin Routes */}
            <Route path="/admin/systems" element={<ProtectedRoute><SystemsAdminPage /></ProtectedRoute>} />
            <Route path="/admin/systems/new" element={<ProtectedRoute><SystemEditorPage /></ProtectedRoute>} />
            <Route path="/admin/systems/:id" element={<ProtectedRoute><SystemEditorPage /></ProtectedRoute>} />

            {/* Vault Admin Routes */}
            <Route path="/admin/vault" element={<ProtectedRoute><VaultAdminPage /></ProtectedRoute>} />
            <Route path="/admin/vault/new" element={<ProtectedRoute><VaultEditorPage /></ProtectedRoute>} />
            <Route path="/admin/vault/:id" element={<ProtectedRoute><VaultEditorPage /></ProtectedRoute>} />

            {/* Arena Admin Routes */}
            <Route path="/admin/arena" element={<ProtectedRoute><ArenaAdminPage /></ProtectedRoute>} />
            <Route path="/admin/arena/new" element={<ProtectedRoute><ArenaThreadEditorPage /></ProtectedRoute>} />
            <Route path="/admin/arena/:id" element={<ProtectedRoute><ArenaThreadEditorPage /></ProtectedRoute>} />
            <Route
              path="/admin/projects/:id"
              element={
                <ProtectedRoute>
                  <ProjectEditorPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;