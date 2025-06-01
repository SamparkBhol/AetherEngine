import React from 'react';
import { motion } from 'framer-motion';
import { Package, Github, ExternalLink, Terminal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const npmPackages = [
  {
    name: "gamedev-simple-utils",
    description: "A lightweight utility library for game developers, providing common functions and helpers for tasks like vector math, simple physics, or scene management boilerplate. Designed to be easy to integrate and use in various game projects.",
    tags: ["Game Development", "Utility", "JavaScript/TypeScript", "Mathematics", "Helper Functions"],
    npmUrl: "https://www.npmjs.com/package/gamedev-simple-utils", // Replace with actual if exists
    githubUrl: "https://github.com/SamparkBhol/gamedev-simple-utils",
    version: "1.0.2", // Example version
    downloads: "150+/week", // Example downloads
    imagePlaceholder: "Code snippet showing utility function from gamedev-simple-utils"
  },
  {
    name: "roguemaze",
    description: "A procedural maze generation library, possibly with features for roguelike games. Could include algorithms for different maze types (e.g., Eller's, Prim's), pathfinding, and room placement. Useful for creating dynamic and replayable game levels.",
    tags: ["Procedural Generation", "Maze", "Roguelike", "Game Development", "Algorithms"],
    npmUrl: "https://www.npmjs.com/package/roguemaze", // Replace with actual if exists
    githubUrl: "https://github.com/SamparkBhol/roguemaze",
    version: "0.8.5", // Example version
    downloads: "80+/week", // Example downloads
    imagePlaceholder: "Visualization of a procedurally generated maze from roguemaze"
  }
];

const NpmPackagesPage = () => {
  return (
    <div className="container mx-auto px-4 section-padding">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-4">NPM Packages</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Open-source libraries I've published to help fellow developers.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {npmPackages.map((pkg, index) => (
          <motion.div
            key={pkg.name}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col overflow-hidden glassmorphic hover:border-primary/50 transition-all duration-300 group">
              <CardHeader className="pb-4">
                 <div className="flex items-center mb-3">
                  <Package className="w-8 h-8 mr-3 text-primary" />
                  <CardTitle className="text-2xl text-foreground group-hover:text-primary transition-colors">{pkg.name}</CardTitle>
                </div>
                <CardDescription className="text-sm text-muted-foreground">
                  Version: <span className="font-semibold text-primary/90">{pkg.version}</span> | Downloads: <span className="font-semibold text-primary/90">{pkg.downloads}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <img  
                  className="w-full h-40 object-contain rounded-md mb-4 p-2 bg-black/20 border border-border group-hover:opacity-90 transition-opacity" 
                  alt={pkg.name}
                 src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                <p className="text-muted-foreground text-sm mb-4 min-h-[60px]">{pkg.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {pkg.tags.map(tag => (
                    <span key={tag} className="bg-secondary text-secondary-foreground text-xs font-medium px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </CardContent>
              <div className="p-4 border-t border-border/50 bg-card/30 mt-auto">
                <div className="flex flex-wrap justify-start items-center gap-2">
                  {pkg.npmUrl && (
                    <Button variant="default" size="sm" asChild className="bg-red-600 hover:bg-red-700 text-white">
                      <a href={pkg.npmUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> NPM
                      </a>
                    </Button>
                  )}
                  {pkg.githubUrl && (
                    <Button variant="outline" size="sm" asChild className="text-muted-foreground hover:text-primary hover:bg-primary/10">
                      <a href={pkg.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" /> GitHub
                      </a>
                    </Button>
                  )}
                   <div className="bg-background border border-dashed border-border/50 text-xs text-muted-foreground p-2 rounded-md font-mono select-all">
                    npm i {pkg.name}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NpmPackagesPage;