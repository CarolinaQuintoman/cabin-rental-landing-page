"use client"

import { useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function GallerySection() {
  const [isAraucariaOpen, setIsAraucariaOpen] = useState(false)
  const [isArrayanOpen, setIsArrayanOpen] = useState(false)

  // Arrays de imágenes para cada cabaña
  const araucariaImages = [
    { src: `/araucaria/arrayan14.jpeg`, alt: `Araucaria -  Vista 1` },
    { src: `/araucaria/arrayan16.jpeg`, alt: `Araucaria -  Vista 2` },
    { src: `/araucaria/arrayan17.jpeg`, alt: `Araucaria -  Vista 3` },
    { src: `/araucaria/arrayan18.jpeg`, alt: `Araucaria -  Vista 4` },
    { src: `/araucaria/arrayan19.jpeg`, alt: `Araucaria -  Vista 5` },
    { src: `/araucaria/arrayan20.jpeg`, alt: `Araucaria -  Vista 6` },
    { src: `/araucaria/arrayan21.jpeg`, alt: `Araucaria -  Vista 7` },
    { src: `/araucaria/arrayan22.jpeg`, alt: `Araucaria -  Vista 8` },
    { src: `/araucaria/arrayan23.jpeg`, alt: `Araucaria -  Vista 9` },
    { src: `/araucaria/arrayan24.jpeg`, alt: `Araucaria -  Vista 10` },
    { src: `/araucaria/arrayan25.jpeg`, alt: `Araucaria -  Vista 11` },
    { src: `/araucaria/arrayan26.jpeg`, alt: `Araucaria -  Vista 12` }
  ]

  const arrayanImages = [
    { src: `/arrayan/arrayan1.jpeg`, alt: `Arrayán -  Vista 1` },
    { src: `/arrayan/arrayan2.jpeg`, alt: `Arrayán -  Vista 2` },
    { src: `/arrayan/arrayan12.jpeg`, alt: `Arrayán -  Vista 3` },
    { src: `/arrayan/arrayan13.jpeg`, alt: `Arrayán -  Vista 4` },
    { src: `/arrayan/arrayan14.jpeg`, alt: `Arrayán -  Vista 5` },
    { src: `/arrayan/arrayan15.jpeg`, alt: `Arrayán -  Vista 6` },
    { src: `/arrayan/arrayan16.jpeg`, alt: `Arrayán -  Vista 7` },
    { src: `/arrayan/arrayan17.jpeg`, alt: `Arrayán -  Vista 8` },
    { src: `/arrayan/arrayan18.jpeg`, alt: `Arrayán -  Vista 9` },
    { src: `/arrayan/arrayan19.jpeg`, alt: `Arrayán -  Vista 10` },
    { src: `/arrayan/arrayan21.jpeg`, alt: `Arrayán -  Vista 11` },
    { src: `/arrayan/arrayan22.jpeg`, alt: `Arrayán -  Vista 12` },
    { src: `/arrayan/arrayan23.jpeg`, alt: `Arrayán -  Vista 13` },
    { src: `/arrayan/arrayan24.jpeg`, alt: `Arrayán -  Vista 14` },
    { src: `/arrayan/arrayan25.jpeg`, alt: `Arrayán -  Vista 15` },
    { src: `/arrayan/arrayan26.jpeg`, alt: `Arrayán -  Vista 16` },
    { src: `/arrayan/arrayan27.jpeg`, alt: `Arrayán -  Vista 17` },
    { src: `/arrayan/arrayan28.jpeg`, alt: `Arrayán -  Vista 18` },
    { src: `/arrayan/arrayan29.jpeg`, alt: `Arrayán -  Vista 19` },
    { src: `/arrayan/arrayan30.jpeg`, alt: `Arrayán -  Vista 20` },
    { src: `/arrayan/arrayan31.jpeg`, alt: `Arrayán -  Vista 21` }
  ]
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

          {/* Carrusel Araucaria */}
          <Dialog open={isAraucariaOpen} onOpenChange={setIsAraucariaOpen}>
            <DialogTrigger asChild>
              <div className="relative overflow-hidden rounded-lg group cursor-pointer">
                <img
                  src="/images/araucaria.jpeg"
                  alt="Interior de la cabaña"
                  className="w-full h-[280px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2f3a]/80 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Araucaria</h3>
                    <p className="text-white/80 text-sm">Confort y calidez - 📷 Ver galería</p>
                  </div>
                </div>
              </div>
            </DialogTrigger>
            
            <DialogContent className="max-w-4xl w-full h-[80vh] p-0 bg-[#1a2f3a]">
              <DialogTitle className="sr-only">Galería de imágenes depto Araucaria</DialogTitle>
              <div className="relative w-full h-full">
                <Carousel className="w-full h-full">
                  <CarouselContent className="h-full">
                    {araucariaImages.map((image, index) => (
                      <CarouselItem key={index} className="h-full">
                        <div className="relative h-full">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1a2f3a]/90 to-transparent p-6">
                            <h3 className="text-xl font-bold text-white mb-1">
                              Aruyen Apart Hotel
                            </h3>
                            <p className="text-white/60 text-sm">
                              {index + 1} de {araucariaImages.length} - Confort y calidez
                            </p>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4 bg-white/10 border-white/20 text-white hover:bg-white/20" />
                  <CarouselNext className="right-4 bg-white/10 border-white/20 text-white hover:bg-white/20" />
                </Carousel>
              </div>
            </DialogContent>
          </Dialog>

          {/* Carrusel Arrayán */}
          <Dialog open={isArrayanOpen} onOpenChange={setIsArrayanOpen}>
            <DialogTrigger asChild>
              <div className="relative overflow-hidden rounded-lg group cursor-pointer">
                <img
                  src="/images/arrayan.jpeg"
                  alt="Muelle privado"
                  className="w-full h-[280px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2f3a]/80 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Arrayán</h3>
                    <p className="text-white/80 text-sm">Vista al bosque - 📷 Ver galería</p>
                  </div>
                </div>
              </div>
            </DialogTrigger>
            
            <DialogContent className="max-w-4xl w-full h-[80vh] p-0 bg-[#1a2f3a]">
              <DialogTitle className="sr-only">Galería de imágenes depto Arrayán</DialogTitle>
              <div className="relative w-full h-full">
                <Carousel className="w-full h-full">
                  <CarouselContent className="h-full">
                    {arrayanImages.map((image, index) => (
                      <CarouselItem key={index} className="h-full">
                        <div className="relative h-full">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1a2f3a]/90 to-transparent p-6">
                            <h3 className="text-xl font-bold text-white mb-1">
                              Aruyen Apart Hotel
                            </h3>
                            <p className="text-white/60 text-sm">
                              {index + 1} de {arrayanImages.length} - Vista al bosque
                            </p>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4 bg-white/10 border-white/20 text-white hover:bg-white/20" />
                  <CarouselNext className="right-4 bg-white/10 border-white/20 text-white hover:bg-white/20" />
                </Carousel>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  )
}
