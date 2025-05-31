export class AIController {
  constructor(quantumSimulator) {
    this.quantum = quantumSimulator;
    this.playerHistory = [];
    this.maxHistory = 200;
    this.difficulty = 1;
    // Simplified Q-learning table: state (player distance, speed) -> action (speed, aggression)
    this.qTable = new Map();
    this.learningRate = 0.1;
    this.discountFactor = 0.9;
    this.explorationRate = 0.2;
  }

  getState(player, asteroid) {
    const dx = player.x - asteroid.x;
    const dy = player.y - asteroid.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const playerSpeed = Math.sqrt(player.vx * player.vx + player.vy * player.vy);
    return `${Math.floor(distance / 50)},${Math.floor(playerSpeed / 2)}`;
  }

  getAction(state) {
    if (!this.qTable.has(state)) {
      this.qTable.set(state, { speed: 1, aggression: 0 });
    }
    if (Math.random() < this.explorationRate) {
      return {
        speed: 1 + Math.random() * this.difficulty,
        aggression: Math.random() * this.difficulty
      };
    }
    return this.qTable.get(state);
  }

  updateQTable(state, action, reward, nextState) {
    const currentQ = this.qTable.get(state) || { speed: 1, aggression: 0 };
    const nextQ = this.qTable.get(nextState) || { speed: 1, aggression: 0 };
    const maxNextQ = Math.max(nextQ.speed, nextQ.aggression);
    currentQ.speed += this.learningRate * (reward + this.discountFactor * maxNextQ - currentQ.speed);
    currentQ.aggression += this.learningRate * (reward + this.discountFactor * maxNextQ - currentQ.aggression);
    this.qTable.set(state, currentQ);
  }

  update(bodies, score) {
    const player = bodies.find(b => b.type === 'player');
    if (player) {
      this.playerHistory.push({ vx: player.vx, vy: player.vy, hits: player.hits || 0 });
      if (this.playerHistory.length > this.maxHistory) {
        this.playerHistory.shift();
      }
      const avgSpeed = this.playerHistory.reduce((sum, p) => sum + Math.abs(p.vx) + Math.abs(p.vy), 0) / this.playerHistory.length;
      const hitRate = this.playerHistory.reduce((sum, p) => sum + p.hits, 0) / this.maxHistory;
      this.difficulty = 1 + (avgSpeed / 20 + hitRate * 2);
    }

    // Update asteroid behavior with Q-learning
    bodies.filter(b => b.type === 'asteroid').forEach(asteroid => {
      const state = this.getState(player, asteroid);
      const action = this.getAction(state);
      const dx = player.x - asteroid.x;
      const dy = player.y - asteroid.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 200) {
        asteroid.vx += (dx / distance) * action.aggression * 0.1;
        asteroid.vy += (dy / distance) * action.aggression * 0.1;
        asteroid.angularVelocity += (Math.random() - 0.5) * 0.02 * action.aggression;
      }
      // Update Q-table with reward (proximity to player = positive reward)
      const reward = distance < 100 ? 1 : -0.1;
      const nextState = this.getState(player, asteroid);
      this.updateQTable(state, action, reward, nextState);
    });
  }

  generateAsteroid(score) {
    const speedFactor = 1 + score / 2000 * this.difficulty;
    const radius = 15 + this.quantum.random() * 25; // Quantum-influenced size
    return {
      type: 'asteroid',
      id: `asteroid_${Date.now()}`,
      x: this.quantum.random() * 800,
      y: -50,
      radius,
      vx: (this.quantum.random() - 0.5) * 2 * speedFactor,
      vy: (1 + this.quantum.random() * 2) * speedFactor,
      angularVelocity: (this.quantum.random() - 0.5) * 0.05,
      mass: radius / 10
    };
  }

  generatePowerup() {
    return {
      type: 'powerup',
      id: `powerup_${Date.now()}`,
      x: this.quantum.random() * 800,
      y: -50,
      radius: 10,
      vx: (this.quantum.random() - 0.5) * 1,
      vy: 2,
      mass: 0.5
    };
  }

  // Procedural level generation
  generateLevel(score) {
    const level = [];
    const asteroidCount = Math.floor(3 + score / 1000 * this.difficulty);
    const powerupCount = Math.floor(1 + score / 2000);
    
    // Quantum-inspired distribution for asteroid field
    for (let i = 0; i < asteroidCount; i++) {
      const asteroid = this.generateAsteroid(score);
      asteroid.x = 100 + (i % 4) * 200 + (this.quantum.random() - 0.5) * 50;
      asteroid.y = -50 - i * 100;
      level.push(asteroid);
    }
    for (let i = 0; i < powerupCount; i++) {
      level.push(this.generatePowerup());
    }
    return level;
  }
}