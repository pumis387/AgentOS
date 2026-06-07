import type { Metadata } from 'next'
import './globals.css'
import ChatSidebar from '@/components/ChatSidebar'
import StarField from '@/components/StarField'

export const metadata: Metadata = {
  title: 'Mission Control — AI Command Center',
  description: 'Local AI Mission Control dashboard for managing Claude and AI agents',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#080c14] text-white antialiased overflow-hidden h-screen">
        <StarField />
        <div className="fixed inset-0 grid-bg pointer-events-none z-0 opacity-40" />
        <div className="fixed left-0 right-0 h-px opacity-[0.025] pointer-events-none z-10 scanline" style={{ background: 'linear-gradient(transparent, rgba(6,182,212,0.8), transparent)', height: '2px' }} />
        <ChatSidebar />
        <main className="relative z-10 overflow-y-auto" style={{ marginLeft: '260px', height: '100vh' }}>
          {children}
        </main>
      </body>
    </html>
  )
}
