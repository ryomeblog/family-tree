import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FamilyTree from './components/pages/FamilyTree/FamilyTree';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/family-tree" element={<FamilyTree />} />
        <Route path="/" element={<Navigate to="/family-tree" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
