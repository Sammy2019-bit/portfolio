import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, CheckCircle, RefreshCw, HardDrive, Terminal, FileCheck, ShieldAlert } from 'lucide-react';

interface AssetToDownload {
  id: string;
  title: string;
  category: 'audio' | 'preset' | 'media';
  size: string;
  description: string;
  checksum: string;
  downloadCount: string;
}

const ASSET_LIBRARY: AssetToDownload[] = [
  {
    id: "dl_wav_stems",
    title: "Cosmic Resonance WAV Stem Kit",
    category: "audio",
    size: "142.5 MB",
    description: "Multi-track stems of the title track. Contains separated modular synthesizer arpeggios, heavy sub-basslines, and raw analog drum elements. (48kHz / 24-bit WAV format)",
    checksum: "SHA256: e8f9c118...a83f91",
    downloadCount: "2.8k downloads"
  },
  {
    id: "dl_preset_pack",
    title: "RIVER_GLOW Eurorack Patch Sheet & Ableton Rack",
    category: "preset",
    size: "18.2 MB",
    description: "Detailed patch layouts for Moog Mother-32 and Make Noise Maths, plus Alex River's custom Live 11 Max4Live macro sequencer grouping. Perfect for ambient generators.",
    checksum: "SHA256: f190a42e...12dd90",
    downloadCount: "1.4k downloads"
  },
  {
    id: "dl_wallpaper_media",
    title: "Celestial Telemetry Desktop Wallpaper Pack",
    category: "media",
    size: "45.1 MB",
    description: "High-resolution studio photography and conceptual geometric artwork inspired by space pulsars and telemetry maps. Curated for 4K and smartphone displays.",
    checksum: "SHA256: bd4482f0...31cc54",
    downloadCount: "4.1k downloads"
  },
  {
    id: "dl_press_epk",
    title: "RIVER_GLOW Electronic Press Kit (EPK)",
    category: "media",
    size: "32.0 MB",
    description: "Official bio documents, press photographs (portrait and landscape, photo credits included), custom logo vector layers (.SVG), and modular tour rider specs.",
    checksum: "SHA256: d8d73b1a...400fc8",
    downloadCount: "640 downloads"
  }
];

