import { useState, useEffect } from 'react';
import { 
  FolderGit2, ShieldAlert, Network, Cpu, Code2, 
  ExternalLink, Terminal, ChevronRight, Check, Play, RefreshCw
} from 'lucide-react';
import { SHOWCASE_PROJECTS } from '../data';
import { ShowcaseProject } from '../types';

export default function InnovationsRegistry() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  
  // Interactive System Build Terminal states
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '[INIT] Aura Build Toolchain v4.12.0 core initialized.',
    '[CHECK] Fetching latest Android repository dependencies...',
    '[SUCCESS] Local Keystore signed certificate found.',
  ]);
  const [isCompiling, setIsCompiling] = useState(false);

  const getProjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-emerald-600" id={`icon-${Date.now()}-shield`} />;
      case 'Network': return <Network className="w-6 h-6 text-indigo-600" id={`icon-${Date.now()}-network`} />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-indigo-500" id={`icon-${Date.now()}-cpu`} />;
      default: return <FolderGit2 className="w-6 h-6 text-slate-500" id={`icon-${Date.now()}-folder`} />;
    }
  };

  const statusColors = (status: ShowcaseProject['status']) => {
    switch (status) {
      case 'Published': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Under Play Audit': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'R&D Labs': return 'text-indigo-700 bg-indigo-50 border-indigo-200';
      default: return 'text-slate-600 bg-slate-100 border-slate-200';
    }
  };

  // Run dynamic terminal compiler log effect
  const handleCompileTrigger = () => {
    if (isCompiling) return;
    setIsCompiling(true);
    
    // Clear logs to start freshly
    setTerminalLogs([
      `[AURACLI] Launching compilation profile: ${Date.now()}-prod`,
      `[SECURE] Establishing secure hardware key binding...`
    ]);

    const buildSteps = [
      '[COMPILING] Resolving Jetpack Compose recomposition state graphs...',
      '[SECURE] Securing app sandboxes with APK strict bounds alignment...',
      '[INTEGRITY] Calling Google Play integrity challenge attestation tokens...',
      '[AURA AUDIT] Running source scan checking data-leak vulnerabilities...',
      '[SUCCESS] Encrypted native binaries successfully packed into AAB bundle!',
      '[PROD RELEASE] Signed artifact uploaded. Awaiting Google Play host console deployment verification.'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < buildSteps.length) {
        setTerminalLogs(prev => [...prev, buildSteps[currentStep]]);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsCompiling(false);
      }
    }, 1200);
  };

  return (
    <div id="innovations-registry-row" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Dynamic Projects Showcase cards Grid */}
      <div className="space-y-6" id="projects-grid">
        <div id="projects-desc">
          <div className="flex items-center gap-2 text-indigo-600 mb-2" id="projects-subtitle">
            <Code2 className="w-4 h-4" />
            <span className="font-mono text-xs uppercase tracking-widest text-indigo-600 font-bold">Active Software registries</span>
          </div>
          <h3 className="font-display text-2xl font-bold text-slate-900 mb-2" id="projects-title">
            Featured Innovations & Android SDKs
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed font-semibold" id="projects-tag">
            Durable developer materials deployed on live client terminals. Select a platform utility card to review core capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="project-tiles">
          {SHOWCASE_PROJECTS.map((project) => {
            const isSelected = selectedProjectId === project.id;
            return (
              <div
                id={`project-tile-${project.id}`}
                key={project.id}
                onClick={() => setSelectedProjectId(isSelected ? null : project.id)}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-indigo-50/40 border-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.06)]' 
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white hover:shadow-sm'
                }`}
              >
                <div id={`tile-top-${project.id}`}>
                  <div className="flex items-start justify-between mb-4" id={`tile-flex-${project.id}`}>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-inner" id={`tile-icon-wrap-${project.id}`}>
                      {getProjectIcon(project.iconName)}
                    </div>
                    <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border uppercase tracking-wider ${statusColors(project.status)}`}>
                      {project.status}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-slate-800 text-base mb-1" id={`tile-title-${project.id}`}>
                    {project.title}
                  </h4>
                  <span className="text-[11px] font-mono text-indigo-600 font-semibold block mb-3" id={`tile-sub-${project.id}`}>
                    {project.subtitle}
                  </span>
                  <p className="text-slate-600 text-xs leading-relaxed mb-4 font-semibold" id={`tile-desc-${project.id}`}>
                    {project.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between" id={`tile-actions-${project.id}`}>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                    {project.platform}
                  </span>
                  
                  {project.playStoreUrl ? (
                    <a
                      id={`project-link-${project.id}`}
                      href={project.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs text-indigo-650 hover:underline hover:text-indigo-800 flex items-center gap-1 font-mono font-bold"
                    >
                      Repository <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-[10px] text-indigo-600 font-mono font-semibold">Simulate below</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Project Expansion Highlights detail pane */}
        {selectedProjectId && (
          <div id="projects-highlights-details" className="p-4 rounded-xl bg-slate-100 border border-slate-200">
            <h5 className="text-xs font-mono text-indigo-700 uppercase tracking-wider mb-2 font-bold">Core Component Competence:</h5>
            <ul className="space-y-1.5" id="highlight-bullet-list">
              {SHOWCASE_PROJECTS.find(p => p.id === selectedProjectId)?.highlights.map((highlight, index) => (
                <li key={index} className="flex items-center gap-2 text-xs text-slate-700 leading-normal font-semibold" id={`hl-li-${index}`}>
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>

      {/* Interactive System Pipeline Compiler Terminal */}
      <div id="compiler-terminal" className="flex flex-col h-full justify-between p-6 bg-slate-900 rounded-2xl border border-slate-850 shadow-md">
        <div id="terminal-desc">
          <div className="flex items-center gap-2 text-indigo-400 mb-2" id="term-sub">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-indigo-400 font-bold">Command shell terminal</span>
          </div>
          <h4 className="font-display font-extrabold text-white text-lg mb-2" id="term-title">
            Interactive Release Pipeline Compiler
          </h4>
          <p className="text-slate-300 text-xs leading-relaxed" id="term-explanation">
            Verify deployment bundles using standard security validations. Run our compilation script below to watch app packagers build, sign, and upload APK assets in mock environments.
          </p>
        </div>

        {/* Simulated Command prompt screen */}
        <div id="term-screen" className="flex-1 min-h-[220px] bg-black/60 rounded-xl border border-slate-800 my-6 p-4 font-mono text-[11px] text-green-400 overflow-y-auto space-y-2 select-text">
          <div className="text-slate-500 mb-1" id="term-stamp">
            Aura Host Terminal - Sync session active: {new Date().toISOString().split('T')[0]}
          </div>
          {terminalLogs.map((log, index) => (
            <div key={index} className="leading-5" id={`log-idx-${index}`}>
              <span className="text-slate-500 mr-2">{index + 1}.</span>
              <span className={`${
                log.includes('[SUCCESS]') || log.includes('[PROD RELEASE]') 
                  ? 'text-cyan-400 font-semibold' 
                  : log.includes('[SECURE]') 
                  ? 'text-indigo-400' 
                  : log.includes('[COMPILING]')
                  ? 'text-sky-400'
                  : 'text-green-400'
              }`}>
                {log}
              </span>
            </div>
          ))}
          {isCompiling && (
            <div className="flex items-center gap-2 text-sky-400 animate-pulse mt-1" id="term-compiling-pulse">
              <span className="inline-block w-2.5 h-2.5 bg-sky-400 rounded-full animate-ping" />
              <span>Compiling code structure tree blocks...</span>
            </div>
          )}
        </div>

        {/* Trigger execution control */}
        <button
          id="btn-run-compile"
          onClick={handleCompileTrigger}
          disabled={isCompiling}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-sans text-xs font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow shadow-indigo-600/10"
        >
          {isCompiling ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Packaging Application Target Archive (AAB)
            </>
          ) : (
            <>
              <Play className="w-4 h-4 animate-pulse" />
              Trigger Pipeline Build & Attestation Check
            </>
          )}
        </button>

      </div>

    </div>
  );
}
