import React from 'react';
import { motion } from 'framer-motion';
import { Brain, BookOpen, Link as LinkIcon, Edit3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const researchItems = [
  {
    title: "An Energy Efficient Hybrid Communication Protocol for Large Area Wireless Sensor Networks",
    publication: "Elsevier Procedia Computer Science (ICECMSN)",
    status: "Published",
    description: "This research focuses on optimizing wireless communication algorithms to enhance system efficiency and reduce energy consumption for large-scale wireless sensor network deployments. It proposes a hybrid protocol combining strengths of different communication strategies.",
    tags: ["Wireless Sensor Networks", "Energy Efficiency", "Communication Protocols", "Algorithms", "IoT"],
    url: "https://tinyurl.com/yc33cawk",
    imagePlaceholder: "Diagram of a wireless sensor network with energy efficient paths highlighted"
  },
  {
    title: "Novel Approaches in Explainable AI for Anomaly Detection",
    publication: "In Progress (Journal Submission Planned)",
    status: "Ongoing Research",
    description: "Currently exploring new methodologies to improve the interpretability of AI models used for anomaly detection in complex systems. This involves developing techniques that provide clear insights into why a particular data point is flagged as an anomaly.",
    tags: ["Explainable AI (XAI)", "Anomaly Detection", "Machine Learning", "Deep Learning", "Interpretability"],
    url: null,
    imagePlaceholder: "Abstract visualization of an AI model's decision-making process for anomaly detection"
  },
  {
    title: "The Algorithmic Narrative: A Thesis on Procedural Storytelling in Interactive Media",
    publication: "Original Novel Thesis (In Development)",
    status: "Ongoing Writing",
    description: "An in-depth exploration of how algorithms can be used to generate compelling and coherent narratives in video games and other interactive experiences. This thesis investigates procedural generation techniques for plot, character arcs, and dynamic world-building.",
    tags: ["Procedural Generation", "Narrative Design", "Interactive Storytelling", "Game Design", "AI in Creativity"],
    url: null,
    imagePlaceholder: "Conceptual art representing a branching narrative structure generated procedurally"
  }
];

const ResearchPage = () => {
  return (
    <div className="container mx-auto px-4 section-padding">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-4">Research & Publications</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Delving into the frontiers of technology, from AI and algorithms to novel concepts in interactive media.
        </p>
      </motion.div>

      <div className="space-y-12">
        {researchItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="overflow-hidden glassmorphic hover:border-primary/50 transition-all duration-300 group">
              <div className="md:flex">
                <div className="md:w-1/3 xl:w-1/4 p-2">
                  <img  
                    className="w-full h-64 md:h-full object-cover rounded-md md:rounded-l-md md:rounded-r-none border border-border group-hover:opacity-90 transition-opacity" 
                    alt={item.title}
                   src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                </div>
                <div className="md:w-2/3 xl:w-3/4 flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-1">
                      <CardTitle className="text-2xl lg:text-3xl text-foreground group-hover:text-primary transition-colors">{item.title}</CardTitle>
                      {item.url && (
                        <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary -mr-2 -mt-2">
                          <a href={item.url} target="_blank" rel="noopener noreferrer" title="Read Paper">
                            <LinkIcon className="h-5 w-5" />
                          </a>
                        </Button>
                      )}
                    </div>
                    <CardDescription className="text-sm">
                      <span className={`font-semibold ${item.status === "Published" ? "text-green-400" : "text-yellow-400"}`}>{item.status}</span>
                      {item.publication && <span className="text-muted-foreground"> | {item.publication}</span>}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="bg-secondary text-secondary-foreground text-xs font-medium px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </CardContent>
                  <div className="p-4 border-t border-border/50 bg-card/30 mt-auto flex items-center">
                    {item.status.includes("Ongoing") || item.status.includes("Progress") ? 
                      <Edit3 className="h-5 w-5 text-yellow-400 mr-2" /> : 
                      <BookOpen className="h-5 w-5 text-green-400 mr-2" />
                    }
                    <p className="text-xs text-muted-foreground italic">
                      {item.status.includes("Ongoing") || item.status.includes("Progress") ? "Actively being developed." : "Completed and available."}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
       <motion.div 
        className="text-center mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: researchItems.length * 0.1 + 0.5 }}
      >
        <p className="text-lg text-accent italic">
          Note: "Currently working on another paper and an original novel thesis" as mentioned in CV.
        </p>
      </motion.div>
    </div>
  );
};

export default ResearchPage;