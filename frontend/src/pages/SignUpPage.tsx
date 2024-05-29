import { SetStateAction, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'
import { VITE_QUESTZING_API_URL } from '../../services/api-client'

axios.defaults.withCredentials = true

const SignUpPage = () => {
    const [emailReg, setEmailReg] = useState('')
    const [usernameReg, setUsernameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const register = async () => {
        try {
            const response = await axios.post(
                `${VITE_QUESTZING_API_URL}/register`,
                {
                    user_email: emailReg,
                    user_name: usernameReg,
                    user_password: passwordReg,
                }
            )

            // checking for successful registration
            if (
                response.status === 200 &&
                response.data &&
                response.data.message === 'User registered successfully'
            ) {
                navigate('/login')
            } else {
                // handling unexpected successful response
                console.error('Unexpected successful response:', response.data)
                setErrorMessage(
                    'Registration succeeded, but with an unexpected response. Please try to login.'
                )
            }
        } catch (error: any) {
            // checking for specific error types
            if (
                error.response &&
                error.response.data &&
                error.response.data.error
            ) {
                setErrorMessage(error.response.data.error)
            } else if (
                error.response &&
                error.response.data &&
                error.response.data.errors
            ) {
                const errorMessages = error.response.data.errors.map(
                    (err: any) => err.msg
                )
                setErrorMessage(errorMessages.join(', '))
            } else {
                console.error('Error registering:', error)
                setErrorMessage('Failed to register. Please try again later.')
            }
        }
    }

    return (
        <div className="flex justify-center bg-qDark200 mx-auto mt-32 w-full sm:w-2/5 rounded-lg">
            <div className="flex flex-col justify-center py-20">
                <form className="mx-8 sm:mx-16">
                    <div className="mt-4">
                        <p className="text-sm">Email</p>
                        <input
                            className="bg-qDark400 w-full rounded-md px-3 py-2"
                            type="text"
                            onChange={(e) => {
                                setEmailReg(e.target.value)
                            }}
                        />
                    </div>
                    <div className="mt-4">
                        <p className="text-sm">Username</p>
                        <input
                            className="bg-qDark400 w-full rounded-md px-3 py-2"
                            type="text"
                            onChange={(e) => {
                                setUsernameReg(e.target.value)
                            }}
                        />
                    </div>
                    <div className="mt-4">
                        <p className="text-sm">Password</p>
                        <input
                            className="bg-qDark400 w-full rounded-md px-3 py-2"
                            type="password"
                            onChange={(e) => {
                                setPasswordReg(e.target.value)
                            }}
                        />
                    </div>

                    <button
                        className="mt-4 w-full  bg-qPrimary100 transition text-qDark100 py-2 px-4 rounded-full font-medium hover:bg-qPrimary300"
                        type="button"
                        onClick={register}
                    >
                        Sign Up
                    </button>
                </form>

                <div className="mx-8 sm:mx-16">
                    {errorMessage && (
                        <div className="text-qError100 mt-4 justify-center flex mx-auto">
                            {errorMessage}
                        </div>
                    )}
                    <NavLink
                        to="/login"
                        className="hover:underline mt-8 flex justify-center text-sm"
                    >
                        Already have an account?
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage
