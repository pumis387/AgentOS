import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import StatusBar from '@/components/StatusBar'
import StarField from '@/components/StarField'

export const metadata: Metadata = {
  title: 'Mission Control — AI Command Center',
  description: 'Local AI Mission Control dashboard for managing Claude and AI agents',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#030712] text-white antialiased overflow-hidden h-screen">
        <StarField />
        <div className="fixed inset-0 grid-bg pointer-events-none z-0 opacity-60" />
        <div
          className="fixed left-0 right-0 h-px opacity-[0.03] pointer-events-none z-10 scanline"
          style={{ background: 'linear-gradient(transparent, rgba(6,182,212,0.8), transparent)', height: '2px' }}
        />
        <Sidebar />
        <StatusBar />
        <main className="relative z-10 overflow-y-auto" style={{ marginLeft: '4rem', paddingTop: '40px', height: '100vh' }}>
          <div className="lg:ml-48 min-h-full">{children}</div>
        </main>
      </body>
    </html>
  )
}
