function Footer() {
  return (
    <footer className="bg-white border-t mt-10 pt-6 shadow-inner">
      <marquee className="text-purple-600 font-semibold mb-4" behavior="scroll" direction="left">
        {/* Ganti teks marquee ini nanti */}
        🚨 Promo Eurobike Bulan Ini! Diskon hingga 20%! 🚨
      </marquee>
      <div className="text-center text-gray-700 text-sm">
        <p className="font-semibold">THM Eurobike Showroom</p>
        <p>Jl. Motor Eropa No. 99, Jakarta</p>
        <p>📞 (021) 1234-5678 | ✉️ info@thmeurobike.id</p>
        <p className="mt-2">&copy; {new Date().getFullYear()} THM Eurobike. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
