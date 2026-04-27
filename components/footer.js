export function Footer() {
  return (
    <footer className="bg-[#e8e4dc] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-center md:text-left">
          
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
              <svg className="w-6 h-6 text-[#4a7c59]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="text-lg font-bold text-[#4a7c59]">ARUYEN</span>
            </div>
            <p className="text-[#666] text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Tu escape perfecto en medio de la naturaleza patagónica.
            </p>
          </div>

          <div className="mb-6 md:mb-0">
            <h4 className="text-[#3d3d3d] font-semibold mb-4">Contacto</h4>
            <div className="space-y-3 text-[#666] text-sm">
              <div className="break-words">
                <p className="font-medium text-xs uppercase tracking-wide text-[#4a7c59] mb-1">Email</p>
                <p>apartaruyen@gmail.com</p>
              </div>
              <div>
                <p className="font-medium text-xs uppercase tracking-wide text-[#4a7c59] mb-1">Teléfono</p>
                <p>+54 9 294 4969132</p>
              </div>
              <div>
                <p className="font-medium text-xs uppercase tracking-wide text-[#4a7c59] mb-1">Dirección</p>
                <p>Los Castaños 198</p>
                <p>Villa La Angostura</p>
                <p>Neuquén, Argentina</p>
              </div>
            </div>
          </div>

          <div className="mb-6 md:mb-0">
            <h4 className="text-[#3d3d3d] font-semibold mb-4">Horarios</h4>
            <div className="space-y-3 text-[#666] text-sm">
              <div>
                <p className="font-medium text-xs uppercase tracking-wide text-[#4a7c59] mb-1">Check-in</p>
                <p>15:00 hs</p>
              </div>
              <div>
                <p className="font-medium text-xs uppercase tracking-wide text-[#4a7c59] mb-1">Check-out</p>
                <p>10:00 hs</p>
              </div>
              <div>
                <p className="font-medium text-xs uppercase tracking-wide text-[#4a7c59] mb-1">Consultas</p>
                <p>9:00 - 20:00 hs</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-[#3d3d3d] font-semibold mb-4">Síguenos</h4>
              <a
                href="https://instagram.com/aruyenapart"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-[#666] hover:text-[#4a7c59] transition-colors justify-center md:justify-start"
                aria-label="Síguenos en Instagram"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="text-sm">@aruyenapart</span>
              </a>
          </div>

        </div>

        <div className="border-t border-[#e0ddd5] pt-8 text-center text-[#999] text-sm">
          <p>&copy; {new Date().getFullYear()} Aruyen. Todos los derechos reservados · Desarrollado por CQ</p>
        </div>
      </div>
    </footer>
  )
}
