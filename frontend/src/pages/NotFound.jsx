import { Link } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout.jsx'

export default function NotFound() {
  return (
    <MainLayout>
      <div className="py-32 text-center">
        <p className="font-mono text-teal text-sm mb-3">404</p>
        <h1 className="font-display text-4xl mb-4">This track doesn't exist.</h1>
        <p className="text-muted mb-8">The page you're looking for skipped to the next one.</p>
        <Link to="/" className="inline-flex items-center gap-2 bg-amber text-void font-medium px-6 py-3 rounded-full hover:brightness-110 transition">
          Back to upload
        </Link>
      </div>
    </MainLayout>
  )
}
