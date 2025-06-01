import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Send, Mail, Linkedin, Github, ChevronRight, HelpCircle, Power, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const TerminalOutput = ({ lines }) => (
  <div className="h-full overflow-y-auto p-2">
    {lines.map((line, index) => (
      <div key={index} className="flex">
        {line.isCommand && <span className="text-green-400 mr-1 select-none">root@samparkOS:~#</span>}
        <span 
          className={`whitespace-pre-wrap ${line.isError ? 'text-red-400' : line.isSuccess ? 'text-green-400' : line.isLog ? 'text-blue-300' : 'text-gray-300'}`}
          dangerouslySetInnerHTML={{ __html: line.text }} // For rendering ASCII art or styled text
        />
      </div>
    ))}
  </div>
);

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [terminalLines, setTerminalLines] = useState([
    { text: "SamparkOS v0.4.2 (Kernel 6.7.8-arch1-1)", isLog: true },
    { text: "Boot sequence complete. System ready.", isLog: true },
    { text: "Type 'help' for a list of available commands.", isCommand: false },
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const terminalEndRef = useRef(null);
  const [osPoweredOn, setOsPoweredOn] = useState(true);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalLines]);

  const handleTerminalCommand = (command) => {
    if (!osPoweredOn && command.trim().toLowerCase() !== 'poweron') {
      setTerminalLines(prev => [...prev, { text: "System is powered off. Type 'poweron' to start.", isCommand: true, isError: true }]);
      return;
    }

    const newLines = [...terminalLines, { text: command, isCommand: true }];
    const cmd = command.trim().toLowerCase().split(" ")[0];
    const args = command.trim().toLowerCase().split(" ").slice(1).join(" ");

    switch (cmd) {
      case "help":
        newLines.push({ text: "Available commands:", isCommand: false });
        newLines.push({ text: "  <span class='text-yellow-300'>help</span>          - Show this help message", isCommand: false });
        newLines.push({ text: "  <span class='text-yellow-300'>whoami</span>        - Display user information", isCommand: false });
        newLines.push({ text: "  <span class='text-yellow-300'>contact</span>       - Show contact details", isCommand: false });
        newLines.push({ text: "  <span class='text-yellow-300'>socials</span>       - List social media links", isCommand: false });
        newLines.push({ text: "  <span class='text-yellow-300'>projects</span>      - Navigate to projects page", isCommand: false });
        newLines.push({ text: "  <span class='text-yellow-300'>blog</span>          - Navigate to blog page", isCommand: false });
        newLines.push({ text: "  <span class='text-yellow-300'>play</span> [game]   - Launch a game (e.g., 'play snake')", isCommand: false });
        newLines.push({ text: "  <span class='text-yellow-300'>clear</span>         - Clear the terminal screen", isCommand: false });
        newLines.push({ text: "  <span class='text-yellow-300'>date</span>          - Display current date and time", isCommand: false });
        newLines.push({ text: "  <span class='text-yellow-300'>echo</span> [message] - Print a message", isCommand: false });
        newLines.push({ text: "  <span class='text-red-400'>shutdown</span>      - Power off the terminal", isCommand: false });
        newLines.push({ text: "  <span class='text-green-400'>poweron</span>       - Power on the terminal (if off)", isCommand: false });
        break;
      case "whoami":
        newLines.push({ text: "User: Sampark Bhol\nDesignation: Developer & Researcher\nAffiliation: Earth", isCommand: false });
        break;
      case "contact":
        newLines.push({ text: "Email: samparkaccess1234@gmail.com\nPhone: +91-9938048383 (Use form for faster response)", isCommand: false });
        break;
      case "socials":
        newLines.push({ text: "LinkedIn: <a href='https://linkedin.com/in/sampark-bhol-118560251' target='_blank' class='text-sky-400 hover:underline'>linkedin.com/in/sampark-bhol-118560251</a>", isCommand: false });
        newLines.push({ text: "GitHub: <a href='https://github.com/SamparkBhol' target='_blank' class='text-sky-400 hover:underline'>github.com/SamparkBhol</a>", isCommand: false });
        newLines.push({ text: "Medium: <a href='https://medium.com/@samparkbhol2005' target='_blank' class='text-sky-400 hover:underline'>medium.com/@samparkbhol2005</a>", isCommand: false });
        break;
      case "projects":
        newLines.push({ text: "Redirecting to projects page...", isCommand: false, isSuccess: true });
        window.location.href = "/projects"; // Or use React Router navigation
        break;
      case "blog":
        newLines.push({ text: "Redirecting to blog page...", isCommand: false, isSuccess: true });
        window.location.href = "/blog"; // Or use React Router navigation
        break;
      case "play":
        if (args === "snake") {
          newLines.push({ text: "Launching Snake... (Conceptual - Game not implemented yet)", isCommand: false, isSuccess: true });
        } else if (args === "maze runner") {
           newLines.push({ text: "Initializing Maze Runner... (Conceptual - Game not implemented yet)", isCommand: false, isSuccess: true });
        } else {
          newLines.push({ text: `Game '${args || 'none'}' not found. Try 'play snake' or 'play maze runner'.`, isCommand: false, isError: true });
        }
        break;
      case "clear":
        setTerminalLines([{ text: "Screen cleared. SamparkOS is ready.", isCommand: false, isLog: true }]);
        return;
      case "date":
        newLines.push({ text: new Date().toString(), isCommand: false });
        break;
      case "echo":
        newLines.push({ text: args || "", isCommand: false });
        break;
      case "shutdown":
        newLines.push({ text: "System shutting down...", isCommand: false, isLog: true });
        setOsPoweredOn(false);
        setTimeout(() => {
          setTerminalLines([{ text: "System is now off. Type 'poweron' to restart.", isCommand: false, isError: true }]);
        }, 1000);
        return;
      case "poweron":
        if (!osPoweredOn) {
          setOsPoweredOn(true);
          setTerminalLines([
            { text: "Booting SamparkOS...", isCommand: false, isLog: true },
            { text: "Welcome back! Type 'help' for commands.", isCommand: false }
          ]);
        } else {
          newLines.push({ text: "System is already powered on.", isCommand: false });
        }
        return;
      default:
        newLines.push({ text: `samparkOS: command not found: ${cmd}. Type 'help'.`, isCommand: false, isError: true });
    }
    setTerminalLines(newLines);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast({ title: "Missing Fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    toast({ title: "Message Sent!", description: "Thanks for reaching out, Sampark will get back to you soon.", className: "bg-green-600 text-white" });
    setName(''); setEmail(''); setMessage('');
    if(osPoweredOn) {
      setTerminalLines(prev => [...prev, {text: `LOG: Message from ${name} (${email}) sent successfully via GUI form.`, isCommand: false, isSuccess: true}]);
    }
  };

  return (
    <div className="container mx-auto px-4 section-padding min-h-[calc(100vh-5rem)] flex flex-col justify-center">
      <motion.div 
        className="text-center mb-12 md:mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-4">Get In Touch</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Have a project in mind, a question, or just want to connect? Feel free to reach out!
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-semibold text-foreground mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-muted-foreground">Full Name</Label>
              <Input id="name" type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required className="bg-secondary/50 border-border/70 focus:border-primary"/>
            </div>
            <div>
              <Label htmlFor="email" className="text-muted-foreground">Email Address</Label>
              <Input id="email" type="email" placeholder="your.email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-secondary/50 border-border/70 focus:border-primary"/>
            </div>
            <div>
              <Label htmlFor="message" className="text-muted-foreground">Message</Label>
              <Textarea id="message" placeholder="Your message here..." rows={5} value={message} onChange={(e) => setMessage(e.target.value)} required className="bg-secondary/50 border-border/70 focus:border-primary"/>
            </div>
            <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : <><Send className="mr-2 h-5 w-5" /> Send Message</>}
            </Button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="h-[600px] lg:h-auto lg:min-h-[700px] flex flex-col"
        >
          <div className="flex justify-between items-center mb-1">
            <h2 className="text-3xl font-semibold text-foreground flex items-center">
              <Terminal className="mr-3 h-7 w-7 text-primary" /> SamparkOS CLI
            </h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => handleTerminalCommand(osPoweredOn ? 'shutdown' : 'poweron')}
              className={`${osPoweredOn ? 'text-red-500 hover:bg-red-500/20' : 'text-green-500 hover:bg-green-500/20'}`}
              title={osPoweredOn ? 'Shutdown OS' : 'Power On OS'}
            >
              <Power size={20}/>
            </Button>
          </div>
           <p className="text-sm text-muted-foreground mb-4 flex items-center">
            <HelpCircle size={14} className="mr-1.5 text-sky-400"/> This is a simulated terminal. Type 'help'.
          </p>
          <div className={`flex-grow bg-black/90 rounded-lg shadow-2xl p-1 font-mono text-sm border border-primary/30 overflow-hidden flex flex-col transition-opacity duration-500 ${!osPoweredOn ? 'opacity-50' : 'opacity-100'}`}>
            <div className="flex-grow overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'hsl(var(--primary)) hsl(var(--background))' }}>
              <TerminalOutput lines={terminalLines} />
              <div ref={terminalEndRef} />
            </div>
            {osPoweredOn && (
              <div className="flex items-center p-2 border-t border-primary/30">
                <span className="text-green-400 mr-1 select-none">root@samparkOS:~#</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && terminalInput.trim() !== "") {
                      handleTerminalCommand(terminalInput);
                      setTerminalInput("");
                    }
                  }}
                  className="flex-grow bg-transparent text-gray-300 outline-none placeholder-gray-500"
                  placeholder="Enter command..."
                  spellCheck="false"
                  autoFocus
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-primary hover:bg-primary/20 h-7 w-7 ml-1"
                  onClick={() => {
                    if (terminalInput.trim() !== "") {
                      handleTerminalCommand(terminalInput);
                      setTerminalInput("");
                    }
                  }}
                >
                  <ChevronRight size={20}/>
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;