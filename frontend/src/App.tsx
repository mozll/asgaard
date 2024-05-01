import React, { useEffect, useState } from 'react'
import './styles.css' // Import your global styles
// other imports and components

interface Test {
    user_name: string
    user_id: number
    user_email: string
}

function App() {
    const [data, setData] = useState<Test[]>([])

    useEffect(() => {
        fetch('http://localhost:8081/users') // if i actually search for this in the URL i also get the data shown
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.log(err))
    }, [])

    return (
        <div>
            <table>
                <thead>
                    <th className="bg-blue-500 text-red-500">ID</th>
                    <th>Name</th>
                    <th>Email</th>
                </thead>
                <tbody>
                    {data.map((data, index) => (
                        <tr key={index}>
                            <td>{data.user_id}</td>
                            <td>{data.user_name}</td>
                            <td>{data.user_email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default App
