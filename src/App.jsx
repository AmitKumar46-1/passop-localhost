import { useState } from 'react'
import "./index.css"
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main content (Password Manager) */}
      <div className="flex-grow">
        <Manager />
      </div>

      <Footer />
    </div>
  );
}


export default App
