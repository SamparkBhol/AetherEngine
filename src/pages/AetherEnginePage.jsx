import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Cpu, Atom, Zap, Brain, Lightbulb, Package, Settings, PlayCircle, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, delay }}
  >
    <Card className="h-full glassmorphic hover:border-primary/70 transition-colors duration-300 shadow-lg hover:shadow-primary/30">
      <CardHeader className="flex flex-row items-center space-x-3 pb-3">
        <Icon className="w-8 h-8 text-primary" />
        <CardTitle className="text-xl text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

const AIEnhancementCard = ({ title, description, icon: Icon, delay }) => (
   <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.4, delay }}
    className="bg-secondary/30 p-4 rounded-lg border border-border/50"
  >
    <div className="flex items-center mb-2">
      <Icon className="w-5 h-5 text-accent mr-2" />
      <h4 className="font-semibold text-accent">{title}</h4>
    </div>
    <p className="text-xs text-muted-foreground">{description}</p>
  </motion.div>
);


const AetherEnginePage = () => {
  const features = [
    { icon: Atom, title: 'Quantum-Inspired Physics', description: 'Objects exhibit probabilistic states for position and velocity, simulating superposition with a seeded pseudo-random generator for unique interactions.', delay: 0.1 },
    { icon: Zap, title: 'Custom Physics Simulation', description: 'Advanced engine handles elastic collisions, torque-based rotation, variable restitution, and includes a particle system for impacts and thrust effects.', delay: 0.2 },
    { icon: Brain, title: 'AI-Driven Gameplay & NPCs', description: 'Enemies utilize adaptive Q-learning models, adjusting speed and aggression. NPCs feature complex decision trees and emergent behaviors.', delay: 0.3 },
    { icon: Sparkles, title: 'Procedural Content Generation (PCG)', description: 'Dynamically generates diverse asteroid fields, power-up clusters, and entire level layouts using quantum-inspired probability distributions and generative adversarial networks (GANs) for asset variations.', delay: 0.4 },
    { icon: Lightbulb, title: '2D Ray-Casting Lighting', description: 'Real-time dynamic lighting with soft shadows, volumetric effects, and material-based light interaction (reflection, refraction).', delay: 0.5 },
    { icon: Package, title: 'Modular React Architecture', description: 'Component-based, maintainable structure combining real-time Canvas rendering with a responsive React UI for editor and game overlays.', delay: 0.6 },
  ];

  const aiEnhancements = [
    { icon: Settings, title: 'AI-Assisted Level Design', description: 'Tools for suggesting level layouts, enemy placements, and balancing based on desired difficulty curves and player progression models.', delay: 0.1 },
    { icon: Cpu, title: 'Neural Network-Powered Asset Generation', description: 'Integration with generative models (e.g., StyleGAN, VQ-VAE) for creating unique textures, sprites, and sound effects, adaptable via style transfer.', delay: 0.2 },
    { icon: PlayCircle, title: 'Reinforcement Learning for Playtesting', description: 'AI agents that can playtest levels, identify exploits, balance issues, and provide feedback on game mechanics.', delay: 0.3 },
    { icon: Brain, title: 'Dynamic Difficulty Adjustment (DDA)', description: 'Sophisticated DDA systems that monitor player skill and adjust game parameters in real-time to maintain engagement and flow, beyond simple speed/aggression changes.', delay: 0.4 },
    { icon: Lightbulb, title: 'AI Storytelling & Quest Generation', description: 'Procedural narrative systems capable of generating branching storylines, dynamic quests, and character dialogues based on player actions and world state.', delay: 0.5 },
    { icon: Atom, title: 'AI for Expressive Animation', description: 'Utilizing techniques like inverse kinematics and procedural animation driven by AI to create more natural and responsive character movements.', delay: 0.6 },
  ];

  return (
    <div className="overflow-x-hidden">
      <header className="relative py-20 md:py-32 bg-gradient-to-b from-background to-secondary/50 text-center">
        <div className="absolute inset-0 opacity-10">
          <Sparkles className="absolute top-1/4 left-1/4 w-32 h-32 text-primary animate-pulse-slow" />
          <Atom className="absolute bottom-1/4 right-1/4 w-24 h-24 text-accent animate-spin-slow" />
          <Cpu className="absolute top-1/3 right-1/5 w-20 h-20 text-primary/70 animate-ping-slow" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-block p-3 rounded-full bg-primary/20 mb-6"
          >
            <Sparkles className="w-12 h-12 text-primary" />
          </motion.div>
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary animate-background-pan bg-[200%_auto]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
          >
            AetherEngine
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            A professional-grade 2D game engine built with React and HTML5 Canvas, integrating quantum-inspired physics, AI-driven procedural generation, and dynamic lighting.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center space-x-4"
          >
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
              <a href="https://github.com/SamparkBhol/AetherEngine" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" /> View on GitHub
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10">
              <PlayCircle className="mr-2 h-5 w-5" /> Conceptual Demo (Soon)
            </Button>
          </motion.div>
        </div>
      </header>

      <section className="py-16 md:py-24 section-padding bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-primary mb-16">Core Engine Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(feature => <FeatureCard key={feature.title} {...feature} />)}
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
           <img  
            className="w-full max-w-4xl mx-auto h-auto object-cover rounded-xl mb-16 shadow-2xl border-4 border-primary/30" 
            alt="AetherEngine Conceptual UI or Gameplay Screenshot"
           src="https://images.unsplash.com/photo-1580894908361-967195033215?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FtZSUyMGRldmVsb3BtZW50fGVufDB8fDB8fA%3D%3D&w=1000&q=80" />
        </div>
      </section>

      <section className="py-16 md:py-24 section-padding bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-primary mb-6">Advanced AI Integration</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            AetherEngine is designed with a strong AI presence, incorporating numerous concepts to create truly dynamic and intelligent game worlds, aiming to rival leading open-source engines in AI capabilities.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiEnhancements.map(enhancement => <AIEnhancementCard key={enhancement.title} {...enhancement} />)}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 text-center bg-gradient-to-t from-background to-secondary/50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-foreground mb-6"
            initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once: true }} transition={{ delay: 0.2}}
          >
            The Vision for AetherEngine
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8"
            initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once: true }} transition={{ delay: 0.4}}
          >
            AetherEngine aims to be a lightweight, portable, and powerful tool for 2D game creation, emphasizing ease of use for developers while packing cutting-edge features. It serves as both a functional engine and a demonstration of advanced web technologies, quantum-inspired mechanics, and deep AI integration in game development.
          </motion.p>
          <motion.div initial={{ opacity:0, scale:0.8 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once: true }} transition={{ delay: 0.6}}>
            <Button size="lg" variant="link" asChild className="text-accent hover:text-primary text-lg">
              <a href="https://github.com/SamparkBhol/AetherEngine" target="_blank" rel="noopener noreferrer">
                Follow Development Progress <Github className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AetherEnginePage;