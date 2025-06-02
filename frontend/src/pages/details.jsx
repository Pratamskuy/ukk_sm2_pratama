import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Details() {
    const {id} = useParams()
    const [bikes, setBikes] = useState(null)

    useEffect(()=>{
        axios.get(`http://localhost:3000/main/products/bike/${id}`)
        .then(res => setBikes(res.data))
        .catch(err => console.log(err));
    }, [id] )

    if(!bikes) return <div className="">loading...</div>

    const handleContacts = () =>{
        const message = `hello im interested with ${bikes.nama}`
        const waUrl = `https://wa.me/6287762006122?text=${encodeURIComponent(message)}`
        window.open(waUrl,'_blank')
    }

    return(
        <div className="bg-white p-4 rounded shadow-md max-w-xl mx-auto">
            <img src={bikes.gambar} alt={bikes.nama} className="w-full mb-4 rounded" />
            <h2 className="text-xl font-bold">{bikes.nama}</h2>
            <p className="text-gray-600">{bikes.pabrikan}</p>
            <p className="text-gray-600">USD{bikes.harga}</p>
            <p className="my-4">{bikes.deskripsi}</p>
            <button onClick={handleContacts} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                contact dealer
            </button>
        </div>
    )
}

export default Details