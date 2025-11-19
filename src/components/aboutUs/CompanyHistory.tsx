import Image from "next/image";

export default function CompanyHistory() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 bg-white">
      {/* Grid utama: 2 kolom pada md+ */}
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* KIRI: Judul besar + gambar besar */}
        <div className="flex flex-col gap-8">
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
            Company
            <br />
            History.
          </h2>

          <div className="w-full max-w-md">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/image/fotogedung.png"
                alt="Company building"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* KANAN: gambar kecil di atas, tombol pill, dan paragraf */}
        <div className="flex flex-col gap-6">
          {/* paragraf */}
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            Hobashita Taketama adalah perusahaan yang fokus di sektor
            konstruksi dan menjadi anggota Asosiasi GAPENSI. Hobashita Taketama
            didirikan pada 03 Febuari 2004 dan berkantor pusat di Kota Adm.
            Jakarta Timur, Indonesia, tepatnya di Komplek Ruko Buaran Persada
            No.2, Jl. Jend. Pol. Soekamto Kota Adm. Jakarta Timur, Indonesia.
            Hobashita Taketama memiliki reputasi baik dalam menawarkan jasa
            dengan standar terbaik di sektor konstruksi.
          </p>

          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            Hobashita Taketama adalah perusahaan yang fokus di area operasional
            dengan klasifikasi , dimana beberapa jasa konstruksi yang dieksekusi
            oleh Hobashita Taketama mencakup: Service Konstruksi BG001:
            Konstruksi Gedung Hunian Layanan Pembangunan BG002: Konstruksi
            Gedung Perkantoran Layanan Pembangunan BG003: Konstruksi Gedung
            Industri Jasa Konstruksi BG006: Konstruksi Gedung Pendidikan dan
            juga 9 layanan lainnya.
          </p>

          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            Sebagai bagian dari pemenuhan standar mutu dan keamanan Hobashita
            Taketama senantiasa mengikuti perkembangan regulasi dan standar
            internasional. Beberapa referensi standar ISO yang menjadi acuan
            Hobashita Taketama antara lain: SMK3 PP 50/2012 ISO 9001:Quality
            Management Systems ISO 14001:Sistem Manajemen Lingkungan ISO
            45001:Sistem Manajemen Kesehatan dan Keselamatan Kerja (SMK3) 
            dan masih banyak lagi
          </p>

          <div className="mt-7 border-t border-gray-100 pt-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center items-center">
              <div>
                <div className="text-3xl md:text-4xl font-extrabold text-orange-400">
                  2004
                </div>
                <div className="text-sm text-gray-700 mt-1">Didirikan</div>
              </div>

              <div>
                <div className="text-3xl md:text-4xl font-extrabold text-orange-400">
                  56
                </div>
                <div className="text-sm text-gray-700 mt-1">Klien</div>
              </div>

              <div>
                <div className="text-3xl md:text-4xl font-extrabold text-orange-400">
                  139
                </div>
                <div className="text-sm text-gray-700 mt-1">Proyek Selesai</div>
              </div>

              <div>
                <div className="text-3xl md:text-4xl font-extrabold text-orange-400">
                  27
                </div>
                <div className="text-sm text-gray-700 mt-1">Pegawai</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
