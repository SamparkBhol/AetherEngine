import React from 'react';
import GameCanvas from './components/GameCanvas';
import UI from './components/UI';

function App() {
  return (
    <div className="app-container">
      <h1>Quantum AetherEngine Demo</h1>
      <GameCanvas />
      <UI />
    </div>
  );
}

export default App;