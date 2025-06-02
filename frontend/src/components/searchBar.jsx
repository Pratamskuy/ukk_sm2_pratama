import { useState } from "react";

function SearchBar({onsearch}) {
    const [searchTerm, setSearchterm] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        onsearch(searchTerm)
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6 justify-center">
            <input type="text" value={searchTerm} onChange={(e) => setSearchterm(e.target.value)}
            placeholder="search"
            className="border border-gray-300 px-4 py-2 rounded-lg"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-750">search</button>
        </form>
    )
}

export default SearchBar