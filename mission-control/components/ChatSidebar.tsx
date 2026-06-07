'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { LayoutDashboard, Settings, Activity, Shield } from 'lucide-react'

function ClaudeAvatar({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="claude-bg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#06b6d4" stopOpacity="0.3" />
          <stop offset="1" stopColor="#0891b2" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="claude-stroke" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#06b6d4" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <path d="M18 3L31.86 10.5V25.5L18 33L4.14 25.5V10.5L18 3Z" fill="url(#claude-bg)" stroke="url(#claude-stroke)" strokeWidth="1.2" />
      <path d="M18 10L24.5 18L18 26L11.5 18L18 10Z" fill="none" stroke="#06b6d4" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="18" cy="18" r="2.5" fill="#06b6d4" opacity="0.9" />
      <circle cx="18" cy="3" r="1" fill="#06b6d4" opacity="0.6" />
      <circle cx="31.86" cy="10.5" r="1" fill="#06b6d4" opacity="0.4" />
      <circle cx="31.86" cy="25.5" r="1" fill="#06b6d4" opacity="0.4" />
    </svg>
  )
}

function OpenClawAvatar({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="claw-bg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f59e0b" stopOpacity="0.25" />
          <stop offset="1" stopColor="#d97706" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="32" height="32" rx="8" fill="url(#claw-bg)" stroke="#f59e0b" strokeWidth="1.2" strokeOpacity="0.6" />
      <path d="M10 9L6 13V23L10 27" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 9L30 13V23L26 27" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 12V20M18 10V22M22 12V20" stroke="#f59e0b" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.8" />
      <path d="M14 20C14 23 22 23 22 20" stroke="#f59e0b" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    </svg>
  )
}

function HermesAvatar({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hermes-bg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a855f7" stopOpacity="0.25" />
          <stop offset="1" stopColor="#9333ea" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="hermes-wave" x1="0" y1="18" x2="36" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a855f7" />
          <stop offset="1" stopColor="#c084fc" />
        </linearGradient>
      </defs>
      <circle cx="18" cy="18" r="16" fill="url(#hermes-bg)" stroke="#a855f7" strokeWidth="1.2" strokeOpacity="0.5" />
      <path d="M6 18 C8 14, 12 22, 14 18 C16 14, 20 22, 22 18 C24 14, 28 22, 30 18" stroke="url(#hermes-wave)" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="6" cy="18" r="2" fill="#a855f7" />
      <circle cx="30" cy="18" r="2" fill="#c084fc" />
      <ellipse cx="18" cy="18" rx="13" ry="5" stroke="#a855f7" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="2 3" />
    </svg>
  )
}

function AtlasAvatar({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="atlas-bg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22c55e" stopOpacity="0.2" />
          <stop offset="1" stopColor="#16a34a" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <circle cx="18" cy="18" r="16" fill="url(#atlas-bg)" stroke="#22c55e" strokeWidth="1.2" strokeOpacity="0.5" />
      <ellipse cx="18" cy="18" rx="10" ry="13" stroke="#22c55e" strokeWidth="1.2" strokeOpacity="0.7" fill="none" />
      <ellipse cx="18" cy="18" rx="5" ry="13" stroke="#22c55e" strokeWidth="0.8" strokeOpacity="0.4" fill="none" />
      <path d="M8 13 Q18 10 28 13" stroke="#22c55e" strokeWidth="0.8" strokeOpacity="0.5" fill="none" />
      <path d="M5 18 H31" stroke="#22c55e" strokeWidth="0.8" strokeOpacity="0.4" />
      <path d="M8 23 Q18 26 28 23" stroke="#22c55e" strokeWidth="0.8" strokeOpacity="0.5" fill="none" />
      <circle cx="18" cy="18" r="2" fill="#22c55e" opacity="0.8" />
    </svg>
  )
}

const AGENTS = [
  { slug: 'claude', name: 'Claude', color: '#06b6d4', status: 'ONLINE' as const, description: 'Anthropic AI', lastMsg: 'Ready for commands...', unread: 0, Avatar: ClaudeAvatar },
  { slug: 'openclaw', name: 'OpenClaw', color: '#f59e0b', status: 'ONLINE' as const, description: 'Code Analysis', lastMsg: '7 jobs completed ✓', unread: 2, Avatar: OpenClawAvatar },
  { slug: 'hermes', name: 'Hermes', color: '#a855f7', status: 'BUSY' as const, description: 'Message Router', lastMsg: 'Routing 12 active flows...', unread: 5, Avatar: HermesAvatar },
  { slug: 'atlas', name: 'Atlas', color: '#22c55e', status: 'OFFLINE' as const, description: 'Knowledge Base', lastMsg: 'Last seen 3h ago', unread: 0, Avatar: AtlasAvatar },
]

