    import { Link } from "react-router-dom"

    function BikeCard({ bikes }) {
        return(
            <Link to={`/main/products/${bikes.id}`}>
            <div key={bikes.id} className="bg-white shadow-md rounded-xl p-4">
                <img  src={bikes.gambar?.startsWith("http") ? bikes.gambar: `http://localhost:3000/${bikes.gambar}`}alt={bikes.nama}className="w-full h-48 object-cover rounded-md" />
                <h2 className="text-xl font-semibold mt-2">{bikes.nama}</h2>
                <p className="text-gray-600">{bikes.pabrikan}</p>
                <p className="text-gray-600">USD{bikes.harga}</p>
            </div>
            </Link>
        )
    }

    export default BikeCard