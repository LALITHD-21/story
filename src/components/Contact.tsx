"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "root@kali:~/contact$ ./initiate_protocol.sh";

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative z-20 bg-transparent py-32 px-8 md:px-24 w-full min-h-screen flex flex-col justify-center overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00D1FF] opacity-5 blur-[250px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-600 opacity-[0.03] blur-[150px] pointer-events-none rounded-full animate-pulse" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D1FF]/10 border border-[#00D1FF]/20 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-[#00D1FF] animate-ping" />
            <span className="text-xs font-bold tracking-[0.3em] text-[#00D1FF] uppercase">Transmission</span>
          </motion.div>
          
          <h3 className="text-5xl md:text-8xl font-black tracking-tighter text-white drop-shadow-[0_0_20px_rgba(0,209,255,0.2)]">
            Initiate Contact
          </h3>
        </div>

        {/* Cinematic Floating Terminal */}
        <motion.div 
          initial={{ opacity: 0, y: 50, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", stiffness: 50 }}
          className="relative rounded-3xl bg-[#080808]/90 border border-white/5 backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,0.8),0_0_40px_rgba(0,209,255,0.1)] group hover:shadow-[0_30px_100px_rgba(0,0,0,0.8),0_0_60px_rgba(0,209,255,0.2)] transition-shadow duration-700"
        >
          {/* Cyber Framing Borders */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00D1FF] opacity-50 rounded-tl-3xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00D1FF] opacity-50 rounded-tr-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00D1FF] opacity-50 rounded-bl-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00D1FF] opacity-50 rounded-br-3xl pointer-events-none" />

          {/* Terminal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/60 rounded-t-3xl">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
              <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            </div>
            <span className="text-xs font-mono text-white/30 tracking-widest">SECURE_CHANNEL_O1</span>
          </div>

          <div className="p-8 md:p-12 relative overflow-hidden">
            {/* Ambient Inner Glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#00D1FF]/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="font-mono text-sm md:text-base text-[#00D1FF] mb-10 flex items-center relative z-10">
              <span className="text-[#00D1FF]/70">$&nbsp;</span>
              <span>{text}</span>
              <span className={`w-2.5 h-5 bg-[#00D1FF] ml-1 ${isTyping ? '' : 'animate-pulse shadow-[0_0_10px_#00D1FF]'}`} />
            </div>

            <form className="flex flex-col gap-8 relative z-10" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 group/input relative">
                  <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#00D1FF] group-focus-within/input:w-full transition-all duration-500" />
                  <label className="block text-xs font-bold tracking-[0.3em] text-white/50 uppercase mb-3 flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#00D1FF] rounded-full" /> Identifier
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#00D1FF]/30 focus:bg-[#00D1FF]/[0.02] transition-all font-mono placeholder:text-white/20"
                    placeholder="Enter designation..."
                  />
                </div>
                
                <div className="flex-1 group/input relative">
                  <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#00D1FF] group-focus-within/input:w-full transition-all duration-500" />
                  <label className="block text-xs font-bold tracking-[0.3em] text-white/50 uppercase mb-3 flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#00D1FF] rounded-full" /> Comms Link
                  </label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#00D1FF]/30 focus:bg-[#00D1FF]/[0.02] transition-all font-mono placeholder:text-white/20"
                    placeholder="Enter return frequency..."
                  />
                </div>
              </div>
              
              <div className="group/input relative">
                <div className="absolute bottom-1 left-0 h-[1px] w-0 bg-[#00D1FF] group-focus-within/input:w-full transition-all duration-500" />
                <label className="block text-xs font-bold tracking-[0.3em] text-white/50 uppercase mb-3 flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#00D1FF] rounded-full" /> Payload Data
                </label>
                <textarea 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#00D1FF]/30 focus:bg-[#00D1FF]/[0.02] transition-all font-mono resize-none placeholder:text-white/20"
                  placeholder="Encrypting outgoing message..."
                />
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-6">
                <div className="flex-1">
                  {status === "success" && (
                    <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-[#00D1FF] font-mono text-sm flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#00D1FF] rounded-full animate-ping" /> Transmission Secured 🚀
                    </motion.span>
                  )}
                  {status === "error" && (
                    <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-red-500 font-mono text-sm flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" /> Breach Detected. Retry.
                    </motion.span>
                  )}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="relative group w-full md:w-auto px-12 py-4 rounded-xl overflow-hidden disabled:opacity-50"
                >
                  <div className="absolute inset-0 bg-[#00D1FF]/10 border border-[#00D1FF]/30 rounded-xl transition-all group-hover:bg-[#00D1FF]/20 group-hover:border-[#00D1FF]/80 group-hover:shadow-[0_0_30px_rgba(0,209,255,0.4)]" />
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00D1FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative z-10 font-black tracking-[0.3em] text-[#00D1FF] group-hover:text-white transition-colors uppercase text-sm">
                    {isSubmitting ? "Encrypting..." : "Execute"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