const STATUS_DOT: Record<string, string> = { ONLINE: '#22c55e', BUSY: '#f59e0b', OFFLINE: '#6b7280' }
const NAV_LINKS = [
  { href: '/', label: 'Dashboard', Icon: LayoutDashboard },
  { href: '/settings', label: 'Settings', Icon: Settings },
]

export { ClaudeAvatar, OpenClawAvatar, HermesAvatar, AtlasAvatar, AGENTS }

export default function ChatSidebar() {
  const pathname = usePathname()
  return (
    <motion.aside
      initial={{ x: -280, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 top-0 h-full z-40 flex flex-col select-none"
      style={{ width: '260px', background: 'rgba(6,9,20,0.92)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderRight: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="flex items-center gap-3 px-5 py-4 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #06b6d4, #a855f7)', boxShadow: '0 0 16px rgba(6,182,212,0.4)' }}>
          <Shield className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-mono font-bold text-white tracking-[0.2em]">MISSION CONTROL</div>
          <div className="text-[9px] font-mono text-white/30 tracking-widest mt-0.5">v0.1.0 · AI COMMAND CENTER</div>
        </div>
        <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
      </div>

      <div className="flex-1 overflow-y-auto py-3" style={{ scrollbarWidth: 'none' }}>
        <div className="px-5 mb-2"><span className="text-[9px] font-mono font-bold text-white/25 tracking-[0.25em] uppercase">AI Agents</span></div>
        <div className="space-y-0.5 px-2">
          {AGENTS.map((agent, i) => {
            const isActive = pathname === `/agents/${agent.slug}`
            const statusColor = STATUS_DOT[agent.status]
            return (
              <motion.div key={agent.slug} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06, duration: 0.35, ease: 'easeOut' }}>
                <Link href={`/agents/${agent.slug}`}>
                  <motion.div whileHover={{ backgroundColor: 'rgba(255,255,255,0.04)', x: 1 }} whileTap={{ scale: 0.99 }}
                    className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors"
                    style={isActive ? { background: `${agent.color}12`, borderLeft: `2px solid ${agent.color}`, paddingLeft: '10px' } : { borderLeft: '2px solid transparent' }}>
                    <div className="relative flex-shrink-0">
                      <agent.Avatar size={36} />
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
                        style={{ background: statusColor, borderColor: '#060914', boxShadow: agent.status === 'ONLINE' ? `0 0 6px ${statusColor}` : 'none' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[13px] font-semibold truncate" style={{ color: isActive ? agent.color : 'rgba(255,255,255,0.85)', fontFamily: 'JetBrains Mono, monospace' }}>{agent.name}</span>
                        {agent.unread > 0 && <span className="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ background: agent.color, color: '#000' }}>{agent.unread}</span>}
                      </div>
                      <p className="text-[10px] text-white/35 font-mono truncate leading-tight mt-0.5">{agent.lastMsg}</p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <div className="px-5 mt-5 mb-2"><span className="text-[9px] font-mono font-bold text-white/25 tracking-[0.25em] uppercase">Navigation</span></div>
        <div className="space-y-0.5 px-2">
          {NAV_LINKS.map(({ href, label, Icon }) => {
            const isActive = pathname === href
            return (
              <Link key={href} href={href}>
                <motion.div whileHover={{ backgroundColor: 'rgba(255,255,255,0.04)', x: 1 }} whileTap={{ scale: 0.99 }}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-colors"
                  style={isActive ? { background: 'rgba(6,182,212,0.08)', borderLeft: '2px solid rgba(6,182,212,0.6)', paddingLeft: '10px' } : { borderLeft: '2px solid transparent' }}>
                  <Icon className="w-4 h-4 flex-shrink-0" style={{ color: isActive ? '#06b6d4' : 'rgba(255,255,255,0.35)' }} />
                  <span className="text-[12px] font-mono" style={{ color: isActive ? '#06b6d4' : 'rgba(255,255,255,0.55)' }}>{label}</span>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </div>

      <div className="px-4 py-3 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.12)' }}>
          <Activity className="w-3 h-3 text-green-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest">System Status</div>
            <div className="text-[10px] font-mono text-green-400 font-semibold">ALL SYSTEMS GO</div>
          </div>
          <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
        </div>
      </div>
    </motion.aside>
  )
}
