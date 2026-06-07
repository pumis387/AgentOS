'use client'

import { motion } from 'framer-motion'
import { Terminal as TerminalIcon, Cpu, Zap } from 'lucide-react'
import Terminal from '@/components/Terminal'

export default function ClaudePage() {
  return (
    <div className="h-[calc(100vh-40px)] flex flex-col p-4 gap-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between flex-shrink-0"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(6,182,212,0.2))',
              border: '1px solid rgba(168,85,247,0.3)',
              boxShadow: '0 0 20px rgba(168,85,247,0.2)',
            }}>
            <TerminalIcon className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h1 className="text-sm font-mono font-bold text-white tracking-wide">CLAUDE TERMINAL</h1>
            <p className="text-xs text-white/30 font-mono">Anthropic API · Streaming · Full context</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-white/30">
          <div className="flex items-center gap-1.5"><Cpu className="w-3 h-3 text-purple-400" /><span>200K ctx</span></div>
          <div className="flex items-center gap-1.5"><Zap className="w-3 h-3 text-cyan-400" /><span>Streaming</span></div>
          <div className="flex items-center gap-1.5">
            <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ boxShadow: '0 0 6px rgba(34,197,94,0.8)' }} />
            <span className="text-green-400">Connected</span>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex-1 rounded-2xl overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(168,85,247,0.2)', boxShadow: '0 0 40px rgba(168,85,247,0.05)' }}
      >
        <Terminal />
      </motion.div>
    </div>
  )
}
