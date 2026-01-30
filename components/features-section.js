import { Card } from "@/components/ui/card"

export function FeaturesSection() {
  const features = [
    {
      title: "Ubicación Privilegiada",
      description:
        "Situada a orillas del lago con vistas panorámicas a las montañas. Acceso directo al muelle privado y senderos naturales.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: "Comodidades Modernas",
      description:
        "Equipada con cocina completa, calefacción, WiFi, y todos los servicios necesarios para una estadía confortable.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      title: "Actividades Al Aire Libre",
      description: "Kayak, pesca, trekking, observación de aves. Múltiples opciones para conectar con la naturaleza.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
          />
        </svg>
      ),
    },
    {
      title: "Paz Y Privacidad",
      description:
        "Entorno tranquilo y seguro, perfecto para familias y grupos. Lejos del ruido urbano, cerca de la naturaleza.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
    },
  ]

  return (
    <section id="amenidades" className="py-24 px-6 bg-[#1a2f3a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4">¿Por Qué Elegirnos?</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
            Una Experiencia Única
            <br />
            Te Espera
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Nuestra cabaña ofrece el equilibrio perfecto entre comodidad moderna y naturaleza salvaje.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-[#243b47] border-[#2d4a57] p-8 hover:bg-[#2a4451] transition-colors">
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-white/70 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
