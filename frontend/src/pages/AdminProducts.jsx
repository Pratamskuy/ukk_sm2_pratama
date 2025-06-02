import { useEffect, useState } from "react";
import axios from "axios";

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        nama: "",
        pabrikan: "",
        deskripsi: "",
        harga: "",
        gambar: null,
    });

    const [editId, setEditId] = useState(null);
    const token = localStorage.getItem("adminToken")

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:3000/main/products", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(res.data);
        } catch (err) {
            setError("Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        if (e.target.name === "gambar") {
            setFormData({ ...formData, gambar: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const resetForm = () => {
        setFormData({
            nama: "",
            pabrikan: "",
            deskripsi: "",
            harga: "",
            gambar: null,
        });
        setEditId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const fd = new FormData();
            fd.append("nama", formData.nama);
            fd.append("pabrikan", formData.pabrikan);
            fd.append("deskripsi", formData.deskripsi);
            fd.append("harga", formData.harga);
            if (formData.gambar) fd.append("gambar", formData.gambar);

            if (editId) {
                await axios.put(`http://localhost:3000/main/products/${editId}`, fd, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });
            } else {
                await axios.post("http://localhost:3000/main/products", fd, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });
            }
            resetForm();
            fetchProducts();
        } catch (err) {
            alert("Error saving product");
        }
    };

    const handleEdit = (product) => {
        setEditId(product.id);
        setFormData({
            nama: product.nama,
            pabrikan: product.pabrikan,
            deskripsi: product.deskripsi,
            harga: product.harga,
            gambar: null,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Delete product
    const handleDelete = async (id) => {
        if (!window.confirm("are you sure to delete this product?")) return;
        try {
            await axios.delete(`http://localhost:3000/main/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchProducts();
        } catch (err) {
            alert("cannot delete products");
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">MANAGE PRODUCTS</h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-10">
                <h2 className="text-xl font-semibold mb-4">
                    {editId ? "Edit Product" : "Add New Product"}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                        type="text"
                        name="nama"
                        placeholder="Bike name"
                        value={formData.nama}
                        onChange={handleChange}
                        required
                        className="border px-3 py-2 rounded"
                    />
                    <input
                        type="text"
                        name="pabrikan"
                        placeholder="constructor"
                        value={formData.pabrikan}
                        onChange={handleChange}
                        required
                        className="border px-3 py-2 rounded"
                    />
                    <input
                        type="number"
                        name="harga"
                        placeholder="Price (USD)"
                        value={formData.harga}
                        onChange={handleChange}
                        required
                        className="border px-3 py-2 rounded"
                    />
                    <input
                        type="file"
                        name="gambar"
                        accept="image/*"
                        placeholder="add image"
                        onChange={handleChange}
                        className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-600 file:text-white
                        hover:file:bg-blue-700
                        cursor-pointer"
                    />
                </div>

                <textarea
                    name="deskripsi"
                    placeholder="Description"
                    value={formData.deskripsi}
                    onChange={handleChange}
                    required
                    className="border w-full px-3 py-2 rounded mb-4"
                    rows={3}
                />

                <div className="flex justify-between">
                    {editId && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        {editId ? "Update Product" : "Add Product"}
                    </button>
                </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.length === 0 && (
                    <p className="col-span-3 text-center text-gray-600">No products found.</p>
                )}

                {products.map((prod) => (
                    <div
                        key={prod.id}
                        className="bg-white p-4 rounded shadow flex flex-col"
                    >
                        <img
                            src={products.gambar}
                            alt={products.nama}
                            className="w-full h-40 object-cover rounded mb-3"/>
                        <h3 className="font-semibold text-lg">{prod.nama}</h3>
                        <p className="text-gray-600">{prod.pabrikan}</p>
                        <p className="text-gray-600 mb-3">USD {prod.harga}</p>

                        <div className="mt-auto flex justify-between">
                            <button
                                onClick={() => handleEdit(prod)}
                                className="text-blue-600 hover:underline"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(prod.id)}
                                className="text-red-600 hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminProducts;
