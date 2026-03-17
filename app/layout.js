import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata = {
  title: "ARUYEN Apart Hotel - Alquiler de departamentos turísticos en Villa La Angostura",
  description: "Alquiler de departamentos en un entorno natural único. Disfruta de la tranquilidad del bosque y las montañas. A 3 cuadras del lago Nahuel Huapi",
  generator: "Carolina Quintomán - Desarrolladora Web",
  icons: {
    icon: "/images/aruyen-icon-white.svg",
    apple: "/images/aruyen-icon-white.svg",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
