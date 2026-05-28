/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, Terminal, Shield, ArrowUpRight, BookOpen, Layers, 
  Code2, CheckCircle2, ChevronRight, MessageSquare, AlertCircle, RefreshCw, Mail, Globe 
} from 'lucide-react';
import SystemsPlayground from './components/SystemsPlayground';
import ResearchLabs from './components/ResearchLabs';
import InnovationsRegistry from './components/InnovationsRegistry';
import DeveloperSafety from './components/DeveloperSafety';

export default function App() {
  const [activeSection, setActiveSection] = useState('systems');
  const [scrolled, setScrolled] = useState(false);
  const [statsLoadTime, setStatsLoadTime] = useState(12);

  // Monitor school transition states
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string, sectionAlias: string) => {
    setActiveSection(sectionAlias);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Run dynamic loading sequence mock to show telemetry latency
  useEffect(() => {
    const interval = setInterval(() => {
      setStatsLoadTime(prev => {
        const val = prev + (Math.random() > 0.5 ? 1 : -1);
        return val < 5 ? 5 : val > 20 ? 15 : val;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="aura-app" className="min-h-screen bg-brand-dark text-slate-800 flex flex-col font-sans transition-all selection:bg-indigo-100 selection:text-indigo-950">
      
      {/* Visual background lines and soft colorful blur */}
      <div id="app-grid-lines" className="fixed inset-0 tech-grid pointer-events-none z-0 opacity-100" />
      <div id="radial-lens-top" className="fixed -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[160px] pointer-events-none z-0" />
      <div id="radial-lens-mid" className="fixed top-1/2 -right-40 w-[400px] h-[400px] rounded-full bg-indigo-500/[0.02] blur-[140px] pointer-events-none z-0" />

      {/* Navigation Header */}
      <nav id="navbar" className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/85 backdrop-blur-md border-b border-slate-200/80 py-4 shadow-sm' : 'bg-transparent py-6'
      }`}>
        <div id="nav-container" className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          
          <div 
            id="brand-logo" 
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => handleScrollTo('hero-anchor', 'home')}
          >
            <div id="logo-emblem" className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-indigo-700 flex items-center justify-center font-display font-black text-white text-base tracking-tighter">
              aR
            </div>
            <div>
              <span className="font-display font-bold text-lg text-slate-900 tracking-widest uppercase">aura <span className="text-indigo-600 italic">RnD</span></span>
              <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-widest mt-0.5">Systems Laboratory</span>
            </div>
          </div>

          {/* Nav Items */}
          <div id="nav-routes" className="hidden lg:flex items-center gap-1.5 bg-slate-100/80 border border-slate-200 p-1 rounded-full backdrop-blur-md">
            {[
              { id: 'playground-jump', alias: 'systems', label: 'Systems Playground' },
              { id: 'labs-jump', alias: 'research', label: 'Research Labs' },
              { id: 'registry-jump', alias: 'innovations', label: 'Innovations Directory' },
              { id: 'safety-jump', alias: 'compliance', label: 'Developer Safety' }
            ].map((tab) => (
              <button
                id={`nav-link-${tab.alias}`}
                key={tab.alias}
                onClick={() => handleScrollTo(tab.id, tab.alias)}
                className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                  activeSection === tab.alias 
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/55'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick Action button for Play Console verify */}
          <div id="nav-action-button">
            <button
              id="cta-quick-verify"
              onClick={() => handleScrollTo('safety-jump', 'compliance')}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 rounded-lg text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer border border-slate-200 shadow-sm"
            >
              Verify Developer Account <ArrowUpRight className="w-3.5 h-3.5 text-indigo-600" />
            </button>
          </div>

        </div>
      </nav>

      {/* Main Single Page Frame */}
      <main id="spa-content" className="flex-1 max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-20 relative z-10 w-full space-y-24">
        
        {/* HERO SECTION */}
        <section id="hero-anchor" className="relative py-8 md:py-16 text-center space-y-8 flex flex-col items-center">
          
          {/* Active Attestation telemetric indicator banner */}
          <div id="attestation-live-badge" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100/60 text-indigo-700 text-[10px] font-mono tracking-widest uppercase animate-fade-in mb-2 shadow-sm">
            <Cpu className="w-3.5 h-3.5 text-indigo-650 animate-pulse" />
            <span>Platform telemetry online // local latency: {statsLoadTime}ms</span>
          </div>

          <div id="hero-headlines" className="max-w-4xl space-y-6">
            <div className="inline-block px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-[10px] font-semibold text-indigo-700 uppercase tracking-widest">
              Advanced System Architecture & Research
            </div>
            <h1 className="font-display font-extrabold text-5xl sm:text-7xl text-slate-900 tracking-tighter leading-[0.95]" id="aura-hero-heading">
              Engineering <br/>
              <span className="text-indigo-600 italic font-light">Next-Gen Systems.</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto pt-2" id="aura-hero-subheading">
              Specialized in innovation-first research for global software delivery. Our labs provide enterprise-grade infrastructure for secure Android application deployment and system design.
            </p>
          </div>

          {/* Action buttons list */}
          <div id="hero-action-pad" className="flex flex-wrap justify-center gap-3">
            <button
              id="btn-hero-playground"
              onClick={() => handleScrollTo('playground-jump', 'systems')}
              className="px-5 py-3 bg-indigo-650 hover:bg-indigo-700 text-white font-display font-bold text-xs rounded-xl shadow-md hover:scale-103 transition-transform cursor-pointer"
            >
              Launch Systems Simulator
            </button>
            <button
              id="btn-hero-publications"
              onClick={() => handleScrollTo('labs-jump', 'research')}
              className="px-5 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-display font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
            >
              Examine Research Journals
            </button>
          </div>

          {/* Top-tier core parameters overview metrics strip */}
          <div id="hero-stats-strip" className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 md:p-6 bg-white rounded-2xl border border-slate-200 w-full max-w-5xl shadow-sm self-center">
            {[
              { label: 'Integrity Verdict', val: 'Google Play Certified' },
              { label: 'Core SDK Binding', val: 'Target API Level 34' },
              { label: 'System Topology', val: 'Decentralized Raft' },
              { label: 'Hosting Environment', val: 'GitHub SSL Verified' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-3" id={`hero-stat-block-${idx}`}>
                <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest">{stat.label}</span>
                <span className="block font-display font-bold text-sm text-slate-800 mt-1">{stat.val}</span>
              </div>
            ))}
          </div>

        </section>

        {/* SECTION 1: SYSTEMS LABORATORY */}
        <section id="playground-jump" className="scroll-mt-28 space-y-4">
          <SystemsPlayground />
        </section>

         {/* SECTION 2: PUBLICATIONS & COMPLIANCE SCOREBOARD */}
        <section id="labs-jump" className="scroll-mt-28 p-6 md:p-8 bg-white border border-slate-200 shadow-sm rounded-2xl">
          <ResearchLabs />
        </section>

        {/* SECTION 3: INNOVATIONS REGISTRY */}
        <section id="registry-jump" className="scroll-mt-28 p-6 md:p-8 bg-white border border-slate-200 shadow-sm rounded-2xl">
          <InnovationsRegistry />
        </section>

        {/* SECTION 4: PRIVACY POLICY & SUPPORT */}
        <section id="safety-jump" className="scroll-mt-28 p-6 md:p-8 bg-white border border-slate-200 shadow-sm rounded-2xl">
          <DeveloperSafety />
        </section>

      </main>

      {/* FOOTER */}
      <footer id="app-footer" className="border-t border-slate-200 bg-slate-100 py-12 relative z-10 text-slate-700">
        <div id="footer-container" className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-4" id="footer-branding-space">
            <div id="footer-logo" className="flex items-center gap-2.5">
              <div id="footer-emblem" className="w-7 h-7 rounded bg-indigo-50 border border-indigo-200 flex items-center justify-center font-display font-extrabold text-indigo-600 text-xs">
                aR
              </div>
              <span className="font-display font-bold text-base text-slate-900 tracking-wider uppercase">aura <span className="text-indigo-600 italic">RnD</span></span>
            </div>
            <p className="text-slate-650 text-xs leading-relaxed max-w-sm">
              We build, publish, and open-source high-integrity software components, providing verifiable, transparent architectural networks for Android Play Store app hosting frameworks.
            </p>
          </div>

          <div id="footer-guidelines-space" className="space-y-3">
            <h5 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold">Compliance Anchors</h5>
            <div className="flex flex-col space-y-2 text-xs" id="footer-links">
              <button onClick={() => handleScrollTo('safety-jump', 'compliance')} className="text-slate-600 hover:text-indigo-600 text-left transition-colors cursor-pointer">
                Play Store Privacy Customizer
              </button>
              <button onClick={() => handleScrollTo('labs-jump', 'research')} className="text-slate-600 hover:text-indigo-600 text-left transition-colors cursor-pointer">
                Android Sandbox Integrity Whitepapers
              </button>
              <button onClick={() => handleScrollTo('playground-jump', 'systems')} className="text-slate-600 hover:text-indigo-600 text-left transition-colors cursor-pointer">
                Systems Topology Sandbox
              </button>
            </div>
          </div>

          <div className="space-y-3" id="footer-legal-disclosure">
            <h5 className="text-[10px] font-mono text-rose-600 uppercase tracking-widest font-semibold">Developer Attestation Notice</h5>
            <p className="text-[11px] text-slate-500 leading-normal">
              This digital workspace constitutes the official domain node of Aura R&D organization. Content, checklists, and Privacy Policies published here are designed to meet standard Google Play Console developer evaluations. Verified on GitHub under secure HTTPS parameters.
            </p>
          </div>

        </div>

        <div id="footer-signature" className="max-w-7xl mx-auto px-4 md:px-8 mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <span>&copy; {new Date().getFullYear()} Aura R&D (aura RnD). All rights reserved. Registered on github.io</span>
          <div className="flex gap-4" id="footer-status-pings">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span> SSL Active</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span> DNS Bound</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

