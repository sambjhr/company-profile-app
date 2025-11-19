import Image from "next/image";

export default function CompanyOverview() {
  return (
    <div className="container mx-auto py-0.5">
      <div className="flex max-w-7xl container mx-auto px-6 py-15 gap-20 bg-white">
        {/* gambar */}
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/image/team.png"
              alt="Company Team"
              width={800}
              height={600}
              className="object-cover shadow-orange-500 "
            />
          </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-8">
            <p className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-900">
              Company Overview
            </p>
            {/* paragraf */}
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              PT. Hobashita Taketama merupakan badan usaha yang beroperasi di ranah 
              pelaksanaan proyek dan menjadi anggota Asosiasi GAPENSI. berkantor 
              pusat di Kota Adm. Jakarta Timur, Indonesia.
            </p>

            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Dengan 21 Tahun pengalaman, lebih dari 100 proyek yang dikerjakan
              oleh 20 lebih pegawai, kami berkomitmen dapat kontinyu memberikan
              kontribusi pada konstruksi bagi masyarakat Indonesia
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl container mx-auto px-6 py-10 bg-white">
        {/* Our Culture & Values */}
        <div className="grid md:grid-cols-2 items-center mt-20">
          {/* LEFT CONTENT */}
          <div className="flex flex-col gap-6">
            {/* Title */}
            <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Our Culture
              <br />
              &amp; Values
            </h3>

            {/* Pills (posisi seperti gambar: 2 atas, 1 bawah kiri) */}
            <div className="flex flex-col gap-3 mt-4">
              <div className="flex gap-4">
                <span className="inline-block bg-orange-400 text-white px-6 py-2 rounded-full text-sm shadow-md">
                  Kualitas
                </span>
                <span className="inline-block bg-orange-400 text-white px-6 py-2 rounded-full text-sm shadow-md">
                  Integritas
                </span>
              </div>
              <div>
                <span className="inline-block bg-orange-400 text-white px-6 py-2 rounded-full text-sm shadow-md">
                  Kepuasan Pelanggan
                </span>
              </div>
            </div>

            {/* Description text */}
            <p className="text-gray-700 text-sm md:text-base leading-relaxed max-w-md">
              Hobashita Taketama memiliki komitmen untuk merampungkan setiap proyek on-schedule, 
              selaras anggaran, dan dengan standar terbaik.
            </p>
          </div>

          {/* RIGHT PHOTO (portrait) */}
          <div className="w-full h-[420px] md:h-[520px] relative rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/image/culture.png"
              alt="Culture and Values"
              fill
              sizes="(max-width: 568px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Vision & Mission - 2 columns */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 py-10">
          <div className="p-6 bg-gray-50 rounded-lg">
            <h4 className="text-2xl font-semibold text-gray-900 mb-3">Visi</h4>
            <p className="text-gray-600 text-m leading-relaxed">
              Menjadi perusahaan terdepan yang menyediakan solusi konstruksi dan
              teknologi inovatif untuk mendukung pembangunan berkelanjutan di
              Indonesia.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <h4 className="text-2xl font-semibold text-gray-900 mb-3">Misi</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 text-m leading-relaxed">
              <li>
                Menyediakan layanan berkualitas tinggi dengan standar
                keselamatan terbaik.
              </li>
              <li>
                Mengembangkan talenta lokal melalui pelatihan dan kesempatan
                berkarier.
              </li>
              <li>
                Mengimplementasikan teknologi untuk meningkatkan efisiensi dan
                hasil proyek.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};