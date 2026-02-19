export function GallerySection() {
  return (
    <section id="galeria" className="py-24 px-6 bg-[#243b47]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4">Imágenes</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">Descubre Nuestro Paraíso</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Large Featured Image */}
          <div className="md:row-span-2 relative overflow-hidden rounded-lg group">
            <img
              src="/images/manzanoLake.jpg"
              alt="Vista principal del Lago Manzano"
              className="w-full h-full object-cover min-h-[400px] md:min-h-[600px] group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a2f3a]/80 to-transparent flex items-end p-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Vista de Manzano</h3>
                <p className="text-white/80">Lago Nahuel Huapi y las montañas</p>
              </div>
            </div>
          </div>

          {/* Placeholder Images */}
          <div className="relative overflow-hidden rounded-lg group">
            <img
              src="/images/araucaria.jpeg"
              alt="Interior de la cabaña"
              className="w-full h-[280px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a2f3a]/80 to-transparent flex items-end p-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Araucaria</h3>
                <p className="text-white/80 text-sm">Confort y calidez</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg group">
            <img
              src="/images/arrayan.jpeg"
              alt="Muelle privado"
              className="w-full h-[280px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a2f3a]/80 to-transparent flex items-end p-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Arrayán</h3>
                <p className="text-white/80 text-sm">Vista al bosque</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
