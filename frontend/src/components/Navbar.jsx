import { Link, useLocation } from 'react-router-dom'
import { AudioLines } from 'lucide-react'

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <header className="relative z-10">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid place-items-center w-8 h-8 rounded-full bg-surface2 border border-line group-hover:border-teal/50 transition-colors">
            <AudioLines size={16} className="text-teal" />
          </span>
          <span className="font-display text-lg tracking-tight">VibeSong <span className="text-amber italic">AI</span></span>
        </Link>

        <div className="hidden sm:flex items-center gap-8 text-sm text-muted font-body">
          <Link to="/" className={pathname === '/' ? 'text-ink' : 'hover:text-ink transition-colors'}>Upload</Link>
          <Link to="/about" className={pathname === '/about' ? 'text-ink' : 'hover:text-ink transition-colors'}>About</Link>
          <a href="#supported" className="hover:text-ink transition-colors">Catalog</a>
        </div>
      </nav>
    </header>
  )
}
