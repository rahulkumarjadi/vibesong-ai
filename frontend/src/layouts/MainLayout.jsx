import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import MusicPlayer from '../components/MusicPlayer.jsx'

export default function MainLayout({ children }) {
  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 pb-32">{children}</main>
      <Footer />
      <MusicPlayer />
    </div>
  )
}
