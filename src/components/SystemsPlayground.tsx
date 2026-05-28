import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Network, Cpu, Database, ShieldAlert, Key, Server, Router, 
  Activity, Play, Zap, Plus, AlertCircle, RefreshCw, Layers, CheckCircle
} from 'lucide-react';
import { SYSTEM_TEMPLATES } from '../data';
import { SystemNode, SystemEdge } from '../types';

export default function SystemsPlayground() {
  const [activeTemplateId, setActiveTemplateId] = useState(SYSTEM_TEMPLATES[0].id);
  const [userNodes, setUserNodes] = useState<{ [key: string]: SystemNode[] }>({});
  const [userEdges, setUserEdges] = useState<{ [key: string]: SystemEdge[] }>({});
  
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isSimulatingBurst, setIsSimulatingBurst] = useState(false);
  const [isHeatChecking, setIsHeatChecking] = useState(false);
  
  // Custom Node Form
  const [newNodeName, setNewNodeName] = useState('');
  const [newNodeType, setNewNodeType] = useState<SystemNode['type']>('cache');
  const [newNodeDetails, setNewNodeDetails] = useState('');

  // Get active layout nodes and edges safely
  const originalTemplate = useMemo(() => {
    return SYSTEM_TEMPLATES.find(t => t.id === activeTemplateId) || SYSTEM_TEMPLATES[0];
  }, [activeTemplateId]);

  const activeNodes = useMemo(() => {
    const custom = userNodes[activeTemplateId] || [];
    return [...originalTemplate.nodes, ...custom];
  }, [originalTemplate, activeTemplateId, userNodes]);

  const activeEdges = useMemo(() => {
    const custom = userEdges[activeTemplateId] || [];
    return [...originalTemplate.edges, ...custom];
  }, [originalTemplate, activeTemplateId, userEdges]);

  const selectedNode = useMemo(() => {
    return activeNodes.find(node => node.id === selectedNodeId) || null;
  }, [activeNodes, selectedNodeId]);

  // Handle Preset Switch
  const handleTemplateChange = (id: string) => {
    setActiveTemplateId(id);
    setSelectedNodeId(null);
    setIsSimulatingBurst(false);
    setIsHeatChecking(false);
  };

  // Add Custom Node
  const handleAddCustomNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNodeName.trim()) return;

    const id = `custom-${Date.now()}`;
    const newNode: SystemNode = {
      id,
      label: newNodeName.trim(),
      type: newNodeType,
      status: 'pending',
      latency: '<2ms (Proximity)',
      details: newNodeDetails.trim() || 'Custom user-designed subsystem node.',
      x: 30 + Math.random() * 40, // place in active center
      y: 35 + Math.random() * 45
    };

    // Update active template nodes list
    setUserNodes(prev => ({
      ...prev,
      [activeTemplateId]: [...(prev[activeTemplateId] || []), newNode]
    }));

    // Find the gateway node or a central hub in the current template to link it to
    const centralHubOrGateway = activeNodes.find(n => n.type === 'gateway' || n.type === 'server') || activeNodes[0];
    if (centralHubOrGateway) {
      const newEdge: SystemEdge = {
        from: centralHubOrGateway.id,
        to: id,
        label: 'User Registered Route',
        flowDirection: 'both',
        active: true
      };
      setUserEdges(prev => ({
        ...prev,
        [activeTemplateId]: [...(prev[activeTemplateId] || []), newEdge]
      }));
    }

    setNewNodeName('');
    setNewNodeDetails('');
    setSelectedNodeId(id);
    
    // Auto reset state
    setTimeout(() => {
      setUserNodes(prev => {
        const list = prev[activeTemplateId] || [];
        return {
          ...prev,
          [activeTemplateId]: list.map(n => n.id === id ? { ...n, status: 'active' } : n)
        };
      });
    }, 1500);
  };

  // Run Burst Sim
  const triggerBurstSimulation = () => {
    if (isSimulatingBurst) return;
    setIsSimulatingBurst(true);
    setTimeout(() => {
      setIsSimulatingBurst(false);
    }, 4000);
  };

  // Run Heat Check
  const triggerHeatCheck = () => {
    setIsHeatChecking(true);
    setTimeout(() => {
      setIsHeatChecking(false);
    }, 3000);
  };

  const getNodeIcon = (type: SystemNode['type']) => {
    switch (type) {
      case 'client': return <Cpu className="w-5 h-5 text-sky-400" id={`icon-client-${Date.now()}`} />;
      case 'gateway': return <Router className="w-5 h-5 text-emerald-400" id={`icon-gw-${Date.now()}`} />;
      case 'server': return <Server className="w-5 h-5 text-indigo-400" id={`icon-srv-${Date.now()}`} />;
      case 'database': return <Database className="w-5 h-5 text-amber-500" id={`icon-db-${Date.now()}`} />;
      case 'auth': return <Key className="w-5 h-5 text-purple-400" id={`icon-auth-${Date.now()}`} />;
      case 'cache': return <Zap className="w-5 h-5 text-pink-400" id={`icon-cache-${Date.now()}`} />;
      case 'worker': return <Activity className="w-5 h-5 text-teal-400" id={`icon-worker-${Date.now()}`} />;
      default: return <Network className="w-5 h-5 text-gray-400" id={`icon-net-${Date.now()}`} />;
    }
  };

  const getLatencyLoadColor = (nodeId: string) => {
    if (!isHeatChecking) return 'border-slate-200 bg-white text-slate-800 shadow-sm';
    const hash = nodeId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    if (hash % 3 === 0) return 'border-rose-300 bg-rose-50 text-rose-700 shadow-[0_0_10px_rgba(239,68,68,0.15)]';
    if (hash % 3 === 1) return 'border-amber-300 bg-amber-50 text-amber-700 shadow-[0_0_10px_rgba(245,158,11,0.15)]';
    return 'border-emerald-300 bg-emerald-50 text-emerald-700 shadow-[0_0_10px_rgba(16,185,129,0.15)]';
  };

  const resetCustomizations = () => {
    setUserNodes(prev => ({ ...prev, [activeTemplateId]: [] }));
    setUserEdges(prev => ({ ...prev, [activeTemplateId]: [] }));
    setSelectedNodeId(null);
  };

  return (
    <div id="systems-playground" className="p-6 md:p-8 bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8" id="sys-playground-header">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 mb-2" id="sys-title-tag">
            <Layers className="w-4 h-4" />
            <span className="font-mono text-xs uppercase tracking-widest text-indigo-600">Active Systems Laboratory</span>
          </div>
          <h3 className="font-display text-2xl font-bold text-slate-900 mb-2" id="sys-main-title">
            Interactive Topology Simulator
          </h3>
          <p className="text-slate-650 max-w-2xl text-sm leading-relaxed" id="sys-main-desc">
            Explore and simulate enterprise state structures. Click nodes to run diagnostical checks, customize routes, or mock high-stress system workloads.
          </p>
        </div>
        
        {/* Presets switch */}
        <div className="flex flex-wrap gap-2 self-start md:self-center" id="template-switchers">
          {SYSTEM_TEMPLATES.map((tpl) => (
            <button
               id={`btn-tpl-${tpl.id}`}
              key={tpl.id}
              onClick={() => handleTemplateChange(tpl.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 cursor-pointer ${
                activeTemplateId === tpl.id
                  ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {tpl.title.split(' ')[1] || tpl.title.split(' ')[0]} Preset
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6" id="playground-body-grid">
        
         {/* Left Side options / Details panel */}
        <div className="lg:col-span-1 space-y-6" id="playground-side-controls">
          
          {/* Active Preset info */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl" id="tpl-active-details">
            <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">Selected Preset Configuration</h4>
            <p className="font-display text-sm font-bold text-indigo-600 mb-2">{originalTemplate.title}</p>
            <p className="text-slate-600 text-xs leading-relaxed">{originalTemplate.description}</p>
          </div>

          {/* Interactive controls */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3" id="simulation-trigger-pad">
            <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-3">Simulation Commands</h4>
            
            <button
              id="btn-simulate-packet"
              onClick={triggerBurstSimulation}
              disabled={isSimulatingBurst}
              className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 ${
                isSimulatingBurst 
                  ? 'bg-slate-900 text-emerald-400 border border-emerald-500/20 shadow-sm' 
                  : 'bg-indigo-50 hover:bg-indigo-100/80 text-indigo-700 border border-indigo-200'
              }`}
            >
              <Play className={`w-3.5 h-3.5 ${isSimulatingBurst ? 'animate-pulse' : ''}`} />
              {isSimulatingBurst ? 'Packet Burst In Progress...' : 'Simulate Packet Burst'}
            </button>

            <button
              id="btn-trigger-heat"
              onClick={triggerHeatCheck}
              disabled={isHeatChecking}
              className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 ${
                isHeatChecking 
                  ? 'bg-slate-900 text-amber-500 border border-amber-500/20 shadow-sm' 
                  : 'bg-indigo-50/60 hover:bg-indigo-100/50 text-indigo-800 border border-indigo-200/50'
              }`}
            >
              <Activity className={`w-3.5 h-3.5 ${isHeatChecking ? 'animate-spin' : ''}`} />
              {isHeatChecking ? 'Reading Latency States...' : 'Conduct Node Heat Check'}
            </button>

            {(userNodes[activeTemplateId]?.length > 0) && (
              <button
                id="btn-reset-canvas"
                onClick={resetCustomizations}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-semibold text-rose-750 border border-rose-200 bg-rose-50 hover:bg-rose-100 transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Custom Subsystems
              </button>
            )}
          </div>

          {/* Form to inject new node */}
          <form id="form-inject-node" onSubmit={handleAddCustomNode} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1 font-semibold">
              <Plus className="w-3 h-3 text-indigo-600" /> Add Subsystem Node
            </h4>
            
            <div>
              <label className="block text-[10px] text-slate-500 mb-1 font-mono uppercase">Node Identifier Name</label>
              <input 
                id="input-node-name"
                type="text" 
                placeholder="e.g. SQLite Sync Guard" 
                value={newNodeName}
                onChange={(e) => setNewNodeName(e.target.value)}
                maxLength={24}
                className="w-full bg-white text-slate-850 rounded px-2.5 py-1.5 text-xs border border-slate-300 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 shadow-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] text-slate-500 mb-1 font-mono uppercase">Node Role</label>
                <select 
                  id="select-node-type"
                  value={newNodeType}
                  onChange={(e) => setNewNodeType(e.target.value as SystemNode['type'])}
                  className="w-full bg-white text-slate-800 rounded px-2 py-1.5 text-xs border border-slate-300 focus:outline-none focus:border-indigo-650 shadow-sm"
                >
                  <option value="cache">Cache Handler</option>
                  <option value="worker">Worker Routine</option>
                  <option value="database">Database Replica</option>
                  <option value="auth">Security Shield</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 mb-1 font-mono uppercase">Status</label>
                <div id="status-mock-badge" className="text-slate-600 bg-white border border-slate-200 text-[11px] h-[29px] flex items-center justify-center rounded shadow-sm font-medium">
                  Pending Auth
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-slate-500 mb-1 font-mono uppercase">Short Core Description</label>
              <input 
                id="input-node-desc"
                type="text" 
                placeholder="Synchronizes offline DB registers" 
                value={newNodeDetails}
                onChange={(e) => setNewNodeDetails(e.target.value)}
                className="w-full bg-white text-slate-800 rounded px-2.5 py-1.5 text-xs border border-slate-300 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 shadow-sm"
              />
            </div>

            <button
               id="submit-add-node"
              type="submit"
              disabled={!newNodeName.trim()}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-sans text-xs font-semibold rounded cursor-pointer transition-all shadow-sm"
            >
              Link Node Subsystem
            </button>
          </form>

        </div>

        {/* Dynamic Topology Chart canvas - absolute dimensions handled via responsive percentages */}
        <div className="lg:col-span-3 flex flex-col space-y-4" id="playground-right-canvas">
          
          <div id="canvas-wrapper-outer" className="relative flex-1 min-h-[420px] md:min-h-[460px] bg-slate-50 rounded-xl border border-slate-200 overflow-hidden tech-grid shadow-inner flex items-center justify-center p-4">
            
            {/* Ambient Background glow */}
            <div id="ambient-top-glow" className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
            <div id="ambient-btm-glow" className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full bg-indigo-650/[0.03] blur-[120px] pointer-events-none" />

            {/* Instruction overlay when nothing selected */}
            <div id="canvas-overlay" className="absolute bottom-3 left-4 flex items-center gap-2 text-slate-500 pointer-events-none text-xs">
              <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
              <span>Click any node element to query network metrics.</span>
            </div>

            {/* SVG edges vector connector */}
            <svg id="canvas-svg" className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="burstGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {activeEdges.map((edge, index) => {
                const nodeFrom = activeNodes.find(n => n.id === edge.from);
                const nodeTo = activeNodes.find(n => n.id === edge.to);

                if (!nodeFrom || !nodeTo) return null;

                // Simple path coordinates representation
                const x1 = `${nodeFrom.x}%`;
                const y1 = `${nodeFrom.y}%`;
                const x2 = `${nodeTo.x}%`;
                const y2 = `${nodeTo.y}%`;

                return (
                  <g key={`${edge.from}-${edge.to}-${index}`} id={`edge-group-${index}`}>
                    {/* Background link line */}
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="url(#edgeGrad)"
                      strokeWidth={2}
                      className="opacity-70 transition-all duration-500"
                    />

                    {/* Simulating Burst overlay link */}
                    {isSimulatingBurst && (
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="url(#burstGrad)"
                        strokeWidth={3}
                        className="stroke-animated"
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Interactive Node Items */}
            <div id="nodes-overlay-elements" className="absolute inset-0 pointer-events-none z-10">
              {activeNodes.map((node) => {
                const isSelected = node.id === selectedNodeId;
                const isUserAdded = node.id.startsWith('custom-');

                return (
                  <button
                    id={`node-btn-${node.id}`}
                    key={node.id}
                    onClick={() => {
                      setSelectedNodeId(isSelected ? null : node.id);
                    }}
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className={`absolute pointer-events-auto flex flex-col items-center select-none group focus:outline-none transition-all duration-300`}
                  >
                    {/* Central Icon circle wrapper */}
                    <div
                      id={`node-circle-${node.id}`}
                      className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative ${
                        isSelected 
                          ? 'border-indigo-600 bg-indigo-50 shadow-[0_0_15px_rgba(79,70,229,0.3)] scale-110' 
                          : node.status === 'pending'
                          ? 'border-slate-400 bg-slate-50 border-dashed animate-pulse'
                          : getLatencyLoadColor(node.id)
                      } hover:border-slate-400 hover:scale-105`}
                    >
                      {/* Interactive ping state dot */}
                      {node.status === 'active' && (
                        <div id={`ping-${node.id}`} className="absolute top-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-md">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        </div>
                      )}
                      {node.status === 'pending' && (
                        <div id={`pending-${node.id}`} className="absolute top-0 right-0 w-3 h-3 rounded-full bg-yellow-500 border-2 border-white flex items-center justify-center"></div>
                      )}

                      {getNodeIcon(node.type)}
                    </div>

                    {/* Under text label node */}
                    <div id={`label-wrapper-${node.id}`} className="mt-2 flex flex-col items-center">
                      <span className={`text-[11px] font-sans font-semibold text-center whitespace-nowrap bg-white px-2 py-0.5 rounded border shadow-sm ${
                        isSelected ? 'text-indigo-650 border-indigo-200 bg-indigo-50/50' : 'text-slate-800 border-slate-200'
                      }`}>
                        {node.label}
                      </span>
                      {isUserAdded && (
                        <span className="text-[8px] font-mono uppercase tracking-wider text-indigo-600 mt-0.5 font-semibold">User Module</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Node detail display card underneath panel */}
          <AnimatePresence mode="wait">
            {selectedNode ? (
              <motion.div
                id="selected-node-panel"
                key={selectedNode.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="md:col-span-1 border-r border-slate-200/80 pr-4 flex flex-col justify-center" id="selected-meta">
                  <div className="flex items-center gap-2 mb-2" id="selected-title-row">
                    <span className="p-1 px-2 rounded font-mono text-[9px] uppercase tracking-wider bg-indigo-100/60 text-indigo-800 font-semibold border border-indigo-200/40">
                      {selectedNode.type}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${
                      selectedNode.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-yellow-400'
                    }`} />
                    <span className="text-xs text-slate-500 font-semibold capitalize">{selectedNode.status} System</span>
                  </div>
                  <h4 className="font-display font-bold text-slate-800 text-lg">{selectedNode.label}</h4>
                  <p className="text-[11px] font-mono text-indigo-600 mt-1">ID: {selectedNode.id}</p>
                </div>

                <div className="md:col-span-2 flex flex-col justify-center space-y-2" id="selected-params">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block font-semibold">Performance Metric</span>
                    <span className="font-mono text-sm font-semibold text-slate-800">
                      {isHeatChecking 
                        ? 'Recounting...' 
                        : isSimulatingBurst 
                        ? 'Stress Payload (980 req/s)' 
                        : selectedNode.latency || 'Optimized Baseline'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block font-semibold">Behavior Overview</span>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">{selectedNode.details}</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div id="no-node-selected" className="p-4 bg-slate-50 border border-slate-200 rounded-xl border-dashed text-center text-xs text-slate-500 font-medium">
                Pick a dynamic network terminal block in the live playground above to explore diagnostic states.
              </div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}
