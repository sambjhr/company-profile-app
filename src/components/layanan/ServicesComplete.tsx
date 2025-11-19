"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Service = {
  id: number;
  title: string;
  excerpt: string;
  img: string;
};

export default function ServicesComplete() {
  const services: Service[] = useMemo(
    () => [
      {
        id: 1,
        title: "BG001 Konstruksi Gedung Hunian",
        excerpt:
          "Kami memiliki ijin kegiatan Konstruksi Gedung Hunian dengan kualifikasi Umum sesuai dengan KBLI 41011 yang diakui LPJK Kementerian Pekerjaan Umum (PU).",
        img: "/image/piclayanan/1.png",
      },
      {
        id: 2,
        title: "BG002 Konstruksi Gedung Perkantoran",
        excerpt:
          "Kami memiliki ijin kegiatan Konstruksi Gedung Perkantoran dengan kualifikasi Umum sesuai dengan KBLI 41012 yang disertifikasi LPJK Kementerian Pekerjaan Umum (PU).",
        img: "/image/piclayanan/2.png",
      },
      {
        id: 3,
        title: "BG003 Konstruksi Gedung Industri",
        excerpt:
          "Kami memiliki ijin kegiatan Konstruksi Gedung Industri dengan kualifikasi Umum sesuai dengan KBLI 41013 yang terdaftar di LPJK Kementerian Pekerjaan Umum (PU).",
        img: "/image/piclayanan/3.png",
      },
      {
        id: 4,
        title: "BG006 Konstruksi Gedung Pendidikan",
        excerpt:
          "Kami memiliki ijin kegiatan Konstruksi Gedung Pendidikan dengan kualifikasi Umum sesuai dengan KBLI 41016 yang terdaftar di LPJK Kementerian Pekerjaan Umum (PU).",
        img: "/image/piclayanan/4.png",
      },
      {
        id: 5,
        title: "BG007 Konstruksi Gedung Penginapan",
        excerpt:
          "Kami memiliki ijin kegiatan Konstruksi Gedung Penginapan dengan kualifikasi Umum sesuai dengan KBLI 41017 yang terdaftar di LPJK Kementerian Pekerjaan Umum (PU).",
        img: "/image/piclayanan/5.png",
      },
      {
        id: 6,
        title: "BG009 Konstruksi Gedung Lainnya",
        excerpt:
          "Kami memiliki ijin kegiatan Konstruksi Gedung Lainnya dengan kualifikasi Umum sesuai dengan KBLI 41019 yang terdaftar di LPJK Kementerian Pekerjaan Umum (PU).",
        img: "/image/piclayanan/6.png",
      },
      {
        id: 7,
        title:
          "EL010 Jasa Pelaksana Instalasi Tenaga Listrik Gedung dan Pabrik",
        excerpt:
          "Kami memberikan layanan Jasa Pelaksana Instalasi Tenaga Listrik Gedung dan Pabrik, sebuah Layanan konstruksi profesional dengan kualitas terbaik dan benchmark keselamatan yang ketat, terdaftar di LPJK Kementerian Pekerjaan Umum (PU).",
        img: "/image/piclayanan/7.png",
      },
      {
        id: 8,
        title:
          "MK001 Jasa pelaksana konstruksi pemasangan pendingin udara (Air Conditioner), pemanas dan ventilasi",
        excerpt:
          "Kami memberikan layanan Jasa pelaksana konstruksi pemasangan pendingin udara (Air Conditioner), pemanas dan ventilasi, sebuah Service pembangunan professional dengan quality excellent dan level safety yang tinggi, mendapat lisensi dari LPJK Kementerian Pekerjaan Umum (PU).",
        img: "/image/piclayanan/8.png",
      },
      {
        id: 9,
        title:
          "MK002 Jasa Pelaksana konstruksi Pemasangan Pipa Air (Plumbing) dalam Bangunan dan Salurannya",
        excerpt:
          "Kami memberikan layanan Jasa Pelaksana konstruksi Pemasangan Pipa Air (Plumbing) dalam Bangunan dan Salurannya, sebuah Jasa konstruksi yang expert dengan mutu prima dan level safety yang tinggi, mendapat lisensi dari LPJK Kementerian Pekerjaan Umum (PU).",
        img: "/image/piclayanan/9.png",
      },
      {
        id: 10,
        title:
          "SI001 Jasa Pelaksana Untuk Konstruksi Saluran Air, Pelabuhan, Dam, dan Prasarana Sumber Daya Air Lainnya",
        excerpt:
          "Kami 0memberikan layanan Jasa Pelaksana Untuk Konstruksi Saluran Air, Pelabuhan, Dam, dan Prasarana Sumber Daya Air Lainnya, sebuah Pelayanan development yang ahli dengan kualitas terbaik dan kriteria security yang ketat, mendapat lisensi dari LPJK Kementerian Pekerjaan Umum (PU).",
        img: "/image/piclayanan/10.png",
      },
      {
        id: 11,
        title:
          "SI003 Jasa Pelaksana Untuk Konstruksi Jalan Raya (kecuali jalan layang), jalan, rel kereta api, dan landas pacu bandara",
        excerpt:
          "Kami memberikan layanan Jasa Pelaksana Untuk Konstruksi Jalan Raya (kecuali jalan layang), jalan, rel kereta api, dan landas pacu bandara, sebuah Layanan konstruksi profesional dengan kualitas terbaik dan standar keamanan tinggi, diakui LPJK Kementerian Pekerjaan Umum (PU).",
        img: "/image/piclayanan/11.png",
      },
      {
        id: 12,
        title:
          "SI004 Jasa Pelaksana Konstruksi Pekerjaan Jembatan, Jalan Layang, Terowongan dan Subways",
        excerpt:
          "Kami memberikan layanan Jasa Pelaksana Konstruksi Pekerjaan Jembatan, Jalan Layang, Terowongan dan Subways, sebuah Pelayanan development yang ahli dengan kualitas terbaik dan level safety yang tinggi, disertifikasi LPJK Kementerian Pekerjaan Umum (PU).",
        img: "/image/piclayanan/12.png",
      },
    ],
    []
  );

  // beberapa variasi background (tailwind kelas) — ubah sesuai preferensi
  const bgVariants = [
    "bg-white",
    "bg-gray-50",
    "bg-slate-50",
    "bg-gray-100",
    "bg-white",
    "bg-gray-50",
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-5 space-y-8">
        <h2 className="text-4xl font-bold text-gray-800 text-center bg-">
          Our <span className="text-orange-400">Services</span>
        </h2>

        {/* daftar layanan: akan menampilkan 12 item ke bawah */}
        <div className="flex flex-col gap-8">
          {services.map((svc, idx) => {
            const bg = bgVariants[idx % bgVariants.length];
            const isEven = idx % 2 === 1; // untuk alternasi posisi gambar
            return (
              <article
                key={svc.id}
                className={`${bg} rounded-2xl shadow-sm overflow-hidden`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                  {/* Gambar kiri atau kanan tergantung index */}
                  {!isEven && (
                    <div className="p-6 md:p-8 flex items-center justify-center">
                      <div className="w-full h-44 md:h-48 lg:h-56 relative rounded-lg overflow-hidden bg-white/50">
                        <Image
                          src={svc.img}
                          alt={svc.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 40vw"
                          className="object-contain p-6"
                        />
                      </div>
                    </div>
                  )}

                  {/* Teks */}
                  <div className="p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                      {svc.title}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      {svc.excerpt}
                    </p>

                    <div className="flex items-center gap-4">
                      <Link
                        href={`/Layanan/#hargaLayanan`}
                        className="inline-block bg-orange-400 hover:bg-[#ff7a00] text-white px-4 py-2 rounded-md font-medium shadow"
                      >
                        Selengkapnya
                      </Link>

                      {/* optional: small detail (kode) */}
                      <span className="text-sm text-gray-500">
                        Kode: {svc.title.split(" ")[0]}
                      </span>
                    </div>
                  </div>

                  {/* Gambar kanan untuk alternate */}
                  {isEven && (
                    <div className="p-6 md:p-8 flex items-center justify-center">
                      <div className="w-full h-44 md:h-48 lg:h-56 relative rounded-lg overflow-hidden bg-white/50">
                        <Image
                          src={svc.img}
                          alt={svc.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 40vw"
                          className="object-contain p-6"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
