'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ExternalLink, RefreshCw, Settings, CheckCircle2, XCircle, Clock } from 'lucide-react'
import Link from 'next/link'

export type AgentStatus = 'ONLINE' | 'OFFLINE' | 'BUSY'

interface AgentCardProps {
  name: string; description: string; status: AgentStatus; lastActivity: string
  color: 'cyan' | 'purple' | 'amber' | 'green'; terminalHref?: string; avatar: React.ReactNode; tags?: string[]; index?: number
}

const colorMap = {
  cyan: { border: 'rgba(6,182,212,0.25)', glow: 'rgba(6,182,212,0.15)', badge: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30', text: 'text-cyan-400', tag: 'bg-cyan-500/10 text-cyan-400/70 border-cyan-500/20', button: 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border-cyan-500/20', gradient: 'from-cyan-500/10 to-transparent' },
  purple: { border: 'rgba(168,85,247,0.25)', glow: 'rgba(168,85,247,0.15)', badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30', text: 'text-purple-400', tag: 'bg-purple-500/10 text-purple-400/70 border-purple-500/20', button: 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border-purple-500/20', gradient: 'from-purple-500/10 to-transparent' },
  amber: { border: 'rgba(245,158,11,0.25)', glow: 'rgba(245,158,11,0.15)', badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30', text: 'text-amber-400', tag: 'bg-amber-500/10 text-amber-400/70 border-amber-500/20', button: 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/20', gradient: 'from-amber-500/10 to-transparent' },
  green: { border: 'rgba(34,197,94,0.25)', glow: 'rgba(34,197,94,0.15)', badge: 'bg-green-500/20 text-green-400 border-green-500/30', text: 'text-green-400', tag: 'bg-green-500/10 text-green-400/70 border-green-500/20', button: 'bg-green-500/10 hover:bg-green-500/20 text-green-400 border-green-500/20', gradient: 'from-green-500/10 to-transparent' },
}

const statusConfig = {
  ONLINE: { icon: CheckCircle2, color: 'text-green-400', dot: 'bg-green-400', label: 'ONLINE' },
  OFFLINE: { icon: XCircle, color: 'text-red-400', dot: 'bg-red-400', label: 'OFFLINE' },
  BUSY: { icon: Clock, color: 'text-amber-400', dot: 'bg-amber-400', label: 'BUSY' },
}

export default function AgentCard({ name, description, status, lastActivity, color, terminalHref, avatar, tags = [], index = 0 }: AgentCardProps) {
  const [pinging, setPinging] = useState(false)
  const [pingResult, setPingResult] = useState<null | boolean>(null)
  const colors = colorMap[color]
  const statusCfg = statusConfig[status]

  const handlePing = async () => {
    setPinging(true); setPingResult(null)
    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800))
    setPingResult(status !== 'OFFLINE'); setPinging(false)
    setTimeout(() => setPingResult(null), 3000)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }} whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="relative rounded-xl overflow-hidden cursor-default" style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(16px)', border: `1px solid ${colors.border}` }}>
      <motion.div className="absolute inset-0 opacity-0 pointer-events-none" whileHover={{ opacity: 1 }} style={{ background: `radial-gradient(circle at 50% 0%, ${colors.glow}, transparent 70%)` }} />
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${colors.border}, ${colors.glow}, transparent)` }} />
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${colors.glow}, rgba(255,255,255,0.03))`, border: `1px solid ${colors.border}` }}>{avatar}</div>
            <div><h3 className={`font-semibold text-sm ${colors.text} font-mono tracking-wide`}>{name}</h3><p className="text-white/40 text-xs mt-0.5">{description}</p></div>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-mono font-bold" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="relative"><div className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />{status === 'ONLINE' && <motion.div className={`absolute inset-0 rounded-full ${statusCfg.dot}`} animate={{ scale: [1, 2.5], opacity: [0.8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />}</div>
            <span className={statusCfg.color}>{statusCfg.label}</span>
          </div>
        </div>
        {tags.length > 0 && <div className="flex flex-wrap gap-1 mb-3">{tags.map(tag => <span key={tag} className={`px-2 py-0.5 rounded text-[10px] font-mono border ${colors.tag}`}>{tag}</span>)}</div>}
        <div className="flex items-center gap-1.5 mb-4 text-xs text-white/30 font-mono"><Clock className="w-3 h-3" /><span>Last active: {lastActivity}</span></div>
        <div className="flex items-center gap-2">
          <motion.button onClick={handlePing} whileTap={{ scale: 0.95 }} disabled={pinging}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${colors.button}`}>
            <motion.div animate={pinging ? { rotate: 360 } : { rotate: 0 }} transition={{ duration: 0.8, repeat: pinging ? Infinity : 0, ease: 'linear' }}><RefreshCw className="w-3 h-3" /></motion.div>
            {pinging ? 'PINGING...' : pingResult === true ? 'PONG ✓' : pingResult === false ? 'NO RESP' : 'PING'}
          </motion.button>
          {terminalHref && <Link href={terminalHref} className="flex-1"><motion.button whileTap={{ scale: 0.95 }} className={`w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${colors.button}`}><ExternalLink className="w-3 h-3" />TERMINAL</motion.button></Link>}
          <motion.button whileTap={{ scale: 0.95 }} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono border border-white/10 bg-white/3 hover:bg-white/8 text-white/40 hover:text-white/70 transition-colors"><Settings className="w-3 h-3" /></motion.button>
        </div>
      </div>
      <AnimatePresence>
        {pingResult !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none rounded-xl"
            style={{ background: pingResult ? 'rgba(34,197,94,0.05)' : 'rgba(239,68,68,0.05)', border: `1px solid ${pingResult ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}` }} />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
