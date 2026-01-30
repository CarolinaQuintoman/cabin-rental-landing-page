"use client"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img src="/images/lago-espejo.jpeg" alt="Lago Espejo" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#1a2f3a]/75" />
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-20 px-6 py-6 flex items-center justify-between">
        <div className="text-xl font-bold text-white tracking-wider"></div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/90">
          <a href="#inicio" className="hover:text-white transition-colors">
            INICIO
          </a>
          <a href="#amenidades" className="hover:text-white transition-colors">
            SOBRE NOSOTROS
          </a>
          <a href="#galeria" className="hover:text-white transition-colors">
            GALERÍA
          </a>
          <a href="#contacto" className="hover:text-white transition-colors">
            CONTACTO
          </a>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4">Villa La Angostura</p>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight text-balance">
          ARUYEN 
          <br />
          Apart Hotel
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
          Alquila con nosotros y disfruta de vistas espectaculares, naturaleza y momentos inolvidables en un
          entorno único.
        </p>
        <Button
          onClick={scrollToContact}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-base"
        >
          Reserva Ahora
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-white/60 animate-bounce">
          <span className="text-xs tracking-wider">EXPLORAR</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
