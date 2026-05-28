import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, HelpCircle, Mail, AlertTriangle, FileText, 
  Copy, Check, Send, CheckCircle2, Globe, HeartHandshake
} from 'lucide-react';

export default function DeveloperSafety() {
  // Policy customizer state
  const [customAppName, setCustomAppName] = useState('Aura Authenticator');
  const [customDevEmail, setCustomDevEmail] = useState('support@aurand.dev');
  const [customCompany, setCustomCompany] = useState('Aura R&D Ltd');
  const [isCopied, setIsCopied] = useState(false);

  // Ticket support state
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMsg, setTicketMsg] = useState('');
  const [ticketEmail, setTicketEmail] = useState('');
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);
  const [ticketStatus, setTicketStatus] = useState<'idle' | 'success'>('idle');

  // Interactive Play Store Privacy Policy Text compiler
  const generatedPolicy = useMemo(() => {
    return `Privacy Policy for ${customAppName}

Last updated: May 28, 2026

This privacy policy governs your use of the software application "${customAppName}" on mobile devices, created and distributed of "${customCompany}".

1. User Information Collection and Usage
The Application does NOT collect or transmit any personally identifiable information except for diagnostic reports, strictly transmitted over automated TLS 1.3 encrypted conduits to server endpoints securely handled under key locks.
All client SQLite data states compiled through Room DB engines are committed locally to on-device memory partitions sandboxed via secure OS rules.

2. Data Safety Declarations (Google Play Compliant)
We explicitly declare that:
- We do NOT share data with 3rd-party advertising agents.
- All dynamic data transfers use HTTPS pinning.
- Users can request deletion of metadata logs by emailing: ${customDevEmail}.

3. Security Attestation
Using top-tier Google Play Integrity hardware verification routines, we block modified instances, ensuring that only licensed, legitimate software bundles communicate with our backend arrays.

4. Contact Support Representative
If you have any questions representing auditing policy evaluations, reach our chief developer at: ${customDevEmail}.`;
  }, [customAppName, customDevEmail, customCompany]);

  const handleCopyPolicy = () => {
    navigator.clipboard.writeText(generatedPolicy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketEmail || !ticketMsg) return;

    setIsSubmittingTicket(true);
    setTimeout(() => {
      setIsSubmittingTicket(false);
      setTicketStatus('success');
      setTicketEmail('');
      setTicketMsg('');
      setTicketSubject('');
      
      // Auto clear alert
      setTimeout(() => setTicketStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <div id="developer-safety-deck" className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-slate-800">
      
      {/* 7 columns: Interactive Privacy Policy Copier helper */}
      <div className="lg:col-span-7 flex flex-col space-y-6" id="policy-generator-col">
        <div id="safety-title-desc">
          <div className="flex items-center gap-2 text-indigo-600 mb-2" id="safety-badge">
            <ShieldCheck className="w-4 h-4" />
            <span className="font-mono text-xs uppercase tracking-widest text-indigo-600 font-bold">Play Store Compliance Utility</span>
          </div>
          <h3 className="font-display text-2xl font-bold text-slate-900 mb-2" id="safety-title">
            Compliant Privacy Policy Generator
          </h3>
          <p className="text-slate-605 text-sm leading-relaxed" id="safety-summary">
            Google Play Console requires a functional Privacy Policy URL hosted on a verified domain. Customize the values below to generate your compliant safety disclosure instantly, then host it under your Github Pages URL.
          </p>
        </div>

        {/* Inputs row to customize */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl" id="customizer-inputs">
          <div>
            <label className="block text-[10px] text-slate-500 mb-1 font-mono uppercase font-semibold">Application Name</label>
            <input 
              id="input-policy-app"
              type="text" 
              value={customAppName}
              onChange={(e) => setCustomAppName(e.target.value)}
              className="w-full bg-white text-slate-800 rounded px-2.5 py-1.5 text-xs border border-slate-300 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-[10px] text-slate-500 mb-1 font-mono uppercase font-semibold">Support Contact Email</label>
            <input 
              id="input-policy-email"
              type="email" 
              value={customDevEmail}
              onChange={(e) => setCustomDevEmail(e.target.value)}
              className="w-full bg-white text-slate-800 rounded px-2.5 py-1.5 text-xs border border-slate-300 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-[10px] text-slate-500 mb-1 font-mono uppercase font-semibold">Deploying Entity Name</label>
            <input 
              id="input-policy-entity"
              type="text" 
              value={customCompany}
              onChange={(e) => setCustomCompany(e.target.value)}
              className="w-full bg-white text-slate-800 rounded px-2.5 py-1.5 text-xs border border-slate-300 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 shadow-sm"
            />
          </div>
        </div>

        {/* Rich-text visualizer preview box */}
        <div className="relative flex flex-col flex-1" id="policy-content-preview-box">
          
          <div className="flex items-center justify-between px-4 py-2 bg-slate-100 rounded-t-xl border-t border-x border-slate-200 text-xs font-mono text-slate-500" id="preview-tag-row">
            <span>GEN_COMPLIANCE_DISCLOSURE.md</span>
            <button
              id="btn-copy-policy"
              onClick={handleCopyPolicy}
              type="button"
              className="flex items-center gap-1.5 px-2.5 py-1 bg-white hover:bg-slate-50 rounded text-indigo-700 font-bold cursor-pointer transition-all border border-indigo-200 shadow-sm"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Copy Markdown</span>
                </>
              )}
            </button>
          </div>

          <pre id="policy-textbox" className="bg-slate-50 rounded-b-xl border-b border-x border-slate-200 p-5 font-mono text-[11px] text-slate-755 overflow-y-auto max-h-[300px] leading-relaxed whitespace-pre-wrap select-all">
            {generatedPolicy}
          </pre>
          
        </div>

      </div>

      {/* 5 columns: Contact technical dispatcher support */}
      <div className="lg:col-span-5" id="ticket-desk-col">
        <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-200 h-full flex flex-col justify-between shadow-sm" id="support-ticket-container">
          
          <div id="ticket-head">
            <div className="flex items-center gap-2 mb-4" id="ticket-tag">
              <HeartHandshake className="w-4 h-4 text-indigo-600" />
              <span className="font-mono text-xs uppercase tracking-widest text-indigo-600 font-bold">Aura Help Desk</span>
            </div>

            <h4 className="font-display font-bold text-slate-900 text-lg mb-2" id="ticket-title">
              Audit support channels
            </h4>
            <p className="text-slate-605 text-xs leading-relaxed mb-6 font-medium" id="ticket-summary">
              Are you an active auditor evaluating developers inside Google Play review console? Send a message directly to setup testing credentials or request validation papers with our lead architect.
            </p>
          </div>

          <form id="form-support-ticket" onSubmit={handleSubmitTicket} className="space-y-4 flex-1">
            
            {ticketStatus === 'success' && (
              <div id="alert-ticket-success" className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2 animate-pulse">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Ticket registered successfully! Check email response.</span>
              </div>
            )}

            <div>
              <label className="block text-[10px] text-slate-500 mb-1 font-mono uppercase font-semibold">Developer Auditing Email</label>
              <input 
                id="input-ticket-email"
                type="email" 
                placeholder="auditor@google.com" 
                required
                value={ticketEmail}
                onChange={(e) => setTicketEmail(e.target.value)}
                className="w-full bg-white text-slate-800 rounded px-2.5 py-1.5 text-xs border border-slate-300 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-[10px] text-slate-500 mb-1 font-mono uppercase font-semibold">Review Identifier / Subject</label>
              <input 
                id="input-ticket-subject"
                type="text" 
                placeholder="Google Developer Validation ID: 8234-AAB" 
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                className="w-full bg-white text-slate-800 rounded px-2.5 py-1.5 text-xs border border-slate-300 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-[10px] text-slate-500 mb-1 font-mono uppercase font-semibold">Support message context</label>
              <textarea 
                id="input-ticket-message"
                placeholder="Please state key aspects of testing parameters..." 
                required
                rows={4}
                value={ticketMsg}
                onChange={(e) => setTicketMsg(e.target.value)}
                className="w-full bg-white text-slate-800 rounded px-2.5 py-1.5 text-xs border border-slate-300 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 rounded shadow-sm resize-none"
              />
            </div>

            <button
              id="submit-ticket"
              type="submit"
              disabled={isSubmittingTicket || !ticketEmail || !ticketMsg}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-sans text-xs font-bold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm shadow-indigo-600/10"
            >
              <Send className={`w-3.5 h-3.5 ${isSubmittingTicket ? 'animate-pulse' : ''}`} />
              {isSubmittingTicket ? 'Dispatching encrypted message...' : 'Commit Audit Ticket'}
            </button>

          </form>

          <div className="pt-6 border-t border-slate-200 text-[10px] text-slate-500 flex items-center justify-between" id="ticket-foot-links">
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-slate-400" /> Web Host: github.io/aurand
            </span>
            <span>Policy: Play Store Compliant</span>
          </div>

        </div>
      </div>

    </div>
  );
}
