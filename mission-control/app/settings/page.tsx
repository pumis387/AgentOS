'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, Eye, EyeOff, Save, Check, Key, Globe, Bell, Palette, Shield, RefreshCw } from 'lucide-react'

function Section({ title, icon: Icon, children, delay = 0 }: { title: string; icon: React.ElementType; children: React.ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
      className="rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-white/5">
        <Icon className="w-4 h-4 text-white/40" />
        <h2 className="text-xs font-mono font-bold text-white/50 uppercase tracking-widest">{title}</h2>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </motion.div>
  )
}

function MaskedInput({ label, placeholder, defaultValue = '', hint }: { label: string; placeholder: string; defaultValue?: string; hint?: string }) {
  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState(defaultValue)
  const [saved, setSaved] = useState(false)
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }
  return (
    <div>
      <label className="block text-xs font-mono text-white/40 mb-1.5 uppercase tracking-wider">{label}</label>
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <input type={visible ? 'text' : 'password'} value={value} onChange={e => setValue(e.target.value)} placeholder={placeholder}
            className="w-full bg-white/3 border border-white/10 rounded-lg px-3 py-2 text-sm font-mono text-white/70 placeholder-white/20 outline-none focus:border-cyan-500/40 transition-colors pr-10 input-glow" />
          <button onClick={() => setVisible(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
            {visible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </button>
        </div>
        <motion.button whileTap={{ scale: 0.95 }} onClick={handleSave}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono border transition-colors"
          style={saved ? { background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e' } : { background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)', color: '#06b6d4' }}>
          {saved ? <Check className="w-3 h-3" /> : <Save className="w-3 h-3" />}{saved ? 'Saved' : 'Save'}
        </motion.button>
      </div>
      {hint && <p className="text-[10px] text-white/20 font-mono mt-1">{hint}</p>}
    </div>
  )
}

function TextInput({ label, placeholder, defaultValue = '', hint }: { label: string; placeholder: string; defaultValue?: string; hint?: string }) {
  const [value, setValue] = useState(defaultValue)
  return (
    <div>
      <label className="block text-xs font-mono text-white/40 mb-1.5 uppercase tracking-wider">{label}</label>
      <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder={placeholder}
        className="w-full bg-white/3 border border-white/10 rounded-lg px-3 py-2 text-sm font-mono text-white/70 placeholder-white/20 outline-none focus:border-cyan-500/40 transition-colors input-glow" />
      {hint && <p className="text-[10px] text-white/20 font-mono mt-1">{hint}</p>}
    </div>
  )
}

function Toggle({ label, defaultOn = false, description }: { label: string; defaultOn?: boolean; description?: string }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <div className="flex items-start justify-between gap-4">
      <div><p className="text-sm font-mono text-white/60">{label}</p>{description && <p className="text-xs text-white/25 font-mono mt-0.5">{description}</p>}</div>
      <button onClick={() => setOn(o => !o)} className="flex-shrink-0 relative w-9 h-5 rounded-full transition-colors duration-200" style={{ background: on ? 'rgba(6,182,212,0.6)' : 'rgba(255,255,255,0.1)' }}>
        <motion.div animate={{ x: on ? 16 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow" />
      </button>
    </div>
  )
}

const ACCENT_COLORS = [{ name: 'Cyan', value: '#06b6d4' }, { name: 'Purple', value: '#a855f7' }, { name: 'Green', value: '#22c55e' }, { name: 'Amber', value: '#f59e0b' }, { name: 'Rose', value: '#f43f5e' }, { name: 'Blue', value: '#3b82f6' }]

export default function SettingsPage() {
  const [accent, setAccent] = useState('#06b6d4')
  return (
    <div className="p-6 space-y-5 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.2), rgba(6,182,212,0.15))', border: '1px solid rgba(34,197,94,0.3)' }}>
          <Settings className="w-4 h-4 text-green-400" />
        </div>
        <div><h1 className="text-sm font-mono font-bold text-white tracking-wide">SETTINGS</h1><p className="text-xs text-white/30 font-mono">Configure Mission Control</p></div>
      </motion.div>
      <Section title="API Keys" icon={Key} delay={0.1}>
        <MaskedInput label="Anthropic API Key" placeholder="sk-ant-..." hint="Set in .env.local as ANTHROPIC_API_KEY" />
        <MaskedInput label="OpenClaw API Token" placeholder="ocl-..." hint="OpenClaw service authentication token" />
        <MaskedInput label="Hermes Secret" placeholder="hms-..." hint="Hermes routing layer authentication" />
      </Section>
      <Section title="Agent Connection URLs" icon={Globe} delay={0.15}>
        <TextInput label="OpenClaw Endpoint" placeholder="http://localhost:3001" defaultValue="http://localhost:3001" />
        <TextInput label="Hermes Endpoint" placeholder="http://localhost:3002" defaultValue="http://localhost:3002" />
        <TextInput label="Atlas Endpoint" placeholder="http://localhost:3003" />
        <motion.button whileTap={{ scale: 0.95 }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border border-white/10 bg-white/3 hover:bg-white/6 text-white/50 transition-colors">
          <RefreshCw className="w-3 h-3" />Test All Connections
        </motion.button>
      </Section>
      <Section title="Theme & Appearance" icon={Palette} delay={0.2}>
        <div>
          <label className="block text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">Accent Color</label>
          <div className="flex items-center gap-2 flex-wrap">
            {ACCENT_COLORS.map(c => (
              <button key={c.value} onClick={() => setAccent(c.value)} title={c.name} className="w-8 h-8 rounded-lg transition-all relative"
                style={{ background: c.value, boxShadow: accent === c.value ? `0 0 12px ${c.value}80` : 'none', transform: accent === c.value ? 'scale(1.2)' : 'scale(1)' }}>
                {accent === c.value && <Check className="w-3 h-3 text-white absolute inset-0 m-auto" />}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-white/20 font-mono mt-2">Selected: <span style={{ color: accent }}>{accent}</span></p>
        </div>
        <Toggle label="Starfield Animation" defaultOn={true} description="Animated star particles in background" />
        <Toggle label="Scanline Effect" defaultOn={true} description="Retro CRT scanline overlay" />
        <Toggle label="Reduced Motion" description="Disable Framer Motion animations" />
      </Section>
      <Section title="Notifications" icon={Bell} delay={0.25}>
        <Toggle label="Agent Status Changes" defaultOn={true} description="Alert when agents go online/offline" />
        <Toggle label="Error Alerts" defaultOn={true} description="Show alerts for API errors and failures" />
        <Toggle label="Response Complete" description="Notify when long-running responses finish" />
        <Toggle label="Token Budget Warnings" defaultOn={true} description="Warn when approaching context limits" />
      </Section>
      <Section title="Security" icon={Shield} delay={0.3}>
        <Toggle label="CLI Command Whitelist" defaultOn={true} description="Restrict CLI bridge to approved commands only" />
        <Toggle label="Request Logging" defaultOn={true} description="Log all API requests for debugging" />
        <Toggle label="Rate Limiting" defaultOn={true} description="Limit API calls to prevent runaway costs" />
        <TextInput label="Allowed CLI Commands" placeholder="analyze, summarize, review" defaultValue="analyze, summarize, review, explain, help" hint="Comma-separated list of allowed claude CLI subcommands" />
      </Section>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex justify-end pb-6">
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-mono font-semibold text-white"
          style={{ background: 'linear-gradient(135deg, #22c55e, #06b6d4)', boxShadow: '0 0 20px rgba(34,197,94,0.3)' }}>
          <Save className="w-4 h-4" />Save All Settings
        </motion.button>
      </motion.div>
    </div>
  )
}
