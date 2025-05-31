export class PhysicsEngine {
  constructor(quantumSimulator) {
    this.bodies = [];
    this.gravity = 0.2;
    this.friction = 0.98;
    this.restitution = 0.7;
    this.quantum = quantumSimulator;
  }

  addBody(body) {
    this.bodies.push({
      ...body,
      rotation: body.rotation || 0,
      angularVelocity: body.angularVelocity || 0,
      mass: body.mass || 1,
      invMass: body.mass ? 1 / body.mass : 0,
      quantumState: { spread: 0.1 }
    });
  }

  update(player, difficulty) {
    this.bodies.forEach(body => {
      // Apply quantum state perturbations
      this.quantum.applyQuantumState(body, player, difficulty);

      if (body.type === 'player') {
        body.vy += this.gravity;
        body.vx *= this.friction;
        body.vy *= this.friction;
        body.x += body.vx;
        body.y += body.vy;
        body.rotation += body.angularVelocity;

        // Boundary checks
        body.x = Math.max(0, Math.min(800, body.x));
        body.y = Math.max(0, Math.min(600, body.y));
      } else if (body.type === 'asteroid' || body.type === 'powerup' || body.type === 'bullet') {
        body.x += body.vx;
        body.y += body.vy;
        body.rotation += body.angularVelocity;
        if (body.y > 650 || body.x < -50 || body.x > 850) {
          this.bodies.splice(this.bodies.indexOf(body), 1);
        }
      }
    });

    // Collision detection and response
    for (let i = 0; i < this.bodies.length; i++) {
      for (let j = i + 1; j < this.bodies.length; j++) {
        const bodyA = this.bodies[i];
        const bodyB = this.bodies[j];
        if (bodyA.type === 'bullet' && bodyB.type === 'bullet') continue;

        if (bodyA.type === 'circle' && bodyB.type === 'circle') {
          const dx = bodyA.x - bodyB.x;
          const dy = bodyA.y - bodyB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < bodyA.radius + bodyB.radius) {
            // Elastic collision with restitution
            const angle = Math.atan2(dy, dx);
            const v1 = { x: bodyA.vx, y: bodyA.vy };
            const v2 = { x: bodyB.vx, y: bodyB.vy };
            const m1 = bodyA.mass;
            const m2 = bodyB.mass;

            const v1n = v1.x * Math.cos(angle) + v1.y * Math.sin(angle);
            const v2n = v2.x * Math.cos(angle) + v2.y * Math.sin(angle);
            const v1t = -v1.x * Math.sin(angle) + v1.y * Math.cos(angle);
            const v2t = -v2.x * Math.sin(angle) + v2.y * Math.cos(angle);

            const v1nFinal = ((m1 - m2) * v1n + 2 * m2 * v2n) / (m1 + m2) * this.restitution;
            const v2nFinal = ((m2 - m1) * v2n + 2 * m1 * v1n) / (m1 + m2) * this.restitution;

            bodyA.vx = v1nFinal * Math.cos(angle) + v1t * Math.cos(angle + Math.PI / 2);
            bodyA.vy = v1nFinal * Math.sin(angle) + v1t * Math.sin(angle + Math.PI / 2);
            bodyB.vx = v2nFinal * Math.cos(angle) + v2t * Math.cos(angle + Math.PI / 2);
            bodyB.vy = v2nFinal * Math.sin(angle) + v2t * Math.sin(angle + Math.PI / 2);

            // Apply torque
            const torque = (Math.random() - 0.5) * 0.1 * this.restitution;
            bodyA.angularVelocity += torque / bodyA.mass;
            bodyB.angularVelocity -= torque / bodyB.mass;

            // Prevent overlap
            const overlap = (bodyA.radius + bodyB.radius - distance) / 2;
            bodyA.x += Math.cos(angle) * overlap;
            bodyA.y += Math.sin(angle) * overlap;
            bodyB.x -= Math.cos(angle) * overlap;
            bodyB.y -= Math.sin(angle) * overlap;

            bodyA.collided = true;
            bodyB.collided = true;
          }
        }
      }
    }
  }

  removeBody(body) {
    const index = this.bodies.indexOf(body);
    if (index !== -1) this.bodies.splice(index, 1);
  }
}