'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Cpu, Wifi, Zap, Activity } from 'lucide-react'

export default function StatusBar() {
  const [time, setTime] = useState('')
  const [uptime, setUptime] = useState(0)

  useEffect(() => {
    const tick = () => { const now = new Date(); setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })) }
    tick()
    const id = setInterval(tick, 1000)
    const uptimeId = setInterval(() => setUptime(u => u + 1), 1000)
    return () => { clearInterval(id); clearInterval(uptimeId) }
  }, [])

  const formatUptime = (s: number) => `${String(Math.floor(s / 3600)).padStart(2,'0')}:${String(Math.floor((s % 3600) / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`

  return (
    <motion.header initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 right-0 z-30 flex items-center gap-4 px-4 py-2 text-xs font-mono"
      style={{ left: '4rem', background: 'rgba(3,7,18,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="hidden lg:flex items-center gap-2" style={{ marginLeft: '12rem' }}>
        <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ boxShadow: '0 0 6px rgba(34,197,94,0.8)' }} />
        <span className="text-green-400 font-semibold tracking-widest text-[10px]">SYSTEMS NOMINAL</span>
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1.5 text-white/50"><Activity className="w-3 h-3 text-cyan-400" /><span className="text-white/40">agents:</span><span className="text-cyan-400">3 active</span></div>
        <div className="hidden md:flex items-center gap-1.5 text-white/50"><Cpu className="w-3 h-3 text-purple-400" /><span className="text-white/40">cpu:</span><CPUMeter /></div>
        <div className="hidden md:flex items-center gap-1.5"><Wifi className="w-3 h-3 text-amber-400" /><span className="text-white/40">ping:</span><LatencyMeter /></div>
        <div className="hidden lg:flex items-center gap-1.5"><Zap className="w-3 h-3 text-green-400" /><span className="text-white/40">up:</span><span className="text-green-400">{formatUptime(uptime)}</span></div>
        <div className="flex items-center gap-1.5 border-l border-white/10 pl-4"><Clock className="w-3 h-3 text-white/30" /><span className="text-white/70 tabular-nums">{time}</span></div>
      </div>
    </motion.header>
  )
}

function CPUMeter() {
  const [val, setVal] = useState(23)
  useEffect(() => { const id = setInterval(() => setVal(v => Math.max(5, Math.min(95, v + (Math.random() - 0.5) * 15))), 2000); return () => clearInterval(id) }, [])
  const color = val > 70 ? 'text-red-400' : val > 40 ? 'text-amber-400' : 'text-purple-400'
  return <span className={`${color} tabular-nums`}>{val.toFixed(0)}%</span>
}

function LatencyMeter() {
  const [val, setVal] = useState(42)
  useEffect(() => { const id = setInterval(() => setVal(v => Math.max(8, Math.min(300, v + (Math.random() - 0.5) * 20))), 3000); return () => clearInterval(id) }, [])
  const color = val > 150 ? 'text-red-400' : val > 80 ? 'text-amber-400' : 'text-green-400'
  return <span className={`${color} tabular-nums`}>{val.toFixed(0)}ms</span>
}
