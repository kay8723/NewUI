import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WelcomePage from './WelcomePage'
import SetupPage from './SetupPage'
import MainApp from './MainApp'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
        {/* SVG Filter for Liquid Glass Effect */}
        <svg className="absolute inset-0 w-0 h-0">
          <defs>
            <filter id="glass-distortion">
              <feTurbulence 
                type="fractalNoise" 
                baseFrequency="0.01 0.01" 
                numOctaves="1" 
                seed="5" 
                result="turbulence"
              />
              <feGaussianBlur 
                in="turbulence" 
                stdDeviation="3" 
                result="softMap"
              />
              <feDisplacementMap 
                in="SourceGraphic" 
                in2="softMap" 
                scale="150"
              />
            </filter>
          </defs>
        </svg>

        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/setup" element={<SetupPage />} />
          <Route path="/app" element={<MainApp />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

