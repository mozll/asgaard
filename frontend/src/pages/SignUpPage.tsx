import { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'
import { VITE_QUESTZING_API_URL } from '../../services/api-client'

axios.defaults.withCredentials = true

const SignUpPage = () => {
    const [emailReg, setEmailReg] = useState('')
    const [usernameReg, setUsernameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')
    const navigate = useNavigate()

    const register = async () => {
        try {
            console.log(VITE_QUESTZING_API_URL, '<- NO IMPORT META')
            console.log(
                import.meta.env.VITE_QUESTZING_API_URL,
                ' <-THIS IS THE IMPORT.META'
            )
            const response = await axios.post(
                `${VITE_QUESTZING_API_URL}/register`,
                {
                    user_email: emailReg,
                    user_name: usernameReg,
                    user_password: passwordReg,
                }
            )

            if (response.data.message === 'User registered successfully') {
                console.log(
                    import.meta.env.VITE_QUESTZING_API_URL,
                    ' <-THIS IS THE IMPORT.META 2'
                )
                navigate('/login')
            }
        } catch (error) {
            console.error('Error registering:', error)
            console.log(
                import.meta.env.VITE_QUESTZING_API_URL,
                ' <-THIS IS THE IMPORT.META 3'
            )
        }
    }

    return (
        <div className="flex justify-center bg-qDark200 mx-auto mt-32 w-2/5 rounded-lg">
            <div className="flex flex-col justify-center py-20">
                <form>
                    <div className="mt-4">
                        <p className="text-sm">Email</p>
                        <input
                            className="bg-qDark400 rounded-md px-3 py-2"
                            type="text"
                            onChange={(e) => setEmailReg(e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <p className="text-sm">Username</p>
                        <input
                            className="bg-qDark400 rounded-md px-3 py-2"
                            type="text"
                            onChange={(e) => setUsernameReg(e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <p className="text-sm">Password</p>
                        <input
                            className="bg-qDark400 rounded-md px-3 py-2"
                            type="password"
                            onChange={(e) => setPasswordReg(e.target.value)}
                        />
                    </div>
                    <button
                        className="mt-4 w-full bg-qPrimary100 transition text-qDark100 py-2 px-4 rounded-full font-medium hover:bg-qPrimary300"
                        type="button"
                        onClick={register}
                    >
                        Sign Up
                    </button>
                </form>
                <div>
                    <NavLink
                        to="/login"
                        className="hover:underline mt-2 flex justify-center text-sm"
                    >
                        Already have an account?
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage
