import React, { useState, useEffect } from 'react';

const UI = () => {
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState(1);

  useEffect(() => {
    const updateUI = () => {
      const game = window.gameInstance;
      if (game) {
        setScore(game.getScore());
        setDifficulty(game.getDifficulty().toFixed(2));
      }
    };
    const interval = setInterval(updateUI, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ui-container">
      <div>Score: <span id="score">{score}</span></div>
      <div>Difficulty: <span id="difficulty">{difficulty}</span></div>
      <div className="instructions">
        <p>Controls: Arrows to move, Space to shoot</p>
        <p>Quantum-enhanced asteroids adapt to your playstyle!</p>
      </div>
    </div>
  );
};

export default UI;