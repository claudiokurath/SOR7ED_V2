import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Blog from './pages/Blog';
import Pricing from './pages/Pricing';

function App() {
  return (
    <Router>
      <nav className="fixed top-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div className="bg-black/40 backdrop-blur-xl px-10 py-4 rounded-full border border-white/5 pointer-events-auto flex items-center gap-10 shadow-2xl">
          <Link to="/" className="font-black text-xl tracking-tighter text-white hover:text-sor7ed-yellow transition-colors">SOR7ED</Link>
          <div className="flex gap-8">
            <Link to="/tools" className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors">Tools</Link>
            <Link to="/blog" className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors">The Lab</Link>
            <Link to="/pricing" className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors">Pricing</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </Router>
  )
}

export default App
