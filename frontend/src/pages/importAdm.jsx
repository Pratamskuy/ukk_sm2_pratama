import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminImport() {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("adminToken");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!file) {
            return setStatus("Pilih file XLSX terlebih dahulu.");
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            await axios.post("http://localhost:3000/api/admin-upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            setStatus("data imported sucessfully");
            setTimeout(() => navigate("/admin/list"), 1500);
        } catch (err) {
            console.error(err);
            setStatus("import failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Import Admin (XLSX)</h1>
                <form onSubmit={handleUpload} className="space-y-6">
                    <label className="block">
                        <span className="block text-sm font-medium text-gray-700 mb-1">Upload File XLSX</span>
                        <input
                            type="file"
                            accept=".xlsx"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-900 
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            transition duration-300"/>
                    </label>

                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition duration-300">Upload</button>
                </form>
                {status && <p className="mt-4 text-center text-sm text-gray-700">{status}</p>}
            </div>
        </div>
    );
}

export default AdminImport;
