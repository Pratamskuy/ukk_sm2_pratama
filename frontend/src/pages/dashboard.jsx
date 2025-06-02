import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function AdmDashboard(){
    const navigate = useNavigate()

    useEffect(()=>{
        const token = localStorage.getItem('adminToken')
        if (!token) {
            navigate('admin/login')
        }
    },[navigate])

    return(
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    THM EUROBIKES ADMIN
                </h1>
                <div className="grid gap-6 md:grid-cols-3">
                    <Link to={`/admin/products`} className="bg-blue-600 text-white p-6 rounded-xl shadow hover:bg-blue-700 transition">
                        <h2 className="text-xl font-semibold mb-2">manage catalog</h2>
                        <p>view,add, or delete available products</p>
                    </Link>

                    <Link to={'/admin/products/add'} className="bg-green-600 text-white p-6 rounded-xl shadow hover:bg-green-700 transition">
                        <h2 className="text-xl font-semibold mb-2">add products</h2>
                        <p>add products via form or xlsx files</p>
                    </Link>

                    <Link to={'/admin/register'} className="bg-green-600 text-white p-6 rounded-xl shadow hover:bg-green-700 transition">
                        <h2 className="text-xl font-semibold mb-2">add administrator</h2>
                        <p>register new admin data</p>
                    </Link>
                    <Link to="/admin/list" className="text-blue-600 hover:underline">Kelola Admin</Link>
                </div>
            </div>
        </div>
    )
}

export default AdmDashboard