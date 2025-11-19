export default function Jumbotron() {
  return (
    <div
      className="w-full h-[90vh] bg-cover bg-center bg-no-repeat relative flex items-center justify-center"
      style={{ backgroundImage: "url('/image/aboutuss.png')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Konten */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Hobashita <span className="text-orange-400">Taketama</span>
        </h1>

        <p className="mt-6 text-base md:text-lg opacity-90">
          PT. Hobashita Taketama merupakan badan usaha yang beroperasi di ranah pelaksanaan 
          proyek dan menjadi anggota Asosiasi GAPENSI. berkantor pusat di Kota Adm. Jakarta Timur, 
          Indonesia. Dengan 21 Tahun pengalaman, lebih dari 100++ proyek yang dikerjakan oleh 20 lebih pegawai, 
          kami berkomitmen dapat kontinyu memberikan kontribusi pada konstruksi bagi masyarakat Indonesia
        </p>
      </div>
    </div>
  );
}