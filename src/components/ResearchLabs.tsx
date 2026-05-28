import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, FileText, ChevronRight, X, Clock, User, 
  Tag, Download, Award, ShieldCheck, CheckSquare, Square, 
  HelpCircle, Sparkles, FileCheck, ExternalLink
} from 'lucide-react';
import { RESEARCH_ARTICLES } from '../data';
import { ResearchArticle } from '../types';

export default function ResearchLabs() {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // Interactive Android Compliance Checklist state
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    'app-id': true,
    'tls-13': true,
    'play-integrity': false,
    'data-safety': false,
    'sandboxing': false,
    'privacy-page': false,
    'support-channel': false,
  });

  const categories = ['All', 'Android OS', 'Play Store Compliance', 'Systems Cryptography'];

  const filteredArticles = RESEARCH_ARTICLES.filter(art => 
    activeCategory === 'All' || art.category === activeCategory
  );

  const activeArticle = RESEARCH_ARTICLES.find(art => art.id === selectedArticleId);

  // Compliance items metadata
  const COMPLIANCE_ITEMS = [
    {
      id: 'app-id',
      title: 'Namespace & Package Unique Identifier',
      desc: 'Verify that your application ID (e.g. com.aurand.authenticator) avoids generic subdomains and aligns directly with your verified brand domain.',
      category: 'Publishing Integrity'
    },
    {
      id: 'tls-13',
      title: 'Strict TLS 1.3 Transport Layer Verification',
      desc: 'Formulate Network Security Configuration XML policies to intercept cleartext traffic and mandate high-end verified TLS protocols.',
      category: 'Encryption'
    },
    {
      id: 'play-integrity',
      title: 'Google Play Integrity Attestation Integration',
      desc: 'Hook up client-side modules to request safety challenge verdicts before communicating user states or secrets to databases.',
      category: 'Device Trust'
    },
    {
      id: 'data-safety',
      title: 'Formulate Transparent Data Safety Sheets',
      desc: 'Commit clear declaration tables inside play console specifying what diagnostic telemetry, file transfers, or emails you collect.',
      category: 'Play Console Review'
    },
    {
      id: 'sandboxing',
      title: 'Adopt SDK 34 Code-Loading Restrictions',
      desc: 'Refactor background receivers and services to register dynamic receiver intents securely under application container limits.',
      category: 'System Sandboxing'
    },
    {
      id: 'privacy-page',
      title: 'Responsive Privacy Policy Verification Page',
      desc: 'A permanent, accessible web address disclosing user legal terms. (Hint: Aura R&D provides standard templates ready below!)',
      category: 'Compliance Legal'
    },
    {
      id: 'support-channel',
      title: 'Direct Developer Support Address',
      desc: 'Establish a working contact inbox where Play Store auditing reviewers can reach system architects directly during testing.',
      category: 'Console Registration'
    },
  ];

  const toggleCheckItem = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Compute stats
  const totalItemsCount = COMPLIANCE_ITEMS.length;
  const checkedItemsCount = Object.values(checkedItems).filter(Boolean).length;
  const scorePercent = Math.round((checkedItemsCount / totalItemsCount) * 100);

  const getIntegrityVerdict = (percentage: number) => {
    if (percentage === 100) return { title: 'Audit Ready / Secure', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
    if (percentage >= 60) return { title: 'Compliance Baseline Attained', color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' };
    return { title: 'Incomplete Framework', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' };
  };

  const verdict = getIntegrityVerdict(scorePercent);

  return (
    <div id="research-labs-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-slate-800">
      
      {/* 2/3 Content: Scientific Literature & Publications */}
      <div className="lg:col-span-7 flex flex-col space-y-6" id="publications-grid">
        <div id="labs-header">
          <div className="flex items-center gap-2 text-indigo-600 mb-2" id="labs-subtitle-row">
            <BookOpen className="w-4 h-4" />
            <span className="font-mono text-xs uppercase tracking-widest text-indigo-600 font-semibold">Technical Lab & Journal</span>
          </div>
          <h3 className="font-display text-2xl font-bold text-slate-900 mb-2" id="labs-title">
            Scientific Archives & Research Papers
          </h3>
          <p className="text-slate-600 text-sm max-w-xl" id="labs-description">
            Explore whitepapers, specifications, and layout benchmarks compiled by Aura engineers to accelerate Android system stability and play validation operations.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap gap-2 pt-2" id="labs-filters">
          {categories.map((cat) => (
            <button
              id={`btn-cat-${cat}`}
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                activeCategory === cat
                  ? 'bg-indigo-150 text-indigo-700 border border-indigo-300 shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* List of articles */}
        <div className="space-y-4" id="labs-articles-scroll">
          {filteredArticles.map((article) => (
            <div
              id={`article-card-${article.id}`}
              key={article.id}
              className="p-5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all duration-300 group cursor-pointer"
              onClick={() => setSelectedArticleId(article.id)}
            >
              <div className="flex items-center gap-3 mb-3 text-slate-500 text-xs font-mono" id={`article-m-${article.id}`}>
                <span className="p-1 px-1.5 rounded bg-indigo-50 border border-indigo-100 text-indigo-700">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 font-medium text-slate-600">
                  <Clock className="w-3 h-3 text-slate-500" /> {article.readTime}
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline font-medium text-slate-500">{article.publishedDate}</span>
              </div>
              <h4 className="font-display font-bold text-slate-800 group-hover:text-indigo-600 text-lg transition-colors mb-2" id={`article-t-${article.id}`}>
                {article.title}
              </h4>
              <p className="text-slate-600 text-xs leading-relaxed mb-4 font-medium" id={`article-s-${article.id}`}>
                {article.summary}
              </p>
              <div className="flex items-center justify-between text-xs text-indigo-650 font-mono" id={`article-action-${article.id}`}>
                <span className="text-slate-500 text-[11px] font-medium">Paper Author: {article.author}</span>
                <button id={`btn-open-paper-${article.id}`} className="flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold text-indigo-600 cursor-pointer">
                  Read Science Paper <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Immersive Slide Drawer Overlay for Article reading */}
        <AnimatePresence>
          {selectedArticleId && activeArticle && (
            <motion.div
              id="immersive-reader-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex justify-end p-4 md:p-6"
            >
              <motion.div
                id="immersive-reader-pane"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 120 }}
                className="w-full max-w-4xl bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-2xl flex flex-col overflow-y-auto"
              >
                {/* Header of reading pane */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6" id="reader-top-bar">
                  <div className="flex items-center gap-2 text-indigo-600" id="reader-academic-badge">
                    <FileText className="w-4 h-4" />
                    <span className="font-mono text-xs uppercase tracking-wider font-bold">Peer-Reviewed Protocol</span>
                  </div>
                  <button
                    id="btn-close-reader"
                    onClick={() => setSelectedArticleId(null)}
                    className="p-1 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-all text-xs flex items-center gap-1 border border-slate-250 cursor-pointer shadow-sm"
                  >
                    Close Document <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1" id="reader-document-content">
                  <div className="flex flex-wrap items-center gap-3 text-slate-500 text-xs font-mono mb-4" id="reader-meta">
                    <span className="text-indigo-600 font-semibold">{activeArticle.category}</span>
                    <span>•</span>
                    <span>Published: {activeArticle.publishedDate}</span>
                    <span>•</span>
                    <span>{activeArticle.readTime}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5"><User className="w-3 h-3 text-slate-400" /> {activeArticle.author}</span>
                  </div>

                  <h1 className="font-display font-extrabold text-slate-900 text-2xl md:text-3xl leading-tight mb-6" id="reader-main-title">
                    {activeArticle.title}
                  </h1>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 mb-8 text-xs text-slate-650 italic leading-relaxed" id="reader-abstract">
                    <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-indigo-600 block not-italic mb-1">Document Abstract</span>
                    {activeArticle.summary}
                  </div>

                  {/* Scientific Body Content Renderer */}
                  <div className="prose max-w-none text-slate-700 text-xs md:text-sm leading-relaxed space-y-6" id="reader-md-body">
                    {activeArticle.content.split('\n\n').map((block, idx) => {
                      if (block.startsWith('### ')) {
                        return <h3 key={idx} className="font-display font-bold text-slate-900 text-lg pt-4 pb-1 border-b border-slate-200 flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-indigo-650" /> {block.replace('### ', '')}</h3>;
                      }
                      if (block.startsWith('- ')) {
                        return (
                          <ul key={idx} className="list-disc pl-5 space-y-2 mt-2 font-medium">
                            {block.split('\n').map((li, lidx) => (
                              <li key={lidx}>{li.replace('- ', '')}</li>
                            ))}
                          </ul>
                        );
                      }
                      if (block.startsWith('```')) {
                        const code = block.replace(/```[a-z]*/, '').replace(/```$/, '').trim();
                        return (
                          <pre key={idx} className="p-4 bg-slate-50 rounded-lg overflow-x-auto border border-slate-200 font-mono text-[11px] text-indigo-700 leading-5 my-4 shadow-inner">
                            <code>{code}</code>
                          </pre>
                        );
                      }
                      return <p key={idx} className="whitespace-pre-line font-medium leading-relaxed">{block}</p>;
                    })}
                  </div>
                </div>

                <div className="border-t border-slate-200 mt-10 pt-4 flex items-center justify-between text-xs text-slate-500 font-medium" id="reader-footer">
                  <span className="font-mono text-[10px]">Citations: IEEE / Aura-RFC-00{activeArticle.id.length}</span>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded text-[10px] font-mono hover:text-slate-900 transition-all cursor-pointer flex items-center gap-1 shadow-sm">
                      <Download className="w-3 h-3 text-indigo-650" /> Download PDF Payload
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* 1/3 Content: Android Compliance Checker Widget */}
      <div className="lg:col-span-5" id="labs-compliance-checker">
        <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-200 sticky top-24 shadow-sm" id="compliance-checklist-container">
          
          <div className="flex items-center gap-2 mb-4" id="compliance-header-tag">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span className="font-mono text-xs uppercase tracking-widest text-indigo-600 font-bold">Systems Compliance Engine</span>
          </div>

          <h4 className="font-display font-bold text-slate-900 text-lg mb-2" id="compliance-main-title">
            Android Developer Account Validation
          </h4>
          <p className="text-slate-650 text-xs leading-relaxed mb-6 font-medium" id="compliance-intro">
            Google Play Console requires complete transparency and architectural readiness. Verify your developer environment credentials before submission.
          </p>

          {/* Interactive Gauge Score Indicator */}
          <div className="p-4 bg-white rounded-xl border border-slate-200 mb-6 flex items-center justify-between shadow-sm animate-fade-in" id="compliance-gauge">
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-semibold">Integrity Score</span>
              <div className="flex items-baseline gap-1" id="compliance-digits-row">
                <span className="text-3xl font-display font-bold text-slate-800 mb-1">{scorePercent}%</span>
                <span className="text-slate-500 font-mono text-xs font-semibold">/ 100%</span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${verdict.color} mt-1 inline-block`}>
                {verdict.title}
              </span>
            </div>
            
            {/* Visual Circular dial graph */}
            <div className="relative w-20 h-20" id="compliance-dial-visual">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  stroke="#e2e8f0"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  stroke="#4f46e5"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray="213"
                  strokeDashoffset={213 - (213 * scorePercent) / 100}
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-slate-500 font-semibold">
                {checkedItemsCount} of {totalItemsCount}
              </div>
            </div>
          </div>

          {/* Checklist interactive blocks */}
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 mb-6" id="compliance-scroll-list">
            {COMPLIANCE_ITEMS.map((item) => {
              const isChecked = checkedItems[item.id] || false;
              return (
                <div
                  id={`check-row-${item.id}`}
                  key={item.id}
                  onClick={() => toggleCheckItem(item.id)}
                  className={`p-3 rounded-lg border cursor-pointer select-none transition-all flex items-start gap-3 shadow-sm ${
                    isChecked 
                      ? 'bg-indigo-50/60 border-indigo-200' 
                      : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50/40'
                  }`}
                >
                  <button id={`btn-check-toggle-${item.id}`} className="mt-0.5 flex-shrink-0 text-indigo-650 cursor-pointer">
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                  <div id={`check-meta-${item.id}`} className="space-y-1">
                    <div className="flex items-center gap-1.5" id={`check-flex-${item.id}`}>
                      <span className={`text-xs font-bold ${isChecked ? 'text-indigo-700' : 'text-slate-800'}`}>
                        {item.title}
                      </span>
                      <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest bg-slate-100 border border-slate-200/60 px-1 rounded font-medium">
                        {item.category.split(' ')[0]}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-600 leading-normal font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Certificate reward if score = 100 */}
          <AnimatePresence>
            {scorePercent === 100 && (
              <motion.div
                id="compliance-badge"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-4 rounded-xl bg-emerald-50 border border-emerald-250 flex items-center gap-3 text-emerald-800 shadow-sm"
              >
                <Award className="w-8 h-8 text-emerald-600 flex-shrink-0 animate-bounce" />
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-700 font-bold block">Attestation Complete</span>
                  <span className="text-xs font-bold text-slate-950 block">Audit Pass: Aura-82639-PASS</span>
                  <span className="text-[10px] text-emerald-700/90 leading-normal block font-medium">This pipeline is verified ready for Android Play Developer publishing.</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

    </div>
  );
}
