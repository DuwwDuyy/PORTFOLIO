import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  role: "bot" | "user";
  content: string;
}

const SUGGESTIONS = [
  "Who is Duy?",
  "What projects did he build?",
  "Tell me about NewsPay.",
  "What technologies does he know?"
];

// Simple mocked AI response logic
const getAIResponse = (query: string): string => {
  const q = query.toLowerCase();
  if (q.includes("who is")) {
    return "Duy is a Full-Stack Developer and AI/ML Enthusiast. He has strong experience building scalable web applications and loves bridging the gap between elegant design, robust backend systems, and artificial intelligence.";
  }
  if (q.includes("project")) {
    return "Duy has built several impressive projects including 'NewsPay' with offline AI, an 'Editorial Desk Web Platform', and a PHP MVC E-Commerce 'FlowerShop'. You can check the Projects section for details!";
  }
  if (q.includes("newspay") || q.includes("royalty")) {
    return "NewsPay is a Royalty Management System built on .NET Windows Forms, featuring an integrated offline AI (Ollama + Qwen) for plagiarism detection and a smart accounting assistant.";
  }
  if (q.includes("tech") || q.includes("technologies") || q.includes("know")) {
    return "Duy's tech stack is extensive. On the Frontend, he excels in React, TypeScript, and TailwindCSS. On the Backend, he is proficient in .NET, Node.js, and PHP. He also has strong experience with SQL Server and AI integrations (Ollama, LLMs).";
  }
  return "I'm Duy's AI Assistant! I can tell you about his experience, projects, and tech stack. Try asking 'What projects did he build?'.";
};

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "bot", content: "Hi! I'm Duy's AI Assistant. How can I help you learn more about his portfolio?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    // Add User Message
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const responseText = getAIResponse(text);
      const botMsg: Message = { id: (Date.now() + 1).toString(), role: "bot", content: responseText };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-16 right-0 w-[350px] sm:w-[400px] h-[500px] bg-card/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center relative">
                  <Bot size={18} className="text-primary" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-card rounded-full" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Duy's AI Assistant</h3>
                  <p className="text-xs text-green-400 font-medium">Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-secondary hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user" ? "bg-white/10" : "bg-primary/20"}`}>
                    {msg.role === "user" ? <User size={14} className="text-white" /> : <Bot size={14} className="text-primary" />}
                  </div>
                  <div 
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed max-w-[80%] ${
                      msg.role === "user" 
                        ? "bg-primary text-white rounded-tr-sm" 
                        : "bg-white/10 text-white/90 rounded-tl-sm border border-white/5"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Bot size={14} className="text-primary" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-white/10 rounded-tl-sm flex gap-1.5 items-center h-[40px]">
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && !isTyping && (
              <div className="p-4 pt-0 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s)}
                    className="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-secondary hover:text-white transition-colors text-left"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-background/50">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                className="flex items-center gap-2 relative"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder-secondary focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 p-1.5 bg-primary rounded-full text-white disabled:opacity-50 transition-opacity"
                >
                  <Send size={14} className="translate-x-[1px] -translate-y-[1px]" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)] relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageSquare size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
