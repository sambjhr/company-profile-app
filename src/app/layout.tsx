import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Company Profile',
  description: 'Company Profile Website by Merlin & Dexter',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Navbar />

        <main className="bg-white pt-[72px] min-h-screen">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}