export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
        <p className="font-display italic">Your Photo. Your Soundtrack.</p>
        <p>&copy; {new Date().getFullYear()} VibeSong AI. Built for people who remember moments in songs.</p>
      </div>
    </footer>
  )
}
