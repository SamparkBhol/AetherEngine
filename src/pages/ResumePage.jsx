import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Star, Code, Brain, Link as LinkIcon, Download, Mail, Phone, Linkedin as LinkedinIcon, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const resumeData = {
  name: "Sampark Bhol",
  contact: {
    linkedin: "linkedin.com/in/sampark-bhol-118560251",
    email: "samparkaccess1234@gmail.com",
    phone: "+91-9938048383",
    github: "github.com/SamparkBhol"
  },
  summary: "A dedicated 4th-year Computer Science student with expertise in software development, system reliability engineering, and AI research. Passionate about building scalable systems while exploring innovative AI solutions for real-world problems. Combines engineering fundamentals with research-driven approaches to deliver quality software solutions and advance technology through published research and practical implementations.",
  education: [
    {
      institution: "Vellore Institute of Technology, Vellore",
      degree: "B.Tech in Computer Science & Engineering (Specialization in Blockchain Technology)",
      location: "Vellore, Tamil Nadu, India",
      dates: "Sept 2022 – Present",
    },
  ],
  experience: [
    {
      title: "Deep Learning and AI Research Intern",
      company: "National Informatics Centre, MeitY, Govt. of India",
      location: "Odisha, India",
      dates: "May 2024 – July 2024",
      responsibilities: [
        "Conducted research in anomaly detection algorithms, analyzing relationships and parameters through graph-based analysis methodologies.",
        "Developed prediction and regression models using large-scale datasets, implementing chatbot for the SATHI website applications.",
        "Collaborated with senior researchers to optimize model performance and ensure system reliability in production environments.",
      ],
    },
    {
      title: "AI and NLP Development Intern",
      company: "CSM Technologies",
      location: "Bhubaneswar (Onsite)",
      dates: "May 2025 – July 2025 (Expected)",
      responsibilities: [
        "Worked with NLP, LangChain, and LLM development along with its models.",
        "Gained introduction to Langflow and Generative AI.",
        "Reinforced concepts of ML, DL, and frontend development.",
      ],
    },
  ],
  volunteering: [
    {
      organization: "IEEE-CS-VIT",
      role: "Event Management & Project Contributor",
      duration: "Ongoing (2+ years)",
      description: "Organized various technical and non-technical events. Actively participated in multiple chapter projects, contributing to software development and team collaboration.",
    },
    {
      organization: "AEE-VIT (Association of Energy Engineers)",
      role: "Member & Participant",
      duration: "Completed",
      description: "Gained understanding of various energy sources, renewable technologies, and energy management concepts through participation in events and workshops.",
    },
  ],
  projects: [ 
    { name: "CodeCraze", description: "Platform integrating NLP and programming using BERT and Transformers for natural language command processing.", url: "github.com/SamparkBhol" },
    { name: "Assignofast", description: "Full-stack productivity app for assignment management, schedules, and workflows with intelligent reminders.", url: "github.com/SamparkBhol" },
    { name: "Descollab", description: "Distributed collaborative design platform optimizing team workflows with real-time synchronization and feedback.", url: "github.com/SamparkBhol/descollab" },
  ],
  research: [
    { title: "An Energy Efficient Hybrid Communication Protocol for Large Area Wireless Sensor Networks", publication: "Published in Elsevier Procedia Computer Science (ICECMSN).", url: "tinyurl.com/yc33cawk", note: "Currently working on another paper and an original novel thesis." },
  ],
  skills: {
    languages: ["Python", "JavaScript", "HTML", "CSS", "C", "C++", "R", "Golang", "React", "Solidity"],
    frameworks: ["LangChain", "Flask", "Flutter", "Godot", "Orange", "Unreal Engine", "Buildbox"],
    databases: ["PostgreSQL", "MySQL", "Firebase"],
    tools: ["Git", "GitLab", "Ollama", "Hugging Face", "Kivy", "Qiskit", "PennyLane"],
  },
  certifications: [
    { name: "ISAA Certification by Saviynt", url: "shorturl.at/cQj3S" },
    { name: "Deep Learning with TensorFlow by IBM", url: "tinyurl.com/49ec28jp" },
  ],
};

const Section = ({ title, icon, children }) => (
  <motion.section 
    className="mb-12"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-3xl font-bold text-primary mb-6 flex items-center">
      {React.createElement(icon, { className: "mr-3 h-7 w-7" })}
      {title}
    </h2>
    {children}
  </motion.section>
);

