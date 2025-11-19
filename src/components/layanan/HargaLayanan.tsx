export default function HargaLayanan() {
  return (
    <div id="hargaLayanan"
      className="w-full h-[90vh] bg-cover bg-center bg-no-repeat relative flex items-center justify-center"
      style={{ backgroundImage: "url('/image/piclayanan/11.png')" }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Konten */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold leading-15">
          <span className="text-orange-400">Hubungi kami</span> untuk
          mendapatkan penawaran terbaik!
        </h1>

        <p className="mt-6 text-base md:text-lg opacity-90">
          Email: info@hkonstakekama.com 
          <br /> 
          Phone: +62 812-3456-7890
          <br />
           Address: Komplek Ruko Buaran Persada No.2, Jl. Jend. Pol. Soekamto, Jakarta Timur, Indonesia
        </p>
      </div>
    </div>
  );
}
