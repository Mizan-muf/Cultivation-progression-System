import { Routes, Route, Navigate } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Lobby } from './pages/Lobby';
import { CharacterCreation } from './pages/CharacterCreation';
import { CharacterSheet } from './pages/CharacterSheet';
import { GMDashboard } from './pages/GMDashboard';
import { CombatTracker } from './pages/CombatTracker';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/campaign/:id/gm" element={<GMDashboard />} />
      <Route path="/campaign/:id/lobby" element={<Lobby />} />
      <Route path="/campaign/:id/create" element={<CharacterCreation />} />
      <Route path="/campaign/:id/character/:charId" element={<CharacterSheet />} />
      <Route path="/campaign/:id/combat" element={<CombatTracker />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
