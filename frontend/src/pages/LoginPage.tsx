import axios from 'axios'
import { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../App'
import { VITE_QUESTZING_API_URL } from '../../services/api-client'

const LoginPage = () => {
    const navigate = useNavigate()
    const { setLoggedIn } = useContext(AuthContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [loginMessage, setLoginMessage] = useState('')

    // Set withCredentials to true globally for all Axios requests, should help keep me logged in
    axios.defaults.withCredentials = true

    const login = async () => {
        try {
            const response = await axios.post(
                `${VITE_QUESTZING_API_URL}/login`,
                {
                    user_name: username,
                    user_password: password,
                },
                {
                    withCredentials: true,
                }
            )

            // If login is successful set setLoggedIn to true, which will be remembered in the AuthContext
            if (response.data.message === 'Login successful') {
                setLoggedIn(true)
                navigate('/')
            } else {
                setLoginMessage(response?.data?.message || 'Login failed')
                setLoggedIn(false)
            }
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                setLoginMessage(error.response?.data?.message || 'Login failed')
            } else {
                console.error('Error during login:', error)
                setLoginMessage(
                    'An unexpected error occurred. Please try again.'
                )
            }
        }
    }

    return (
        <div>
            <div className="flex justify-center bg-qDark200 mx-auto mt-32 w-2/5 rounded-lg">
                <div className="flex flex-col justify-center py-20 ">
                    <form
                        action=""
                        onSubmit={(e) => {
                            e.preventDefault()
                        }}
                    >
                        <div className="mt-4">
                            <p className="text-sm">Username</p>
                            <input
                                className="bg-qDark400 rounded-md px-3 py-2"
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mt-4">
                            <p className="text-sm">Password</p>
                            <input
                                className="bg-qDark400 rounded-md px-3 py-2"
                                type="password"
                                autoComplete=""
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="">
                            <button
                                className="mt-4 w-full bg-qPrimary100 transition text-qDark100 py-2 px-4 rounded-full font-medium hover:bg-qPrimary300"
                                type="submit"
                                onClick={login}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <div>
                        <NavLink
                            to="/signup"
                            className="hover:underline mt-2 flex justify-center text-sm"
                        >
                            Create an account
                        </NavLink>
                    </div>
                </div>
            </div>
            <h1>{loginMessage}</h1>
        </div>
    )
}

export default LoginPage
