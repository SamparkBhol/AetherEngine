export class Renderer {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.lights = []; // Store light sources for ray casting
  }

  // Add light source (e.g., for player or power-ups)
  addLight(x, y, radius, intensity) {
    this.lights.push({ x, y, radius, intensity });
  }

  // 2D ray-casting for lighting
  renderLighting(bodies) {
    this.lights.forEach(light => {
      this.ctx.beginPath();
      const gradient = this.ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, light.radius);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${light.intensity})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      this.ctx.fillStyle = gradient;
      this.ctx.arc(light.x, light.y, light.radius, 0, Math.PI * 2);
      this.ctx.fill();

      // Cast rays to detect shadows
      bodies.forEach(body => {
        if (body.type !== 'player' && body.type !== 'powerup') {
          const dx = body.x - light.x;
          const dy = body.y - light.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < light.radius + body.radius) {
            // Simulate shadow by drawing a semi-transparent dark area
            this.ctx.beginPath();
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.arc(body.x, body.y, body.radius * 1.2, 0, Math.PI * 2);
            this.ctx.fill();
          }
        }
      });
    });
    this.lights = []; // Clear lights each frame
  }

  render(bodies) {
    this.ctx.clearRect(0, 0, 800, 600);
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    this.ctx.fillRect(0, 0, 800, 600);

    // Render bodies
    bodies.forEach(body => {
      this.ctx.save();
      this.ctx.translate(body.x, body.y);
      this.ctx.rotate(body.rotation);

      if (body.type === 'player') {
        this.ctx.fillStyle = 'cyan';
        this.ctx.beginPath();
        this.ctx.moveTo(0, -20);
        this.ctx.lineTo(15, 20);
        this.ctx.lineTo(-15, 20);
        this.ctx.closePath();
        this.ctx.fill();
        if (body.thrust) {
          this.ctx.fillStyle = 'orange';
          this.ctx.beginPath();
          this.ctx.moveTo(-10, 20);
          this.ctx.lineTo(10, 20);
          this.ctx.lineTo(0, 40);
          this.ctx.closePath();
          this.ctx.fill();
        }
        this.addLight(body.x, body.y, 100, 0.5); // Player light source
      } else if (body.type === 'asteroid') {
        this.ctx.fillStyle = 'gray';
        this.ctx.beginPath();
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * Math.PI * 2;
          const r = body.radius * (0.8 + Math.random() * 0.4);
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          if (i === 0) this.ctx.moveTo(x, y);
          else this.ctx.lineTo(x, y);
        }
        this.ctx.closePath();
        this.ctx.fill();
      } else if (body.type === 'powerup') {
        this.ctx.fillStyle = 'yellow';
        this.ctx.beginPath();
        this.ctx.arc(0, 0, body.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.addLight(body.x, body.y, 80, 0.4); // Power-up light source
      } else if (body.type === 'bullet') {
        this.ctx.fillStyle = 'white';
        this.ctx.beginPath();
        this.ctx.arc(0, 0, body.radius, 0, Math.PI * 2);
        this.ctx.fill();
      }

      // Enhanced particle effects
      if (body.collided) {
        this.ctx.fillStyle = 'rgba(255, 100, 100, 0.7)';
        for (let i = 0; i < 15; i++) {
          const offsetX = (Math.random() - 0.5) * body.radius * 2.5;
          const offsetY = (Math.random() - 0.5) * body.radius * 2.5;
          const size = 2 + Math.random() * 3;
          this.ctx.fillRect(offsetX, offsetY, size, size);
        }
        body.collided = false;
      }

      this.ctx.restore();
    });

    // Render lighting after bodies
    this.renderLighting(bodies);
  }
}