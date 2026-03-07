"use client"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
 
    <>
      {/* Navigation - Light Header */}
      <nav className="bg-white px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <svg className="w-8 h-8 text-[#4a7c59]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <div>
            <div className="text-xl font-bold text-[#4a7c59] tracking-wide">ARUYEN</div>
            
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-[#3d3d3d]">
          <a href="#inicio" className="hover:text-[#4a7c59] transition-colors border-b-2 border-[#4a7c59] pb-1">
            Inicio
          </a>
          <a href="#amenidades" className="hover:text-[#4a7c59] transition-colors">
            Sobre Nosotros
          </a>
          <a href="#galeria" className="hover:text-[#4a7c59] transition-colors">
            Galería
          </a>
          <a href="#contacto" className="hover:text-[#4a7c59] transition-colors">
            Contacto
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* <section id="inicio" className="relative h-[70vh] flex items-center justify-center overflow-hidden"> */}
        {/* Background Image with Light Overlay */}
        <div className="absolute inset-0">
          <img src="/images/lakeandmountain.png" 
               alt="Lago Espejo" 
               className="w-full h-full object-cover"
               style={{objectPosition: '100% 20%'}} />

          <div className="absolute inset-0 bg-black/20" />
        </div> 

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-10xl font-bold text-white mb-4 leading-tight text-balance">
            Escapate a Villa La Angostura
            <br />
            ARUYEN APART HOTEL
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Naturaleza y Tranquilidad
          </p>
          <Button
            onClick={scrollToContact}
            size="lg"
            className="bg-[#4a7c59] hover:bg-[#3d6a4a] text-white px-8 py-6 text-base rounded-full"
          >
            Reserva ahora
          </Button>
        </div>
      </section>

      {/* Welcome Section */}
      {/* <section className="bg-[#f5f2eb] py-16 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#3d3d3d] mb-4">
          Bienvenidos
        </h2>
        <p className="text-[#666] max-w-2xl mx-auto mb-8 leading-relaxed">
          Alquila con nosotros y disfruta de la naturaleza y momentos inolvidables en Villa La Angostura.
        </p>
        <Button
          variant="outline"
          className="border-[#4a7c59] text-[#4a7c59] hover:bg-[#4a7c59] hover:text-white rounded-full px-8"
        >
          Ver Más
        </Button>
      </section> */}

      
    </>
  )
}