const ResumePage = () => {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
      <motion.div 
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-2">{resumeData.name}</h1>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-muted-foreground mb-4">
            <a href={`mailto:${resumeData.contact.email}`} className="hover:text-primary flex items-center"><Mail className="mr-1.5 h-4 w-4" /> {resumeData.contact.email}</a>
            <span className="flex items-center"><Phone className="mr-1.5 h-4 w-4" /> {resumeData.contact.phone}</span>
            <a href={`https://${resumeData.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary flex items-center"><LinkedinIcon className="mr-1.5 h-4 w-4" /> LinkedIn</a>
            <a href={`https://${resumeData.contact.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary flex items-center"><Code className="mr-1.5 h-4 w-4" /> GitHub</a>
          </div>
        </div>
        <Button variant="outline" size="lg" className="mt-4 md:mt-0 border-primary text-primary hover:bg-primary/10">
          <Download className="mr-2 h-5 w-5" /> Download CV (PDF)
        </Button>
      </motion.div>

      <Card className="p-6 md:p-8 mb-12 glassmorphic">
        <p className="text-lg text-foreground/90 leading-relaxed">{resumeData.summary}</p>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <Section title="Experience" icon={Briefcase}>
            {resumeData.experience.map((exp, index) => (
              <motion.div 
                key={index} 
                className="mb-8 relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-primary before:rounded-full"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
                <p className="text-md text-primary/90 font-medium">{exp.company} | {exp.location}</p>
                <p className="text-sm text-muted-foreground mb-2">{exp.dates}</p>
                <ul className="list-disc list-inside space-y-1 text-foreground/80 text-sm">
                  {exp.responsibilities.map((res, i) => <li key={i}>{res}</li>)}
                </ul>
                {index < resumeData.experience.length - 1 && <Separator className="my-6 bg-border/50" />}
              </motion.div>
            ))}
          </Section>

          <Section title="Volunteering" icon={Users}>
            {resumeData.volunteering.map((vol, index) => (
              <motion.div 
                key={index} 
                className="mb-8 relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-accent before:rounded-full"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold text-foreground">{vol.organization}</h3>
                <p className="text-md text-accent/90 font-medium">{vol.role}</p>
                <p className="text-sm text-muted-foreground mb-2">{vol.duration}</p>
                <p className="text-foreground/80 text-sm">{vol.description}</p>
                {index < resumeData.volunteering.length - 1 && <Separator className="my-6 bg-border/50" />}
              </motion.div>
            ))}
          </Section>

          <Section title="Education" icon={GraduationCap}>
            {resumeData.education.map((edu, index) => (
              <motion.div 
                key={index} 
                className="mb-6 relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-primary before:rounded-full"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold text-foreground">{edu.institution}</h3>
                <p className="text-md text-primary/90 font-medium">{edu.degree}</p>
                <p className="text-sm text-muted-foreground">{edu.location} | {edu.dates}</p>
              </motion.div>
            ))}
          </Section>

          <Section title="Research" icon={Brain}>
            {resumeData.research.map((res, index) => (
              <motion.div 
                key={index} 
                className="mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
                  <a href={res.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    {res.title} {res.url && <LinkIcon className="ml-2 h-4 w-4" />}
                  </a>
                </h3>
                <p className="text-sm text-muted-foreground italic">{res.publication}</p>
                {res.note && <p className="text-sm text-accent mt-1">{res.note}</p>}
              </motion.div>
            ))}
          </Section>
        </div>

        <div className="lg:col-span-1 space-y-10">
          <Section title="Skills" icon={Star}>
            <Card className="glassmorphic">
              <CardContent className="p-6 space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-primary/90 mb-2">Programming Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.languages.map(skill => <span key={skill} className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full">{skill}</span>)}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-primary/90 mb-2">Frameworks & Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.frameworks.map(skill => <span key={skill} className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full">{skill}</span>)}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-primary/90 mb-2">Databases & Storage</h4>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.databases.map(skill => <span key={skill} className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full">{skill}</span>)}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-primary/90 mb-2">Development Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.tools.map(skill => <span key={skill} className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full">{skill}</span>)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>

          <Section title="Certifications" icon={Award}>
            <ul className="space-y-3">
              {resumeData.certifications.map((cert, index) => (
                <motion.li 
                  key={index} 
                  className="text-foreground/90 hover:text-primary transition-colors"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <a href={cert.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    {cert.name} <LinkIcon className="ml-2 h-4 w-4 flex-shrink-0" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;