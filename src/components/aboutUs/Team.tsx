import Image from "next/image"
import Link from "next/link"
import React from "react"

type Member = {
  id: number
  name: string
  role: string
  bio: string
  img: string
}

export default function TeamsSection() {
  const teamMembers: Member[] = [
    {
      id: 1,
      name: "Jon Munthe",
      role: "Chief Executive Officer (CEO)",
      bio: "Sets the overall vision, mission, and long-term strategy for the entire company.",
      img: "/image/teampic/ceopic.png",
    },
    {
      id: 2,
      name: "Hobashita Maharani",
      role: "Chief Financial Officer (CFO)",
      bio: "Manages the company's entire financial health, reporting, risk management, and investments.",
      img: "/image/teampic/cfopic.png",
    },
    {
      id: 3,
      name: "Todung Sitohang",
      role: "Chief Operating Officer (COO)",
      bio: "Oversees daily operations and internal administration to ensure efficiency and process optimization.",
      img: "/image/teampic/coopic.png",
    },
    {
      id: 4,
      name: "Samuel Banjarnahor",
      role: "Chief Technology Officer (CTO)",
      bio: "Leads technology, innovation, and R&D efforts to ensure the be the forefront of the industry.",
      img: "/image/teampic/ctopic.png",
    },
    {
      id: 5,
      name: "Lamria Hutabarat",
      role: "Chief Human Resources Officer (CHRO)",
      bio: "Builds human capital strategy, including talent acquisition, and culture building",
      img: "/image/teampic/chropic.png",
    },
    {
      id: 6,
      name: "Sarah Gokasi",
      role: "Chief Marketing Officer (CMO)",
      bio: "Builds the brand, drives marketing and advertising, also develops strategies to connect with customers.",
      img: "/image/teampic/cmopic.png",
    },
  ]

  return (
    <section className="bg-gray-200 text-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            Our <span className="text-orange-400">Team</span>
          </h2>
        </div>

        {/* Grid: 3 columns on md+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((m) => (
            <article
              key={m.id}
              className="bg-transparent rounded-lg overflow-hidden transform hover:-translate-y-1 transition"
            >
              {/* Card image area */}
              <div className="relative w-full h-64 md:h-72 bg-white">
                <Image
                  src={m.img}
                  alt={m.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Info area (overlay look) */}
              <div className="bg-white px-6 py-6 border-t border-black/20">
                <h3 className="text-lg font-semibold text-gray-900">{m.name}</h3>
                <div className="text-sm text-orange-400 font-bold mt-1">{m.role}</div>
                <p className="text-sm text-gray-800 mt-3">{m.bio}</p>

              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}