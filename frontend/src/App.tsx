import React from 'react'
import { createContext, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import GenresList from './components/GenresList'
import Navbar from '../src/components/Nav/Navbar'
import HomePage from './pages/HomePage'
import Footer from './components/Footer/Footer'
import GamePage from './pages/GamePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import './styles.css'
import ProfilePage from './pages/ProfilePage'
import GameGenreList from './components/GameGenreList.tsx/GameGenreList'
import Quiz from './components/GameRecommenderSection/Quiz'

export interface User {
    id: number
    name: string
    email: string
    img: string
}

interface AuthContextType {
    loggedIn: boolean
    setLoggedIn: (loggedIn: boolean) => void
    user: User | null // User should be null if not logged in
}

export const AuthContext = createContext<AuthContextType>({
    loggedIn: false,
    setLoggedIn: (loggedIn: boolean) => {},
    user: null,
    // Got error with ESLint when these were on
})

function App() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState<User | null>(null)

    const navItems = [
        { link: '/', title: 'Games' },
        { link: '/news', title: 'News' },
        { link: '/faq', title: 'FAQ' },
        { link: '/gamerecommender', title: 'Game Recommender' },
    ]

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8081/user', {
                    withCredentials: true,
                })

                if (response.data.loggedIn) {
                    setLoggedIn(true)
                    setUser(response.data.user)
                } else {
                    setLoggedIn(false)
                    setUser(null)
                }
            } catch (error) {
                console.error('Error fetching user data:', error)
                setLoggedIn(false)
                setUser(null)
            }
        }
        // Fetch user data when the component mounts and when 'loggedIn' changes
        fetchUserData()
    }, [loggedIn])

    return (
        // AuthContext here provides global variables, so that I can access 'user' easily without passing it thru a bunch of components
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, user }}>
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
                <Route path="/gamerecommender" element={<Quiz />} />
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
