import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

axios.defaults.withCredentials = true

const SignUpPage = () => {
    const [emailReg, setEmailReg] = useState('')
    const [usernameReg, setUsernameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')

    // Set withCredentials to true globally for all Axios requests
    axios.defaults.withCredentials = true

    const register = () => {
        axios
            .post('http://localhost:8081/register', {
                user_email: emailReg,
                user_name: usernameReg,
                user_password: passwordReg,
            })
            .then((response) => console.log(response))
    }

    return (
        <div className="">
            <div className="flex justify-center bg-qDark200 mx-auto mt-32 w-2/5 rounded-lg">
                <div className="flex flex-col justify-center py-20 ">
                    <form action="">
                        {' '}
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
                                autoComplete=""
                                onChange={(e) => setPasswordReg(e.target.value)}
                            />
                        </div>
                        <div className="">
                            <button
                                className="mt-4 w-full bg-qPrimary100 transition text-qDark100 py-2 px-4 rounded-full font-medium hover:bg-qPrimary300"
                                type="submit"
                                onClick={register}
                            >
                                Sign Up
                            </button>
                        </div>
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
        </div>
    )
}

export default SignUpPage
