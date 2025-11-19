'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Service = {
  id: number
  title: string
  excerpt: string
  img: string
}

export default function ServicesPreview() {
  const services: Service[] = useMemo(
    () => [
      { id: 1, 
        title: 'BG001 Konstruksi Gedung Hunian', 
        excerpt: 'Kami memiliki ijin kegiatan Konstruksi Gedung Hunian dengan kualifikasi Umum sesuai dengan KBLI 41011 yang diakui LPJK Kementerian Pekerjaan Umum (PU).', 
        img: '/image/piclayanan/1.png' 
      },
      { id: 2, 
        title: 'BG002 Konstruksi Gedung Perkantoran', 
        excerpt: 'Kami memiliki ijin kegiatan Konstruksi Gedung Perkantoran dengan kualifikasi Umum sesuai dengan KBLI 41012 yang disertifikasi LPJK Kementerian Pekerjaan Umum (PU).', 
        img: '/image/piclayanan/2.png' 
      },
      { id: 3, 
        title: 'BG003 Konstruksi Gedung Industri', 
        excerpt: 'Kami memiliki ijin kegiatan Konstruksi Gedung Industri dengan kualifikasi Umum sesuai dengan KBLI 41013 yang terdaftar di LPJK Kementerian Pekerjaan Umum (PU).', 
        img: '/image/piclayanan/3.png' 
      },
      { id: 4, 
        title: 'BG006 Konstruksi Gedung Pendidikan', 
        excerpt: 'Kami memiliki ijin kegiatan Konstruksi Gedung Pendidikan dengan kualifikasi Umum sesuai dengan KBLI 41016 yang terdaftar di LPJK Kementerian Pekerjaan Umum (PU).', 
        img: '/image/piclayanan/4.png' 
      },
      { id: 5, 
        title: 'BG007 Konstruksi Gedung Penginapan', 
        excerpt: 'Kami memiliki ijin kegiatan Konstruksi Gedung Penginapan dengan kualifikasi Umum sesuai dengan KBLI 41017 yang terdaftar di LPJK Kementerian Pekerjaan Umum (PU).', 
        img: '/image/piclayanan/5.png' 
      },
      { id: 6, 
        title: 'BG009 Konstruksi Gedung Lainnya', 
        excerpt: 'Kami memiliki ijin kegiatan Konstruksi Gedung Lainnya dengan kualifikasi Umum sesuai dengan KBLI 41019 yang terdaftar di LPJK Kementerian Pekerjaan Umum (PU).', 
        img: '/image/piclayanan/6.png' 
      },
      { id: 7, 
        title: 'EL010 Jasa Pelaksana Instalasi Tenaga Listrik Gedung dan Pabrik', 
        excerpt: 'Kami memberikan layanan Jasa Pelaksana Instalasi Tenaga Listrik Gedung dan Pabrik, sebuah Layanan konstruksi profesional dengan kualitas terbaik dan benchmark keselamatan yang ketat, terdaftar di LPJK Kementerian Pekerjaan Umum (PU).', 
        img: '/image/piclayanan/7.png' 
      },
      { id: 8, 
        title: 'MK001 Jasa pelaksana konstruksi pemasangan pendingin udara (Air Conditioner), pemanas dan ventilasi', 
        excerpt: 'Kami memberikan layanan Jasa pelaksana konstruksi pemasangan pendingin udara (Air Conditioner), pemanas dan ventilasi, sebuah Service pembangunan professional dengan quality excellent dan level safety yang tinggi, mendapat lisensi dari LPJK Kementerian Pekerjaan Umum (PU).', 
        img: '/image/piclayanan/8.png' 
      },
      { id: 9, 
        title: 'MK002 Jasa Pelaksana konstruksi Pemasangan Pipa Air (Plumbing) dalam Bangunan dan Salurannya', 
        excerpt: 'Kami memberikan layanan Jasa Pelaksana konstruksi Pemasangan Pipa Air (Plumbing) dalam Bangunan dan Salurannya, sebuah Jasa konstruksi yang expert dengan mutu prima dan level safety yang tinggi, mendapat lisensi dari LPJK Kementerian Pekerjaan Umum (PU).', 
        img: '/image/piclayanan/9.png' 
      },
      { id: 10, 
        title: 'SI001 Jasa Pelaksana Untuk Konstruksi Saluran Air, Pelabuhan, Dam, dan Prasarana Sumber Daya Air Lainnya', 
        excerpt: 'Kami 0memberikan layanan Jasa Pelaksana Untuk Konstruksi Saluran Air, Pelabuhan, Dam, dan Prasarana Sumber Daya Air Lainnya, sebuah Pelayanan development yang ahli dengan kualitas terbaik dan kriteria security yang ketat, mendapat lisensi dari LPJK Kementerian Pekerjaan Umum (PU).', 
        img: '/image/piclayanan/10.png' 
      },
      { id: 11, 
        title: 'SI003 Jasa Pelaksana Untuk Konstruksi Jalan Raya (kecuali jalan layang), jalan, rel kereta api, dan landas pacu bandara', 
        excerpt: 'Kami memberikan layanan Jasa Pelaksana Untuk Konstruksi Jalan Raya (kecuali jalan layang), jalan, rel kereta api, dan landas pacu bandara, sebuah Layanan konstruksi profesional dengan kualitas terbaik dan standar keamanan tinggi, diakui LPJK Kementerian Pekerjaan Umum (PU).', 
        img: '/image/piclayanan/11.png' 
      },
      { id: 12, 
        title: 'SI004 Jasa Pelaksana Konstruksi Pekerjaan Jembatan, Jalan Layang, Terowongan dan Subways', 
        excerpt: 'Kami memberikan layanan Jasa Pelaksana Konstruksi Pekerjaan Jembatan, Jalan Layang, Terowongan dan Subways, sebuah Pelayanan development yang ahli dengan kualitas terbaik dan level safety yang tinggi, disertifikasi LPJK Kementerian Pekerjaan Umum (PU).', 
        img: '/image/piclayanan/12.png' 
      },
    ],
    []
  )

  // --- settings ---
  const itemsPerSlide = 3
  const slides = useMemo(() => {
    const chunks: Service[][] = []
    for (let i = 0; i < services.length; i += itemsPerSlide) {
      chunks.push(services.slice(i, i + itemsPerSlide))
    }
    return chunks
  }, [services])

  const [current, setCurrent] = useState(0)
  const total = slides.length

  const prev = () => setCurrent((c) => (c - 1 + total) % total)
  const next = () => setCurrent((c) => (c + 1) % total)
  const goTo = (index: number) => setCurrent(index % total)

  return (
    <div className="bg-gray-200 py-20">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-5xl font-bold text-gray-800">Our Services</h2>

          {/* Tombol Kanan Kiri */}
          <div className="hidden sm:flex items-center gap-1">
            <button
              onClick={prev}
              aria-label="Previous"
              className="p-2 rounded-md border bg-orange-300 hover:bg-orange-200 transition"
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="p-2 rounded-md border bg-orange-300 hover:bg-orange-200 transition"
            >
              ›
            </button>
          </div>
        </div>

        {/* Carousel viewport */}
        <div className="relative">
          {/* Slides container - use transform for simple slide movement */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ width: `${100 * total}%`, transform: `translateX(-${(100 / total) * current}%)` }}
            >
              {slides.map((slide, idx) => (
                <div
                  key={idx}
                  className="w-full"
                  style={{ width: `${100 / total}%` }}
                >
                  {/* Slide */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {slide.map((svc) => (
                      <article key={svc.id} className="p-4 bg-white border rounded-lg shadow-sm flex flex-col">
                        <div className="w-full h-40 relative rounded-md overflow-hidden mb-4">
                          <Image
                            src={svc.img}
                            alt={svc.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                          />
                        </div>

                        <h3 className="font-semibold text-lg mb-2 text-black">{svc.title}</h3>
                        <p className="text-sm text-gray-600 flex-1">{svc.excerpt}</p>

                        <div className="mt-4 border rounded-2xl text-center bg-orange-400">
                          <Link
                            href={`/Layanan`}
                            className="inline-block text-sm font-medium text-white hover:underline"
                          >
                            Selengkapnya
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="flex items-center justify-center mt-6 gap-3">
            <button
              onClick={prev}
              aria-label="Previous"
              className="sm:hidden px-4 py-2 rounded-md border hover:bg-gray-100 transition"
            >
              Prev
            </button>
            {/* Indicators */}
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`w-3 h-3 rounded-full ${i === current ? 'bg-orange-400' : 'bg-gray-300'}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next"
              className="sm:hidden px-4 py-2 rounded-md border hover:bg-gray-100 transition"
            >
              Next
            </button>
          </div>

          {/* Tombol All Services */}
          <div className="mt-8 text-center">
            <Link
              href="/Layanan"
              className="inline-block bg-orange-400 hover:bg-orange-300 text-white px-6 py-2 rounded-md font-semibold shadow"
            >
              View All Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}