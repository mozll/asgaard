import React from 'react'
import { Routes, Route } from 'react-router-dom'
import GamesList from './components/GamesList'
import GenresList from './components/GenresList'
import Navbar from '../src/components/Nav/Navbar'
import HomePage from './pages/HomePage'
import Footer from './components/Footer/Footer'
import TestPage from './components/TestPage'
import './styles.css' // Import your global styles
import TopTagsBar from './components/Nav/TopTagsBar'
import GamePage from './pages/GamePage'

// other imports and components

function App() {
    const navItems = [
        { link: '/games', title: 'Games' },
        { link: '/news', title: 'News' },
        { link: '/faq', title: 'FAQ' },
    ]

    return (
        <>
            <Navbar navItems={navItems} />
            <TopTagsBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/games" element={<GamesList />} />
                <Route
                    path="/news"
                    element={
                        <div>
                            <h1>News</h1>
                        </div>
                    }
                />
                <Route
                    path="/faq"
                    element={
                        <div>
                            <h1>FAQ</h1>
                        </div>
                    }
                />
                <Route path="/genres" element={<GenresList />} />
                <Route path="/game/:id" element={<GamePage />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App
