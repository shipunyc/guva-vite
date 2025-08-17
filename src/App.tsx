import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Gen from './pages/Gen'
import Mining from './pages/Mining'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gen" element={<Gen />} />
          <Route path="/mining" element={<Mining />} />
        </Routes>
      </main>
    </div>
  )
}

export default App