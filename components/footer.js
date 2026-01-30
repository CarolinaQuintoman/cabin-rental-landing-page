export function Footer() {
  return (
    <footer className="bg-[#0f1f28] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">ARUYEN</h3>
            <p className="text-white/60 leading-relaxed">
              Tu escape perfecto en medio de la naturaleza. Alquiler Apart Hotel.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <div className="space-y-2 text-white/60">
              <p>Email: info@aruyen.com</p>
              <p>Tel: +54 9 11 1234-5678</p>
              <p>Ubicación: Villa La Angostura, Neuquén, Patagonia, Argentina</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Horario</h4>
            <div className="space-y-2 text-white/60">
              <p>Check-in: 15:00 hs</p>
              <p>Check-out: 11:00 hs</p>
              <p>Consultas: 9:00 - 20:00 hs</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-white/40 text-sm">
          <p>&copy; {new Date().getFullYear()} Aruyen. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
