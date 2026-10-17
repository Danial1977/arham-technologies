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
  AlertCircle,
  Lock,
  LogOut,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { YoutubeIcon } from './BrandIcons';
import { db } from '../services/db';
import AdminLoginModal from './AdminLoginModal';

export default function DatabasePortal({ onBackToSite }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
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

  // Check authentication on mount
  useEffect(() => {
    const authed = localStorage.getItem('arham_admin_authenticated') === 'true';
    if (authed) {
      setIsAuthenticated(true);
      refreshData();
    } else {
      setIsAuthenticated(false);
      setShowLoginModal(true);
    }
  }, []);

  const refreshData = () => {
    setInquiries(db.getInquiries());
    setChannels(db.getChannels());
  };

  const handleLogout = () => {
    localStorage.removeItem('arham_admin_authenticated');
    localStorage.removeItem('arham_admin_user');
    setIsAuthenticated(false);
    if (onBackToSite) {
      onBackToSite();
    }
  };

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

  // If not logged in, show elegant login backdrop with modal
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] text-[#332015] font-sans flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-md space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#8C5E2D] via-[#B89F70] to-[#523C1B] p-1 mx-auto flex items-center justify-center shadow-lg">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#26160C] font-['Cinzel']">
            Arham Technologies Admin Console
          </h2>
          <p className="text-sm text-[#664E40]">
            This portal is restricted to authorized administrative personnel.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-6 py-2.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#8C5E2D] to-[#523C1B] shadow-md shadow-[#8C5E2D]/20"
            >
              Sign In to Admin Console
            </button>
            <button
              onClick={onBackToSite}
              className="px-5 py-2.5 rounded-full font-semibold text-sm text-[#26160C] bg-white border border-[#E8DFD5] hover:bg-[#F5EFE6]"
            >
              Back to Site
            </button>
          </div>
        </div>

        <AdminLoginModal
          isOpen={showLoginModal}
          onClose={() => {
            setShowLoginModal(false);
            if (!isAuthenticated) onBackToSite();
          }}
          onSuccess={() => {
            setIsAuthenticated(true);
            setShowLoginModal(false);
            refreshData();
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#332015] font-sans">
      
      {/* Top Admin Header - Heritage Walnut Light Theme */}
      <header className="bg-white/95 backdrop-blur-md border-b border-[#E8DFD5] sticky top-0 z-40 px-4 sm:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSite}
              className="p-2 rounded-xl bg-[#F5EFE6] hover:bg-[#E8DEC8] text-[#26160C] transition-colors flex items-center gap-1.5 text-xs font-semibold border border-[#E8DFD5]"
              title="Return to Main Website"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Website</span>
            </button>
            <div className="h-5 w-[1px] bg-[#E8DFD5] mx-1 hidden sm:block" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#F5EFE6] border border-[#E8DFD5] flex items-center justify-center">
                <Database className="w-4 h-4 text-[#8C5E2D]" />
              </div>
              <div>
                <h1 className="text-base font-bold text-[#26160C] tracking-tight font-['Cinzel'] flex items-center gap-2">
                  <span>Arham Central Database</span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Live Persistent
                  </span>
                </h1>
                <p className="text-[11px] text-[#664E40] -mt-0.5">
                  CRM, Inquiries & Telemetry Console • User: <span className="font-semibold text-[#8C5E2D]">arhamtechnologiesltd@gmail.com</span>
                </p>
              </div>
            </div>
          </div>

          {/* Quick Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#8C5E2D] to-[#523C1B] hover:from-[#734A1F] hover:to-[#3A2910] font-semibold text-white transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Record</span>
            </button>
            <button
              onClick={handleExportCSV}
              className="px-3 py-2 rounded-lg bg-white hover:bg-[#F5EFE6] text-[#26160C] transition-colors flex items-center gap-1.5 border border-[#E8DFD5]"
            >
              <Download className="w-3.5 h-3.5 text-[#8C5E2D]" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handleExportJSON}
              className="px-3 py-2 rounded-lg bg-white hover:bg-[#F5EFE6] text-[#26160C] transition-colors flex items-center gap-1.5 border border-[#E8DFD5]"
            >
              <FileText className="w-3.5 h-3.5 text-[#8C5E2D]" />
              <span>Backup JSON</span>
            </button>
            <button
              onClick={handleResetDB}
              className="p-2 rounded-lg bg-white hover:bg-[#F5EFE6] text-[#664E40] hover:text-[#26160C] transition-colors border border-[#E8DFD5]"
              title="Reset Sample Data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 transition-colors flex items-center gap-1.5 border border-red-200 font-semibold"
              title="Sign Out of Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Database Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        
        {/* Metric Cards Row - Warm Ivory & White */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E8DFD5] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#664E40] mb-2">
              <span className="font-semibold uppercase tracking-wider">Total Inquiries</span>
              <Table className="w-4 h-4 text-[#8C5E2D]" />
            </div>
            <div className="text-3xl font-extrabold text-[#26160C] font-['Cinzel']">
              {inquiries.length}
            </div>
            <div className="text-xs text-emerald-700 mt-1 flex items-center gap-1 font-medium">
              <CheckCircle className="w-3 h-3 text-emerald-600" /> All captured in realtime
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8DFD5] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#664E40] mb-2">
              <span className="font-semibold uppercase tracking-wider">Active Channels</span>
              <YoutubeIcon className="w-4 h-4 text-red-600" />
            </div>
            <div className="text-3xl font-extrabold text-[#26160C] font-['Cinzel']">
              {channels.length}
            </div>
            <div className="text-xs text-[#8C5E2D] mt-1 font-medium">
              8.1M+ Monthly Views
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8DFD5] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#664E40] mb-2">
              <span className="font-semibold uppercase tracking-wider">New Uncontacted</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-3xl font-extrabold text-[#26160C] font-['Cinzel']">
              {inquiries.filter(i => i.status === 'New').length}
            </div>
            <div className="text-xs text-amber-700 mt-1 font-medium">
              SLA: Reply within 2 hrs
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8DFD5] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#664E40] mb-2">
              <span className="font-semibold uppercase tracking-wider">Storage Engine</span>
              <Bot className="w-4 h-4 text-[#8C5E2D]" />
            </div>
            <div className="text-base font-bold text-[#26160C] font-['Cinzel'] mt-1">
              IndexedDB / Local
            </div>
            <div className="text-xs text-[#664E40] mt-1">
              256-Bit Encrypted Cache
            </div>
          </div>
        </div>

        {/* Database Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#E8DFD5] pb-3">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'inquiries'
                ? 'bg-[#8C5E2D] text-white shadow-md shadow-[#8C5E2D]/20'
                : 'bg-white text-[#664E40] hover:text-[#26160C] border border-[#E8DFD5]'
            }`}
          >
            <Table className="w-4 h-4" />
            <span>Inquiries & Leads DB ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('channels')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'channels'
                ? 'bg-[#8C5E2D] text-white shadow-md shadow-[#8C5E2D]/20'
                : 'bg-white text-[#664E40] hover:text-[#26160C] border border-[#E8DFD5]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Automated Channels ({channels.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('sql')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'sql'
                ? 'bg-[#8C5E2D] text-white shadow-md shadow-[#8C5E2D]/20'
                : 'bg-white text-[#664E40] hover:text-[#26160C] border border-[#E8DFD5]'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Interactive SQL Terminal</span>
          </button>
        </div>

        {/* TAB 1: Inquiries Table */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-2xl border border-[#E8DFD5] shadow-xs overflow-hidden">
            {/* Search and Filters Bar */}
            <div className="p-4 sm:p-5 border-b border-[#E8DFD5] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FAF7F2]">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[#8C7A6D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, company, email, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-[#E8DFD5] text-xs text-[#26160C] placeholder-[#8C7A6D] focus:outline-none focus:border-[#8C5E2D]"
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-1.5 text-xs text-[#664E40]">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Status:</span>
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-white border border-[#E8DFD5] text-xs text-[#26160C] focus:outline-none focus:border-[#8C5E2D]"
                >
                  <option value="ALL">All Statuses ({inquiries.length})</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F5EFE6] text-[#26160C] font-bold uppercase tracking-wider border-b border-[#E8DFD5]">
                  <tr>
                    <th className="py-3 px-4">Record ID</th>
                    <th className="py-3 px-4">Client / Company</th>
                    <th className="py-3 px-4">Services Target</th>
                    <th className="py-3 px-4">Budget Tier</th>
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DFD5]/60">
                  {filteredInquiries.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-[#664E40]">
                        No inquiry records matching current query or filters.
                      </td>
                    </tr>
                  ) : (
                    filteredInquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-[#FAF7F2] transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-[#8C5E2D]">
                          {inq.id}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-[#26160C]">{inq.name}</div>
                          <div className="text-[11px] text-[#664E40]">{inq.company || inq.email}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-block px-2 py-0.5 rounded-md bg-[#F5EFE6] text-[#8C5E2D] font-semibold border border-[#E8DFD5]">
                            {Array.isArray(inq.services) ? inq.services[0] : inq.services}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-[#26160C]">
                          {inq.budget}
                        </td>
                        <td className="py-3 px-4 text-[#664E40] font-mono text-[11px]">
                          {new Date(inq.timestamp).toLocaleDateString()} {new Date(inq.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={inq.status}
                            onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${
                              inq.status === 'New' 
                                ? 'bg-amber-50 text-amber-900 border-amber-300' 
                                : inq.status === 'Contacted'
                                ? 'bg-blue-50 text-blue-900 border-blue-300'
                                : 'bg-emerald-50 text-emerald-900 border-emerald-300'
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => setSelectedInquiry(inq)}
                            className="p-1 rounded text-[#8C5E2D] hover:text-[#734A1F] hover:bg-[#F5EFE6] transition-colors"
                            title="Inspect Record"
                          >
                            <Eye className="w-4 h-4 inline" />
                          </button>
                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-1 rounded text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4 inline" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Channels Table */}
        {activeTab === 'channels' && (
          <div className="bg-white rounded-2xl border border-[#E8DFD5] shadow-xs overflow-hidden">
            <div className="p-5 border-b border-[#E8DFD5] bg-[#FAF7F2] flex items-center justify-between">
              <div>
                <h3 className="font-bold text-[#26160C] font-['Cinzel'] text-base">
                  Automated Media Syndication Channels
                </h3>
                <p className="text-xs text-[#664E40]">
                  Live status, views, automated upload frequencies, and monetization health.
                </p>
              </div>
              <span className="text-xs font-bold text-[#8C5E2D] bg-[#F5EFE6] border border-[#E8DFD5] px-3 py-1 rounded-lg">
                100% Zero-Touch
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F5EFE6] text-[#26160C] font-bold uppercase tracking-wider border-b border-[#E8DFD5]">
                  <tr>
                    <th className="py-3 px-4">Channel Identifier</th>
                    <th className="py-3 px-4">Niche / Category</th>
                    <th className="py-3 px-4">Platform</th>
                    <th className="py-3 px-4">Subscribers</th>
                    <th className="py-3 px-4">Monthly Views</th>
                    <th className="py-3 px-4">Automation Model</th>
                    <th className="py-3 px-4">Monetization</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DFD5]/60">
                  {channels.map((ch) => (
                    <tr key={ch.id} className="hover:bg-[#FAF7F2] transition-colors">
                      <td className="py-3.5 px-4 font-bold text-[#26160C]">
                        {ch.name}
                      </td>
                      <td className="py-3.5 px-4 text-[#664E40]">
                        {ch.niche}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-50 text-red-700 font-bold border border-red-200">
                          <YoutubeIcon className="w-3.5 h-3.5" />
                          <span>{ch.platform}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-[#26160C]">
                        {ch.subscribers}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">
                        {ch.monthlyViews}
                      </td>
                      <td className="py-3.5 px-4 text-[#664E40] font-mono text-[11px]">
                        {ch.model}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-[10px]">
                          <Check className="w-3 h-3" /> Enabled
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: SQL Terminal */}
        {activeTab === 'sql' && (
          <div className="bg-white rounded-2xl border border-[#E8DFD5] shadow-xs p-6 space-y-4">
            <div>
              <h3 className="font-bold text-[#26160C] font-['Cinzel'] text-base">
                Interactive SQL Query Console
              </h3>
              <p className="text-xs text-[#664E40]">
                Query internal datasets directly using standard SQL syntax.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="text-[#664E40] self-center">Quick Templates:</span>
              <button
                onClick={() => {
                  setSqlQuery("SELECT * FROM inquiries WHERE status = 'New';");
                  executeSQL("SELECT * FROM inquiries WHERE status = 'New';");
                }}
                className="px-2.5 py-1 rounded bg-[#F5EFE6] hover:bg-[#E8DEC8] border border-[#E8DFD5] text-[#8C5E2D] font-mono font-bold"
              >
                New Inquiries
              </button>
              <button
                onClick={() => {
                  setSqlQuery("SELECT * FROM inquiries WHERE budget = '$50k - $100k';");
                  executeSQL("SELECT * FROM inquiries WHERE budget = '$50k - $100k';");
                }}
                className="px-2.5 py-1 rounded bg-[#F5EFE6] hover:bg-[#E8DEC8] border border-[#E8DFD5] text-[#8C5E2D] font-mono font-bold"
              >
                High Budget Leads
              </button>
              <button
                onClick={() => {
                  setSqlQuery("SELECT * FROM channels;");
                  executeSQL("SELECT * FROM channels;");
                }}
                className="px-2.5 py-1 rounded bg-[#F5EFE6] hover:bg-[#E8DEC8] border border-[#E8DFD5] text-[#8C5E2D] font-mono font-bold"
              >
                All Channels
              </button>
            </div>

            <div className="relative">
              <textarea
                rows={3}
                value={sqlQuery}
                onChange={(e) => setSqlQuery(e.target.value)}
                className="w-full p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] font-mono text-xs text-[#26160C] focus:outline-none focus:border-[#8C5E2D]"
              />
              <button
                onClick={() => executeSQL()}
                className="absolute right-3 bottom-3 px-4 py-1.5 rounded-lg font-bold text-xs text-white bg-gradient-to-r from-[#8C5E2D] to-[#523C1B] hover:from-[#734A1F] hover:to-[#3A2910] shadow-xs"
              >
                Execute Query
              </button>
            </div>

            {sqlError && (
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-300 text-xs text-amber-800">
                {sqlError}
              </div>
            )}

            {sqlResults && (
              <div className="pt-2">
                <div className="text-xs font-bold text-[#664E40] mb-2">
                  Results: {sqlResults.length} records returned
                </div>
                <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DFD5] overflow-x-auto max-h-80">
                  <pre className="font-mono text-xs text-[#26160C]">
                    {JSON.stringify(sqlResults, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* MODAL: Record Inspection */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26160C]/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl max-w-lg w-full p-6 relative shadow-2xl text-[#332015]">
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-[#F5EFE6] text-[#664E40] hover:text-[#26160C] hover:bg-[#E8DEC8]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono font-bold text-[#8C5E2D] text-sm">{selectedInquiry.id}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold border border-amber-200">
                {selectedInquiry.status}
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#26160C] font-['Cinzel'] mb-1">
              {selectedInquiry.name}
            </h3>
            <p className="text-xs text-[#664E40] mb-4">
              {selectedInquiry.company || 'Private Entity'} • {selectedInquiry.email} {selectedInquiry.phone ? `• ${selectedInquiry.phone}` : ''}
            </p>

            <div className="space-y-3 bg-white p-4 rounded-xl border border-[#E8DFD5] text-xs mb-6">
              <div>
                <span className="text-[#664E40] block font-medium">Selected Services Target:</span>
                <span className="font-bold text-[#26160C]">
                  {Array.isArray(selectedInquiry.services) ? selectedInquiry.services.join(', ') : selectedInquiry.services}
                </span>
              </div>
              <div>
                <span className="text-[#664E40] block font-medium">Project Budget:</span>
                <span className="font-bold text-[#26160C]">{selectedInquiry.budget}</span>
              </div>
              <div>
                <span className="text-[#664E40] block font-medium">Client Message:</span>
                <p className="text-[#332015] mt-1 leading-relaxed bg-[#FAF7F2] p-3 rounded-lg border border-[#E8DFD5]">
                  {selectedInquiry.message || 'No additional message provided.'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <a
                href={`mailto:${selectedInquiry.email}?subject=Arham%20Technologies%20Architecture%20Discovery`}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#8C5E2D] to-[#523C1B] shadow-sm flex items-center gap-1.5"
              >
                <span>Draft Reply Email</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#664E40] hover:text-[#26160C]"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Add New Lead */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26160C]/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl max-w-lg w-full p-6 relative shadow-2xl text-[#332015]">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-[#F5EFE6] text-[#664E40] hover:text-[#26160C] hover:bg-[#E8DEC8]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-[#26160C] font-['Cinzel'] mb-4">
              Add New Lead Record
            </h3>

            <form onSubmit={handleCreateLead} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#26160C] mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  placeholder="e.g. John Smith"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E8DFD5] text-xs text-[#26160C] focus:border-[#8C5E2D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#26160C] mb-1">Business Email *</label>
                <input
                  type="email"
                  required
                  value={newLead.email}
                  onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                  placeholder="john@enterprise.com"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E8DFD5] text-xs text-[#26160C] focus:border-[#8C5E2D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#26160C] mb-1">Company</label>
                  <input
                    type="text"
                    value={newLead.company}
                    onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
                    placeholder="Acme Corp"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E8DFD5] text-xs text-[#26160C] focus:border-[#8C5E2D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#26160C] mb-1">Phone</label>
                  <input
                    type="tel"
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    placeholder="+44 7000 000000"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E8DFD5] text-xs text-[#26160C] focus:border-[#8C5E2D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#26160C] mb-1">Target Service</label>
                  <select
                    value={newLead.services}
                    onChange={(e) => setNewLead({ ...newLead, services: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E8DFD5] text-xs text-[#26160C] focus:border-[#8C5E2D]"
                  >
                    <option value="AI Business Solutions">AI Business Solutions</option>
                    <option value="YouTube Channel Automation">YouTube Automation</option>
                    <option value="Facebook Automation">Facebook Automation</option>
                    <option value="Claude & Antigravity Training">Claude & Antigravity</option>
                    <option value="Google VEO 3 Studio">Google VEO 3 Studio</option>
                    <option value="Autonomous AI Agents">Autonomous AI Agents</option>
                    <option value="eCommerce Solutions">eCommerce Solutions</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#26160C] mb-1">Budget</label>
                  <select
                    value={newLead.budget}
                    onChange={(e) => setNewLead({ ...newLead, budget: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E8DFD5] text-xs text-[#26160C] focus:border-[#8C5E2D]"
                  >
                    <option value="$5k - $15k">$5k - $15k</option>
                    <option value="$15k - $50k">$15k - $50k</option>
                    <option value="$50k - $100k">$50k - $100k</option>
                    <option value="Enterprise / Retainer">Enterprise / Retainer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#26160C] mb-1">Message</label>
                <textarea
                  rows={3}
                  value={newLead.message}
                  onChange={(e) => setNewLead({ ...newLead, message: e.target.value })}
                  placeholder="Notes about the lead requirements..."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#E8DFD5] text-xs text-[#26160C] focus:border-[#8C5E2D]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#664E40] hover:text-[#26160C]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#8C5E2D] to-[#523C1B] shadow-sm"
                >
                  Save Lead Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
