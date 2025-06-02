import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddAdmins() {
    const [formData, setFormdata] = useState({
        nama:'',
        email:'',
        password:'',
    });

    const navigate = useNavigate();

    const handleChange = (e) =>{
        const {name, value,} = e.target;
        setFormdata({...formData,[name]:value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('adminToken')
        if (!token) return alert('unauthorized');

        const data = new FormData();
        Object.entries(formData).forEach(([key,value]) =>{
            if (value) data.append(key, value)
        });

        try {
            await axios.post('http://localhost:3000/api/admin', formData,{
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            alert('admin sucessfully uploaded');
            navigate('/admin')
        }catch (err) {
            console.error(err);
            alert('failed to upload data due to some error')
        }
    }

    return(
        <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full mwx-w-xl">
                <h2 className="text-2xl font-bold mb-4">UPLOAD ADMIN</h2>

                <div className="mb-4">
                    <label className="block mb-1 font-semibold">name</label>
                    <input type="text" name="nama" value={formData.nama} onChange={handleChange} className="w-full border p-2 rounded" required/>
                </div>
                
                <div className="mb-4">
                    <label className="block mb-1 font-semibold">email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded" required/>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-semibold">password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full border p-2 rounded" required/>
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Upload</button>
            </form>
        </div>
    )
}

export default AddAdmins