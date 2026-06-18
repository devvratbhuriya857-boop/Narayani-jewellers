import React, { useEffect } from "react";
import { motion } from "motion/react";
import { Sparkles, Lock, ShieldCheck, Compass, Gift } from "lucide-react";

interface SikarVaultDialProps {
  // Watch fields to trigger rotation with every single character entered
  inputTrackValue: string;
  isUnlocked: boolean;
  isVerifying: boolean;
}

export default function SikarVaultDial({ 
  inputTrackValue, 
  isUnlocked, 
  isVerifying 
}: SikarVaultDialProps) {
  
  // Calculate dial rotation degree dynamically based on total input length
  const totalLength = inputTrackValue.length;
  const dialRotation = totalLength * 18; // 18 degrees rotation per typed key

  // Standard Web Audio API synthesizer for metallic clicks & deluxe unlocks
  const playMechanicalTone = (type: "tick" | "gold_unlock") => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      if (type === "tick") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(1400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.04);
        
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === "gold_unlock") {
        const now = ctx.currentTime;
        const playTone = (freq: number, startTime: number, duration: number) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, startTime);
          osc.frequency.exponentialRampToValueAtTime(freq * 1.6, startTime + duration - 0.05);
          
          gain.gain.setValueAtTime(0.1, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
          
          osc.start(startTime);
          osc.stop(startTime + duration);
        };
        
        // Exquisite imperial royal chord chime
        playTone(392.00, now, 0.4);       // G4
        playTone(493.88, now + 0.1, 0.4); // B4
        playTone(587.33, now + 0.2, 0.4); // D5
        playTone(783.99, now + 0.35, 0.55); // G5
      }
    } catch (err) {
      // Gracefully bypass if blocked by browser autoplay/interaction permissions
    }
  };

  // Play crisp high-fidelity mechanical ticks on any length update
  useEffect(() => {
    if (totalLength > 0 && !isUnlocked) {
      playMechanicalTone("tick");
      // Gentle trigger of phone haptic feedback if modern client system supports it
      if (navigator.vibrate) {
        navigator.vibrate(12);
      }
    }
  }, [totalLength]);

  // Play royal chime when locked state clicks open
  useEffect(() => {
    if (isUnlocked) {
      playMechanicalTone("gold_unlock");
      if (navigator.vibrate) {
        navigator.vibrate([40, 20, 80]); // Royal double vibrations
      }
    }
  }, [isUnlocked]);

  return (
    <div className="relative w-full bg-[#0D0D0D] border border-gold-900/40 rounded-2xl p-6 overflow-hidden flex flex-col items-center justify-center min-h-[360px] text-center shadow-2xl">
      {/* Background radial soft golden aura */}
      <div className="absolute inset-0 bg-radial-gradient from-gold-500/5 to-transparent pointer-events-none" />

      {/* Radiant Beam of Warm Light eruption when slot completes successfully */}
      {isUnlocked && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.1 }}
          animate={{ opacity: 1, scale: 8 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute z-20 pointer-events-none w-20 h-20 rounded-full bg-radial-gradient from-[#FFF9E6] via-gold-500/70 to-transparent"
        />
      )}

      {/* Decorative mechanical safe lines in background */}
      <div className="absolute inset-x-0 top-6 flex justify-center opacity-[0.04] select-none pointer-events-none">
        <motion.div
          animate={{ rotate: dialRotation }}
          transition={{ type: "spring", damping: 15, stiffness: 85 }}
          className="w-64 h-64 rounded-full border-4 border-dashed border-[#D4AF37]"
        />
      </div>

      <div className="z-10 space-y-4 w-full">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gold-500/10 border border-gold-400/20 rounded-full text-[9px] uppercase font-bold tracking-[0.2em] text-[#D4AF37]">
          <ShieldCheck className="w-3.5 h-3.5" /> SIKAR VAULT GUARANTEE
        </div>
        
        <div>
          <h4 className="font-serif text-white text-base tracking-wide font-normal">
            Sikar Safe <span className="italic text-[#D4AF37]">Visualizer</span>
          </h4>
          <p className="text-stone-400 text-[11px] leading-relaxed max-w-xs mx-auto mt-1 font-sans">
            As you type your name or mobile coordinates, watch the golden treasury dial securely rotate and line up.
          </p>
        </div>

        {/* The Majestic Luxury Golden Rotating Dial & Lens */}
        <div className="flex items-center justify-center py-4 relative">
          <motion.div
            animate={{ 
              rotate: dialRotation,
              scale: isUnlocked ? [1, 1.15, 0.95] : isVerifying ? [0.97, 1.03, 0.97] : 1
            }}
            transition={{ 
              type: "spring", 
              damping: 18, 
              stiffness: 110,
              scale: isVerifying ? { repeat: Infinity, duration: 1 } : undefined
            }}
            className="w-36 h-36 rounded-full bg-gradient-to-br from-[#1E1508] via-black to-stone-900 border-2 border-[#D4AF37] flex items-center justify-center relative shadow-2xl shadow-black/80"
          >
            {/* Numeric Dial Tick Calibration */}
            {[...Array(12)].map((_, i) => (
              <span
                key={i}
                className="absolute text-[8.5px] font-mono text-gold-400/40 font-bold"
                style={{
                  transform: `rotate(${i * 30}deg) translateY(-54px) rotate(${-i * 30 - dialRotation}deg)`
                }}
              >
                {i * 10}
              </span>
            ))}

            {/* Glowing active safe pointer marker */}
            <div className="absolute top-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shadow-md shadow-red-500/40" />

            {/* Inner mechanical wheel crown */}
            <div className="w-22 h-22 rounded-full bg-gradient-to-tr from-stone-950 to-gold-500/35 p-0.5 shadow-inner flex items-center justify-center">
              <div id="inner-gold-knob" className="w-full h-full rounded-full bg-[#0A0A0A] flex flex-col items-center justify-center border border-gold-400/20">
                {isUnlocked ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Sparkles className="w-6 h-6 text-gold-400" />
                  </motion.div>
                ) : (
                  <>
                    <Lock className={`w-4 h-4 text-[#D4AF37] ${isVerifying ? "animate-pulse" : ""}`} />
                    <span className="text-[7.5px] font-mono text-stone-500 uppercase tracking-widest mt-1">
                      {totalLength} TICKS
                    </span>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Micro outer luxury glowing circular dial layout helper */}
          <div className="absolute -inset-1 rounded-full border border-gold-400/5 animate-pulse pointer-events-none" />
        </div>

        {/* Active tracking panel display */}
        <div className="bg-stone-950/80 border border-gold-900/20 rounded-xl p-3 max-w-xs mx-auto">
          <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-wider">
            <span className="text-stone-500">DIAL COORDINATE:</span>
            <span className="text-gold-400 font-bold">{Math.abs(dialRotation) % 360}°</span>
          </div>
          <div className="h-1 w-full bg-stone-900 rounded-full mt-2 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#8C6D31] to-[#D4AF37]" 
              animate={{ width: `${Math.min(100, (totalLength / 20) * 100)}%` }}
            />
          </div>
          <p className="text-[9px] text-stone-400 text-left mt-2 leading-relaxed flex items-center gap-1 font-mono uppercase">
            <Compass className="w-3.5 h-3.5 text-gold-500 animate-spin" style={{ animationDuration: "12s" }} />
            {isUnlocked ? "[VAULT SECURED & VERIFIED]" : isVerifying ? "[DIAL LOCKING IN PLACE...]" : "[SECURE KEYS INJECTING LIVE]"}
          </p>
        </div>

        {/* Mini interactive nudge helper */}
        <div className="text-[10px] uppercase font-bold text-[#D4AF37]/80 tracking-widest flex items-center justify-center gap-1 mt-2">
          <Gift className="w-3.5 h-3.5 animate-bounce" /> Unlocks Royal Visit digital pass on submit!
        </div>
      </div>
    </div>
  );
}
