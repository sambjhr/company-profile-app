import Image from "next/image"

export default function Culture() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* TOP: Left title + Right stacked feature cards */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* LEFT: Title */}
          <div className="flex items-start">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Our Culture
              <br />
              &amp; Values
            </h2>
          </div>

          {/* RIGHT: stacked cards */}
          <div className="flex flex-col gap-6">
            {/* Card 1 - image on right */}
            <div className="bg-gray-200 rounded-2xl p-6 flex items-center justify-between gap-4 shadow-sm">
              <div className="flex-1 pr-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-right">Kualitas</h3>
                <p className="text-sm text-gray-700 text-right">
                  Kami tidak hanya memenuhi standar asosiasi, tetapi juga menjamin setiap pekerjaan diselesaikan dengan ketelitian dan mutu tingkat tertinggi.
                </p>
              </div>

              <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-white shadow">
                <Image
                  src="/image/culturepic/kualitas.png"
                  alt="icon"
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
            </div>

            {/* Card 2 - image on left (swap) */}
            <div className="bg-gray-200 rounded-2xl p-6 flex items-center justify-between gap-4 shadow-sm">
              <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-white shadow hidden sm:block">
                <Image
                  src="/image/culturepic/integritas.png"
                  alt="icon"
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>

              <div className="flex-1 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Integritas</h3>
                <p className="text-sm text-gray-700">
                  Kami beroperasi secara transparan, selalu mematuhi regulasi, dan memegang teguh standar untuk menjamin bisnis yang etis dan terpercaya.
                </p>
              </div>

              {/* show small icon on very small screens to keep visual */}
              <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-white shadow sm:hidden">
                <Image
                  src="/image/culturepic/kualitas.png"
                  alt="icon"
                  width={56}
                  height={56}
                  className="object-cover"
                />
              </div>
            </div>

            {/* Card 3 - image on right */}
            <div className="bg-gray-200 rounded-2xl p-6 flex items-center justify-between gap-4 shadow-sm">
              <div className="flex-1 pr-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-right">Kepuasan Pelanggan</h3>
                <p className="text-sm text-gray-700 text-right">
                  Fokus utama kami adalah membangun hubungan jangka panjang dan memberikan service customer yang prima agar kebutuhan klien terpenuhi dan terlampaui.
                </p>
              </div>

              <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-white shadow">
                <Image
                  src="/image/culturepic/kepuasan.png"
                  alt="icon"
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Visi & Misi */}
        <div className="mt-16 grid gap-8">
          {/* Visi */}
          <div className="grid md:grid-cols-2 items-center gap-6">
            <div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Visi</h4>
              <p className="text-gray-700 max-w-2xl">
                Menjadi perusahaan terdepan yang menyediakan solusi konstruksi dan teknologi inovatif untuk mendukung pembangunan berkelanjutan di Indonesia.
              </p>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="w-28 h-28 rounded-full overflow-hidden bg-white shadow">
                <Image
                  src="/image/culturepic/vision.png"
                  alt="vision icon"
                  width={112}
                  height={112}
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Misi */}
          <div className="grid md:grid-cols-2 items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-white shadow">
                <Image
                  src="/image/culturepic/vision.png"
                  alt="mission icon"
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
            </div>

            <div className="text-center md:text-left">
              <h4 className="text-2xl font-bold text-gray-900 mb-2 text-right">Misi</h4>
              <p className="text-gray-800 max-w-4xl text-right">
                Kami beroperasi secara transparan, selalu mematuhi regulasi, dan memegang teguh standar untuk menjamin bisnis yang etis dan terpercaya.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}