export default function HeroSection() {
  return (
    <div
      className="w-full h-[90vh] bg-cover bg-center bg-no-repeat relative flex items-center justify-center"
      style={{ backgroundImage: "url('/image/piclayanan/2.png')" }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Konten */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold leading-15">
          Kualitas Konstruksi, Jaminan Profesionalisme dengan <span className="text-orange-400">Hobashita Taketama</span>
        </h1>

        <p className="mt-6 text-base md:text-lg opacity-90">
          Kami berkomitmen hasil optimal, profesionalisme, dan standar kualitas ISO.
          Kami ingin menjadi mitra andal untuk pembangunan berkelanjutan Indonesia.
        </p>
      </div>
    </div>
  );
}