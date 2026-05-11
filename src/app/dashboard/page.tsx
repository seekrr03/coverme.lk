'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Lead {
  id: number;
  full_name: string;
  phone: string;
  email: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  civil_status: string | null;
  spouse_name: string | null;
  spouse_dob: string | null;
  spouse_nic: string | null;
  spouse_occupation: string | null;
  child_count: number;
  children_details: any;
  family_plan: boolean;
  occupation: string | null;
  monthly_income: string | null;
  selected_benefits: any;
  additional_notes: string | null;
  status: string;
  assigned_agent: string | null;
  follow_up_date: string | null;
  created_at: string;
  updated_at: string;
}

interface Note {
  id: number;
  lead_id: number;
  note_text: string;
  created_at: string;
}

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [savingNote, setSavingNote] = useState(false);

  // Agent Assignment & Status States
  const [agentName, setAgentName] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [updatingLead, setUpdatingLead] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, [statusFilter, searchQuery]);

  useEffect(() => {
    if (selectedLead) {
      fetchNotes(selectedLead.id);
      setAgentName(selectedLead.assigned_agent || '');
      setFollowUpDate(selectedLead.follow_up_date ? selectedLead.follow_up_date.split('T')[0] : '');
    }
  }, [selectedLead]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      let url = '/api/leads?';
      if (statusFilter !== 'all') url += `status=${statusFilter}&`;
      if (searchQuery) url += `search=${encodeURIComponent(searchQuery)}`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
        // Keep selected lead updated if it's in the list
        if (selectedLead) {
          const updated = data.find((l: Lead) => l.id === selectedLead.id);
          if (updated) setSelectedLead(updated);
        }
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotes = async (leadId: number) => {
    try {
      const res = await fetch(`/api/leads/${leadId}/notes`);
      if (res.ok) {
        const data = await res.json();
        setNotes(data);
      }
    } catch (err) {
      console.error('Error fetching notes:', err);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedLead) return;

    setSavingNote(true);
    try {
      const res = await fetch(`/api/leads/${selectedLead.id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ noteText: newNote }),
      });

      if (res.ok) {
        setNewNote('');
        fetchNotes(selectedLead.id);
      }
    } catch (err) {
      console.error('Error adding note:', err);
    } finally {
      setSavingNote(false);
    }
  };

  const handleUpdateLeadStatus = async (newStatus: string) => {
    if (!selectedLead) return;
    setUpdatingLead(true);
    try {
      const res = await fetch(`/api/leads/${selectedLead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const updated = await res.json();
        setSelectedLead(updated);
        // Add automatic system log note for status change
        await fetch(`/api/leads/${selectedLead.id}/notes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ noteText: `System Alert: Lead status changed to "${newStatus}"` }),
        });
        fetchLeads();
      }
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setUpdatingLead(false);
    }
  };

  const handleUpdateAssignment = async () => {
    if (!selectedLead) return;
    setUpdatingLead(true);
    try {
      const res = await fetch(`/api/leads/${selectedLead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assignedAgent: agentName || null,
          followUpDate: followUpDate || null,
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setSelectedLead(updated);
        // Add automatic log note for updates
        let logMsg = 'System Alert: Lead file updated. ';
        if (agentName) logMsg += `Agent assigned: ${agentName}. `;
        if (followUpDate) logMsg += `Follow up scheduled: ${followUpDate}. `;
        
        await fetch(`/api/leads/${selectedLead.id}/notes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ noteText: logMsg }),
        });
        
        fetchLeads();
        alert('Lead assignments successfully updated!');
      }
    } catch (err) {
      console.error('Error updating assignment:', err);
    } finally {
      setUpdatingLead(false);
    }
  };

  // Helper parser for benefits
  const parseBenefits = (benefits: any) => {
    try {
      if (typeof benefits === 'string') {
        return JSON.parse(benefits);
      }
      return benefits || [];
    } catch (e) {
      return [];
    }
  };

  // Helper parser for children
  const parseChildren = (children: any) => {
    try {
      if (typeof children === 'string') {
        return JSON.parse(children);
      }
      return children || [];
    } catch (e) {
      return [];
    }
  };

  // Status Badge Styling Helper
  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contacted':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'in progress':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'won':
      case 'closed - won':
      case 'policy issued':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'lost':
      case 'closed - lost':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Statistics counters
  const totalLeadsCount = leads.length;
  const newLeadsCount = leads.filter(l => l.status === 'New').length;
  const inProgressCount = leads.filter(l => l.status === 'In Progress' || l.status === 'Contacted').length;
  const wonCount = leads.filter(l => ['won', 'closed - won', 'policy issued'].includes(l.status.toLowerCase())).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Premium Navbar */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Coverme.lk"
              width={160}
              height={40}
              className="h-10 w-auto object-contain cursor-pointer"
            />
          </Link>
          <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
          <span className="text-lg font-bold text-[#002B5C] tracking-tight hidden md:block">
            Lead Command & CRM Center
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold px-2.5 py-1 bg-[#8CC63F]/10 text-[#5f9c1e] rounded-full flex items-center gap-1.5 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-[#8CC63F]"></span>
            Database Connected
          </span>
          <Link 
            href="/quote" 
            className="text-xs font-bold text-white bg-[#4E1686] hover:bg-[#3d126b] px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            + Create Mock Quote
          </Link>
        </div>
      </header>

      {/* Main Stats Summary Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white border-b border-slate-100">
        <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Active Leads</span>
          <span className="text-3xl font-black text-[#002B5C] mt-2">{totalLeadsCount}</span>
        </div>
        <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex flex-col justify-between">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">New Inflow</span>
          <span className="text-3xl font-black text-blue-800 mt-2">{newLeadsCount}</span>
        </div>
        <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-xl flex flex-col justify-between">
          <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Under Negotiation</span>
          <span className="text-3xl font-black text-amber-800 mt-2">{inProgressCount}</span>
        </div>
        <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-xl flex flex-col justify-between">
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Policies Closed (Won)</span>
          <span className="text-3xl font-black text-emerald-800 mt-2">{wonCount}</span>
        </div>
      </div>

      {/* Workspace Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden h-[calc(100vh-170px)]">
        
        {/* Left Side: Filter and Leads List (4 cols) */}
        <div className="lg:col-span-4 border-r border-slate-200 bg-white flex flex-col h-full overflow-hidden">
          {/* Search and Filters */}
          <div className="p-4 border-b border-slate-100 space-y-3 bg-slate-50/50">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, phone or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg outline-none text-sm bg-white focus:ring-2 focus:ring-[#4E1686] focus:border-transparent transition-all"
              />
              <svg className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
              {['all', 'New', 'Contacted', 'In Progress', 'Won', 'Lost'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all whitespace-nowrap ${
                    statusFilter === status
                      ? 'bg-[#4E1686] border-[#4E1686] text-white'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* List Section */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {loading ? (
              <div className="p-8 text-center text-sm text-slate-500">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4E1686] mx-auto mb-3"></div>
                Loading fresh leads...
              </div>
            ) : leads.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500">
                No matching leads found.
              </div>
            ) : (
              leads.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`p-4 cursor-pointer transition-all flex flex-col gap-2 relative border-l-4 ${
                    selectedLead?.id === lead.id
                      ? 'bg-purple-50/50 border-l-[#4E1686]'
                      : 'border-l-transparent hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-900 text-sm truncate max-w-[180px]">{lead.full_name}</h3>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${getStatusBadgeClass(lead.status)}`}>
                      {lead.status}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {lead.phone}
                    </span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                      {lead.city || 'N/A'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-50 pt-2 mt-1">
                    <span>
                      {new Date(lead.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                    {lead.family_plan && (
                      <span className="text-purple-600 font-bold flex items-center gap-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                        Family Plan
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Lead Details Panel (8 cols) */}
        <div className="lg:col-span-8 bg-slate-50 flex flex-col h-full overflow-hidden">
          {selectedLead ? (
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              
              {/* Detailed Lead Header Info */}
              <div className="bg-white border-b border-slate-200 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-black text-[#002B5C]">{selectedLead.full_name}</h2>
                    <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${getStatusBadgeClass(selectedLead.status)}`}>
                      {selectedLead.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Lead ID: #{selectedLead.id} &bull; Registered on {new Date(selectedLead.created_at).toLocaleString()}
                  </p>
                </div>

                {/* Instant Status Controller */}
                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-slate-500">Status:</label>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => handleUpdateLeadStatus(e.target.value)}
                    disabled={updatingLead}
                    className="border border-slate-300 rounded-lg px-3 py-1.5 text-xs bg-white font-bold text-slate-700 outline-none focus:ring-2 focus:ring-[#4E1686]"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Won">Policy Issued (Won)</option>
                    <option value="Lost">Closed (Lost)</option>
                  </select>
                </div>
              </div>

              {/* Scrollable Workstation */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* 2-Column Core Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Left Column: Contact & Employment details */}
                  <div className="space-y-6">
                    {/* Contact Profile Card */}
                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
                      <h4 className="text-xs font-black text-[#002B5C] uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5">
                        <span className="w-1.5 h-3 bg-[#8CC63F] rounded-full"></span>
                        Contact Details
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-slate-400 block mb-0.5">Phone Number</span>
                          <span className="font-bold text-slate-800">{selectedLead.phone}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block mb-0.5">Email Address</span>
                          <span className="font-bold text-slate-800 truncate block">{selectedLead.email || 'Not specified'}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-slate-400 block mb-0.5">Permanent Address</span>
                          <span className="font-bold text-slate-800">
                            {[selectedLead.address_line1, selectedLead.address_line2, selectedLead.city].filter(Boolean).join(', ') || 'Not specified'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Employment & Financial Card */}
                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
                      <h4 className="text-xs font-black text-[#002B5C] uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5">
                        <span className="w-1.5 h-3 bg-[#4E1686] rounded-full"></span>
                        Professional Profile
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-slate-400 block mb-0.5">Occupation</span>
                          <span className="font-bold text-slate-800">{selectedLead.occupation || 'Not specified'}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block mb-0.5">Gross Monthly Income</span>
                          <span className="font-[#8CC63F] font-bold">{selectedLead.monthly_income || 'Not specified'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Assigned Actions & Date Schedule */}
                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
                      <h4 className="text-xs font-black text-[#002B5C] uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5">
                        <span className="w-1.5 h-3 bg-indigo-500 rounded-full"></span>
                        Lead Assignment & Follow-Up
                      </h4>
                      
                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="text-slate-500 block mb-1 font-semibold">Assigned Sales Executive</label>
                          <input
                            type="text"
                            placeholder="Assign to agent (e.g., John Doe)..."
                            value={agentName}
                            onChange={(e) => setAgentName(e.target.value)}
                            className="w-full px-3 py-1.5 border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-[#4E1686]"
                          />
                        </div>
                        <div>
                          <label className="text-slate-500 block mb-1 font-semibold">Scheduled Follow-Up Date</label>
                          <input
                            type="date"
                            value={followUpDate}
                            onChange={(e) => setFollowUpDate(e.target.value)}
                            className="w-full px-3 py-1.5 border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-[#4E1686]"
                          />
                        </div>
                        <button
                          onClick={handleUpdateAssignment}
                          disabled={updatingLead}
                          className="w-full text-xs font-bold text-white bg-[#8CC63F] hover:bg-[#7ab332] py-2 rounded-lg transition-colors shadow-sm"
                        >
                          {updatingLead ? 'Saving...' : 'Update Lead Assignment'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Family & Benefits */}
                  <div className="space-y-6">
                    {/* Dependent & Civil Status */}
                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
                      <h4 className="text-xs font-black text-[#002B5C] uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5">
                        <span className="w-1.5 h-3 bg-[#8CC63F] rounded-full"></span>
                        Family Coverage Details
                      </h4>
                      
                      <div className="grid grid-cols-2 gap-4 text-xs border-b border-slate-100 pb-4">
                        <div>
                          <span className="text-slate-400 block mb-0.5">Civil Status</span>
                          <span className="font-bold text-slate-800 capitalize">{selectedLead.civil_status || 'Not specified'}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block mb-0.5">Family Plan Selection</span>
                          <span className={`font-bold ${selectedLead.family_plan ? 'text-purple-600' : 'text-slate-500'}`}>
                            {selectedLead.family_plan ? 'Yes (Requested)' : 'No'}
                          </span>
                        </div>
                      </div>

                      {/* Spouse block (only if details are available) */}
                      {selectedLead.spouse_name && (
                        <div className="text-xs space-y-2 border-b border-slate-100 pb-4">
                          <h5 className="font-extrabold text-slate-700">Spouse Details:</h5>
                          <div className="grid grid-cols-2 gap-3 pl-2">
                            <div>
                              <span className="text-slate-400 block mb-0.5">Name</span>
                              <span className="font-bold text-slate-800">{selectedLead.spouse_name}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block mb-0.5">Date of Birth</span>
                              <span className="font-bold text-slate-800">{selectedLead.spouse_dob || 'N/A'}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block mb-0.5">NIC (Optional)</span>
                              <span className="font-bold text-slate-800">{selectedLead.spouse_nic || 'Not provided'}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block mb-0.5">Occupation</span>
                              <span className="font-bold text-slate-800">{selectedLead.spouse_occupation || 'N/A'}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Children Block */}
                      <div className="text-xs space-y-2">
                        <h5 className="font-extrabold text-slate-700">
                          Children Listed ({selectedLead.child_count || 0}):
                        </h5>
                        {selectedLead.child_count > 0 ? (
                          <div className="space-y-1.5 pl-2 max-h-32 overflow-y-auto">
                            {parseChildren(selectedLead.children_details).map((child: any, idx: number) => (
                              <div key={idx} className="flex justify-between bg-slate-50 p-2 rounded border border-slate-150">
                                <span className="font-bold text-slate-800">{child.name}</span>
                                <span className="text-slate-500">DOB: {child.dob}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-slate-400 pl-2">No children details registered.</p>
                        )}
                      </div>
                    </div>

                    {/* Selected Benefits badging */}
                    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
                      <h4 className="text-xs font-black text-[#002B5C] uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5">
                        <span className="w-1.5 h-3 bg-[#4E1686] rounded-full"></span>
                        Selected Insurance Benefits
                      </h4>
                      
                      <div className="flex flex-wrap gap-2 pt-2">
                        {parseBenefits(selectedLead.selected_benefits).length > 0 ? (
                          parseBenefits(selectedLead.selected_benefits).map((benefit: string, idx: number) => (
                            <span
                              key={idx}
                              className="text-xs font-semibold px-3 py-1.5 bg-purple-50 text-purple-800 border border-purple-200 rounded-full shadow-sm"
                            >
                              {benefit}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-slate-400">No specific medical benefits selected. Only standard basic plan.</span>
                        )}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Additional Notes originally submitted */}
                {selectedLead.additional_notes && (
                  <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Original Message / Client Notes:</h4>
                    <p className="text-sm font-medium text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-150">
                      "{selectedLead.additional_notes}"
                    </p>
                  </div>
                )}

                {/* Chronological Logs Feed / CRM timeline */}
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-5">
                  <h4 className="text-xs font-black text-[#002B5C] uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-3 bg-purple-600 rounded-full"></span>
                    Agent Interaction Logs / Audit Trail
                  </h4>

                  {/* Add Note Form */}
                  <form onSubmit={handleAddNote} className="space-y-3">
                    <textarea
                      placeholder="Add an update about your latest call or meeting with this lead (e.g., Sent quotations on email, requested premium review)..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl text-xs outline-none bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#4E1686] focus:border-transparent transition-all h-20"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={savingNote}
                        className="text-xs font-bold text-white bg-[#4E1686] hover:bg-[#3d126b] px-4 py-2 rounded-lg transition-colors shadow-sm"
                      >
                        {savingNote ? 'Adding Log...' : 'Add Log Entry'}
                      </button>
                    </div>
                  </form>

                  {/* Timeline Notes List */}
                  <div className="relative border-l border-slate-200 pl-4 space-y-6 mt-4">
                    {notes.length > 0 ? (
                      notes.map((note) => (
                        <div key={note.id} className="relative text-xs">
                          {/* Dot */}
                          <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-purple-500 border-2 border-white"></span>
                          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 shadow-sm">
                            <p className="font-medium text-slate-700 leading-relaxed">{note.note_text}</p>
                            <span className="text-[10px] text-slate-400 block mt-2 font-semibold">
                              {new Date(note.created_at).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-400 text-xs text-center py-4">No agent logs. Use the box above to record your interactions!</p>
                    )}
                  </div>
                </div>

              </div>

            </div>
          ) : (
            /* Dashboard Empty State when no lead is selected */
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center select-none bg-slate-50">
              <div className="bg-white border border-slate-200/60 p-8 rounded-3xl shadow-sm max-w-md space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center mx-auto text-[#4E1686]">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-slate-900">No Lead Selected</h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                    Please select an insurance lead from the side panel on the left to view their full policy details, manage statuses, assign executive agents, and log follow-ups.
                  </p>
                </div>

                <div className="text-xs bg-slate-50 p-4 rounded-xl border border-slate-150 space-y-2.5 text-left text-slate-600">
                  <p className="font-bold text-[#002B5C] border-b border-slate-200/60 pb-1.5">How the Insurance Pipeline Works:</p>
                  <div className="flex items-start gap-2">
                    <span className="bg-purple-100 text-purple-700 font-extrabold w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[9px]">1</span>
                    <p>New quote requests enter as **"New"** directly from the public form.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="bg-purple-100 text-purple-700 font-extrabold w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[9px]">2</span>
                    <p>Sales executives assign themselves, contact the client, and mark it **"In Progress"**.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="bg-purple-100 text-purple-700 font-extrabold w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[9px]">3</span>
                    <p>Once medical benefits & premium values are negotiated, log comments and set status to **"Won (Policy Issued)"**.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
