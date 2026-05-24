import { Navigate, Route, Routes } from 'react-router-dom';
import AppShell from './components/AppShell';
import HomePage from './pages/HomePage';
import ScenarioPage from './pages/ScenarioPage';
import BriefPage from './pages/BriefPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/scenarios/:scenarioId" element={<ScenarioPage />} />
        <Route path="/scenarios/:scenarioId/brief" element={<BriefPage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  );
}
