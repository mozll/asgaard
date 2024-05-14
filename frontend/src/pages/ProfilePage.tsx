import { NavLink, useNavigate } from 'react-router-dom'
import { User } from '../App'
import axios from 'axios'
import { useState } from 'react'
import GamesList from '../components/GamesList'

interface ProfileProps {
    user: User | null
}

const ProfilePage = ({ user }: ProfileProps) => {
    if (!user) {
        return (
            <div className="text-lg flex justify-center">
                Not logged in...
                <NavLink to="/login" className="hover:underline ml-2">
                    Click here to log in.
                </NavLink>
            </div>
        )
    }

    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('Favorite Games') // Set initial active tab
    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8081/logout')
            if (response.status === 200) {
                window.location.href = '/' // Reloads the site, so the bug with nav only updating on login is skipped. ( Temp )
            } else {
                console.error('Logout failed')
            }
        } catch (error) {
            console.error('Error during logout:', error)
        }
    }

    return (
        <div className="profile-container">
            <button className="flex ml-auto mr-16" onClick={handleLogout}>
                Logout
            </button>
            <h2 className="text-2xl font-bold mt-20 flex justify-center">
                Welcome, {user.name}!
            </h2>
            <img
                src={`data:image/png;base64,${user.img}`} // Correct data URL
                alt="Profile Image"
            />
            <div className="bg-qDark200 p-20">
                <div className="sm:w-7/12 mt-8">
                    <button
                        className={`mr-8 hover:underline hover:underline-offset-8 ${activeTab === 'Favorite Games' ? 'font-bold underline underline-offset-8 mb-4' : ''}`}
                        onClick={() => setActiveTab('Favorite Games')}
                    >
                        Favorite Games
                    </button>
                    <button
                        className={`mr-8 hover:underline hover:underline-offset-8 ${activeTab === 'My Reviews' ? 'font-bold underline underline-offset-8 mb-4' : ''}`}
                        onClick={() => setActiveTab('My Reviews')}
                    >
                        My Reviews
                    </button>
                    {activeTab === 'Favorite Games' && <GamesList />}
                    {activeTab === 'My Reviews' && (
                        <h1>My Reviews component here</h1>
                    )}
                </div>
            </div>
        </div>
    )
}
export default ProfilePage