export const DownloadPage: React.FC = () => {
  const [downloadingAsset, setDownloadingAsset] = useState<AssetToDownload | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadRate, setDownloadRate] = useState(0);
  const [downloadStatus, setDownloadStatus] = useState<string[]>([]);
  const [completedDownloads, setCompletedDownloads] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let interval: any;
    if (downloadingAsset) {
      setDownloadProgress(0);
      setDownloadRate(0);
      setDownloadStatus([
        "Locating nearest CDN edge server (Frankfurt-01)...",
        "Handshaking SSL session keys...",
        "Authorizing download bandwidth packet allocation..."
      ]);

      const logStages = [
        "Resolving master payload directories...",
        "Verifying license metadata header signatures...",
        "Transferring compressed chunks over multi-thread pipelines...",
        "Reassembling binary structure blocks...",
        "Verifying SHA-256 checksum authenticity... Secure match verified!"
      ];

      let logCounter = 0;

      interval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setCompletedDownloads(completed => ({ ...completed, [downloadingAsset.id]: true }));
            setTimeout(() => setDownloadingAsset(null), 1200);
            return 100;
          }

          // Random increment
          const step = Math.floor(Math.random() * 12) + 5;
          const nextProgress = Math.min(100, prev + step);

          // Update speed rate between 12 MB/s to 38 MB/s
          setDownloadRate(Math.floor(Math.random() * 26) + 12);

          // Periodically push a status log
          if (nextProgress > 20 && logCounter === 0) {
            setDownloadStatus(s => [...s, logStages[0]]);
            logCounter++;
          } else if (nextProgress > 40 && logCounter === 1) {
            setDownloadStatus(s => [...s, logStages[1]]);
            logCounter++;
          } else if (nextProgress > 60 && logCounter === 2) {
            setDownloadStatus(s => [...s, logStages[2]]);
            logCounter++;
          } else if (nextProgress > 80 && logCounter === 3) {
            setDownloadStatus(s => [...s, logStages[3]]);
            logCounter++;
          } else if (nextProgress >= 100 && logCounter === 4) {
            setDownloadStatus(s => [...s, logStages[4]]);
            logCounter++;
          }

          return nextProgress;
        });
      }, 350);
    }
    return () => clearInterval(interval);
  }, [downloadingAsset]);

  const triggerDownloadSim = (asset: AssetToDownload) => {
    if (downloadingAsset) {
      alert("Another file transfer is already active in the pipeline.");
      return;
    }
    setDownloadingAsset(asset);
  };

  return (
    <div className="flex flex-col gap-6 text-left" id="download-page-view">
      {/* Header Info */}
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <HardDrive className="w-5 h-5 text-violet-400" />
          <span>Creators Sound Vault & Presets</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">Download official WAV sample stems, synthesizer patch blocks, Ableton Live racks, and EPKs directly.</p>
      </div>

      {/* Downloading Modal Simulation Banner */}
      <AnimatePresence>
        {downloadingAsset && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-slate-950 border border-violet-500/30 rounded-2xl p-5 flex flex-col gap-4 shadow-xl"
            id="download-tracker-hud"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="bg-violet-500/10 border border-violet-500/20 p-2 rounded-xl text-violet-400 animate-spin" style={{ animationDuration: '3s' }}>
                  <RefreshCw className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-none">Downloading Asset</h4>
                  <p className="text-xs text-slate-400 mt-1.5 font-mono">{downloadingAsset.title} ({downloadingAsset.size})</p>
                </div>
              </div>

              {/* Download Speed details */}
              <div className="flex items-center gap-4 text-xs font-mono text-slate-400 self-start sm:self-auto">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-600 uppercase">TRANSFER RATE</span>
                  <span className="text-violet-400 font-semibold">{downloadRate} MB/s</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-600 uppercase">PROGRESS</span>
                  <span className="text-white font-semibold">{downloadProgress}%</span>
                </div>
              </div>
            </div>

            {/* Simulated progress bar bar */}
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-violet-500 via-indigo-500 to-violet-400 rounded-full transition-all duration-300"
                style={{ width: `${downloadProgress}%` }}
              />
            </div>

            {/* Diagnostic transfer console logs */}
            <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-xl font-mono text-[10px] text-slate-400 flex flex-col gap-1 max-h-32 overflow-y-auto">
              <div className="text-slate-500 flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-slate-500" />
                <span>TRANSFER LOG STREAM:</span>
              </div>
              {downloadStatus.map((log, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-violet-400/90">
                  <span className="text-slate-600 shrink-0">&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid of Download Assets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ASSET_LIBRARY.map((asset) => {
          const isCompleted = !!completedDownloads[asset.id];
          return (
            <div 
              key={asset.id} 
              className="bg-slate-900/40 border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between gap-5 transition duration-200"
              id={`asset-card-${asset.id}`}
            >
              <div className="flex flex-col gap-2.5">
                <div className="flex justify-between items-start gap-2">
                  <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                    asset.category === 'audio' 
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                      : asset.category === 'preset'
                      ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                      : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                  }`}>
                    {asset.category === 'audio' ? 'WAV STEM PACK' : asset.category === 'preset' ? 'SYNTH PRESETS' : 'EPK / MEDIA'}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">{asset.size}</span>
                </div>

                <h3 className="font-bold text-white text-sm">{asset.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {asset.description}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-800/60 pt-3">
                  <span className="flex items-center gap-1">
                    <FileCheck className="w-3.5 h-3.5 text-slate-600" />
                    {asset.checksum}
                  </span>
                  <span>{asset.downloadCount}</span>
                </div>

                <button
                  id={`btn-download-${asset.id}`}
                  onClick={() => triggerDownloadSim(asset)}
                  disabled={!!downloadingAsset}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition duration-200 ${
                    isCompleted
                      ? 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/20'
                      : 'bg-slate-950 hover:bg-slate-900 text-slate-200 border border-slate-800'
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Download Redundant copy</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 text-violet-400" />
                      <span>Request Secure Fetch</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Licensing Policy Alert */}
      <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-start gap-3">
        <ShieldAlert className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-400 leading-relaxed">
          <strong className="text-slate-300 font-semibold">Royalty-Free & Attribution guidelines:</strong> Stems and presets downloaded from this hub are freely licensed for usage in independent releases, remixes, sound recordings, and game projects. In commercial projects, RIVER_GLOW must be credited in the metadata (e.g., <span className="font-mono text-violet-400">"Contains sound assets by RIVER_GLOW"</span>).
        </div>
      </div>
    </div>
  );
};
