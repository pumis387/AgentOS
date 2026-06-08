'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Bot, Zap, AlertTriangle, CheckCircle, Info } from 'lucide-react'

type EventType = 'command' | 'response' | 'system' | 'error' | 'success' | 'info'

interface FeedEvent {
  id: string
  type: EventType
  agent: string
  message: string
  timestamp: Date
}

const INITIAL_EVENTS: FeedEvent[] = [
  { id: '1', type: 'system', agent: 'SYSTEM', message: 'Mission Control initialized. All systems nominal.', timestamp: new Date(Date.now() - 120000) },
  { id: '2', type: 'command', agent: 'USER', message: 'claude analyze --file main.py --output json', timestamp: new Date(Date.now() - 95000) },
  { id: '3', type: 'response', agent: 'CLAUDE', message: 'Analysis complete. Found 3 optimization opportunities in main.py. Token usage: 847 input, 312 output.', timestamp: new Date(Date.now() - 90000) },
  { id: '4', type: 'info', agent: 'HERMES', message: 'Routing layer updated. 12 new endpoints discovered.', timestamp: new Date(Date.now() - 60000) },
  { id: '5', type: 'success', agent: 'OPENCLAW', message: 'Task queue processed. 7/7 jobs completed successfully.', timestamp: new Date(Date.now() - 30000) },
]

const SIMULATED_EVENTS: Omit<FeedEvent, 'id' | 'timestamp'>[] = [
  { type: 'command', agent: 'USER', message: 'claude --model claude-sonnet-4-6 "summarize recent changes"' },
  { type: 'response', agent: 'CLAUDE', message: 'Processing request... streaming response initiated.' },
  { type: 'system', agent: 'SYSTEM', message: 'Token budget: 42,831 / 100,000 (42.8%)' },
  { type: 'info', agent: 'HERMES', message: 'New webhook received from github.com/user/repo' },
  { type: 'success', agent: 'OPENCLAW', message: 'Code review scan complete. 0 critical issues found.' },
  { type: 'command', agent: 'USER', message: 'claude --model claude-opus-4-8 "generate unit tests for auth.ts"' },
  { type: 'response', agent: 'CLAUDE', message: 'Generated 14 unit tests covering 8 functions. Coverage: 94%.' },
  { type: 'error', agent: 'HERMES', message: 'Connection timeout to service:8080. Retrying in 5s...' },
  { type: 'success', agent: 'HERMES', message: 'Reconnected to service:8080 after 1 retry.' },
  { type: 'system', agent: 'SYSTEM', message: 'Memory usage nominal. Context window at 31%.' },
]

const typeConfig: Record<EventType, { icon: React.ElementType; color: string; bg: string; label: string }> = {
  command: { icon: Terminal, color: 'text-cyan-400', bg: 'bg-cyan-500/10', label: 'CMD' },
  response: { icon: Bot, color: 'text-purple-400', bg: 'bg-purple-500/10', label: 'RSP' },
  system: { icon: Zap, color: 'text-white/40', bg: 'bg-white/5', label: 'SYS' },
  error: { icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10', label: 'ERR' },
  success: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10', label: 'OK' },
  info: { icon: Info, color: 'text-amber-400', bg: 'bg-amber-500/10', label: 'INF' },
}

function formatTime(date: Date) {
  return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

export default function ActivityFeed() {
  const [events, setEvents] = useState<FeedEvent[]>(INITIAL_EVENTS)
  const [paused, setPaused] = useState(false)
  const [mounted, setMounted] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const eventIndex = useRef(0)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      const template = SIMULATED_EVENTS[eventIndex.current % SIMULATED_EVENTS.length]
      eventIndex.current++
      setEvents(prev => {
        const next = [...prev, { ...template, id: Date.now().toString(), timestamp: new Date() }]
        return next.slice(-50)
      })
    }, 3500 + Math.random() * 2500)
    return () => clearInterval(id)
  }, [paused])

  useEffect(() => {
    if (!paused) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [events, paused])

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-green-400"
            style={{ boxShadow: '0 0 6px rgba(34,197,94,0.8)' }}
          />
          <h3 className="text-xs font-mono font-bold text-white/60 tracking-widest uppercase">Activity Stream</h3>
        </div>
        <button
          onClick={() => setPaused(p => !p)}
          className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors ${
            paused ? 'text-amber-400 border-amber-500/30 bg-amber-500/10' : 'text-white/30 border-white/10 hover:text-white/60'
          }`}
        >
          {paused ? 'PAUSED' : 'LIVE'}
        </button>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto space-y-1 pr-1">
        <AnimatePresence initial={false}>
          {events.map((event) => {
            const cfg = typeConfig[event.type]
            const Icon = cfg.icon
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -10, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-start gap-2 px-2 py-1.5 rounded-lg group hover:bg-white/3 transition-colors"
              >
                <div className={`flex-shrink-0 w-5 h-5 rounded flex items-center justify-center ${cfg.bg} mt-0.5`}>
                  <Icon className={`w-2.5 h-2.5 ${cfg.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-[10px] font-mono font-bold ${cfg.color}`}>{event.agent}</span>
                    {mounted && (
                      <span className="text-[9px] font-mono text-white/20">{formatTime(event.timestamp)}</span>
                    )}
                    <span className={`text-[9px] font-mono px-1 rounded ${cfg.bg} ${cfg.color} opacity-60`}>{cfg.label}</span>
                  </div>
                  <p className="text-xs text-white/50 font-mono leading-relaxed truncate group-hover:whitespace-normal">
                    {event.message}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
