import { PhysicsEngine } from './physics';
import { Renderer } from './renderer';
import { AIController } from './ai';
import { QuantumSimulator } from './quantum';

export class Game {
  constructor(canvas, quantumSimulator) {
    this.physics = new PhysicsEngine(quantumSimulator);
    this.renderer = new Renderer(canvas);
    this.ai = new AIController(quantumSimulator);
    this.score = 0;
    this.keys = { left: false, right: false, up: false, space: false };
    window.gameInstance = this;

    // Initialize player
    this.physics.addBody({
      type: 'player',
      id: 'player',
      x: 400,
      y: 500,
      radius: 20,
      vx: 0,
      vy: 0,
      angularVelocity: 0,
      mass: 2,
      hits: 0
    });

    // Initial level
    this.ai.generateLevel(this.score).forEach(body => this.physics.addBody(body));
  }

  start() {
    this.gameLoop = () => {
      // Spawn new level periodically
      if (Math.random() < 0.01) {
        this.ai.generateLevel(this.score).forEach(body => this.physics.addBody(body));
      }

      // Handle player input
      const player = this.physics.bodies.find(b => b.type === 'player');
      player.thrust = this.keys.up;
      player.vx += (this.keys.right - this.keys.left) * 0.5;
      if (this.keys.space) {
        this.shoot(player);
      }

      // Update physics and AI
      this.physics.update(player, this.ai.difficulty);
      this.ai.update(this.physics.bodies, this.score);

      // Handle collisions
      this.physics.bodies.forEach(body => {
        if (body.type === 'player') return;
        const dx = player.x - body.x;
        const dy = player.y - body.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < player.radius + body.radius) {
          if (body.type === 'powerup') {
            this.score += 50;
            this.physics.bodies.splice(this.physics.bodies.indexOf(body), 1);
          } else if (body.type === 'asteroid') {
            player.hits = (player.hits || 0) + 1;
            this.score -= 10;
          }
        }
      });

      // Handle bullet collisions
      this.physics.bodies.filter(b => b.type === 'bullet').forEach(bullet => {
        this.physics.bodies.filter(b => b.type === 'asteroid').forEach(asteroid => {
          const dx = bullet.x - asteroid.x;
          const dy = bullet.y - asteroid.y;
          if (Math.sqrt(dx * dx + dy * dy) < bullet.radius + asteroid.radius) {
            this.physics.removeBody(bullet);
            this.physics.removeBody(asteroid);
            this.score += 20;
          }
        });
      });

      // Render
      this.renderer.render(this.physics.bodies);
      this.animationFrameId = requestAnimationFrame(this.gameLoop);
    };
    this.gameLoop();
  }

  shoot(player) {
    if (!this.lastShot || Date.now() - this.lastShot > 500) {
      this.physics.addBody({
        type: 'bullet',
        id: `bullet_${Date.now()}`,
        x: player.x,
        y: player.y - 20,
        radius: 3,
        vx: 0,
        vy: -10,
        mass: 0.1
      });
      this.lastShot = Date.now();
    }
  }

  handleInput(event, isDown) {
    switch (event.key) {
      case 'ArrowLeft':
        this.keys.left = isDown;
        break;
      case 'ArrowRight':
        this.keys.right = isDown;
        break;
      case 'ArrowUp':
        this.keys.up = isDown;
        break;
      case ' ':
        this.keys.space = isDown;
        break;
    }
  }

  getScore() {
    return this.score;
  }

  getDifficulty() {
    return this.ai.difficulty;
  }

  stop() {
    cancelAnimationFrame(this.animationFrameId);
  }
}