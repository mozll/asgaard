import React from 'react'
import './styles.css' // Import your global styles
import { Routes, Route } from 'react-router-dom'
import GamesList from './components/GamesList'
import GenresList from './components/GenresList'
import Navbar from '../src/components/Nav/Navbar'
import HomePage from './pages/HomePage'
import Footer from './components/Footer/Footer'

// other imports and components

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/games" element={<GamesList />} />
                <Route path="/genres" element={<GenresList />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App
