"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

export function ContactSection() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    fechaLlegada: "",
    fechaSalida: "",
    huespedes: "",
    mensaje: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus("success")
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        fechaLlegada: "",
        fechaSalida: "",
        huespedes: "",
        mensaje: "",
      })

      setTimeout(() => setSubmitStatus(null), 5000)
    }, 1500)
  }

  return (
    <section id="contacto" className="py-24 px-6 bg-[#1a2f3a]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4">Reserva Tu Estadía</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
            Contáctanos Para Más
            <br />
            Información
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Completa el formulario y nos pondremos en contacto contigo a la brevedad para confirmar tu reserva.
          </p>
        </div>

        <Card className="bg-[#243b47] border-[#2d4a57] p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nombre" className="text-white">
                  Nombre Completo *
                </Label>
                <Input
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="bg-[#1a2f3a] border-[#2d4a57] text-white placeholder:text-white/40"
                  placeholder="Juan Pérez"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-[#1a2f3a] border-[#2d4a57] text-white placeholder:text-white/40"
                  placeholder="juan@ejemplo.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="telefono" className="text-white">
                  Teléfono
                </Label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="bg-[#1a2f3a] border-[#2d4a57] text-white placeholder:text-white/40"
                  placeholder="+54 9 11 1234-5678"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="huespedes" className="text-white">
                  Número de Huéspedes
                </Label>
                <Input
                  id="huespedes"
                  name="huespedes"
                  type="number"
                  min="1"
                  value={formData.huespedes}
                  onChange={handleChange}
                  className="bg-[#1a2f3a] border-[#2d4a57] text-white placeholder:text-white/40"
                  placeholder="2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fechaLlegada" className="text-white">
                  Fecha de Llegada *
                </Label>
                <Input
                  id="fechaLlegada"
                  name="fechaLlegada"
                  type="date"
                  value={formData.fechaLlegada}
                  onChange={handleChange}
                  required
                  className="bg-[#1a2f3a] border-[#2d4a57] text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fechaSalida" className="text-white">
                  Fecha de Salida *
                </Label>
                <Input
                  id="fechaSalida"
                  name="fechaSalida"
                  type="date"
                  value={formData.fechaSalida}
                  onChange={handleChange}
                  required
                  className="bg-[#1a2f3a] border-[#2d4a57] text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mensaje" className="text-white">
                Mensaje Adicional
              </Label>
              <Textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                rows={5}
                className="bg-[#1a2f3a] border-[#2d4a57] text-white placeholder:text-white/40 resize-none"
                placeholder="Cuéntanos sobre tus planes, necesidades especiales o cualquier pregunta que tengas..."
              />
            </div>

            {submitStatus === "success" && (
              <div className="bg-primary/20 border border-primary text-white p-4 rounded-lg">
                ¡Gracias por tu consulta! Nos pondremos en contacto contigo pronto.
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-base"
            >
              {isSubmitting ? "Enviando..." : "Enviar Consulta"}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  )
}
