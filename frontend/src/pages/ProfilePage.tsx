import { NavLink } from 'react-router-dom'
import { User } from '../App'
import axios from 'axios'
import { useState } from 'react'
import GamesList from '../components/GamesList'
import { VITE_QUESTZING_API_URL } from '../../services/api-client'

interface ProfileProps {
    user: User | null
}

const ProfilePage = ({ user }: ProfileProps) => {
    const [activeTab, setActiveTab] = useState('Favorite Games') // favorite games is the initial tab
    const [updatingUsername, setUpdatingUsername] = useState(false)
    const [newUsername, setNewUsername] = useState('')
    const [submitSuccess, setSubmitSuccess] = useState(false)

    const [submitFail, setSubmitFail] = useState(false)

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

    const handleLogout = async () => {
        try {
            const response = await axios.post(
                `${VITE_QUESTZING_API_URL}/api/logout`
            )
            if (response.status === 200) {
                window.location.href = '/' // reroutes us to front page
            } else {
                console.error('Logout failed')
            }
        } catch (error) {
            console.error('Error during logout:', error)
        }
    }

    const handleUpdateUsername = async () => {
        try {
            const response = await axios.post(
                `${VITE_QUESTZING_API_URL}/api/update-username`,
                { userId: user.id, newUsername }
            )

            if (response.status === 200) {
                setSubmitSuccess(true)
                setSubmitFail(false)
                user.name = newUsername
                setNewUsername(newUsername)
            } else {
                setSubmitFail(true)
            }
        } catch (error) {
            console.error('Error updating username', error)
            setSubmitFail(true)
        } finally {
            setUpdatingUsername(false)
        }
    }

    return (
        <div className="profile-container">
            <button
                className="flex ml-auto mr-16 hover:underline-offset-8 hover:underline"
                onClick={handleLogout}
            >
                Logout
            </button>
            <div className="flex flex-col justify-center items-center mt-20 gap-2">
                {!updatingUsername ? (
                    <h2 className="text-2xl font-bold flex">
                        Welcome, {user.name}!
                    </h2>
                ) : (
                    <form
                        className="flex justify-center items-center gap-2"
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleUpdateUsername()
                        }}
                    >
                        <h2 className="text-2xl font-bold flex">Welcome,</h2>
                        <input
                            className="text-qDark100 p-1"
                            type="text"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                        />
                        <button type="submit">Save</button>
                    </form>
                )}
                <button
                    className="hover:underline-offset-8 hover:underline"
                    onClick={() => setUpdatingUsername(!updatingUsername)}
                >
                    Change username
                </button>

                {submitSuccess && (
                    <p className="text-qPrimary100">
                        Username updated successfully!
                    </p>
                )}
                {submitFail && (
                    <p className="text-qError100">
                        Failed to update username. Please try again.
                    </p>
                )}
            </div>
            <div className="profile-picture flex justify-center mt-8">
                <img
                    src={`data:image/png;base64,${user.img}`}
                    alt="Profile Image"
                    className="outline outline-white rounded-full bg-qPrimary100 h-48"
                />
            </div>
            <p
                className="flex justify-center my-4"
                title="This is your profile picture, generated from your username using RoboHash"
            >
                Your profile picture
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="16"
                    height="16"
                    viewBox="0 0 50 50"
                    className=" fill-white ml-2"
                >
                    <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z"></path>
                </svg>
            </p>
            <div className="bg-qDark200 px-20 py-10">
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
