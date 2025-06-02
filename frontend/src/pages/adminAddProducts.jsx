import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProducts() {
    const [formData, setFormdata] = useState({
        nama:'',
        pabrikan:'',
        deskripsi:'',
        harga:'',
        gambar: null,
    });

    const navigate = useNavigate();

    const handleChange = (e) =>{
        const {name, value, files} = e.target;
        if (name === 'gambar') {
            setFormdata({...formData, gambar:files[0]});
        }else{
            setFormdata({...formData,[name]:value});
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('adminToken')
        if (!token) return alert('unauthoried');

        const data = new FormData();
        Object.entries(formData).forEach(([key,value]) =>{
            if (value) data.append(key, value)
        });

        try {
            await axios.post('http://localhost:3000/main/products', data,{
                headers: {
                    "Content-Type": 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
            });
            alert('product sucessfully uploaded');
            navigate('/admin')
        }catch (err) {
            console.error(err);
            alert('failed to upload data due to some error')
        }
    }

    return(
        <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full mwx-w-xl">
                <h2 className="text-2xl font-bold mb-4">UPLOAD PRODUCTS</h2>

                <div className="mb-4">
                    <label className="block mb-1 font-semibold">bike name</label>
                    <input type="text" name="nama" value={formData.nama} onChange={handleChange} className="w-full border p-2 rounded" required/>
                </div>
                
                <div className="mb-4">
                    <label className="block mb-1 font-semibold">bike constructor</label>
                    <input type="text" name="pabrikan" value={formData.pabrikan} onChange={handleChange} className="w-full border p-2 rounded" required/>
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-semibold">description</label>
                    <input type="text" name="deskripsi" value={formData.deskripsi} onChange={handleChange} className="w-full border p-2 rounded" required/>
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-semibold">bike price(USD)</label>
                    <input type="number" name="harga" value={formData.harga} onChange={handleChange} className="w-full border p-2 rounded" required/>
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-semibold">bike image</label>
                    <input type="file" name="gambar" accept="image/" onChange={handleChange} className="w-full border p-2 rounded" required/>
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Upload</button>
            </form>
        </div>
    )
}

export default AddProducts