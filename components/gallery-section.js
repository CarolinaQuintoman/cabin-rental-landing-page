"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

export function GallerySection() {
  const images = [
    // Departamento Araucaria
    { src: "/araucaria/arrayan14.jpeg", alt: "Depto Araucaria" },
    { src: "/araucaria/arrayan16.jpeg", alt: "Depto Araucaria" },
    { src: "/araucaria/arrayan17.jpeg", alt: "Depto Araucaria" },
    { src: "/araucaria/arrayan18.jpeg", alt: "Depto Araucaria" },
    { src: "/araucaria/arrayan19.jpeg", alt: "Depto Araucaria" },
    { src: "/araucaria/arrayan20.jpeg", alt: "Depto Araucaria" },
    { src: "/araucaria/arrayan21.jpeg", alt: "Depto Araucaria" },
    { src: "/araucaria/arrayan22.jpeg", alt: "Depto Araucaria" },
    { src: "/araucaria/arrayan23.jpeg", alt: "Depto Araucaria" },
    { src: "/araucaria/arrayan24.jpeg", alt: "Depto Araucaria" },
    { src: "/araucaria/arrayan25.jpeg", alt: "Depto Araucaria" },
    { src: "/araucaria/arrayan26.jpeg", alt: "Depto Araucaria" },
    
    // Departamento Arrayán
    { src: "/arrayan/arrayan1.jpeg", alt: "Depto Arrayan" },
    { src: "/arrayan/arrayan2.jpeg", alt: "Depto Arrayan" },
    { src: "/arrayan/arrayan12.jpeg", alt: "Depto Arrayan" },
    { src: "/arrayan/arrayan13.jpeg", alt: "Depto Arrayan" },
    { src: "/arrayan/arrayan14.jpeg", alt: "Depto Arrayan" },
    { src: "/arrayan/arrayan15.jpeg", alt: "Depto Arrayan" },
    { src: "/arrayan/arrayan16.jpeg", alt: "Depto Arrayan" },
    { src: "/arrayan/arrayan17.jpeg", alt: "Depto Arrayan" },
    { src: "/arrayan/arrayan18.jpeg", alt: "Depto Arrayan" },
    { src: "/arrayan/arrayan19.jpeg", alt: "Depto Arrayan" },
    { src: "/arrayan/arrayan21.jpeg", alt: "Depto Arrayan" },
    { src: "/arrayan/arrayan22.jpeg", alt: "Depto Arrayan" },
    { src: "/arrayan/arrayan23.jpeg", alt: "Depto Arrayan" },
    { src: "/arrayan/arrayan24.jpeg", alt: "Depto Arrayan" },
    { src: "/arrayan/arrayan25.jpeg", alt: "Depto Arrayan" },
    { src: "/arrayan/arrayan26.jpeg", alt: "Depto Arrayan" },
    { src: "/arrayan/arrayan27.jpeg", alt: "Depto Arrayan" },
    { src: "/arrayan/arrayan28.jpeg", alt: "Depto Arrayan" },
    { src: "/arrayan/arrayan29.jpeg", alt: "Depto Arrayan" },
    { src: "/arrayan/arrayan30.jpeg", alt: "Depto Arrayan" },
    { src: "/arrayan/arrayan31.jpeg", alt: "Depto Arrayan" },
  ]

  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openGallery = (index = 0) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }

  const closeGallery = () => {
    setIsOpen(false)
  }

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }, [images.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return
      if (e.key === "Escape") closeGallery()
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, goToPrevious, goToNext])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <>
      <section id="galeria" className="py-16 px-6 bg-[#e8e4dc]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#3d3d3d]">Galería de Imágenes</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {images.slice(0, 4).map((image, index) => (
              <button
                key={index}
                onClick={() => openGallery(index)}
                className="relative overflow-hidden rounded-lg aspect-[4/3] group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4a7c59]"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </button>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => openGallery(0)}
              className="bg-[#4a7c59] hover:bg-[#3d6a4a] text-white px-8 rounded-full cursor-pointer"
            >
              Ver Galería
            </Button>
          </div>
        </div>
      </section>

      {/* Modal Carousel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90"
            onClick={closeGallery}
          />

          {/* Close Button */}
          <button
            onClick={closeGallery}
            className="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Cerrar galería"
          >
            <X className="w-8 h-8" />
          </button>
          
          {/* Image Description */}
          {/* <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
            <p className="text-center text-white/90 text-sm  px-4 py-2 rounded-full">
              {images[currentIndex].alt}
            </p>
          </div> */}
          
          {/* Image Counter */}
          <div className="absolute top-4 left-4 z-10 text-white/80 text-sm">
            {currentIndex + 1} / {images.length}
          </div>
          

          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Main Image */}
          <div className="relative z-10 max-w-5xl max-h-[80vh] mx-4">
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Thumbnail Navigation */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 px-4 py-2 bg-black/50 rounded-full">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-12 h-8 rounded overflow-hidden transition-all ${
                  index === currentIndex
                    ? "ring-2 ring-white opacity-100"
                    : "opacity-50 hover:opacity-80"
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
