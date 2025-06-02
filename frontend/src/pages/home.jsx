import { useState, useEffect } from "react";
import axios from "axios";
import BikeCard from "../components/bikeCard";
import SearchBar from "../components/searchBar";

function Home() {
  const [bikes, setBikes] = useState([]);
  const [filteredBikes, setFilteredBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/main/products")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.data || [];
        setBikes(data);
        setFilteredBikes(data);
      })
      .catch((err) => {
        console.error("failed to fetch products", err);
        setError("Failed to fetch products");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (term) => {
    const filtered = bikes.filter((bike) =>
      bike.nama.toLowerCase().includes(term.toLowerCase()) ||
      bike.pabrikan.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredBikes(filtered);
  };

  if (loading)
    return <p className="text-center text-lg mt-20 text-gray-600">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-20 text-lg">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        THM EUROBIKE
      </h1>

      <div className="mb-8 max-w-xl mx-auto">
        <SearchBar onsearch={handleSearch} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredBikes.length ? (
          filteredBikes.map((bikes) => (
            <BikeCard key={bikes.id} bikes={bikes} />
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500 text-lg">
            No data found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
