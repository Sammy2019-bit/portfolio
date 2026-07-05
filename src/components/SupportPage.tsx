import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Send, MessageSquare, ShieldCheck, Mail, Sliders, ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "Where do I load the Max4Live modular sequencer macros?",
    answer: "Install the macro sequencer in your Ableton User Library inside 'Presets > Midi Effects > Max MIDI Effect'. Make sure your Max installation is updated to v8.5+ to support the multi-voltage generative parameters designed for this rack."
  },
  {
    question: "Can I use the stems in commercial audio releases?",
    answer: "Yes, all stems in our sound vaults are distributed under the Creative Commons Attribution 4.0 license. You may use them in tracks, game soundtracks, and video streams. Simply attribute credit in the track metadata."
  },
  {
    question: "What is the technical hardware rider for Alex's live sets?",
    answer: "Alex travels with a lightweight custom Eurorack suitcase (84HP, 6U). The venue promoter must supply 1x stereo high-headroom DJ mixer (e.g., Pioneer V10 or Xone:96), 2x balanced audio monitors at head height, and 1x dedicated clean power socket."
  },
  {
    question: "How do I clear copyright claims on YouTube or Twitch?",
    answer: "RIVER_GLOW releases are whitelisted for digital video creators. If you receive an automated claim, send an email with a link to your content and our system will whitelish your channel CID within 4 hours."
  }
];

interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
}

export const SupportPage: React.FC = () => {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { sender: 'assistant', text: "Hello! Welcome to the RIVER_GLOW technical helpdesk. How can I assist you with stems, preset racks, licensing clearances, or modular booking specifications today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const toggleFAQ = (idx: number) => {
    setOpenFAQIndex(openFAQIndex === idx ? null : idx);
  };

  const handleSupportPrompt = (promptText: string) => {
    if (isTyping) return;
    
    // Add User message
    const newUserMsg: ChatMessage = { sender: 'user', text: promptText };
    setChatHistory(prev => [...prev, newUserMsg]);
    setIsTyping(true);

    // Determine specific intelligent response based on keywords
    setTimeout(() => {
      let reply = "I have logged your request. Our support system has registered this ticket and will coordinate with Alex's team. Is there anything else we can assist you with in the meantime?";
      
      const lowerText = promptText.toLowerCase();
      if (lowerText.includes('license') || lowerText.includes('clearance') || lowerText.includes('copyright')) {
        reply = "For instant copyright clearance: Please enter your YouTube/Twitch Video URL or Channel ID in your next line, and we will whitelish your content instantly in our sync catalog. Standard licenses are 100% royalty-free with credit.";
      } else if (lowerText.includes('stem') || lowerText.includes('download') || lowerText.includes('zip')) {
        reply = "All stem links are verified hourly. If your browser block-loaded the download popup, please ensure 'popups and third-party scripts' are allowed for this domain, or request a secondary master transfer in our Download page.";
      } else if (lowerText.includes('rider') || lowerText.includes('gig') || lowerText.includes('hardware')) {
        reply = "For booking support, please download our official 'Sound Rider v2.2 PDF' on our About Page. It outlines all Eurorack routing schematics, master analog mixer configurations, and soundcheck margins.";
      } else if (lowerText.includes('ableton') || lowerText.includes('preset') || lowerText.includes('rack')) {
        reply = "Our Ableton Live 11/12 Presets require Max for Live 8.5+. If the knobs appear frozen, verify that Max is correctly activated and that your MIDI Controller is mapped to standard CC parameters (16 to 23).";
      }

      setChatHistory(prev => [...prev, { sender: 'assistant', text: reply }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSubmitChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const userText = chatInput;
    setChatInput('');
    handleSupportPrompt(userText);
  };

  return (
    <div className="flex flex-col gap-6 text-left" id="support-page-view">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-violet-400" />
          <span>Support & Helpdesk Desk</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">Review our tech FAQs or speak directly with our automated studio dispatch bot below.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: FAQ Panel */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">Technical FAQ Catalog</h3>
          <div className="flex flex-col gap-2.5">
            {FAQ_DATA.map((faq, index) => {
              const isOpen = openFAQIndex === index;
              return (
                <div 
                  key={index}
                  className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden transition-all duration-300"
                  id={`faq-item-${index}`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-4 py-3.5 flex items-center justify-between text-left text-xs font-bold text-slate-200 hover:text-white transition duration-150"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transform transition-transform duration-200 ${isOpen ? 'rotate-180 text-violet-400' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Quick Contact Form link */}
          <div className="bg-slate-950 border border-slate-800/60 rounded-xl p-4 mt-2 flex items-center gap-3">
            <Mail className="w-4 h-4 text-violet-400" />
            <div className="text-[11px] text-slate-400 leading-normal">
              Need specialized assistance? Reach out directly via our email dispatch: <a href="mailto:buttysongs@gmail.com" className="text-violet-400 hover:underline">buttysongs@gmail.com</a>
            </div>
          </div>
        </div>

        {/* Right Column: Live Chat Simulation Helpdesk */}
        <div className="lg:col-span-6 bg-slate-900/30 border border-slate-800 p-5 rounded-2xl flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-1.5 rounded-lg text-emerald-400 animate-pulse">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">RIVER_GLOW Helpdesk Bot</h4>
                <p className="text-[10px] text-emerald-400 font-mono mt-0.5">&bull; Online & Decrypting</p>
              </div>
            </div>
            <span className="text-[9px] font-mono text-slate-500">SESSION: SECURE</span>
          </div>

          {/* Messages container */}
          <div className="h-[210px] overflow-y-auto pr-1 flex flex-col gap-3 scrollbar-thin scrollbar-thumb-slate-800" id="chat-scroller">
            {chatHistory.map((msg, idx) => (
              <div 
                key={idx}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`max-w-[85%] rounded-xl px-3.5 py-2 text-xs leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-violet-500 text-white rounded-tr-none' 
                    : 'bg-slate-950 text-slate-300 border border-slate-800 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-1.5 text-slate-500 text-xs font-mono mt-1">
                <Sliders className="w-3.5 h-3.5 animate-spin text-violet-500" />
                <span>Helpdesk is parsing response...</span>
              </div>
            )}
          </div>

          {/* Prompt chips suggestions */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/40">
            {[
              "Expired download zip link",
              "Live gig tech sound rider",
              "Commercial licensing",
              "Ableton preset loading"
            ].map(chip => (
              <button
                key={chip}
                type="button"
                id={`support-chip-${chip.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => handleSupportPrompt(chip)}
                className="text-[10px] font-mono bg-slate-950 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700/80 px-2 py-1 rounded-md text-slate-400 transition duration-150 text-left"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Chat box Form */}
          <form onSubmit={handleSubmitChat} className="flex gap-2" id="chat-input-form">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type your technical inquiry..."
              className="flex-1 bg-slate-950 border border-slate-800 focus:border-violet-500/50 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 outline-none transition duration-150"
            />
            <button
              type="submit"
              id="btn-chat-send"
              className="bg-violet-500 hover:bg-violet-400 text-slate-100 p-2 rounded-xl transition duration-150"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
