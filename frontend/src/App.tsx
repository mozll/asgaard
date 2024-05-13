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
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'

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
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/game/:id" element={<GamePage />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App
