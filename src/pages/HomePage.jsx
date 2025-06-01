import React, { Suspense, useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Text3D, Html } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

const TypewriterText = ({ textLines }) => {
  const [displayText, setDisplayText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBetweenLines = 1500;

    const handleTyping = () => {
      const currentLine = textLines[lineIndex];
      if (!isDeleting) {
        if (charIndex < currentLine.length) {
          setDisplayText(prev => prev + currentLine[charIndex]);
          setCharIndex(prev => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), delayBetweenLines);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(prev => prev.substring(0, prev.length - 1));
          setCharIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setLineIndex(prev => (prev + 1) % textLines.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [charIndex, lineIndex, isDeleting, textLines]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <>
      <span>{displayText}</span>
      {showCursor && <span className="animate-caret-blink">|</span>}
    </>
  );
};

const Hero3DComputer = () => {
  const computerRef = useRef();
  
  return (
    <group ref={computerRef}>
      <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.1, 1.5]} />
        <meshStandardMaterial color="#333" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.45, -0.65]} castShadow>
        <boxGeometry args={[2.3, 1.6, 0.1]} />
        <meshStandardMaterial color="#222" metalness={0.5} roughness={0.5} />
        <Html 
          transform 
          occlude
          position={[0, 0, 0.06]} 
          className="w-[220px] h-[150px] bg-black text-green-400 font-mono text-xs p-1 overflow-hidden select-none pointer-events-none"
        >
          <div className="h-full overflow-y-auto leading-tight">
            <p className="whitespace-pre-wrap">
              <span>root@samparkOS:~$</span> boot_sequence --verbose<br/>
              [OK] Initializing kernel...<br/>
              [OK] Mounting file systems...<br/>
              [OK] Starting network services...<br/>
              [OK] Loading desktop environment...<br/>
              <span className="text-yellow-400">[WARN] Low battery detected.</span><br/>
              [INFO] Welcome to SamparkOS v0.4.2<br/>
              <br/>
              root@samparkOS:~$ <span className="animate-caret-blink">_</span>
            </p>
          </div>
        </Html>
      </mesh>
      <mesh position={[0, -0.55, 0.3]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 32]} />
        <meshStandardMaterial color="#555" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}


const HomePage = () => {
  const introLines = [
    "Hi, I'm Sampark Bhol.",
    "AI Enthusiast, Research enthusiast and Computer science and software developer student.",
    "Crafting immersive worlds, intelligent systems and working on the undefined."
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-start justify-end md:items-center md:justify-center overflow-hidden p-4 md:p-8">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 1.5, 4], fov: 50 }}>
          <ambientLight intensity={0.7} />
          <pointLight position={[5, 5, 5]} intensity={1.5} castShadow />
          <Stars radius={200} depth={60} count={7000} factor={5} saturation={0} fade speed={0.8} />
          <Suspense fallback={null}>
            <Hero3DComputer />
          </Suspense>
          <OrbitControls 
            enableZoom={true} 
            enablePan={true} 
            minDistance={2} 
            maxDistance={10} 
            target={[0, 0.5, 0]}
          />
        </Canvas>
      </div>

      <motion.div 
        className="relative z-10 flex flex-col items-start md:items-center text-left md:text-center max-w-3xl w-full mb-10 md:mb-0"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
      >
        <div className="text-3xl sm:text-4xl md:text-5xl font-mono mb-6 text-shadow-lg leading-tight">
          <span className="block text-foreground">
            <TypewriterText textLines={introLines.slice(0,1)} />
          </span>
          <span className="block text-primary whitespace-nowrap">
            <TypewriterText textLines={introLines.slice(1,2)} />
          </span>
           <span className="block text-accent">
            <TypewriterText textLines={introLines.slice(2,3)} />
          </span>
        </div>
        
        <motion.div 
          className="flex flex-wrap justify-start md:justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
        >
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-primary/60 transition-all duration-300 transform hover:scale-105">
            <Link to="/projects">
              Explore My Work <Code className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="border-primary text-primary hover:bg-primary/10 hover:text-primary shadow-xl hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105">
            <Link to="/contact">
              Connect With Me
            </Link>
          </Button>
        </motion.div>
        <motion.div 
          className="mt-10 flex space-x-5 justify-start md:justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.5 }}
        >
          <a href="https://github.com/SamparkBhol" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110">
            <Github size={26} />
          </a>
          <a href="https://linkedin.com/in/sampark-bhol-118560251" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110">
            <Linkedin size={26} />
          </a>
          <a href="mailto:samparkaccess1234@gmail.com" className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110">
            <Mail size={26} />
          </a>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <ArrowDown className="h-7 w-7 text-muted-foreground animate-bounce" />
      </motion.div>
    </div>
  );
};

export default HomePage;