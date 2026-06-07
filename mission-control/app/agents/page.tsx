'use client'

import { motion } from 'framer-motion'
import { Bot, Plus, Network, Activity } from 'lucide-react'
import AgentCard from '@/components/AgentCard'

function ClaudeAvatar() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <polygon points="14,2 26,8 26,20 14,26 2,20 2,8" stroke="#06b6d4" strokeWidth="1.5" fill="rgba(6,182,212,0.1)" />
      <polygon points="14,7 21,11 21,17 14,21 7,17 7,11" stroke="#06b6d4" strokeWidth="1" fill="rgba(6,182,212,0.15)" />
      <circle cx="14" cy="14" r="3" fill="#06b6d4" />
    </svg>
  )
}

function OpenClawAvatar() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="4" y="4" width="20" height="20" rx="4" stroke="#f59e0b" strokeWidth="1.5" fill="rgba(245,158,11,0.1)" />
      <path d="M9 14 L14 9 L19 14 L14 19 Z" stroke="#f59e0b" strokeWidth="1.5" fill="rgba(245,158,11,0.2)" />
      <circle cx="14" cy="14" r="2.5" fill="#f59e0b" />
      <line x1="14" y1="4" x2="14" y2="9" stroke="#f59e0b" strokeWidth="1" />
      <line x1="14" y1="19" x2="14" y2="24" stroke="#f59e0b" strokeWidth="1" />
      <line x1="4" y1="14" x2="9" y2="14" stroke="#f59e0b" strokeWidth="1" />
      <line x1="19" y1="14" x2="24" y2="14" stroke="#f59e0b" strokeWidth="1" />
    </svg>
  )
}

function HermesAvatar() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="11" stroke="#a855f7" strokeWidth="1.5" fill="rgba(168,85,247,0.1)" />
      <path d="M7 14 Q10 8, 14 14 Q18 20, 21 14" stroke="#a855f7" strokeWidth="1.5" fill="none" />
      <circle cx="7" cy="14" r="1.5" fill="#a855f7" />
      <circle cx="21" cy="14" r="1.5" fill="#a855f7" />
      <circle cx="14" cy="14" r="2" fill="#a855f7" />
    </svg>
  )
}

function NullAvatar() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="11" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="9" y1="9" x2="19" y2="19" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      <line x1="19" y1="9" x2="9" y2="19" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
    </svg>
  )
}

export default function AgentsPage() {
  return (
    <div className="p-6 space-y-6 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(168,85,247,0.15))', border: '1px solid rgba(245,158,11,0.3)' }}>
            <Bot className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h1 className="text-sm font-mono font-bold text-white tracking-wide">AGENT CONTROL PANEL</h1>
            <p className="text-xs text-white/30 font-mono">Manage and monitor all AI agents</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-white/30">
          <div className="flex items-center gap-1.5"><Network className="w-3 h-3 text-amber-400" /><span>4 agents configured</span></div>
          <div className="flex items-center gap-1.5"><Activity className="w-3 h-3 text-green-400" /><span className="text-green-400">2 online</span></div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-4 gap-3">
        {[{ label: 'Online', value: '2', color: 'text-green-400', dot: 'bg-green-400' }, { label: 'Busy', value: '1', color: 'text-amber-400', dot: 'bg-amber-400' }, { label: 'Offline', value: '1', color: 'text-red-400', dot: 'bg-red-400' }, { label: 'Total Tasks', value: '847', color: 'text-cyan-400', dot: 'bg-cyan-400' }].map(item => (
          <div key={item.label} className="rounded-xl p-3 flex items-center gap-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className={`w-2 h-2 rounded-full ${item.dot}`} />
            <div><div className={`text-lg font-bold font-mono ${item.color}`}>{item.value}</div><div className="text-[10px] text-white/30 font-mono">{item.label}</div></div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <AgentCard name="CLAUDE" description="Anthropic's flagship LLM via API" status="ONLINE" lastActivity="Just now" color="cyan" terminalHref="/claude" avatar={<ClaudeAvatar />} tags={['LLM', 'API', 'Streaming']} index={0} />
        <AgentCard name="OPENCLAW" description="Code analysis & review agent" status="ONLINE" lastActivity="2 min ago" color="amber" avatar={<OpenClawAvatar />} tags={['Code', 'Analysis', 'AST']} index={1} />
        <AgentCard name="HERMES" description="Message routing & webhook handler" status="BUSY" lastActivity="Active now" color="purple" avatar={<HermesAvatar />} tags={['Router', 'Webhooks', 'Events']} index={2} />
        <AgentCard name="ATLAS" description="Knowledge base & retrieval agent" status="OFFLINE" lastActivity="3 hrs ago" color="green" avatar={<NullAvatar />} tags={['RAG', 'Vector DB']} index={3} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} whileHover={{ scale: 1.02 }}
          className="relative rounded-xl border border-dashed border-white/10 hover:border-white/20 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer group"
          style={{ background: 'rgba(255,255,255,0.01)', minHeight: '200px' }}>
          <div className="w-12 h-12 rounded-full border border-dashed border-white/15 flex items-center justify-center group-hover:border-cyan-400/30 transition-colors">
            <Plus className="w-5 h-5 text-white/15 group-hover:text-cyan-400/50 transition-colors" />
          </div>
          <div className="text-center">
            <p className="text-sm font-mono text-white/20 group-hover:text-white/40 transition-colors">Add New Agent</p>
            <p className="text-xs font-mono text-white/10 mt-1">Configure a custom AI agent</p>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <h3 className="text-xs font-mono font-bold text-white/40 uppercase tracking-widest mb-4">Connection Topology</h3>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {[{ name: 'USER', color: '#ffffff' }, { name: '→', color: '#ffffff30' }, { name: 'MISSION CONTROL', color: '#06b6d4' }, { name: '→', color: '#ffffff30' }, { name: 'CLAUDE API', color: '#a855f7' }].map((node, i) => (
            <span key={i} className="text-xs font-mono font-bold" style={{ color: node.color }}>{node.name}</span>
          ))}
        </div>
        <div className="flex items-center justify-center mt-2">
          <span className="text-xs font-mono font-bold" style={{ color: '#f59e0b' }}>OPENCLAW ↔ HERMES ↔ ATLAS</span>
        </div>
      </motion.div>
    </div>
  )
}
