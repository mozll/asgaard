import { createContext, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'

import GamesList from './components/GamesList'
import GenresList from './components/GenresList'
import Navbar from '../src/components/Nav/Navbar'
import HomePage from './pages/HomePage'
import Footer from './components/Footer/Footer'
import GamePage from './pages/GamePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import './styles.css' // Import your global styles

export interface User {
    id: number
    name: string
    email: string
}

export const AuthContext = createContext({
    loggedIn: false,
    setLoggedIn: (loggedIn: boolean) => {},
})

function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState<User | null>(null)

    const navItems = [
        { link: '/games', title: 'Games' },
        { link: '/news', title: 'News' },
        { link: '/faq', title: 'FAQ' },
    ]

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8081/user', {
                    withCredentials: true,
                })
                setLoggedIn(response.data.loggedIn)
                setUser(response.data.user)
            } catch (error) {
                console.error('Error fetching user data:', error)
                setLoggedIn(false)
                setUser(null)
            }
        }

        if (loggedIn) {
            fetchUserData() // Fetch user data only if logged in
        }
    }, [loggedIn])

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
            <Navbar navItems={navItems} user={user} />

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
        </AuthContext.Provider>
    )
}

export default App
