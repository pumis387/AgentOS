import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const VAULT = process.env.OBSIDIAN_VAULT_PATH
  ?? '/mnt/c/Users/Pumlani/AppData/Roaming/Pumis Obsidian Vault'

function todayStr() {
  return new Date().toISOString().split('T')[0]
}

function timeStr() {
  return new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, agent, userMessage, assistantMessage } = body as {
      type: 'chat'
      agent: string
      userMessage: string
      assistantMessage: string
    }

    const folder = path.join(VAULT, 'Agentic OS')
    const file = path.join(folder, `${todayStr()}.md`)

    fs.mkdirSync(folder, { recursive: true })

    const header = `# Agentic OS — ${todayStr()}\n\n`
    const existing = fs.existsSync(file) ? fs.readFileSync(file, 'utf-8') : header

    const entry = [
      `## ${timeStr()} — Chat with ${agent}`,
      '',
      `**You:** ${userMessage}`,
      '',
      `**${agent}:** ${assistantMessage}`,
      '',
      '---',
      '',
    ].join('\n')

    fs.writeFileSync(file, existing + entry, 'utf-8')

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
