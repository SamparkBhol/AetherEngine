import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, Pause, Square, Zap, Atom, Brain, Sparkles, Settings, Maximize, Minimize, 
  FileText, FolderOpen, Save, UploadCloud, Palette, AlertTriangle, CheckCircle, Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const mockEntities = [
  { id: 'player', name: 'PlayerShip', type: 'Sprite', x: 50, y: 50, color: 'hsl(var(--primary))' },
  { id: 'enemy1', name: 'Drone_Alpha', type: 'AI_Sprite', x: 150, y: 100, color: 'hsl(var(--destructive))' },
  { id: 'asteroid_field', name: 'AsteroidCluster', type: 'PCG_Area' },
  { id: 'powerup_shield', name: 'ShieldPowerUp', type: 'Item' },
];

const mockAssets = [
  { id: 'tex_player', name: 'player_ship.png', type: 'Texture' },
  { id: 'tex_enemy', name: 'drone_texture.png', type: 'Texture' },
  { id: 'sfx_laser', name: 'laser_shoot.wav', type: 'Audio' },
  { id: 'bgm_level1', name: 'level1_music.mp3', type: 'Audio' },
];

const AetherEngineIDE = () => {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [entities, setEntities] = useState(mockEntities);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const { toast } = useToast();

  const gameLoopRef = useRef();
  const lastTimeRef = useRef(0);

  const showNotification = (title, description, variant = "default") => {
    let icon = <Info className="h-5 w-5 text-blue-500" />;
    if (variant === "success") icon = <CheckCircle className="h-5 w-5 text-green-500" />;
    if (variant === "destructive") icon = <AlertTriangle className="h-5 w-5 text-red-500" />;

    toast({
      title: <div className="flex items-center"><span className="mr-2">{icon}</span>{title}</div>,
      description: description,
      duration: 3000,
    });
  };
  
  const handleNewFile = () => showNotification("New File", "Created a new blank scene.", "success");
  const handleOpenFile = () => showNotification("Open File", "File browser would open here.", "info");
  const handleSaveFile = () => showNotification("Save File", "Project saved successfully!", "success");
  const handleCloudUpload = () => showNotification("Cloud Sync", "Changes uploaded to the cloud.", "info");
  const handleThemeEditor = () => showNotification("Theme Editor", "Theme customization panel would open.", "info");


  const gameLoop = useCallback((timestamp) => {
    if (!isPlaying) return;

    const deltaTime = (timestamp - lastTimeRef.current) / 1000; // Delta time in seconds
    lastTimeRef.current = timestamp;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(10, 20, 30, 1)'; // Darker viewport background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // --- AI & Physics Update Placeholder ---
    // For each entity:
    // 1. Apply Quantum-Inspired Physics (probabilistic movement, superposition simulation)
    //    - Example: entity.x += (Math.random() - 0.5) * entity.speed * deltaTime;
    // 2. Update AI Behaviors (Q-learning for enemies, pathfinding, decision making)
    //    - Example: if (entity.type === 'AI_Sprite') { runAIBehavior(entity, playerEntity, deltaTime); }
    // 3. Handle Collisions
    //    - Example: checkCollisions(entities);
    
    entities.forEach(entity => {
      if (entity.type === 'Sprite' || entity.type === 'AI_Sprite') {
        // Simple placeholder movement for AI entities
        if (entity.type === 'AI_Sprite' && isPlaying) {
          entity.x += (Math.random() - 0.5) * 20 * deltaTime; // Random jitter
          entity.y += (Math.random() - 0.5) * 20 * deltaTime;
        }
        ctx.fillStyle = entity.color || 'white';
        ctx.fillRect(entity.x, entity.y, 20, 20); // Draw a simple square
        ctx.fillStyle = 'white';
        ctx.fillText(entity.name, entity.x, entity.y - 5);
      }
    });
    
    // --- Procedural Content Generation (PCG) Placeholder ---
    // if (shouldGenerateNewContent) { generateAsteroidField(); generatePowerUps(); }

    // --- Ray-Casting Lighting Placeholder ---
    // renderDynamicLights(ctx, entities);
    // renderShadows(ctx, entities);

    ctx.font = '12px Arial';
    ctx.fillStyle = 'hsl(var(--muted-foreground))';
    ctx.textAlign = 'left';
    ctx.fillText(`Playing... dT: ${deltaTime.toFixed(3)}s`, 10, 20);

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [isPlaying, entities]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(20, 30, 40, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '20px Inter, Arial, sans-serif';
    ctx.fillStyle = 'hsl(var(--primary))';
    ctx.textAlign = 'center';
    ctx.fillText('AetherEngine Canvas - v0.0.2', canvas.width / 2, canvas.height / 2 -15);
    ctx.font = '14px Inter, Arial, sans-serif';
    ctx.fillStyle = 'hsl(var(--muted-foreground))';
    ctx.fillText('Click Play to start the simulation.', canvas.width / 2, canvas.height / 2 + 15);
  }, []);


  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = performance.now();
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    } else {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
      // Optionally redraw a static "paused" state
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'rgba(20, 30, 40, 0.8)'; // Slightly transparent overlay when paused
      ctx.fillRect(0,0, canvas.width, canvas.height);
      ctx.font = '20px Inter, Arial, sans-serif';
      ctx.fillStyle = 'hsl(var(--primary))';
      ctx.textAlign = 'center';
      ctx.fillText('Paused', canvas.width / 2, canvas.height / 2);
    }
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [isPlaying, gameLoop]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      showNotification("Simulation Started", "AetherEngine is now running.", "success");
    } else {
      showNotification("Simulation Paused", "AetherEngine is paused.", "info");
    }
  };

  const stopSimulation = () => {
    setIsPlaying(false);
    // Reset entities or game state here if needed
    setEntities(mockEntities); // Reset to initial mock state
    showNotification("Simulation Stopped", "AetherEngine has been reset.", "destructive");
     // Redraw initial state
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(20, 30, 40, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '20px Inter, Arial, sans-serif';
    ctx.fillStyle = 'hsl(var(--primary))';
    ctx.textAlign = 'center';
    ctx.fillText('AetherEngine Canvas - v0.0.2', canvas.width / 2, canvas.height / 2 -15);
    ctx.font = '14px Inter, Arial, sans-serif';
    ctx.fillStyle = 'hsl(var(--muted-foreground))';
    ctx.fillText('Click Play to start the simulation.', canvas.width / 2, canvas.height / 2 + 15);
  };

  const handleSelectEntity = (entity) => {
    setSelectedEntity(entity);
    showNotification("Entity Selected", `${entity.name} is now selected in the Inspector.`, "info");
  };
  
  const Panel = ({ title, icon: Icon, children, className }) => (
    <Card className={`glassmorphic-panel flex flex-col ${className}`}>
      <CardHeader className="py-3 px-4 border-b border-border/50">
        <CardTitle className="text-sm font-medium flex items-center text-primary-foreground">
          <Icon className="w-4 h-4 mr-2 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 flex-grow overflow-y-auto custom-scrollbar">
        {children}
      </CardContent>
    </Card>
  );

  return (
    <div className="h-screen w-screen flex flex-col p-2 gap-2 bg-gradient-to-br from-background via-secondary/20 to-background">
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="h-12 bg-card/80 backdrop-blur-sm rounded-md shadow-lg flex items-center justify-between px-3 border border-border/50"
      >
        <div className="flex items-center space-x-2">
          <Sparkles className="w-6 h-6 text-primary animate-pulse" />
          <h1 className="text-lg font-bold text-primary-foreground">AetherEngine</h1>
          <span className="text-xs text-muted-foreground">v0.0.2 - Alpha</span>
        </div>
        <div className="flex items-center space-x-1">
          <Button onClick={handleNewFile} variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" title="New File"><FileText className="w-4 h-4" /></Button>
          <Button onClick={handleOpenFile} variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" title="Open File"><FolderOpen className="w-4 h-4" /></Button>
          <Button onClick={handleSaveFile} variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" title="Save File"><Save className="w-4 h-4" /></Button>
          <Button onClick={handleCloudUpload} variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" title="Upload to Cloud"><UploadCloud className="w-4 h-4" /></Button>
          <Button onClick={handleThemeEditor} variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" title="Theme Editor"><Palette className="w-4 h-4" /></Button>
        </div>
      </motion.div>

      <div className="flex-grow flex gap-2 overflow-hidden">
        <motion.div 
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="w-1/5 min-w-[200px] max-w-[280px] flex flex-col gap-2"
        >
          <Panel title="Scene Hierarchy" icon={FolderOpen}>
            <ul className="text-xs space-y-1">
              {entities.map(entity => (
                <li 
                  key={entity.id} 
                  onClick={() => handleSelectEntity(entity)}
                  className={`p-1.5 rounded hover:bg-primary/20 cursor-pointer text-muted-foreground hover:text-primary-foreground transition-colors ${selectedEntity?.id === entity.id ? 'bg-primary/20 text-primary-foreground ring-1 ring-primary' : ''}`}
                >
                  {entity.name} <span className="text-primary/70 text-[10px]">({entity.type})</span>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Asset Browser" icon={Sparkles} className="flex-grow">
             <ul className="text-xs space-y-1">
              {mockAssets.map(asset => (
                <li key={asset.id} className="p-1.5 rounded hover:bg-primary/10 cursor-pointer text-muted-foreground hover:text-primary-foreground transition-colors">
                  {asset.name} <span className="text-primary/70 text-[10px]">({asset.type})</span>
                </li>
              ))}
            </ul>
          </Panel>
        </motion.div>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="flex-grow flex flex-col gap-2"
        >
          <div className="h-10 bg-card/80 backdrop-blur-sm rounded-md shadow-md flex items-center px-3 border border-border/50">
            <Button onClick={togglePlay} variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              {isPlaying ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button onClick={stopSimulation} variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Square className="w-4 h-4 mr-1" /> Stop
            </Button>
            <div className="flex-grow" />
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" onClick={() => setIsMaximized(!isMaximized)} title={isMaximized ? "Minimize Viewport" : "Maximize Viewport"}>
              {isMaximized ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </Button>
          </div>
          <div className={`flex-grow bg-black/70 rounded-md overflow-hidden border border-primary/30 shadow-inner ${isMaximized ? 'fixed inset-0 z-50 p-4' : ''}`}>
            <canvas 
              ref={canvasRef} 
              className="w-full h-full" 
              width={isMaximized ? window.innerWidth - 32 : 800} // Adjust for padding if maximized
              height={isMaximized ? window.innerHeight - 32 : 600}
            ></canvas>
          </div>
        </motion.div>

        <motion.div 
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="w-1/5 min-w-[200px] max-w-[280px] flex flex-col gap-2"
        >
          <Panel title="Inspector" icon={Settings}>
            {selectedEntity ? (
              <div className="text-xs text-muted-foreground p-1 space-y-2">
                <p className="font-semibold text-primary-foreground mb-1 text-sm">{selectedEntity.name}</p>
                <div>
                  <label className="block mb-0.5 text-xs">Position (X, Y):</label>
                  <div className="flex gap-1">
                    <input type="number" defaultValue={selectedEntity.x || 0} className="w-full bg-input text-xs p-1 rounded border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                    <input type="number" defaultValue={selectedEntity.y || 0} className="w-full bg-input text-xs p-1 rounded border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block mb-0.5 text-xs">Rotation:</label>
                  <input type="number" defaultValue={selectedEntity.rotation || 0} className="w-full bg-input text-xs p-1 rounded border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                </div>
                <div>
                  <label className="block mb-0.5 text-xs">Scale:</label>
                  <input type="number" defaultValue={selectedEntity.scale || 1} className="w-full bg-input text-xs p-1 rounded border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                </div>
                <Button size="sm" variant="outline" className="w-full text-xs mt-3">Add Component</Button>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground p-2 text-center">Select an entity to inspect its properties.</p>
            )}
          </Panel>
          <Panel title="Engine Modules" icon={Zap} className="flex-grow">
            <ul className="text-xs space-y-1.5">
              {[
                { name: 'Quantum Physics Engine', icon: Atom, status: 'Active' },
                { name: 'AI Subsystem (Q-Learning)', icon: Brain, status: 'Idle' },
                { name: 'PCG Controller', icon: Sparkles, status: 'Generating...' },
                { name: 'Ray-Casting Renderer', icon: Palette, status: 'Optimized' },
                { name: 'Event System', icon: Zap, status: 'Listening' },
                { name: 'State Manager', icon: Settings, status: 'Stable' },
              ].map(mod => (
                <li key={mod.name} className="flex items-center justify-between p-1.5 rounded hover:bg-primary/10 text-muted-foreground hover:text-primary-foreground transition-colors">
                  <div className="flex items-center">
                    <mod.icon className="w-3.5 h-3.5 mr-2 text-primary/80" /> {mod.name}
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${mod.status === 'Active' || mod.status === 'Optimized' || mod.status === 'Stable' ? 'bg-green-500/20 text-green-400' : mod.status === 'Generating...' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-slate-500/20 text-slate-400'}`}>{mod.status}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </motion.div>
      </div>
    </div>
  );
};

export default AetherEngineIDE;