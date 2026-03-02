"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ContactSection() {
  // Lista de dominios de email populares y confiables
  const validDomains = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com',
    'icloud.com', 'me.com', 'mac.com', 'protonmail.com', 'aol.com',
    'yandex.com', 'zoho.com', 'fastmail.com', 'mail.com', 'gmx.com',
    // Dominios argentinos populares
    'arnet.com.ar', 'fibertel.com.ar', 'ciudad.com.ar', 'speedy.com.ar',
    // Dominios latinoamericanos
    'terra.com', 'terra.com.br', 'uol.com.br', 'bol.com.br', 'globo.com'
  ]

  // Correcciones automáticas comunes
  const domainCorrections = {
    'gmial.com': 'gmail.com', 'gmai.com': 'gmail.com', 'gamil.com': 'gmail.com',
    'gmail.co': 'gmail.com', 'gmal.com': 'gmail.com', 
    'yaho.com': 'yahoo.com', 'yahoo.co': 'yahoo.com', 'yahooo.com': 'yahoo.com',
    'hotmai.com': 'hotmail.com', 'hotmial.com': 'hotmail.com', 'hotmail.co': 'hotmail.com',
    'outlok.com': 'outlook.com', 'outlook.co': 'outlook.com'
  }

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    countryCode: "+54", // Código de país por defecto
    telefono: "",
    fechaLlegada: "",
    fechaSalida: "",
    huespedes: "",
    mensaje: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errors, setErrors] = useState({})
  const [emailSuggestion, setEmailSuggestion] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Validación especial para el campo teléfono
    if (name === 'telefono') {
      // Solo permitir números, espacios, guiones y paréntesis (NO +)
      const filteredValue = value.replace(/[^\d\s\-\(\)]/g, '')
      
      setFormData((prev) => ({
        ...prev,
        [name]: filteredValue,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
    
    // Limpiar errores y sugerencias cuando el usuario escriba
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
    
    if (name === 'email') {
      setEmailSuggestion('')
    }
  }

  const handleCountryChange = (value) => {
    setFormData(prev => ({
      ...prev,
      countryCode: value
    }))
    
    // Limpiar error de teléfono si existe
    if (errors.telefono) {
      setErrors(prev => ({
        ...prev,
        telefono: ''
      }))
    }
  }
  
  const applySuggestedEmail = () => {
    setFormData(prev => ({
      ...prev,
      email: emailSuggestion
    }))
    setEmailSuggestion('')
    setErrors(prev => ({
      ...prev,
      email: ''
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Validar nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido'
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres'
    }
    
    // Validar apellido
    if (!formData.apellido.trim()) {
      newErrors.apellido = 'El apellido es requerido'
    } else if (formData.apellido.trim().length < 2) {
      newErrors.apellido = 'El apellido debe tener al menos 2 caracteres'
    }
    
    // Validar email con verificación de dominio
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Ingresa un email válido'
      } else {
        // Extraer dominio
        const emailParts = formData.email.split('@')
        if (emailParts.length === 2) {
          const domain = emailParts[1].toLowerCase()
          
          // Verificar si hay una corrección disponible
          if (domainCorrections[domain]) {
            const suggestedEmail = `${emailParts[0]}@${domainCorrections[domain]}`
            setEmailSuggestion(suggestedEmail)
            newErrors.email = `¿Quisiste decir ${suggestedEmail}?`
          } 
          // Verificar si el dominio es válido
          else if (!validDomains.includes(domain)) {
            newErrors.email = 'Por favor usa un email de un proveedor conocido (Gmail, Yahoo, Outlook, etc.)'
            
            // Sugerir el dominio más similar
            const suggestion = validDomains.find(validDomain => 
              domain.includes(validDomain.split('.')[0]) || validDomain.includes(domain.split('.')[0])
            )
            if (suggestion) {
              const suggestedEmail = `${emailParts[0]}@${suggestion}`
              setEmailSuggestion(suggestedEmail)
            }
          }
        }
      }
    }
    
    // Validar fechas
    if (!formData.fechaLlegada) {
      newErrors.fechaLlegada = 'La fecha de llegada es requerida'
    } else {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const llegada = new Date(formData.fechaLlegada)
      
      if (llegada < today) {
        newErrors.fechaLlegada = 'La fecha de llegada no puede ser anterior a hoy'
      }
    }
    
    if (!formData.fechaSalida) {
      newErrors.fechaSalida = 'La fecha de salida es requerida'
    } else if (formData.fechaLlegada && formData.fechaSalida) {
      const llegada = new Date(formData.fechaLlegada)
      const salida = new Date(formData.fechaSalida)
      
      if (salida <= llegada) {
        newErrors.fechaSalida = 'La fecha de salida debe ser posterior a la llegada'
      }
    }
    
    // Validar teléfono (opcional pero si se ingresa debe ser válido)
    if (formData.telefono.trim()) {
      const phone = formData.telefono.trim()
      
      // Contar solo los dígitos (sin espacios, guiones, paréntesis)
      const digitCount = phone.replace(/\D/g, '').length
      
      // El teléfono debe tener entre 7 y 15 dígitos
      if (digitCount < 7) {
        newErrors.telefono = 'El teléfono debe tener al menos 7 dígitos'
      } else if (digitCount > 15) {
        newErrors.telefono = 'El teléfono no puede tener más de 15 dígitos'
      }
    }
    
    // Validar huéspedes (ahora es requerido)
    if (!formData.huespedes) {
      newErrors.huespedes = 'Debes seleccionar el número de huéspedes'
    } else if (parseInt(formData.huespedes) < 1 || parseInt(formData.huespedes) > 20) {
      newErrors.huespedes = 'El número de huéspedes debe ser entre 1 y 20'
    }
    
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitStatus(null)
    
    // Validar formulario
    const formErrors = validateForm()
    setErrors(formErrors)
    
    // Si hay errores, no enviar
    if (Object.keys(formErrors).length > 0) {
      return
    }
    
    setIsSubmitting(true)

    try {
      // Combinar nombre y apellido para el envío
      const nombreCompleto = `${formData.nombre.trim()} ${formData.apellido.trim()}`
      
      // Combinar código de país con número de teléfono
      const phoneNumber = formData.telefono.trim() 
        ? `${formData.countryCode} ${formData.telefono.trim()}`
        : ''
      
      // Preparar datos para envío  
      const dataToSend = {
        ...formData,
        nombre: nombreCompleto, // Enviar nombre completo
        telefono: phoneNumber
      }
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({
          nombre: "",
          apellido: "",
          email: "",
          countryCode: "+54",
          telefono: "",
          fechaLlegada: "",
          fechaSalida: "",
          huespedes: "",
          mensaje: "",
        })
        setEmailSuggestion('') // Limpiar sugerencia
      } else {
        setSubmitStatus("error")
        console.error('Error:', result.error)
      }
    } catch (error) {
      setSubmitStatus("error")
      console.error('Error enviando formulario:', error)
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 5000)
    }
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
                  Nombre *
                </Label>
                <Input
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className={`bg-[#1a2f3a] border-[#2d4a57] text-white placeholder:text-white/40 ${
                    errors.nombre ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                  placeholder="Juan"
                />
                {errors.nombre && (
                  <p className="text-red-400 text-sm mt-1">{errors.nombre}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="apellido" className="text-white">
                  Apellido *
                </Label>
                <Input
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                  className={`bg-[#1a2f3a] border-[#2d4a57] text-white placeholder:text-white/40 ${
                    errors.apellido ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                  placeholder="Pérez"
                />
                {errors.apellido && (
                  <p className="text-red-400 text-sm mt-1">{errors.apellido}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

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
                  className={`bg-[#1a2f3a] border-[#2d4a57] text-white placeholder:text-white/40 ${
                    errors.email ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                  placeholder="juan@gmail.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
                {emailSuggestion && (
                  <button
                    type="button"
                    onClick={applySuggestedEmail}
                    className="text-blue-400 hover:text-blue-300 text-sm underline"
                  >
                    ✓ Usar: {emailSuggestion}
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="telefono" className="text-white">
                  Teléfono
                </Label>
                <div className="flex gap-2">
                  <Select value={formData.countryCode} onValueChange={handleCountryChange}>
                    <SelectTrigger className="w-32 bg-[#1a2f3a] border-[#2d4a57] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a2f3a] border-[#2d4a57] text-white">
                      <SelectItem value="+54">🇦🇷 +54</SelectItem>
                      <SelectItem value="+1">🇺🇸 +1</SelectItem>
                      <SelectItem value="+55">🇧🇷 +55</SelectItem>
                      <SelectItem value="+56">🇨🇱 +56</SelectItem>
                      <SelectItem value="+598">🇺🇾 +598</SelectItem>
                      <SelectItem value="+595">🇵🇾 +595</SelectItem>
                      <SelectItem value="+591">🇧🇴 +591</SelectItem>
                      <SelectItem value="+57">🇨🇴 +57</SelectItem>
                      <SelectItem value="+51">🇵🇪 +51</SelectItem>
                      <SelectItem value="+593">🇪🇨 +593</SelectItem>
                      <SelectItem value="+58">🇻🇪 +58</SelectItem>
                      <SelectItem value="+52">🇲🇽 +52</SelectItem>
                      <SelectItem value="+34">🇪🇸 +34</SelectItem>
                      <SelectItem value="+33">🇫🇷 +33</SelectItem>
                      <SelectItem value="+39">🇮🇹 +39</SelectItem>
                      <SelectItem value="+49">🇩🇪 +49</SelectItem>
                      <SelectItem value="+44">🇬🇧 +44</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    value={formData.telefono}
                    onChange={handleChange}
                    className={`flex-1 bg-[#1a2f3a] border-[#2d4a57] text-white placeholder:text-white/40 ${
                      errors.telefono ? 'border-red-500 focus:border-red-500' : ''
                    }`}
                    placeholder="11 1234 5678"
                  />
                </div>
                {errors.telefono && (
                  <p className="text-red-400 text-sm mt-1">{errors.telefono}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="huespedes" className="text-white">
                  Número de Huéspedes *
                </Label>
                <Select value={formData.huespedes} onValueChange={(value) => {
                  setFormData(prev => ({...prev, huespedes: value}))
                  if (errors.huespedes) {
                    setErrors(prev => ({...prev, huespedes: ''}))
                  }
                }}>
                  <SelectTrigger className={`bg-[#1a2f3a] border-[#2d4a57] text-white ${
                    errors.huespedes ? 'border-red-500 focus:border-red-500' : ''
                  }`}>
                    <SelectValue placeholder="Selecciona cantidad" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a2f3a] border-[#2d4a57] text-white">
                    <SelectItem value="1">1 huésped</SelectItem>
                    <SelectItem value="2">2 huéspedes</SelectItem>
                    <SelectItem value="3">3 huéspedes</SelectItem>
                    <SelectItem value="4">4 huéspedes</SelectItem>
                    <SelectItem value="5">5 huéspedes</SelectItem>
                    <SelectItem value="6">6 huéspedes</SelectItem>
                    <SelectItem value="7">7 huéspedes</SelectItem>
                    <SelectItem value="8">8 huéspedes</SelectItem>
                    <SelectItem value="9">9 huéspedes</SelectItem>
                    <SelectItem value="10">10 huéspedes</SelectItem>
                    <SelectItem value="11">11 huéspedes</SelectItem>
                    <SelectItem value="12">12 huéspedes</SelectItem>
                    <SelectItem value="13">13 huéspedes</SelectItem>
                    <SelectItem value="14">14 huéspedes</SelectItem>
                    <SelectItem value="15">15 huéspedes</SelectItem>
                    <SelectItem value="16">16 huéspedes</SelectItem>
                    <SelectItem value="17">17 huéspedes</SelectItem>
                    <SelectItem value="18">18 huéspedes</SelectItem>
                    <SelectItem value="19">19 huéspedes</SelectItem>
                    <SelectItem value="20">20 huéspedes</SelectItem>
                  </SelectContent>
                </Select>
                {errors.huespedes && (
                  <p className="text-red-400 text-sm mt-1">{errors.huespedes}</p>
                )}
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
                  min={new Date().toISOString().split('T')[0]}
                  className={`bg-[#1a2f3a] border-[#2d4a57] text-white ${
                    errors.fechaLlegada ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                />
                {errors.fechaLlegada && (
                  <p className="text-red-400 text-sm mt-1">{errors.fechaLlegada}</p>
                )}
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
                  min={formData.fechaLlegada || new Date().toISOString().split('T')[0]}
                  className={`bg-[#1a2f3a] border-[#2d4a57] text-white ${
                    errors.fechaSalida ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                />
                {errors.fechaSalida && (
                  <p className="text-red-400 text-sm mt-1">{errors.fechaSalida}</p>
                )}
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
              <div className="bg-green-600/20 border border-green-500 text-green-100 p-4 rounded-lg">
                ✅ ¡Perfecto! Tu consulta ha sido enviada. Recibirás un email de confirmación y nos contactaremos contigo pronto.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="bg-red-600/20 border border-red-500 text-red-100 p-4 rounded-lg">
                ❌ Hubo un error al enviar tu consulta. Por favor, intenta nuevamente o contáctanos directamente.
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
