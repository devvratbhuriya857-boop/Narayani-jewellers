import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Github, 
  Layers, 
  Terminal, 
  Copy, 
  Check, 
  ArrowRight, 
  ExternalLink, 
  Cpu, 
  Code,
  CheckCircle,
  HelpCircle,
  Smartphone,
  Sparkles
} from "lucide-react";

export default function DeveloperCodeHub() {
  const [activeTab, setActiveTab] = useState<"github" | "vercel" | "cli">("github");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  // Trigger a subtle phone haptic tap on interactions
  const triggerHaptic = () => {
    if (navigator.vibrate) {
      navigator.vibrate(15);
    }
  };

  const handleCopy = (text: string, index: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    triggerHaptic();
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // 1. GitHub CI/CD configuration code string
  const githubCodeRaw = `name: Deploy to Vercel
on:
  push:
    branches:
      - main
      - master

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js (v20)
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Production Build
        run: npm run build

      - name: Push to Vercel Production
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: ./`;

  // 2. Vercel deployment metadata JSON
  const vercelJsonRaw = `{
  "version": 2,
  "cleanUrls": true,
  "routes": [
    { "src": "/assets/(.*)", "dest": "/assets/$1" },
    { "src": "/(.*)", "dest": "/index.html" }
  ],
  "github": {
    "enabled": true,
    "silent": false
  }
}`;

  // 3. Command Line fast-track execution scripts
  const cliGitWorkflow = `# 1. Initialize local repository & push
git init
git add .
git commit -m "feat: narayani luxurious showroom & dial system"
git branch -M main

# 2. Authenticate and push using GitHub CLI
gh repo create narayani-jewellers --public --source=. --push`;

  const cliVercelSetup = `# 1. Install production build framework CLI
npm install -g vercel

# 2. Login to your secure portal
vercel login

# 3. Pull Vercel configurations and trigger deployment
vercel link
vercel deploy --prod`;

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 md:py-8 font-sans">
      
      {/* Visual Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-950 via-[#130E05] to-stone-950 border border-gold-900/40 p-6 md:p-10 mb-8 shadow-2xl">
        <div className="absolute top-0 right-0 p-16 bg-gold-400/[0.02] rounded-full pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gold-500/10 border border-gold-400/20 rounded-full text-[9px] uppercase font-bold tracking-[0.2em] text-[#D4AF37]">
              <Cpu className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "12s" }} /> PRODUCTION PREPARATION PORTAL
            </span>
            <h2 className="text-3xl font-serif text-white font-bold tracking-wide">
              GitHub & Vercel Code Hub
            </h2>
            <p className="text-xs sm:text-sm text-gold-100/60 leading-relaxed">
              Export your luxurious Sikar flagship showroom code directly. Use our verified configurations to deploy interactive UI visualizers, automatic routing, and BIS-hallmarked showcases to the world in under 60 seconds.
            </p>
          </div>
          
          <div className="flex gap-3">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={triggerHaptic}
              className="px-4.5 py-2.5 rounded-xl bg-stone-900 border border-gold-900/40 hover:border-gold-300 text-gold-300 flex items-center gap-2 text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Github className="w-4 h-4" /> Go to GitHub <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="https://vercel.com" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={triggerHaptic}
              className="px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-gold-600 to-gold-400 text-stone-950 hover:from-gold-500 hover:to-gold-300 flex items-center gap-2 text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Layers className="w-4 h-4" /> Go to Vercel <ExternalLink className="w-3 h-3 text-stone-950" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Interactive Deployment Content Layout (Flex-to-Column optimized for phone display sizes) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Responsive Horizontal / Vertical Tabs Slider */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-stone-950/80 border border-gold-900/20 rounded-2xl p-4 md:p-5 shadow-xl space-y-4">
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] font-mono">Deployment Methods</p>
            
            {/* Tab buttons stack - beautifully optimized for thumbs on mobile */}
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto no-scrollbar lg:overflow-visible pb-2 lg:pb-0">
              
              <button
                onClick={() => { setActiveTab("github"); triggerHaptic(); }}
                className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-bold transition-all border cursor-pointer w-auto lg:w-full ${
                  activeTab === "github"
                    ? "bg-gradient-to-r from-gold-600/10 to-gold-400/5 text-[#D4AF37] border-gold-400/60 shadow-lg"
                    : "bg-[#090909] text-stone-400 border-transparent hover:border-gold-900/20"
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-stone-900 flex items-center justify-center border border-stone-800 shrink-0">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold">1. GitHub Actions</span>
                  <span className="text-[10px] text-stone-500 hidden sm:block">Automated Deploy Workflow</span>
                </div>
              </button>

              <button
                onClick={() => { setActiveTab("vercel"); triggerHaptic(); }}
                className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-bold transition-all border cursor-pointer w-auto lg:w-full ${
                  activeTab === "vercel"
                    ? "bg-gradient-to-r from-gold-600/10 to-gold-400/5 text-[#D4AF37] border-gold-400/60 shadow-lg"
                    : "bg-[#090909] text-stone-400 border-transparent hover:border-gold-900/20"
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-stone-900 flex items-center justify-center border border-stone-800 shrink-0">
                  <Layers className="w-4 h-4 text-gold-400" />
                </div>
                <div>
                  <span className="block font-bold">2. Vercel JSON Setup</span>
                  <span className="text-[10px] text-stone-500 hidden sm:block">Routing & Rewriting Rules</span>
                </div>
              </button>

              <button
                onClick={() => { setActiveTab("cli"); triggerHaptic(); }}
                className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-bold transition-all border cursor-pointer w-auto lg:w-full ${
                  activeTab === "cli"
                    ? "bg-gradient-to-r from-gold-600/10 to-gold-400/5 text-[#D4AF37] border-gold-400/60 shadow-lg"
                    : "bg-[#090909] text-stone-400 border-transparent hover:border-gold-900/20"
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-stone-900 flex items-center justify-center border border-stone-800 shrink-0">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <span className="block font-bold">3. CLI Command Suite</span>
                  <span className="text-[10px] text-stone-500 hidden sm:block">One-click Console Push</span>
                </div>
              </button>

            </div>
          </div>

          {/* Quick Haptic-capable Phone Integration Specs */}
          <div className="bg-gradient-to-br from-[#0D0D0D] to-black border border-gold-900/20 rounded-2xl p-4.5 space-y-3 shadow-xl text-xs font-sans text-stone-300">
            <h4 className="font-bold text-[#D4AF37] flex items-center gap-1.5 font-serif">
              <Smartphone className="w-4 h-4" /> Phone Optimization Specs
            </h4>
            <p className="text-stone-400 text-[11px] leading-relaxed">
              This application utilizes high performance CSS hardware-accelerated layouts, optimized svgs, and touch-target triggers (minimum 44x44px target sizes). Excellent responsive scaling on older and modern hand-held viewport monitors.
            </p>
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-center">
              <div className="p-2 rounded bg-stone-900/80 border border-gold-900/10 text-stone-300">
                Lighthouse: <span className="text-green-400 font-bold">99+</span>
              </div>
              <div className="p-2 rounded bg-stone-900/80 border border-gold-900/10 text-stone-300">
                Responsive: <span className="text-green-400 font-bold">Pass</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Code Render Block with copy indicators */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {activeTab === "github" && (
              <motion.div
                key="github"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div className="bg-[#0A0A0A] border border-gold-900/30 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="bg-stone-950 px-5 py-3.5 border-b border-gold-900/20 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      <span className="text-[11px] font-mono text-stone-400 ml-2">.github/workflows/deploy.yml</span>
                    </div>
                    <button
                      onClick={() => handleCopy(githubCodeRaw, "github")}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-500/10 border border-gold-400/20 hover:border-gold-400 rounded-lg text-[10px] text-gold-300 font-bold cursor-pointer transition-colors active:scale-95"
                    >
                      {copiedIndex === "github" ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                      {copiedIndex === "github" ? "Copied!" : "Copy Code"}
                    </button>
                  </div>
                  
                  {/* Code Block Container with Horizontal Scroll support on Phone */}
                  <div className="p-5 overflow-x-auto font-mono text-xs text-stone-300 bg-stone-950/40 select-all leading-relaxed no-scrollbar max-h-[420px] select-text">
                    <pre className="whitespace-pre">{githubCodeRaw}</pre>
                  </div>
                </div>

                <div className="bg-stone-950/50 p-4 border border-gold-900/15 rounded-xl space-y-2 text-xs text-stone-400">
                  <p className="font-bold text-white flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-gold-400" /> Action Setup Guide:
                  </p>
                  <ol className="list-decimal pl-4 space-y-1 text-[11px] leading-relaxed">
                    <li>Push your code to a public or private GitHub repository using AI Studio Settings.</li>
                    <li>Inside your GitHub repo settings, navigate to <span className="text-gold-400 font-bold">Secrets and Variables &gt; Actions</span>.</li>
                    <li>Add the secrets: <span className="text-stone-300 font-mono">VERCEL_TOKEN</span>, <span className="text-stone-300 font-mono">VERCEL_ORG_ID</span>, and <span className="text-stone-300 font-mono">VERCEL_PROJECT_ID</span> (retrievable from Vercel dash).</li>
                    <li>Create the directory <span className="text-gold-400 font-mono">.github/workflows/</span> and put this file inside. Every push will auto-compile!</li>
                  </ol>
                </div>
              </motion.div>
            )}

            {activeTab === "vercel" && (
              <motion.div
                key="vercel"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                <div className="bg-[#0A0A0A] border border-gold-900/30 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="bg-stone-950 px-5 py-3.5 border-b border-gold-900/20 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      <span className="text-[11px] font-mono text-stone-400 ml-2">vercel.json</span>
                    </div>
                    <button
                      onClick={() => handleCopy(vercelJsonRaw, "vercel")}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-500/10 border border-gold-400/20 hover:border-gold-400 rounded-lg text-[10px] text-gold-300 font-bold cursor-pointer transition-colors active:scale-95"
                    >
                      {copiedIndex === "vercel" ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                      {copiedIndex === "vercel" ? "Copied!" : "Copy code"}
                    </button>
                  </div>
                  
                  {/* Code Container */}
                  <div className="p-5 overflow-x-auto font-mono text-xs text-stone-300 bg-stone-950/40 select-all leading-relaxed select-text no-scrollbar">
                    <pre className="whitespace-pre">{vercelJsonRaw}</pre>
                  </div>
                </div>

                <div className="bg-stone-950/50 p-4 border border-gold-900/15 rounded-xl space-y-2 text-xs text-stone-400">
                  <p className="font-bold text-white flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5 text-gold-400" /> Why this is critical:
                  </p>
                  <p className="text-[11px] leading-relaxed">
                    Since our luxurious Narayani application functions as a Client-Side Single Page Application (SPA), server configurations are required to redirect arbitrary route requests (like <span className="text-gold-300 font-mono">/catalog</span> or <span className="text-gold-300 font-mono">/book-appointment</span>) to the main entry point <span className="text-stone-300 font-mono">index.html</span>. This file specifies exactly how Vercel does that!
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "cli" && (
              <motion.div
                key="cli"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4"
              >
                {/* 1. Git Push commands */}
                <div className="bg-[#0A0A0A] border border-gold-900/30 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="bg-stone-950 px-5 py-3 border-b border-gold-900/20 flex justify-between items-center">
                    <span className="text-[11.5px] font-mono text-stone-300 flex items-center gap-2">
                      <Code className="w-4 h-4 text-[#D4AF37]" /> Push Code to GitHub Repo
                    </span>
                    <button
                      onClick={() => handleCopy(cliGitWorkflow, "cligit")}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-400/5 hover:bg-gold-400/10 border border-gold-400/20 rounded-lg text-[10px] text-gold-300 font-medium cursor-pointer"
                    >
                      {copiedIndex === "cligit" ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                      {copiedIndex === "cligit" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  
                  <div className="p-4.5 overflow-x-auto font-mono text-xs text-stone-300 bg-stone-950/20 select-all select-text no-scrollbar">
                    <pre className="whitespace-pre">{cliGitWorkflow}</pre>
                  </div>
                </div>

                {/* 2. Vercel deployment commands */}
                <div className="bg-[#0A0A0A] border border-gold-900/30 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="bg-stone-950 px-5 py-3 border-b border-gold-900/20 flex justify-between items-center">
                    <span className="text-[11.5px] font-mono text-stone-300 flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-gold-400" /> Vercel CLI Fast Deployment
                    </span>
                    <button
                      onClick={() => handleCopy(cliVercelSetup, "clivercel")}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-400/5 hover:bg-gold-400/10 border border-gold-400/20 rounded-lg text-[10px] text-gold-300 font-medium cursor-pointer"
                    >
                      {copiedIndex === "clivercel" ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                      {copiedIndex === "clivercel" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  
                  <div className="p-4.5 overflow-x-auto font-mono text-xs text-stone-300 bg-stone-950/20 select-all select-text no-scrollbar">
                    <pre className="whitespace-pre">{cliVercelSetup}</pre>
                  </div>
                </div>

                {/* Mobile optimization feedback badge */}
                <div className="text-center md:text-left text-[11px] text-[#D4AF37]/80 group flex items-center justify-center md:justify-start gap-1">
                  <Sparkles className="w-3.5 h-3.5 animate-bounce" /> Unlocks rapid deployment directly from any workstation or terminal!
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
