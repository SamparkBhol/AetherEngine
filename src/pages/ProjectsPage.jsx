import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Github, ExternalLink, Cpu, Palette, Gamepad2, MoreHorizontal, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const projects = [
  {
    title: "AetherEngine",
    category: "AI Game Engine Development",
    icon: Sparkles, // Using Sparkles as a distinctive icon for AetherEngine
    description: "A professional-grade 2D game engine built with React & Canvas, featuring quantum-inspired physics, AI-driven procedural generation, and dynamic lighting.",
    tags: ["Game Engine", "React", "AI", "Quantum Physics", "PCG", "Ray Casting"], // More concise tags for the card
    githubUrl: "https://github.com/SamparkBhol/AetherEngine", 
    pageUrl: "/projects/aether-engine", // Link to the dedicated page
    imagePlaceholder: "Dynamic 2D game scene with glowing effects and complex physics" 
  },
  {
    title: "GameDev AI Assistant",
    category: "AI & Tooling",
    icon: Cpu,
    description: "A VSCode extension leveraging AI to assist game developers with code suggestions, asset generation prompts, documentation lookup, and debugging, tailored for game development workflows.",
    tags: ["VSCode Extension", "AI", "NLP", "Game Development", "Developer Tools"],
    githubUrl: "https://github.com/SamparkBhol/gamedev-ai-assistant",
    liveUrl: null,
    imagePlaceholder: "VSCode extension UI with AI chat interface for game dev"
  },
  {
    title: "Zelda Game 2D",
    category: "Game Development",
    icon: Gamepad2,
    description: "A 2D game inspired by The Legend of Zelda series, featuring top-down exploration, combat mechanics, puzzle elements, and a pixel art style. (No description as of now - confidential)",
    tags: ["2D Game", "Adventure", "Pixel Art", "Game Engine", "Confidential"],
    githubUrl: "https://github.com/SamparkBhol/ZeldaGame2D", 
    liveUrl: null,
    imagePlaceholder: "Pixel art scene from a Zelda-like 2D game"
  },
  {
    title: "Quantum Code Snippets",
    category: "Quantum Computing & Research",
    icon: Cpu,
    description: "A collection of code examples demonstrating quantum algorithms and concepts using libraries like Qiskit or PennyLane, exploring simulations and simple quantum applications.",
    tags: ["Quantum Computing", "Qiskit", "PennyLane", "Python", "Research"],
    githubUrl: "https://github.com/SamparkBhol/QuantumCodeSnippets", 
    liveUrl: null,
    imagePlaceholder: "Quantum circuit diagram or visualization"
  },
  {
    title: "CodeCraze",
    category: "Web Development & AI",
    icon: Cpu,
    description: "Platform integrating NLP (BERT, Transformers) for natural language command processing. Features a scalable code execution playground with Flask backend and intuitive UI.",
    tags: ["NLP", "BERT", "Flask", "Python", "Web Platform"],
    githubUrl: "https://github.com/SamparkBhol/CodeCraze",
    liveUrl: null,
    imagePlaceholder: "Web interface of CodeCraze platform"
  },
  {
    title: "Assignofast",
    category: "Full-Stack Development",
    icon: Palette,
    description: "Productivity app for assignment management with intelligent reminders. Includes a Chrome extension and Flutter mobile app, using Firebase for backend.",
    tags: ["Flutter", "Firebase", "Chrome Extension", "Productivity", "Mobile App"],
    githubUrl: "https://github.com/SamparkBhol/Assignofast",
    liveUrl: null,
    imagePlaceholder: "Mobile app and Chrome extension UI for Assignofast"
  },
  {
    title: "Descollab",
    category: "Web Development & Collaboration",
    icon: Palette,
    description: "Distributed collaborative design platform with real-time synchronization. Built with React, Tailwind CSS, and Firebase, featuring live commenting and version control.",
    tags: ["React", "TailwindCSS", "Firebase", "Collaboration", "Real-time"],
    githubUrl: "https://github.com/SamparkBhol/descollab",
    liveUrl: null,
    imagePlaceholder: "Collaborative design platform interface"
  }
];

const ProjectsPage = () => {
  return (
    <div className="container mx-auto px-4 section-padding">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-4">My Creations</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A showcase of my journey through code, from game development and AI explorations to web platforms and research. Some ongoing projects are marked confidential.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <Card className="h-full flex flex-col overflow-hidden glassmorphic hover:border-primary/50 transition-all duration-300 group border-2 border-transparent hover:shadow-2xl">
               <img  
                className="w-full h-52 object-cover border-b border-border/30 group-hover:opacity-90 transition-opacity" 
                alt={project.title}
               src={project.title === "AetherEngine" ? "https://images.unsplash.com/photo-1611605698335-8b1569810432" : "https://images.unsplash.com/photo-1498050108023-c5249f4df085"} />
              <CardHeader className="pb-3 pt-5">
                <div className="flex items-center mb-2">
                  <project.icon className="w-7 h-7 mr-2.5 text-primary shrink-0" />
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">{project.title}</CardTitle>
                </div>
                <CardDescription className="text-xs text-primary/80 font-medium uppercase tracking-wider">{project.category}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm mb-3 min-h-[70px]">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map(tag => (
                    <span key={tag} className={`text-xs font-medium px-2 py-0.5 rounded-full ${tag === 'Confidential' ? 'bg-yellow-500/20 text-yellow-300' : (tag === 'AI' || tag === 'Quantum Physics' || tag.includes('React')) ? 'bg-purple-500/20 text-purple-300' : 'bg-secondary text-secondary-foreground'}`}>{tag}</span>
                  ))}
                </div>
              </CardContent>
              <div className="p-4 border-t border-border/50 bg-card/30 mt-auto">
                <div className="flex justify-between items-center"> {/* Changed to justify-between */}
                  <div> {/* Group for GitHub and Demo links */}
                    {project.githubUrl && (
                      <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-primary hover:bg-primary/10">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-1.5 h-4 w-4" /> Source
                        </a>
                      </Button>
                    )}
                    {project.liveUrl && !project.pageUrl && ( // Ensure liveUrl exists and no pageUrl
                       <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-primary hover:bg-primary/10 ml-2">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-1.5 h-4 w-4" /> Demo
                        </a>
                      </Button>
                    )}
                  </div>
                  {project.pageUrl && ( // "Learn More" button, aligned to the right
                     <Button variant="link" size="sm" asChild className="text-primary hover:text-accent">
                      <Link to={project.pageUrl}>
                        Learn More <ExternalLink className="ml-1.5 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      <motion.div 
        className="text-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: projects.length * 0.08 }}
      >
        <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105">
          <a href="https://github.com/SamparkBhol" target="_blank" rel="noopener noreferrer">
            <MoreHorizontal className="mr-2 h-5 w-5" /> See More on GitHub
          </a>
        </Button>
      </motion.div>
    </div>
  );
};

export default ProjectsPage;