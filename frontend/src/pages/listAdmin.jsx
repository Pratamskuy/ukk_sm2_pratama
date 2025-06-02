import { useEffect, useState } from "react";
import axios from "axios";

function AdminList() {
  const [admins, setAdmins] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ nama: "", email: "", password: "" });
  const token = localStorage.getItem("adminToken");

  const fetchAdmins = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdmins(res.data);
    } catch (err) {
      console.error("Error fetching admins:", err);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("are you sure ro delete:")) return;
    try {
      await axios.delete(`http://localhost:3000/api/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAdmins();
    } catch (err) {
      console.error("Gagal delete:", err);
    }
  };

  const handleEditClick = (admin) => {
    setEditId(admin.id);
    setEditData({ nama: admin.nama, email: admin.email, password: "" });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/admin/${editId}`, editData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditId(null);
      fetchAdmins();
    } catch (err) {
      console.error("failed to update:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">ADMIN LIST</h1>

      <div className="grid gap-4 max-w-3xl mx-auto">
        {admins.map((admin) => (
          <div key={admin.id} className="bg-white p-4 rounded-lg shadow flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{admin.nama}</p>
                <p className="text-sm text-gray-600">{admin.email}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditClick(admin)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(admin.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>

            {editId === admin.id && (
              <form onSubmit={handleEditSubmit} className="mt-3 space-y-3">
                <input
                  type="text"
                  placeholder="Nama"
                  value={editData.nama}
                  onChange={(e) => setEditData({ ...editData, nama: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
                <input
                  type="password"
                  placeholder="Password baru"
                  value={editData.password}
                  onChange={(e) => setEditData({ ...editData, password: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  save
                </button>
              </form>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center gap-4">
        <a
          href="/admin/register"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add
        </a>
        <a
          href="/admin/import"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          import
        </a>
      </div>

    </div>
  );
}

export default AdminList;
