import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CadetProfile from './pages/CadetProfile';
import SimulationSummary from './pages/SimulationSummary';
import SimulationManagement from './pages/SimulationManagement';
import AdvancedAnalytics from './pages/AdvancedAnalytics';
import CommanderView from './pages/CommanderView';
import SystemSettings from './pages/SystemSettings';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cadet/:id" element={<CadetProfile />} />
          <Route path="/simulation-summary" element={<SimulationSummary />} />
          <Route path="/simulation-management" element={<SimulationManagement />} />
          <Route path="/analytics" element={<AdvancedAnalytics />} />
          <Route path="/commander" element={<CommanderView />} />
          <Route path="/settings" element={<SystemSettings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
