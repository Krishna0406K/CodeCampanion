import './App.css'
import CodingProblemsPage from './pages/workspace'
import Signup from './auth/signup'
import Login from './auth/login'
import Home from './pages/home'
import CrossPlatformMatch from './pages/matches'
import YouTubeVideoTutorials from './pages/videoSolutions'
import AIExplainer from './pages/aiAssitant'

import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/Problems" element={<CodingProblemsPage />} />
        <Route path="/problems/videos" element={<YouTubeVideoTutorials/>} />
        <Route path="/problems/explaination" element={<AIExplainer/>} />
        <Route path="/problems/platforms" element={<CrossPlatformMatch />} />
      </Routes>
    </>
  )
}

export default App
