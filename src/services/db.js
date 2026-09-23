// Client-side persistent database service for Arham Technologies
const DB_STORAGE_KEY = 'arham_tech_db_v1';

const INITIAL_INQUIRIES = [
  {
    id: 'ARH-892104',
    name: 'Tariq Mehmood',
    email: 'tariq.m@gulflogistics.ae',
    company: 'Gulf Horizon Logistics',
    phone: '+971 50 284 9182',
    services: ['Google Flow & Pipelines', 'Autonomous AI Agents'],
    budget: '$50k - $100k',
    status: 'In Progress',
    date: '2026-09-22T14:30:00Z',
    message: 'Need autonomous multi-agent dispatch to automate cross-border freight compliance and real-time shipment routing.'
  },
  {
    id: 'ARH-749120',
    name: 'Sarah Jenkins',
    email: 'sarah@apexmediahub.com',
    company: 'Apex Digital Media',
    phone: '+1 (415) 890-2341',
    services: ['YouTube Channel Automation', 'Google VEO 3 & GenAI Studio'],
    budget: '$15k - $50k',
    status: 'New',
    date: '2026-09-23T04:15:00Z',
    message: 'Looking to launch 3 faceless automated documentary channels using Google VEO 3 video synthesis and Claude scripting.'
  },
  {
    id: 'ARH-631984',
    name: 'Bilal Farooq',
    email: 'bilal@fintechfusion.pk',
    company: 'Fintech Fusion Ltd',
    phone: '+92 300 489 1234',
    services: ['Claude & Antigravity Training', 'AI Business Solutions'],
    budget: '$15k - $50k',
    status: 'Contacted',
    date: '2026-09-21T09:40:00Z',
    message: 'Requesting 2-week corporate training for our 35 engineers on Anthropic Claude 3.7 reasoning and Antigravity agentic workflows.'
  },
  {
    id: 'ARH-512093',
    name: 'Marcus Vance',
    email: 'mvance@nordicretail.se',
    company: 'Nordic Retail Group',
    phone: '+46 8 492 1093',
    services: ['eCommerce Solutions', '24/7 Application Support'],
    budget: 'Enterprise / Retainer',
    status: 'Closed / Active',
    date: '2026-09-19T11:20:00Z',
    message: 'Migrating 4 multi-brand storefronts to headless AI recommendation architecture with 24/7 SLA monitoring.'
  }
];

const INITIAL_CHANNELS = [
  {
    id: 'CH-101',
    name: 'Future Pulse AI',
    platform: 'YouTube',
    niche: 'Emerging Tech & AI',
    subscribers: '142,500',
    videosAutomated: 84,
    monthlyImpressions: '2.4M',
    status: 'Active',
    lastUpload: '2026-09-22'
  },
  {
    id: 'CH-102',
    name: 'CyberDefend Daily',
    platform: 'Facebook Reels',
    niche: 'Cybersecurity Briefings',
    subscribers: '89,200',
    videosAutomated: 126,
    monthlyImpressions: '3.8M',
    status: 'Active',
    lastUpload: '2026-09-23'
  },
  {
    id: 'CH-103',
    name: 'Luxury Escapes 4K',
    platform: 'YouTube (VEO 3)',
    niche: 'AI Travel Cinematic',
    subscribers: '64,100',
    videosAutomated: 42,
    monthlyImpressions: '1.9M',
    status: 'Active',
    lastUpload: '2026-09-21'
  }
];

class DatabaseService {
  constructor() {
    this.init();
  }

  init() {
    try {
      const existing = localStorage.getItem(DB_STORAGE_KEY);
      if (!existing) {
        this.save({
          inquiries: INITIAL_INQUIRIES,
          channels: INITIAL_CHANNELS,
          lastUpdated: new Date().toISOString()
        });
      }
    } catch (e) {
      console.warn('LocalStorage not accessible:', e);
    }
  }

  get() {
    try {
      const data = localStorage.getItem(DB_STORAGE_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to read from database:', e);
    }
    return { inquiries: INITIAL_INQUIRIES, channels: INITIAL_CHANNELS, lastUpdated: new Date().toISOString() };
  }

  save(data) {
    try {
      data.lastUpdated = new Date().toISOString();
      localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to database:', e);
    }
  }

  // --- Inquiries API ---
  getInquiries() {
    return this.get().inquiries || [];
  }

  addInquiry(inquiry) {
    const data = this.get();
    const newRecord = {
      id: `ARH-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString(),
      status: 'New',
      ...inquiry
    };
    data.inquiries = [newRecord, ...(data.inquiries || [])];
    this.save(data);
    return newRecord;
  }

  updateInquiryStatus(id, newStatus) {
    const data = this.get();
    data.inquiries = (data.inquiries || []).map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    );
    this.save(data);
    return data.inquiries;
  }

  deleteInquiry(id) {
    const data = this.get();
    data.inquiries = (data.inquiries || []).filter(item => item.id !== id);
    this.save(data);
    return data.inquiries;
  }

  // --- Channels / Automations API ---
  getChannels() {
    return this.get().channels || [];
  }

  addChannel(channel) {
    const data = this.get();
    const newRecord = {
      id: `CH-${Math.floor(100 + Math.random() * 900)}`,
      status: 'Active',
      lastUpload: new Date().toISOString().split('T')[0],
      ...channel
    };
    data.channels = [newRecord, ...(data.channels || [])];
    this.save(data);
    return newRecord;
  }

  // --- Export Database ---
  exportJSON() {
    return JSON.stringify(this.get(), null, 2);
  }

  exportCSV() {
    const inquiries = this.getInquiries();
    if (!inquiries.length) return '';
    const headers = ['ID', 'Date', 'Name', 'Email', 'Company', 'Phone', 'Services', 'Budget', 'Status', 'Message'];
    const rows = inquiries.map(i => [
      i.id,
      i.date,
      `"${(i.name || '').replace(/"/g, '""')}"`,
      `"${(i.email || '').replace(/"/g, '""')}"`,
      `"${(i.company || '').replace(/"/g, '""')}"`,
      `"${(i.phone || '').replace(/"/g, '""')}"`,
      `"${(Array.isArray(i.services) ? i.services.join(', ') : '').replace(/"/g, '""')}"`,
      `"${(i.budget || '').replace(/"/g, '""')}"`,
      i.status,
      `"${(i.message || '').replace(/"/g, '""')}"`
    ]);
    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }

  resetToDefault() {
    this.save({
      inquiries: INITIAL_INQUIRIES,
      channels: INITIAL_CHANNELS,
      lastUpdated: new Date().toISOString()
    });
    return this.get();
  }
}

export const db = new DatabaseService();
