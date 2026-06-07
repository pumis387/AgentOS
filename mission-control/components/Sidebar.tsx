'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { LayoutDashboard, Terminal, Bot, Settings, Zap, Activity, Shield, Radio } from 'lucide-react'

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Mission Control', color: 'cyan' },
  { href: '/claude', icon: Terminal, label: 'Claude Terminal', color: 'purple' },
  { href: '/agents', icon: Bot, label: 'Agent Control', color: 'amber' },
  { href: '/settings', icon: Settings, label: 'Settings', color: 'green' },
]

const colorMap = {
  cyan: { active: 'text-cyan-400', glow: 'shadow-[0_0_15px_rgba(6,182,212,0.5)]', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', dot: 'bg-cyan-400' },
  purple: { active: 'text-purple-400', glow: 'shadow-[0_0_15px_rgba(168,85,247,0.5)]', bg: 'bg-purple-500/10', border: 'border-purple-500/30', dot: 'bg-purple-400' },
  amber: { active: 'text-amber-400', glow: 'shadow-[0_0_15px_rgba(245,158,11,0.5)]', bg: 'bg-amber-500/10', border: 'border-amber-500/30', dot: 'bg-amber-400' },
  green: { active: 'text-green-400', glow: 'shadow-[0_0_15px_rgba(34,197,94,0.5)]', bg: 'bg-green-500/10', border: 'border-green-500/30', dot: 'bg-green-400' },
}

export default function Sidebar() {
  const pathname = usePathname()
  return (
    <motion.aside initial={{ x: -80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed left-0 top-0 h-full w-16 lg:w-64 z-40 flex flex-col"
      style={{ background: 'rgba(3, 7, 18, 0.9)', backdropFilter: 'blur(20px)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center gap-3 p-4 lg:p-6 border-b border-white/5">
        <div className="relative flex-shrink-0">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #06b6d4, #a855f7)' }}>
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400" style={{ boxShadow: '0 0 8px rgba(34,197,94,0.8)' }}>
            <div className="w-3 h-3 rounded-full bg-green-400 ping-slow absolute" />
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="text-xs font-mono font-bold text-white tracking-widest">MISSION</div>
          <div className="text-xs font-mono font-bold tracking-widest" style={{ color: '#06b6d4', textShadow: '0 0 10px rgba(6,182,212,0.8)' }}>CONTROL</div>
        </div>
      </div>
      <nav className="flex-1 p-2 lg:p-4 space-y-1 overflow-y-auto">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href
          const colors = colorMap[item.color as keyof typeof colorMap]
          const Icon = item.icon
          return (
            <motion.div key={item.href} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: index * 0.08, duration: 0.4 }}>
              <Link href={item.href}>
                <motion.div whileHover={{ scale: 1.02, x: 2 }} whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group ${isActive ? `${colors.bg} border ${colors.border} ${colors.glow}` : 'hover:bg-white/5 border border-transparent'}`}>
                  {isActive && <motion.div layoutId="activeIndicator" className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full ${colors.dot}`} />}
                  <Icon className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${isActive ? colors.active : 'text-white/40 group-hover:text-white/70'}`} />
                  <span className={`hidden lg:block text-sm font-medium transition-all duration-200 ${isActive ? `${colors.active} font-semibold` : 'text-white/50 group-hover:text-white/80'}`}>{item.label}</span>
                  {isActive && <motion.div className={`hidden lg:block ml-auto w-1.5 h-1.5 rounded-full ${colors.dot}`} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />}
                </motion.div>
              </Link>
            </motion.div>
          )
        })}
      </nav>
      <div className="p-2 lg:p-4 border-t border-white/5 space-y-2">
        <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3">
          <Activity className="w-4 h-4 text-green-400" />
          <div className="flex-1"><div className="text-xs text-white/50">System Status</div><div className="text-xs text-green-400 font-mono font-medium">ALL SYSTEMS GO</div></div>
        </div>
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5">
          <Radio className="w-3 h-3 text-white/20" /><span className="text-xs text-white/20 font-mono">v0.1.0-alpha</span>
        </div>
        <div className="flex lg:hidden justify-center"><Zap className="w-4 h-4 text-green-400" /></div>
      </div>
    </motion.aside>
  )
}
