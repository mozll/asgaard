import React from 'react'
import { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'

axios.defaults.withCredentials = true

const SignUpPage = () => {
    const [emailReg, setEmailReg] = useState('')
    const [usernameReg, setUsernameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')
    const navigate = useNavigate()

    const register = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8081/register',
                {
                    user_email: emailReg,
                    user_name: usernameReg,
                    user_password: passwordReg,
                }
            )

            if (response.data.message === 'User registered successfully') {
                navigate('/login')
            }
        } catch (error) {
            console.error('Error registering:', error)
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
