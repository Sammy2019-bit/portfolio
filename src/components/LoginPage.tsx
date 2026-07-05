import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Key, Unlock, Volume2, Sliders, Play, LogOut, Cpu, AlertTriangle, Disc } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [portalMode, setPortalMode] = useState<'fan' | 'admin'>('fan');
  const [accessCode, setAccessCode] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Audio oscillator states (Web Audio API)
  const [oscType, setOscType] = useState<OscillatorType>('sine');
  const [frequency, setFrequency] = useState(220); // standard low ambient frequency
  const [synthPlaying, setSynthPlaying] = useState(false);
  
  // Web Audio Context refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const handleDecryptAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCode) {
      alert("Please enter a valid credential key or license token.");
      return;
    }

    setIsDecrypting(true);

    // Simulate key validation & orbital telemetry decrypting
    setTimeout(() => {
      setIsDecrypting(false);
      setIsLoggedIn(true);
    }, 1500);
  };

  // Web Audio API Synthesis Engine
  const startSynthesizerTone = () => {
    try {
      if (synthPlaying) {
        stopSynthesizerTone();
        return;
      }

      // Initialize context
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Create oscillator and gain volume nodes
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = oscType;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      
      // Keep volume safe and low for user ear safety
      gain.gain.setValueAtTime(0.08, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();

      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
      setSynthPlaying(true);
    } catch (err) {
      console.warn("Web Audio API not supported or blocked in this context:", err);
      // Fallback state
      setSynthPlaying(true);
    }
  };

  const stopSynthesizerTone = () => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      } catch (e) {}
      oscillatorRef.current = null;
    }
    setSynthPlaying(false);
  };

  const updateSynthFreq = (val: number) => {
    setFrequency(val);
    if (oscillatorRef.current && audioCtxRef.current) {
      oscillatorRef.current.frequency.setValueAtTime(val, audioCtxRef.current.currentTime);
    }
  };

  const handleOscTypeChange = (type: OscillatorType) => {
    setOscType(type);
    if (oscillatorRef.current) {
      oscillatorRef.current.type = type;
    }
  };

  const handleLogout = () => {
    stopSynthesizerTone();
    setIsLoggedIn(false);
    setAccessCode('');
    setEmailInput('');
  };

  return (
    <div className="flex flex-col gap-6 max-w-xl mx-auto text-left" id="login-page-view">
      {/* Header Info */}
      <div className="text-center sm:text-left">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center justify-center sm:justify-start gap-2">
          <Key className="w-5 h-5 text-violet-400" />
          <span>VIP & Sound Sandbox Portal</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">Unlock exclusive unreleased live demo clips and access our direct hardware oscillator testing rig.</p>
      </div>

      <AnimatePresence mode="wait">
        {/* State 1: Decrypting Simulation */}
        {isDecrypting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="bg-slate-950 border border-violet-500/20 rounded-2xl p-8 text-center flex flex-col items-center gap-4 py-16"
            id="decrypt-loader-view"
          >
            <div className="relative">
              <Cpu className="w-10 h-10 text-violet-400 animate-spin" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-0 border border-violet-500/20 rounded-full animate-ping" />
            </div>
            <div>
              <h3 className="text-sm font-mono font-bold text-violet-400">CONNECTING TO STUDY ENCRYPTOR</h3>
              <p className="text-xs text-slate-500 mt-1 font-mono">Decoding token hashes & parsing oscillator permissions...</p>
            </div>
          </motion.div>
        )}

        {/* State 2: Authenticated Fan VIP Sandbox & Synthesizer */}
        {!isDecrypting && isLoggedIn && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl flex flex-col gap-6"
            id="vip-sandbox-panel"
          >
            {/* HUD Header info */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="bg-violet-500/10 border border-violet-500/30 p-2 rounded-xl text-violet-400">
                  <Unlock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-semibold text-emerald-400 uppercase leading-none">VIP ACCESS ACTIVE</span>
                  <h3 className="text-sm font-bold text-white mt-1">Telemetry Live Sound Lab</h3>
                </div>
              </div>

              <button
                id="btn-vip-logout"
                onClick={handleLogout}
                className="bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-white p-2 rounded-xl transition duration-150 flex items-center gap-1.5 text-xs font-mono"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>

            {/* Simulated Live Web Audio Synthesizer */}
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-violet-400" />
                  <span className="text-xs font-mono text-slate-300 font-bold uppercase">Synthesizer Test Oscillator</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">REAL-TIME WEB AUDIO API</span>
              </div>

              {/* Sound generation warning */}
              <div className="bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-lg text-[10px] text-slate-400 flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Turn down system volume slightly. Tones will synthesize directly in your browser.</span>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
                {/* Waveform Selector */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-[10px] font-mono text-slate-500 uppercase">Select Waveform</label>
                  <div className="grid grid-cols-4 p-1 bg-slate-900 border border-slate-800/80 rounded-xl text-center">
                    {(['sine', 'square', 'sawtooth', 'triangle'] as const).map(wType => (
                      <button
                        key={wType}
                        type="button"
                        id={`wave-btn-${wType}`}
                        onClick={() => handleOscTypeChange(wType)}
                        className={`py-1 rounded-lg text-[9px] font-mono uppercase transition duration-200 ${
                          oscType === wType 
                            ? 'bg-violet-500 text-white font-bold shadow-md shadow-violet-500/10' 
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {wType}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slider Frequency */}
                <div className="flex flex-col gap-1.5 text-left">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                    <span className="uppercase">Oscillator Pitch</span>
                    <span className="text-violet-400 font-bold">{frequency} Hz</span>
                  </div>
                  <input
                    type="range"
                    min="110"
                    max="660"
                    step="1"
                    value={frequency}
                    onChange={(e) => updateSynthFreq(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-violet-500"
                  />
                </div>
              </div>

              {/* Play Trigger */}
              <button
                id="btn-trigger-oscillator-tone"
                onClick={startSynthesizerTone}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold font-mono transition duration-200 flex items-center justify-center gap-2 ${
                  synthPlaying
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 animate-pulse'
                    : 'bg-violet-500 hover:bg-violet-400 text-slate-100'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{synthPlaying ? "Stop Oscillator Pitch" : "Synthesize Hardware Frequency"}</span>
              </button>
            </div>

            {/* Unreleased VIP Demo Demos */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Unreleased Audio Test Clips</h4>
              <div className="flex flex-col gap-2.5">
                <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-violet-500/10 border border-violet-500/20 p-2 rounded-lg text-violet-400">
                      <Disc className="w-4 h-4 animate-spin" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">Midnight Modular Session 12 (Improv Loop)</h5>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">Recorded live in Berlin - 2026.06.12</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                    124 BPM
                  </span>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-violet-500/10 border border-violet-500/20 p-2 rounded-lg text-violet-400">
                      <Sliders className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">Generative Spatial Drone Bed (Modular Raw Master)</h5>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">Soundcheck ambient loop - Barcelona</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                    Ambient
                  </span>
                </div>
              </div>
            </div>

          </motion.div>
        )}

        {/* State 3: Public Login Form */}
        {!isDecrypting && !isLoggedIn && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl flex flex-col gap-5"
            id="login-form-container"
          >
            {/* Mode Selectors */}
            <div className="grid grid-cols-2 p-1 bg-slate-950 border border-slate-800/80 rounded-xl text-center">
              <button
                type="button"
                id="btn-login-mode-fan"
                onClick={() => setPortalMode('fan')}
                className={`py-2 rounded-lg text-xs font-mono font-medium transition duration-200 capitalize ${
                  portalMode === 'fan' 
                    ? 'bg-slate-850 text-white font-bold border border-slate-700/80' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                VIP Fan Access
              </button>
              <button
                type="button"
                id="btn-login-mode-admin"
                onClick={() => setPortalMode('admin')}
                className={`py-2 rounded-lg text-xs font-mono font-medium transition duration-200 capitalize ${
                  portalMode === 'admin' 
                    ? 'bg-slate-850 text-white font-bold border border-slate-700/80' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                Artist Admin
              </button>
            </div>

            <form onSubmit={handleDecryptAccess} className="flex flex-col gap-4 text-left">
              {portalMode === 'fan' ? (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">VIP Invite Code or Fan License Key</label>
                    <input
                      type="text"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      placeholder="E.g., vip_guest or any fan key"
                      className="bg-slate-950 border border-slate-800 focus:border-violet-500/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none transition duration-200"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Your Email (To clear copyright whitelisting)</label>
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="creators@gmail.com"
                      className="bg-slate-950 border border-slate-800 focus:border-violet-500/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none transition duration-200"
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Admin Keycard Passcode</label>
                    <input
                      type="password"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      placeholder="••••••••"
                      className="bg-slate-950 border border-slate-800 focus:border-violet-500/50 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none transition duration-200"
                      required
                    />
                  </div>
                </>
              )}

              {/* Prompt info */}
              <div className="bg-slate-950 border border-slate-800/80 p-3.5 rounded-xl flex items-start gap-2.5 text-[10px] text-slate-500 leading-normal font-mono">
                <ShieldAlert className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                <span>Entering credential keys triggers secure local decryption logs. Test with passcode <span className="text-violet-400">vip_guest</span> for fast verification.</span>
              </div>

              {/* Submit btn */}
              <button
                type="submit"
                id="btn-submit-decrypt"
                className="bg-violet-500 hover:bg-violet-400 text-slate-100 py-3 rounded-xl text-xs font-bold font-mono transition duration-200"
              >
                Decrypt Sound Sandbox
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
