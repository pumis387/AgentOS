'use client'

import { use, useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader2, ChevronDown, Copy, Check, Trash2, Wifi, WifiOff, Cpu, Zap } from 'lucide-react'
import { AGENTS, ClaudeAvatar, OpenClawAvatar, HermesAvatar, AtlasAvatar } from '@/components/ChatSidebar'

type Role = 'user' | 'assistant'
interface Message { id: string; role: Role; content: string; timestamp: Date }

const MODELS = [
  { id: 'claude-opus-4-8', label: 'Opus 4', color: 'text-purple-400' },
  { id: 'claude-sonnet-4-6', label: 'Sonnet 4.6', color: 'text-cyan-400' },
  { id: 'claude-haiku-4-5', label: 'Haiku 4.5', color: 'text-green-400' },
]

const CANNED_MESSAGES: Record<string, Message[]> = {
  openclaw: [
    { id: 'oc-1', role: 'assistant', content: 'OpenClaw v2.4.1 initialized. Code analysis engine online.\n\n```\nAST parser: ready\nDependency graph: loaded\nSecurity scanner: active\nJobs in queue: 7\n```\n\nReady to analyze your codebase.', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
    { id: 'oc-2', role: 'assistant', content: '✓ Completed batch scan — 7 jobs processed. No critical vulnerabilities found. 3 optimization suggestions queued.', timestamp: new Date(Date.now() - 1000 * 60 * 2) },
  ],
  hermes: [
    { id: 'hm-1', role: 'assistant', content: 'Hermes routing layer active. 12 message flows currently in transit.\n\n```\nActive routes: 12\nQueued events: 47\nAvg latency: 4ms\nUptime: 99.97%\n```\n\nAll webhooks operational.', timestamp: new Date(Date.now() - 1000 * 60 * 8) },
    { id: 'hm-2', role: 'assistant', content: '⚡ Flow MC-0042 → ATLAS completed in 3.8ms. Routing 12 active event streams across 4 agent endpoints.', timestamp: new Date(Date.now() - 1000 * 30) },
  ],
  atlas: [
    { id: 'at-1', role: 'assistant', content: 'Atlas knowledge base offline. Last sync: 3 hours ago.\n\n```\nVector store: 2.4M embeddings\nIndex status: STALE\nLast query: 3h 12m ago\nConnection: OFFLINE\n```\n\nReconnect to enable knowledge retrieval.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3) },
  ],
}

function renderContent(content: string) {
  const parts = content.split(/(```[\s\S]*?```)/g)
  return parts.map((part, i) => {
    if (part.startsWith('```') && part.endsWith('```')) {
      const lines = part.slice(3, -3).split('\n')
      return (
        <div key={i} className="my-2 rounded-lg overflow-hidden border border-white/10">
          <div className="flex items-center px-3 py-1.5 bg-white/5 border-b border-white/10"><span className="text-[10px] font-mono text-white/40">{lines[0] || 'code'}</span></div>
          <pre className="p-3 text-xs font-mono text-green-300/80 overflow-x-auto bg-black/20 whitespace-pre-wrap">{lines.slice(1).join('\n')}</pre>
        </div>
      )
    }
    return <span key={i} className="whitespace-pre-wrap">{part}</span>
  })
}

function TypingIndicator({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map(i => (
        <motion.div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: color }}
          animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
    </div>
  )
}

function AgentAvatar({ slug, size }: { slug: string; size: number }) {
  switch (slug) {
    case 'claude': return <ClaudeAvatar size={size} />
    case 'openclaw': return <OpenClawAvatar size={size} />
    case 'hermes': return <HermesAvatar size={size} />
    case 'atlas': return <AtlasAvatar size={size} />
    default: return <ClaudeAvatar size={size} />
  }
}

export default function AgentChatPage({ params }: { params: Promise<{ agent: string }> }) {
  const { agent: agentSlug } = use(params)
  const agentData = AGENTS.find(a => a.slug === agentSlug) ?? AGENTS[0]
  const isClaude = agentSlug === 'claude'
  const isOffline = agentData.status === 'OFFLINE'

  const [messages, setMessages] = useState<Message[]>(() => {
    if (isClaude) return [{ id: 'init', role: 'assistant', content: 'Mission Control initialized. I\'m Claude — ready to assist with any task.\n\n```\nModel: claude-sonnet-4-6\nContext: 200K tokens\nStreaming: enabled\n```', timestamp: new Date() }]
    return CANNED_MESSAGES[agentSlug] ?? []
  })
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [streamContent, setStreamContent] = useState('')
  const [model, setModel] = useState(MODELS[1])
  const [showModelPicker, setShowModelPicker] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [showTyping, setShowTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, streamContent, showTyping])

  const copyMessage = (id: string, content: string) => { navigator.clipboard.writeText(content); setCopiedId(id); setTimeout(() => setCopiedId(null), 2000) }

  const sendClaude = async (text: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() }
    setMessages(prev => [...prev, userMsg]); setInput(''); setLoading(true); setStreamContent('')
    try {
      const response = await fetch('/api/claude', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })), model: model.id }) })
      if (!response.ok) throw new Error(`API error: ${response.status}`)
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''
      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          for (const line of decoder.decode(value, { stream: true }).split('\n')) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') break
              try { const p = JSON.parse(data); if (p.delta?.text) { accumulated += p.delta.text; setStreamContent(accumulated) } } catch {}
            }
          }
        }
      }
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: accumulated || 'No response received.', timestamp: new Date() }])
    } catch (err) {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: `Error: ${err instanceof Error ? err.message : 'Unknown error'}. Check your ANTHROPIC_API_KEY in .env.local.`, timestamp: new Date() }])
    } finally { setLoading(false); setStreamContent('') }
  }

  const sendSimulated = async (text: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() }
    setMessages(prev => [...prev, userMsg]); setInput(''); setShowTyping(true)
    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800))
    setShowTyping(false)
    const reply = isOffline ? `${agentData.name} is currently offline. Reconnect the agent service to restore communication.` : `[${agentData.name}] This agent interface is not yet connected to a live backend. Configure the endpoint in Settings to enable real communication.`
    setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: reply, timestamp: new Date() }])
  }

  const sendMessage = () => { const text = input.trim(); if (!text || loading) return; isClaude ? sendClaude(text) : sendSimulated(text) }
  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }

  const statusColor = agentData.status === 'ONLINE' ? '#22c55e' : agentData.status === 'BUSY' ? '#f59e0b' : '#6b7280'
  const statusLabel = agentData.status === 'ONLINE' ? 'Online' : agentData.status === 'BUSY' ? 'Busy' : 'Offline'

  return (
    <div className="flex flex-col h-screen bg-transparent">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
        className="flex items-center justify-between px-6 py-4 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(8,12,20,0.6)', backdropFilter: 'blur(16px)' }}>
        <div className="flex items-center gap-4">
          <div className="relative">
            <AgentAvatar slug={agentSlug} size={44} />
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2"
              style={{ background: statusColor, borderColor: '#080c14', boxShadow: agentData.status !== 'OFFLINE' ? `0 0 8px ${statusColor}` : 'none' }} />
          </div>
          <div>
            <h1 className="text-base font-bold font-mono text-white tracking-wide leading-none">{agentData.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-mono" style={{ color: statusColor }}>{statusLabel}</span>
              <span className="text-white/20 text-xs">·</span>
              <span className="text-xs font-mono text-white/30">{agentData.description}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-white/30">
          {isClaude && (<><div className="flex items-center gap-1.5"><Cpu className="w-3 h-3 text-purple-400" /><span>200K ctx</span></div><div className="flex items-center gap-1.5"><Zap className="w-3 h-3 text-cyan-400" /><span>Streaming</span></div></>)}
          <div className="flex items-center gap-1.5">
            {isOffline ? <WifiOff className="w-3 h-3 text-gray-500" /> : <Wifi className="w-3 h-3" style={{ color: statusColor }} />}
            <span style={{ color: statusColor }}>{statusLabel}</span>
          </div>
        </div>
      </motion.div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.06) transparent' }}>
        <AnimatePresence initial={false}>
          {messages.map(msg => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.3, ease: 'easeOut' }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && <div className="flex-shrink-0 mt-1"><AgentAvatar slug={agentSlug} size={32} /></div>}
              <div className={`max-w-[72%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                <div className={`text-[10px] font-mono mb-1.5 ${msg.role === 'user' ? 'text-right text-cyan-400/40' : 'text-white/25'}`}>
                  {msg.role === 'user' ? 'You' : agentData.name}
                  <span className="ml-2">{msg.timestamp.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="relative group rounded-2xl px-4 py-3 text-sm font-mono leading-relaxed"
                  style={msg.role === 'user' ? { background: 'linear-gradient(135deg, rgba(6,182,212,0.12), rgba(6,182,212,0.06))', border: '1px solid rgba(6,182,212,0.2)', color: 'rgba(224,242,254,0.9)', borderBottomRightRadius: '4px' } : { background: `linear-gradient(135deg, ${agentData.color}0d, ${agentData.color}06)`, border: `1px solid ${agentData.color}22`, color: 'rgba(255,255,255,0.82)', borderBottomLeftRadius: '4px', boxShadow: `0 0 20px ${agentData.color}08` }}>
                  {renderContent(msg.content)}
                  <button onClick={() => copyMessage(msg.id, msg.content)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg bg-white/5 hover:bg-white/10">
                    {copiedId === msg.id ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 text-white/30" />}
                  </button>
                </div>
              </div>
              {msg.role === 'user' && (
                <div className="flex-shrink-0 mt-1 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold font-mono"
                  style={{ background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.25)', color: '#06b6d4' }}>YOU</div>
              )}
            </motion.div>
          ))}
          {loading && (
            <motion.div key="streaming" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 justify-start">
              <div className="flex-shrink-0 mt-1"><AgentAvatar slug={agentSlug} size={32} /></div>
              <div className="max-w-[72%]">
                <div className="text-[10px] font-mono mb-1.5 text-white/25">{agentData.name} <span className="ml-1 text-cyan-400/40">streaming...</span></div>
                <div className="rounded-2xl px-4 py-3 text-sm font-mono leading-relaxed" style={{ background: `linear-gradient(135deg, ${agentData.color}0d, ${agentData.color}06)`, border: `1px solid ${agentData.color}22`, color: 'rgba(255,255,255,0.82)', borderBottomLeftRadius: '4px' }}>
                  {streamContent ? <span className="whitespace-pre-wrap">{streamContent}<motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }} className="inline-block w-0.5 h-3.5 bg-current ml-0.5 align-text-bottom" /></span> : <TypingIndicator color={agentData.color} />}
                </div>
              </div>
            </motion.div>
          )}
          {showTyping && !loading && (
            <motion.div key="typing" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="flex gap-3 justify-start">
              <div className="flex-shrink-0 mt-1"><AgentAvatar slug={agentSlug} size={32} /></div>
              <div className="rounded-2xl" style={{ background: `linear-gradient(135deg, ${agentData.color}0d, ${agentData.color}06)`, border: `1px solid ${agentData.color}22` }}>
                <TypingIndicator color={agentData.color} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="flex-shrink-0 px-6 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-end gap-3">
          {isClaude && (
            <div className="relative flex-shrink-0">
              <button onClick={() => setShowModelPicker(p => !p)} className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-mono border border-white/10 hover:bg-white/5 transition-colors" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <span className={model.color}>{model.label}</span><ChevronDown className="w-3 h-3 text-white/30" />
              </button>
              <AnimatePresence>
                {showModelPicker && (
                  <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }} transition={{ duration: 0.15 }}
                    className="absolute bottom-full mb-2 left-0 rounded-xl overflow-hidden z-50" style={{ background: 'rgba(10,15,30,0.97)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', minWidth: '190px' }}>
                    {MODELS.map(m => (
                      <button key={m.id} onClick={() => { setModel(m); setShowModelPicker(false) }} className={`w-full text-left px-4 py-2.5 text-xs font-mono hover:bg-white/5 transition-colors ${m.id === model.id ? 'bg-white/5' : ''}`}>
                        <span className={m.color}>{m.label}</span><span className="text-white/25 ml-2 text-[10px]">{m.id}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
          <div className="flex-1 relative">
            <textarea ref={textareaRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
              placeholder={isOffline ? `${agentData.name} is offline...` : `Message ${agentData.name}...`}
              rows={1} disabled={loading || showTyping}
              className="w-full resize-none rounded-2xl px-5 py-3 text-sm font-mono text-white/80 placeholder-white/20 outline-none transition-all disabled:opacity-40"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', maxHeight: '120px', minHeight: '48px', lineHeight: '1.5' }}
              onFocus={e => { e.currentTarget.style.borderColor = `${agentData.color}50`; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.boxShadow = `0 0 0 3px ${agentData.color}10` }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.boxShadow = 'none' }}
              onInput={e => { const t = e.currentTarget; t.style.height = 'auto'; t.style.height = Math.min(t.scrollHeight, 120) + 'px' }} />
          </div>
          <div className="flex flex-col gap-2 flex-shrink-0">
            <motion.button onClick={sendMessage} disabled={loading || showTyping || !input.trim()} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
              className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all disabled:opacity-30"
              style={{ background: loading || showTyping ? `${agentData.color}30` : `linear-gradient(135deg, ${agentData.color}, ${agentData.color}99)`, boxShadow: loading || showTyping ? 'none' : `0 0 20px ${agentData.color}40` }}>
              {loading || showTyping ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Send className="w-4 h-4 text-white" />}
            </motion.button>
            <motion.button onClick={() => { if (isClaude) { setMessages(msgs => msgs.slice(0, 1)) } else { setMessages(CANNED_MESSAGES[agentSlug] ?? []) } }} whileTap={{ scale: 0.94 }}
              className="w-11 h-11 rounded-2xl flex items-center justify-center border border-white/10 hover:bg-white/5 transition-colors" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <Trash2 className="w-4 h-4 text-white/25 hover:text-white/50 transition-colors" />
            </motion.button>
          </div>
        </div>
        <p className="mt-2 text-[10px] text-white/20 font-mono text-center">
          Enter to send · Shift+Enter for newline
          {isClaude && <> · Model: <span className={model.color}>{model.id}</span></>}
          {isOffline && <> · <span className="text-gray-500">Agent offline</span></>}
        </p>
      </motion.div>
    </div>
  )
}
