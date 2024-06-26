import { useEffect, useState } from 'react'
import '../styles.css'

interface Test {
    user_name: string
    user_id: number
    user_email: string
}

function TestPage() {
    const [data, setData] = useState<Test[]>([])

    useEffect(() => {
        fetch('${VITE_QUESTZING_API_URL}/api/users') // if i actually search for this in the URL i also get the data shown
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.log(err))
    }, [])

    return (
        <div>
            <h1 className="font-bold text-red-500">TEST PAGE</h1>
            <table>
                <thead>
                    <th className="bg-blue-500 text-red-500">ID</th>
                    <th className="customStyle">Name</th>
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

export default TestPage
