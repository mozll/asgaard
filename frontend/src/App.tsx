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
import ProfilePage from './pages/ProfilePage'
import GameGenreList from './components/GameGenreList.tsx/GameGenreList'

export interface User {
    id: number
    name: string
    email: string
    img: string
}

export const AuthContext = createContext({
    loggedIn: false,
    setLoggedIn: (loggedIn: boolean) => {},
})

function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState<User | null>(null)

    const navItems = [
        { link: '/', title: 'Games' },
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
                <Route
                    path="/news"
                    element={
                        <div>
                            <h2 className="flex justify-center text-xl">
                                News Page Coming Soon!
                            </h2>
                            <p className="flex justify-center mt-4">
                                This feature is currently under development and
                                will be available soon. Please check back later!
                            </p>
                        </div>
                    }
                />
                <Route
                    path="/faq"
                    element={
                        <div>
                            <h2 className="flex justify-center text-xl">
                                {' '}
                                FAQ Page Coming Soon!
                            </h2>
                            <p className="flex justify-center mt-4">
                                This feature is currently under development and
                                will be available soon. Please check back later!
                            </p>
                        </div>
                    }
                />
                <Route path="/genres" element={<GenresList />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/game/:id" element={<GamePage />} />
                <Route path="/profile" element={<ProfilePage user={user} />} />
                <Route path="/genre/:genreSlug" element={<GameGenreList />} />
            </Routes>
            <Footer />
        </AuthContext.Provider>
    )
}

export default App
