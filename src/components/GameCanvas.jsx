import React, { useRef, useEffect } from 'react';
import { Game } from '../engine/game';
import { QuantumSimulator } from '../engine/quantum';

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const quantum = new QuantumSimulator();
    gameRef.current = new Game(canvas, quantum);
    gameRef.current.start();

    const handleKeyDown = (e) => gameRef.current.handleInput(e, true);
    const handleKeyUp = (e) => gameRef.current.handleInput(e, false);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      gameRef.current.stop();
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return <canvas ref={canvasRef} width="800" height="600" className="game-canvas" />;
};

export default GameCanvas;