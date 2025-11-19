export default function Testimonials() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-20">
      <h2 className="text-4xl font-bold text-center mb-12 text-black">
        Testimonials
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-6 bg-white shadow rounded-lg">
          <p className="text-gray-600 italic">
            “Mereka mengerjakan pekerjaan development mengikuti design dan specification yang telah ditentukan, dengan crew expert dan alat-alat modern”
          </p>
          <p className="mt-3 font-semibold text-orange-400">— Hotel Grand Mercure</p>
        </div>

        <div className="p-6 bg-white shadow rounded-lg">
          <p className="text-gray-600 italic">
            “Mereka mengimplementasikan safety management system yang ketat dan terstandardisasi untuk memastikan keselamatan seluruh pekerja.”
          </p>
          <p className="mt-3 font-semibold text-orange-400">— PT Coconut Powder</p>
        </div>

        <div className="p-6 bg-white shadow rounded-lg">
          <p className="text-gray-600 italic">
            “Mereka menggunakan equipment pembangunan terkini dan bahan bermutu prima untuk outcome terbaik.”
          </p>
          <p className="mt-3 font-semibold text-orange-400">— Bandar Udara Aji Pangeran Tumenggung Pranoto</p>
        </div>
      </div>
    </div>
  )
}