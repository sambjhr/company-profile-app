export default function Footer() {
  return (
    <footer className="text-gray-300 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

        {/* COMPANY */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">PT Hobashita Taketama</h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Hobashita Taketama memiliki komitmen untuk merampungkan setiap proyek on-schedule, 
            selaras anggaran, dan dengan standar terbaik.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/AboutUs" className="hover:text-white transition">About Us</a></li>
            <li><a href="/Layanan" className="hover:text-white transition">Services</a></li>
            <li><a href="/Blog" className="hover:text-white transition">Blog</a></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Email: info@hkonstakekama.com</li>
            <li>Phone: +62 812-3456-7890</li>
            <li>Address: Jakarta, Indonesia</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Hobashita Taketama x Algedrof. All rights reserved.
      </div>
    </footer>
  )
}