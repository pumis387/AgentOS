'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader2, ChevronDown, Copy, Check, Trash2 } from 'lucide-react'

type Role = 'user' | 'assistant'
interface Message { id: string; role: Role; content: string; model?: string; timestamp: Date }

const MODELS = [
  { id: 'claude-opus-4-8', label: 'Opus 4', color: 'text-purple-400' },
  { id: 'claude-sonnet-4-6', label: 'Sonnet 4.6', color: 'text-cyan-400' },
  { id: 'claude-haiku-4-5', label: 'Haiku 4.5', color: 'text-green-400' },
]

export default function Terminal() {
  const [messages, setMessages] = useState<Message[]>([{ id: '0', role: 'assistant', content: 'Mission Control Terminal initialized. I am Claude, ready to assist.\n\n```\nSystem: All subsystems nominal\nModel: claude-sonnet-4-6\nContext: 200K tokens available\n```', timestamp: new Date() }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [model, setModel] = useState(MODELS[1])
  const [showModelPicker, setShowModelPicker] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [streamContent, setStreamContent] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, streamContent])

  const copyMessage = (id: string, content: string) => { navigator.clipboard.writeText(content); setCopiedId(id); setTimeout(() => setCopiedId(null), 2000) }

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input.trim(), timestamp: new Date() }
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
          const lines = decoder.decode(value, { stream: true }).split('\n')
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') break
              try { const parsed = JSON.parse(data); if (parsed.delta?.text) { accumulated += parsed.delta.text; setStreamContent(accumulated) } } catch {}
            }
          }
        }
      }
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: accumulated || 'No response received.', model: model.id, timestamp: new Date() }])
    } catch (err) {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: `Error: ${err instanceof Error ? err.message : 'Unknown error'}. Check your ANTHROPIC_API_KEY in .env.local.`, timestamp: new Date() }])
    } finally { setLoading(false); setStreamContent('') }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }

  const renderContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g)
    return parts.map((part, i) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const lines = part.slice(3, -3).split('\n')
        return (<div key={i} className="my-2 rounded-lg overflow-hidden border border-white/10"><div className="flex items-center px-3 py-1.5 bg-white/5 border-b border-white/10"><span className="text-[10px] font-mono text-white/40">{lines[0] || 'code'}</span></div><pre className="p-3 text-xs font-mono text-green-300/80 overflow-x-auto bg-black/20">{lines.slice(1).join('\n')}</pre></div>)
      }
      return <span key={i} className="whitespace-pre-wrap">{part}</span>
    })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map(msg => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] group relative ${msg.role === 'user' ? 'ml-12' : 'mr-12'}`}>
                <div className={`text-[10px] font-mono mb-1 flex items-center gap-2 ${msg.role === 'user' ? 'justify-end text-cyan-400/60' : 'text-purple-400/60'}`}>
                  <span>{msg.role === 'user' ? 'YOU' : `CLAUDE${msg.model ? ` / ${msg.model.split('-').slice(-2).join('-')}` : ''}`}</span>
                  <span className="text-white/20">{msg.timestamp.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="relative px-4 py-3 rounded-xl text-sm font-mono leading-relaxed"
                  style={msg.role === 'user' ? { background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)', color: 'rgba(224,242,254,0.9)' } : { background: 'rgba(168,85,247,0.07)', border: '1px solid rgba(168,85,247,0.2)', color: 'rgba(233,213,255,0.85)', boxShadow: '0 0 20px rgba(168,85,247,0.05)' }}>
                  {renderContent(msg.content)}
                </div>
                <button onClick={() => copyMessage(msg.id, msg.content)} className="absolute -top-1 right-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded bg-white/5 hover:bg-white/10">
                  {copiedId === msg.id ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 text-white/30" />}
                </button>
              </div>
            </motion.div>
          ))}
          {loading && (
            <motion.div key="streaming" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
              <div className="max-w-[80%] mr-12">
                <div className="text-[10px] font-mono mb-1 text-purple-400/60">CLAUDE / streaming...</div>
                <div className="px-4 py-3 rounded-xl text-sm font-mono leading-relaxed" style={{ background: 'rgba(168,85,247,0.07)', border: '1px solid rgba(168,85,247,0.2)', color: 'rgba(233,213,255,0.85)' }}>
                  {streamContent ? <span className="whitespace-pre-wrap">{streamContent}<span className="cursor-blink ml-0.5" /></span> : <div className="flex items-center gap-2 text-purple-400/50"><Loader2 className="w-3 h-3 animate-spin" /><span>Generating response...</span></div>}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>
      <div className="border-t border-white/5 p-4">
        <div className="flex items-end gap-3">
          <div className="relative flex-shrink-0">
            <button onClick={() => setShowModelPicker(p => !p)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono border border-white/10 bg-white/3 hover:bg-white/7 transition-colors">
              <span className={model.color}>{model.label}</span><ChevronDown className="w-3 h-3 text-white/30" />
            </button>
            <AnimatePresence>
              {showModelPicker && (
                <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }} transition={{ duration: 0.15 }}
                  className="absolute bottom-full mb-2 left-0 rounded-xl overflow-hidden z-50" style={{ background: 'rgba(10,15,30,0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.12)', minWidth: '180px' }}>
                  {MODELS.map(m => (
                    <button key={m.id} onClick={() => { setModel(m); setShowModelPicker(false) }} className={`w-full text-left px-4 py-2.5 text-xs font-mono hover:bg-white/5 transition-colors ${m.id === model.id ? 'bg-white/5' : ''}`}>
                      <span className={m.color}>{m.label}</span><span className="text-white/30 ml-2 text-[10px]">{m.id}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex-1 relative">
            <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
              placeholder="Enter command or message... (Shift+Enter for new line)" rows={1} disabled={loading}
              className="w-full resize-none bg-white/3 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white/80 placeholder-white/20 outline-none transition-all focus:border-cyan-500/40 focus:bg-white/5 input-glow disabled:opacity-40"
              style={{ maxHeight: '120px', minHeight: '44px', lineHeight: '1.5' }}
              onInput={e => { const t = e.currentTarget; t.style.height = 'auto'; t.style.height = Math.min(t.scrollHeight, 120) + 'px' }} />
          </div>
          <div className="flex flex-col gap-2 flex-shrink-0">
            <motion.button onClick={sendMessage} disabled={loading || !input.trim()} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-30"
              style={{ background: loading ? 'rgba(168,85,247,0.2)' : 'linear-gradient(135deg, #06b6d4, #a855f7)', boxShadow: loading ? 'none' : '0 0 20px rgba(6,182,212,0.3)' }}>
              {loading ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Send className="w-4 h-4 text-white" />}
            </motion.button>
            <motion.button onClick={() => setMessages(msgs => msgs.slice(0, 1))} whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 bg-white/3 hover:bg-white/8 transition-colors">
              <Trash2 className="w-4 h-4 text-white/30 hover:text-white/60" />
            </motion.button>
          </div>
        </div>
        <p className="mt-2 text-[10px] text-white/20 font-mono text-center">Enter to send · Shift+Enter for newline · Model: <span className={model.color}>{model.id}</span></p>
      </div>
    </div>
  )
}
