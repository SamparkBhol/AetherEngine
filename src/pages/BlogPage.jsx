import React from 'react';
import { motion } from 'framer-motion';
import { Rss, ExternalLink, Edit2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    title: "NeuroSymbolic AI : A view",
    date: "October 26, 2023",
    snippet: "Exploring the fusion of neural networks and symbolic reasoning to create more robust and interpretable AI systems. This post delves into the potential and challenges of NeuroSymbolic AI.",
    tags: ["AI", "NeuroSymbolic", "Machine Learning", "Deep Learning"],
    mediumUrl: "https://medium.com/@samparkbhol2005/neurosymbolic-ai-a-view-3d958b0b73a1",
    imagePlaceholder: "Abstract representation of neural and symbolic AI integration"
  },
  {
    title: "Quantum-Enhanced NLP: The Future of Cloud AI",
    date: "November 5, 2023",
    snippet: "A look into how quantum computing could revolutionize Natural Language Processing, potentially unlocking new capabilities for cloud-based AI services and beyond.",
    tags: ["Quantum Computing", "NLP", "Cloud AI", "Future Tech"],
    mediumUrl: "https://medium.com/@samparkbhol2005/quantum-enhanced-nlp-the-future-of-cloud-ai-1f6b7c4e2a5f",
    imagePlaceholder: "Stylized quantum circuit intertwined with text data"
  },
  {
    title: "CERN in October: A Month of Milestones and Marvels",
    date: "November 1, 2023",
    snippet: "Recapping significant achievements and fascinating discoveries from CERN during October, highlighting the cutting edge of particle physics research.",
    tags: ["CERN", "Particle Physics", "Science", "Research"],
    mediumUrl: "https://medium.com/@samparkbhol2005/cern-in-october-a-month-of-milestones-and-marvels-e4fb5183191e",
    imagePlaceholder: "Artistic rendering of particle collisions or CERN detector"
  },
  {
    title: "Quantum-driven gaming: AI meets the future of limitless possibilities in the cusp of new tech era",
    date: "October 15, 2023",
    snippet: "Investigating the transformative potential of combining quantum computing with AI to create next-generation gaming experiences with unparalleled complexity and realism.",
    tags: ["Quantum Computing", "AI", "Game Development", "Future of Gaming"],
    mediumUrl: "https://medium.com/@samparkbhol2005/quantum-driven-gaming-ai-meets-the-future-of-limitless-possibilities-in-the-cusp-of-new-tech-era-d8a6f1a750a3",
    imagePlaceholder: "Futuristic game scene with quantum and AI visual elements"
  }
];

const BlogPage = () => {
  return (
    <div className="container mx-auto px-4 section-padding">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-4">My Thoughts & Insights</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Exploring the intersections of AI, quantum computing, game development, and beyond.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
        {blogPosts.map((post, index) => (
          <motion.div
            key={post.title}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col overflow-hidden glassmorphic hover:border-primary/50 transition-all duration-300 group border-2 border-transparent hover:shadow-2xl">
              <div className="relative">
                 <img  
                  className="w-full h-56 object-cover group-hover:opacity-80 transition-opacity duration-300" 
                  alt={post.title}
                 src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <CardHeader className="absolute bottom-0 left-0 p-6 w-full">
                  <CardTitle className="text-2xl text-white group-hover:text-primary transition-colors">{post.title}</CardTitle>
                  <CardDescription className="text-sm text-slate-300 group-hover:text-slate-200 transition-colors">{post.date}</CardDescription>
                </CardHeader>
              </div>
              <CardContent className="flex-grow pt-6">
                <p className="text-muted-foreground text-sm mb-4">{post.snippet}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="bg-secondary text-secondary-foreground text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              </CardContent>
              <div className="p-6 border-t border-border/50 bg-card/30 mt-auto">
                <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary/80 hover:bg-primary/10 w-full justify-start">
                  <a href={post.mediumUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Read on Medium
                  </a>
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="text-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: blogPosts.length * 0.1 }}
      >
        <Button asChild size="lg" className="bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white shadow-lg transform hover:scale-105 transition-transform">
          <a href="https://medium.com/@samparkbhol2005" target="_blank" rel="noopener noreferrer">
            <Rss className="mr-2 h-5 w-5" /> View All Posts on Medium
          </a>
        </Button>
      </motion.div>
    </div>
  );
};

export default BlogPage;