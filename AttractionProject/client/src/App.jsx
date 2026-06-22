import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { ToastProvider } from './components/Toast'
import Home from './pages/Home'
import Attractions from './pages/Attractions'
import TripDetail from './pages/TripDetail'
import Travelers from './pages/Travelers'
import Comments from './pages/Comments'
import Images from './pages/Images'

export default function App() {
  return (
    <ToastProvider>
      <div className="app-shell">
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/attractions" element={<Attractions />} />
            <Route path="/attractions/:id" element={<TripDetail />} />
            <Route path="/travelers" element={<Travelers />} />
            <Route path="/comments" element={<Comments />} />
            <Route path="/images" element={<Images />} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="container">
            🌿 מסלולי טיול בישראל · React + Spring Boot
          </div>
        </footer>
      </div>
    </ToastProvider>
  )
}
