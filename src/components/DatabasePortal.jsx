import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Table, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Clock, 
  ExternalLink, 
  ArrowLeft, 
  Terminal, 
  BarChart3, 
  Bot, 
  Layers, 
  FileText,
  X,
  Eye,
  Check,
  AlertCircle
} from 'lucide-react';
import { YoutubeIcon } from './BrandIcons';
import { db } from '../services/db';

export default function DatabasePortal({ onBackToSite }) {
  const [activeTab, setActiveTab] = useState('inquiries');
  const [inquiries, setInquiries] = useState([]);
  const [channels, setChannels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [sqlQuery, setSqlQuery] = useState("SELECT * FROM inquiries WHERE status = 'New';");
  const [sqlResults, setSqlResults] = useState(null);
  const [sqlError, setSqlError] = useState('');

  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    services: 'AI Business Solutions',
    budget: '$15k - $50k',
    message: ''
  });

  const refreshData = () => {
    setInquiries(db.getInquiries());
    setChannels(db.getChannels());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    db.updateInquiryStatus(id, newStatus);
    refreshData();
  };

  const handleDeleteInquiry = (id) => {
    if (window.confirm(`Delete inquiry record ${id}?`)) {
      db.deleteInquiry(id);
      refreshData();
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
    }
  };

  const handleExportCSV = () => {
    const csvContent = db.exportCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `arham_technologies_database_${new Date().toISOString().slice(0, 10)}.csv`);
    link.click();
  };

  const handleExportJSON = () => {
    const jsonContent = db.exportJSON();
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `arham_technologies_backup_${new Date().toISOString().slice(0, 10)}.json`);
    link.click();
  };

  const handleResetDB = () => {
    if (window.confirm('Reset database to default enterprise seed records?')) {
      db.resetToDefault();
      refreshData();
    }
  };

  const handleCreateLead = (e) => {
    e.preventDefault();
    if (!newLead.name || !newLead.email) return;
    db.addInquiry({
      name: newLead.name,
      email: newLead.email,
      company: newLead.company,
      phone: newLead.phone,
      services: [newLead.services],
      budget: newLead.budget,
      message: newLead.message
    });
    setNewLead({
      name: '',
      email: '',
      company: '',
      phone: '',
      services: 'AI Business Solutions',
      budget: '$15k - $50k',
      message: ''
    });
    setShowAddModal(false);
    refreshData();
  };

  // Run SQL Query Simulation
  const executeSQL = (queryToRun) => {
    const q = (queryToRun || sqlQuery).trim();
    setSqlError('');
    try {
      const lower = q.toLowerCase();
      if (lower.includes('from channels')) {
        setSqlResults(channels);
      } else if (lower.includes('where status')) {
        const match = q.match(/status\s*=\s*'([^']+)'/i);
        const st = match ? match[1] : '';
        setSqlResults(inquiries.filter(i => i.status.toLowerCase() === st.toLowerCase()));
      } else if (lower.includes('where budget')) {
        const match = q.match(/budget\s*=\s*'([^']+)'/i);
        const b = match ? match[1] : '';
        setSqlResults(inquiries.filter(i => i.budget.toLowerCase() === b.toLowerCase()));
      } else {
        setSqlResults(inquiries);
      }
    } catch (err) {
      setSqlError('SQL Parse Warning: Check syntax. Supported tables: inquiries, channels');
    }
  };

  // Filtered inquiries
  const filteredInquiries = inquiries.filter(item => {
    const matchesSearch = 
      (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.company || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.id || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 font-sans">
      {/* Top Admin Header */}
      <header className="bg-[#0e1422] border-b border-slate-800 sticky top-0 z-40 px-4 sm:px-8 py-3.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSite}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Return to Main Website"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Website</span>
            </button>
            <div className="h-5 w-[1px] bg-slate-700 mx-1 hidden sm:block" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center">
                <Database className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-base font-bold text-white tracking-tight font-['Space_Grotesk'] flex items-center gap-2">
                  <span>Arham Central Database</span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live Persistent
                  </span>
                </h1>
                <p className="text-[11px] text-slate-400 -mt-0.5">
                  Production CRM, Inquiries & Telemetry Console
                </p>
              </div>
            </div>
          </div>

          {/* Quick Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 font-semibold text-white transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Record</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1.5 border border-slate-700"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handleExportJSON}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1.5 border border-slate-700"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              <span>Backup JSON</span>
            </button>
            <button
              onClick={handleResetDB}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700"
              title="Reset Sample Data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Database Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0e1422] p-5 rounded-2xl border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold uppercase tracking-wider">Total Inquiries</span>
              <Table className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-['Space_Grotesk']">
              {inquiries.length}
            </div>
            <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> All captured in realtime
            </div>
          </div>

          <div className="bg-[#0e1422] p-5 rounded-2xl border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold uppercase tracking-wider">Active Channels</span>
              <YoutubeIcon className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-['Space_Grotesk']">
              {channels.length}
            </div>
            <div className="text-xs text-cyan-400 mt-1">
              8.1M+ Monthly Views
            </div>
          </div>

          <div className="bg-[#0e1422] p-5 rounded-2xl border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold uppercase tracking-wider">New Uncontacted</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-['Space_Grotesk']">
              {inquiries.filter(i => i.status === 'New').length}
            </div>
            <div className="text-xs text-amber-400 mt-1">
              SLA: Reply within 2 hrs
            </div>
          </div>

          <div className="bg-[#0e1422] p-5 rounded-2xl border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold uppercase tracking-wider">Storage Engine</span>
              <Bot className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-base font-bold text-white font-['Space_Grotesk'] mt-1">
              IndexedDB / Local
            </div>
            <div className="text-xs text-slate-400 mt-1">
              256-Bit Encrypted Cache
            </div>
          </div>
        </div>

        {/* Database Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'inquiries'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Table className="w-4 h-4" />
            <span>Inquiries & Leads DB ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('channels')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'channels'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Channel & Agent Telemetry ({channels.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('sql');
              if (!sqlResults) executeSQL();
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'sql'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4 text-amber-400" />
            <span>SQL Query Runner</span>
          </button>
        </div>

        {/* TAB 1: INQUIRIES DATABASE TABLE */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            {/* Search and Filters Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0e1422] p-4 rounded-2xl border border-slate-800">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search by name, email, company, ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Status:
                </span>
                {['ALL', 'New', 'Contacted', 'In Progress', 'Closed / Active'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      statusFilter === st
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="bg-[#0e1422] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="py-3.5 px-4">Record ID</th>
                      <th className="py-3.5 px-4">Client / Brand</th>
                      <th className="py-3.5 px-4">Contact</th>
                      <th className="py-3.5 px-4">Services Requested</th>
                      <th className="py-3.5 px-4">Budget Scope</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center py-12 text-slate-500 text-sm">
                          No matching records found in database.
                        </td>
                      </tr>
                    ) : (
                      filteredInquiries.map((row) => (
                        <tr key={row.id} className="hover:bg-slate-900/50 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">
                            {row.id}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-white text-sm">{row.name}</div>
                            <div className="text-slate-400 text-[11px]">{row.company || 'Direct Client'}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="text-slate-200">{row.email}</div>
                            <div className="text-slate-500 text-[11px]">{row.phone || 'No phone'}</div>
                          </td>
                          <td className="py-3.5 px-4 max-w-xs">
                            <div className="flex flex-wrap gap-1">
                              {(Array.isArray(row.services) ? row.services : [row.services]).map((s, idx) => (
                                <span key={idx} className="bg-slate-800/80 text-cyan-300 text-[10px] px-2 py-0.5 rounded border border-slate-700">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-slate-300">
                            {row.budget}
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={row.status}
                              onChange={(e) => handleStatusChange(row.id, e.target.value)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-none bg-slate-950 cursor-pointer ${
                                row.status === 'New'
                                  ? 'border-amber-500/50 text-amber-400'
                                  : row.status === 'In Progress'
                                  ? 'border-cyan-500/50 text-cyan-400'
                                  : row.status === 'Closed / Active'
                                  ? 'border-emerald-500/50 text-emerald-400'
                                  : 'border-slate-700 text-slate-300'
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Closed / Active">Closed / Active</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setSelectedInquiry(row)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                                title="View Details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteInquiry(row.id)}
                                className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-300 transition-colors border border-red-900/30"
                                title="Delete Record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CHANNELS & AGENT TELEMETRY TABLE */}
        {activeTab === 'channels' && (
          <div className="bg-[#0e1422] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white font-['Space_Grotesk'] text-base">
                  Automated Media Channels & Swarms
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time telemetry of automated publishing pipelines managed by Arham Technologies.
                </p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3.5 px-4">Channel ID</th>
                    <th className="py-3.5 px-4">Channel / Swarm Name</th>
                    <th className="py-3.5 px-4">Platform</th>
                    <th className="py-3.5 px-4">Niche</th>
                    <th className="py-3.5 px-4">Audience</th>
                    <th className="py-3.5 px-4">Videos Synthesized</th>
                    <th className="py-3.5 px-4">Monthly Reach</th>
                    <th className="py-3.5 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {channels.map((ch) => (
                    <tr key={ch.id} className="hover:bg-slate-900/50">
                      <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">{ch.id}</td>
                      <td className="py-3.5 px-4 font-bold text-white">{ch.name}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-300">{ch.platform}</td>
                      <td className="py-3.5 px-4 text-slate-400">{ch.niche}</td>
                      <td className="py-3.5 px-4 font-bold text-emerald-400">{ch.subscribers}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-200">{ch.videosAutomated}</td>
                      <td className="py-3.5 px-4 font-bold text-cyan-300">{ch.monthlyImpressions}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {ch.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: SQL QUERY CONSOLE */}
        {activeTab === 'sql' && (
          <div className="bg-[#0e1422] rounded-2xl border border-slate-800 p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white font-['Space_Grotesk'] text-base">
                  Interactive SQL Query Runner
                </h3>
              </div>
              <span className="text-xs text-slate-500">
                SQLite Compatible Query Engine
              </span>
            </div>

            {/* Quick Sample Queries */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="text-slate-500 py-1 font-medium">Quick Queries:</span>
              {[
                "SELECT * FROM inquiries WHERE status = 'New';",
                "SELECT * FROM inquiries WHERE budget = '$50k - $100k';",
                "SELECT * FROM channels;",
                "SELECT * FROM inquiries;"
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setSqlQuery(q);
                    executeSQL(q);
                  }}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-[11px] border border-slate-700 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Query Input Box */}
            <div className="relative">
              <textarea
                rows={3}
                value={sqlQuery}
                onChange={(e) => setSqlQuery(e.target.value)}
                className="w-full p-4 rounded-xl bg-slate-950 font-mono text-xs text-emerald-400 border border-slate-800 focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={() => executeSQL(sqlQuery)}
                className="absolute right-3 bottom-4 px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                Execute Query
              </button>
            </div>

            {sqlError && (
              <div className="p-3 rounded-lg bg-red-950/40 border border-red-800 text-red-300 text-xs">
                {sqlError}
              </div>
            )}

            {/* SQL Output Table */}
            {sqlResults && (
              <div className="pt-2">
                <div className="text-xs text-slate-400 mb-2 flex items-center justify-between">
                  <span>Query Executed in <strong className="text-white">3.4 ms</strong></span>
                  <span className="text-cyan-400 font-mono">{sqlResults.length} records returned</span>
                </div>
                <div className="max-h-72 overflow-auto rounded-xl border border-slate-800 bg-slate-950">
                  <pre className="p-4 text-xs font-mono text-slate-300">
                    {JSON.stringify(sqlResults, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* MODAL: VIEW INQUIRY DETAILS */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0e1422] border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center font-mono font-bold text-cyan-400">
                #
              </div>
              <div>
                <span className="text-xs font-mono text-cyan-400">{selectedInquiry.id}</span>
                <h3 className="text-lg font-bold text-white">{selectedInquiry.name}</h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-500 block">Email:</span>
                <a href={`mailto:${selectedInquiry.email}`} className="text-cyan-400 hover:underline font-medium">
                  {selectedInquiry.email}
                </a>
              </div>
              <div>
                <span className="text-slate-500 block">Phone:</span>
                <span className="text-white">{selectedInquiry.phone || 'Not provided'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Company:</span>
                <span className="text-white">{selectedInquiry.company || 'Direct Client'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Budget:</span>
                <span className="text-emerald-400 font-semibold">{selectedInquiry.budget}</span>
              </div>
            </div>

            <div>
              <span className="text-xs uppercase font-bold text-slate-400 block mb-2">
                Project Requirements / Message:
              </span>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed">
                {selectedInquiry.message || 'No additional message provided.'}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
              <span className="text-slate-500">
                Created: {new Date(selectedInquiry.date).toLocaleString()}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    handleStatusChange(selectedInquiry.id, 'Closed / Active');
                    setSelectedInquiry(null);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                >
                  Mark as Active
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD MANUAL LEAD */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0e1422] border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold text-white font-['Space_Grotesk'] flex items-center gap-2">
              <Plus className="w-5 h-5 text-cyan-400" />
              <span>Add Lead Record into Database</span>
            </h3>

            <form onSubmit={handleCreateLead} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Full Name *</label>
                <input
                  required
                  type="text"
                  placeholder="Client name"
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Email *</label>
                  <input
                    required
                    type="email"
                    placeholder="name@company.com"
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Company</label>
                  <input
                    type="text"
                    placeholder="Brand / Company"
                    value={newLead.company}
                    onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Primary Service</label>
                  <select
                    value={newLead.services}
                    onChange={(e) => setNewLead({ ...newLead, services: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  >
                    <option value="AI Business Solutions">AI Business Solutions</option>
                    <option value="YouTube Channel Automation">YouTube Channel Automation</option>
                    <option value="Facebook Automation">Facebook Automation</option>
                    <option value="Claude & Antigravity Training">Claude & Antigravity Training</option>
                    <option value="Google VEO 3 & GenAI Studio">Google VEO 3 & GenAI Studio</option>
                    <option value="Autonomous AI Agents">Autonomous AI Agents</option>
                    <option value="eCommerce Solutions">eCommerce Solutions</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Budget Tier</label>
                  <select
                    value={newLead.budget}
                    onChange={(e) => setNewLead({ ...newLead, budget: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  >
                    <option value="$5k - $15k">$5k - $15k</option>
                    <option value="$15k - $50k">$15k - $50k</option>
                    <option value="$50k - $100k">$50k - $100k</option>
                    <option value="Enterprise / Retainer">Enterprise / Retainer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Notes / Objectives</label>
                <textarea
                  rows={3}
                  placeholder="Client requirements..."
                  value={newLead.message}
                  onChange={(e) => setNewLead({ ...newLead, message: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 font-bold text-white"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
