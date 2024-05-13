import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [loginStatus, setLoginStatus] = useState('')

    // Set withCredentials to true globally for all Axios requests
    axios.defaults.withCredentials = true

    const login = () => {
        axios
            .post('http://localhost:8081/login', {
                user_name: username,
                user_password: password,
            })
            .then((response) => {
                if (response.data.message) {
                    setLoginStatus(response.data.message)
                } else {
                    setLoginStatus(response.data[0].user_name)
                }
            })
            .catch((error) => {
                console.error('Error during login:', error)
            })
    }

    useEffect(() => {
        axios.get('http://localhost:8081/login').then((response) => {
            if (response.data.loggedIn == true) {
                setLoginStatus(response.data.user[0].user_name)
            }
        })
    }, [])

    return (
        <div className="">
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
            <h1>{loginStatus}</h1>
        </div>
    )
}

export default LoginPage
