import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-purple-700">
        THM Eurobike
      </Link>
      <div className="space-x-4 text-sm sm:text-base">
        <Link to="/" className="hover:text-purple-600">
          Home
        </Link>
        <Link to="#contact" className="hover:text-purple-600">
          Contact Dealer
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
