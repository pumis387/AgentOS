'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Terminal, Zap, Activity, Clock, ChevronRight, Download, Plus, RefreshCw, ArrowUpRight, Cpu, Database } from 'lucide-react'
import ActivityFeed from '@/components/ActivityFeed'

const fadeIn = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } }

function MetricCard({ label, value, unit, color, icon: Icon, sub }: { label: string; value: string | number; unit?: string; color: string; icon: React.ElementType; sub?: string }) {
  return (
    <motion.div variants={fadeIn} className="relative rounded-xl p-4 overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
      whileHover={{ scale: 1.02 }}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-white/30 font-mono uppercase tracking-widest">{label}</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className={`text-2xl font-bold font-mono ${color}`}>{value}</span>
            {unit && <span className="text-xs text-white/30 font-mono">{unit}</span>}
          </div>
          {sub && <p className="text-[10px] text-white/20 font-mono mt-1">{sub}</p>}
        </div>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <Icon className={`w-4 h-4 ${color}`} />
        </div>
      </div>
    </motion.div>
  )
}

export default function Dashboard() {
  const [tokens, setTokens] = useState(42831)
  const [responseTime, setResponseTime] = useState(1.24)
  const [requests, setRequests] = useState(847)

  useEffect(() => {
    const id = setInterval(() => {
      setTokens(t => t + Math.floor(Math.random() * 50))
      setResponseTime(() => parseFloat((0.8 + Math.random() * 1.5).toFixed(2)))
      setRequests(r => r + (Math.random() > 0.7 ? 1 : 0))
    }, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="p-6 space-y-6 max-w-7xl">
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
        className="relative rounded-2xl overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.08) 0%, rgba(168,85,247,0.06) 50%, rgba(3,7,18,0.8) 100%)', border: '1px solid rgba(6,182,212,0.2)', boxShadow: '0 0 40px rgba(6,182,212,0.08), 0 0 80px rgba(168,85,247,0.04)' }}>
        <div className="absolute inset-0 hex-pattern opacity-30" />
        <div className="relative p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(168,85,247,0.15))', border: '1px solid rgba(6,182,212,0.3)', boxShadow: '0 0 30px rgba(6,182,212,0.2)' }}>
                  <Terminal className="w-8 h-8 text-cyan-400" />
                </div>
                <motion.div animate={{ scale: [1, 1.8], opacity: [0.6, 0] }} transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-2xl border border-cyan-400/30" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl lg:text-3xl font-bold font-mono text-white tracking-tight">
                    CLAUDE <span style={{ color: '#06b6d4', textShadow: '0 0 20px rgba(6,182,212,0.6)' }}>ONLINE</span>
                  </h1>
                  <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }}
                    className="w-3 h-3 rounded-full bg-green-400" style={{ boxShadow: '0 0 10px rgba(34,197,94,0.9)' }} />
                </div>
                <p className="text-white/40 text-sm font-mono">Mission Control v0.1.0 · All systems operational</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs font-mono text-white/30"><span className="text-cyan-400/80">↑</span> {requests} requests served</span>
                  <span className="text-xs font-mono text-white/30"><span className="text-purple-400/80">⚡</span> {responseTime}s avg latency</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/claude">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-mono font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #06b6d4, #a855f7)', boxShadow: '0 0 20px rgba(6,182,212,0.3)' }}>
                  <Terminal className="w-4 h-4" />New Session<ArrowUpRight className="w-3 h-3" />
                </motion.button>
              </Link>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-mono text-white/60 border border-white/10 hover:bg-white/5 transition-colors">
                <Download className="w-4 h-4" />Export Logs
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-mono text-white/60 border border-white/10 hover:bg-white/5 transition-colors">
                <RefreshCw className="w-4 h-4" />Clear History
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial="initial" animate="animate" transition={{ staggerChildren: 0.08 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Tokens Used" value={tokens.toLocaleString()} color="text-cyan-400" icon={Zap} sub="This session" />
        <MetricCard label="Avg Response" value={responseTime} unit="sec" color="text-purple-400" icon={Activity} sub="Last 10 requests" />
        <MetricCard label="Total Requests" value={requests} color="text-green-400" icon={RefreshCw} sub="Since startup" />
        <MetricCard label="Context Used" value="31" unit="%" color="text-amber-400" icon={Database} sub="200K window" />
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-mono font-bold text-white/50 tracking-widest uppercase">Active Agents</h2>
            <Link href="/agents" className="flex items-center gap-1 text-xs font-mono text-cyan-400/60 hover:text-cyan-400 transition-colors">
              View All <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <AgentMiniCard name="Claude" status="ONLINE" color="cyan" index={0} href="/claude" description="Anthropic LLM" metric="1.24s" metricLabel="latency" />
            <AgentMiniCard name="OpenClaw" status="ONLINE" color="amber" index={1} description="Code Analysis" metric="7 jobs" metricLabel="queued" />
            <AgentMiniCard name="Hermes" status="BUSY" color="purple" index={2} description="Message Router" metric="12 routes" metricLabel="active" />
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} whileHover={{ scale: 1.02 }}
              className="relative rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer border border-dashed border-white/10 hover:border-white/20 transition-colors group"
              style={{ background: 'rgba(255,255,255,0.01)', minHeight: '120px' }}>
              <div className="w-8 h-8 rounded-full border border-dashed border-white/20 flex items-center justify-center group-hover:border-cyan-400/40 transition-colors">
                <Plus className="w-4 h-4 text-white/20 group-hover:text-cyan-400/60 transition-colors" />
              </div>
              <span className="text-xs font-mono text-white/20 group-hover:text-white/40 transition-colors">Add Agent</span>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="rounded-xl p-4 space-y-3" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="text-xs font-mono text-white/40 uppercase tracking-widest">System Health</h3>
            {[{ label: 'API Gateway', value: 98, color: '#22c55e' }, { label: 'Token Budget', value: 57, color: '#06b6d4' }, { label: 'Memory Pool', value: 34, color: '#a855f7' }, { label: 'Rate Limit', value: 12, color: '#f59e0b' }].map((item, i) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-white/40">{item.label}</span>
                  <span className="text-xs font-mono" style={{ color: item.color }}>{item.value}%</span>
                </div>
                <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${item.value}%` }} transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full" style={{ background: item.color, boxShadow: `0 0 8px ${item.color}60` }} />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 rounded-xl p-4 flex flex-col"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', height: '480px' }}>
          <ActivityFeed />
        </motion.div>
      </div>
    </div>
  )
}

function AgentMiniCard({ name, status, color, index, href, description, metric, metricLabel }: { name: string; status: string; color: string; index: number; href?: string; description: string; metric: string; metricLabel: string }) {
  const colorMap: Record<string, { text: string; glow: string; bg: string; border: string }> = {
    cyan: { text: 'text-cyan-400', glow: 'rgba(6,182,212,0.2)', bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.2)' },
    amber: { text: 'text-amber-400', glow: 'rgba(245,158,11,0.2)', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
    purple: { text: 'text-purple-400', glow: 'rgba(168,85,247,0.2)', bg: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.2)' },
    green: { text: 'text-green-400', glow: 'rgba(34,197,94,0.2)', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)' },
  }
  const c = colorMap[color]
  const statusColor = status === 'ONLINE' ? 'bg-green-400' : status === 'BUSY' ? 'bg-amber-400' : 'bg-red-400'
  const card = (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} whileHover={{ scale: 1.03 }}
      className="relative rounded-xl p-4 cursor-pointer overflow-hidden" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
      <div className="flex items-center justify-between mb-2">
        <span className={`text-sm font-mono font-bold ${c.text}`}>{name}</span>
        <div className="flex items-center gap-1">
          <div className="relative">
            <div className={`w-2 h-2 rounded-full ${statusColor}`} />
            {status === 'ONLINE' && (
              <motion.div animate={{ scale: [1, 2.2], opacity: [0.8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
                className={`absolute inset-0 rounded-full ${statusColor}`} />
            )}
          </div>
          <span className="text-[9px] font-mono text-white/30">{status}</span>
        </div>
      </div>
      <p className="text-[10px] text-white/30 font-mono mb-3">{description}</p>
      <div className="flex items-baseline gap-1">
        <span className={`text-lg font-bold font-mono ${c.text}`}>{metric}</span>
        <span className="text-[10px] text-white/30 font-mono">{metricLabel}</span>
      </div>
      {href && <div className="absolute top-3 right-3"><ArrowUpRight className={`w-3 h-3 ${c.text} opacity-40`} /></div>}
    </motion.div>
  )
  return href ? <Link href={href}>{card}</Link> : card
}
