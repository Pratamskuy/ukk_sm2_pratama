import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function loginAdm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')

        try {
            const res = await axios.post(`http://localhost:3000/api/login`, { email, password })

            const token = res.data.token;
            localStorage.setItem('adminToken', token);

            navigate(`/admin`)
        } catch (err) { setError('failed to login, check ur login data and try again') }
    }

    return (
        <div className="flex item-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold md-6 text-center">ADMIN LOGIN</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}

                <div className="mb-4">
                    <label className="block mb-1 font-medium">email</label>
                    <input type="email" value={email} className="w-full p-2 border rounded-md" onChange={(e) => setEmail(e.target.value)} required />
                </div>


                <div className="mb-4">
                    <label className="block mb-1 font-medium">password</label>
                    <input type="password" value={password} className="w-full p-2 border rounded-md" onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md">LOGIN</button>
            </form>
        </div>
    )
}

export default loginAdm