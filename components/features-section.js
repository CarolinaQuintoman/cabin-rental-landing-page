import { Card } from "@/components/ui/card"

export function FeaturesSection() {
  const features = [
    {
      title: "Ubicación Privilegiada",
      description: (
        <>
          Situadas a 3 cuadras del lago <br /> Nahuel Huapi.{" "}
          <a 
            href="https://maps.google.com/maps?q=Los+casta%C3%B1os+198,+Villa+La+Angostura,+Neuqu%C3%A9n,+Argentina" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#4a7c59] hover:text-[#3d6a4a] underline hover:no-underline transition-colors font-medium"
          >
            <br />
            Ver en el mapa
          </a>
        </>
      ),
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: "Comodidades Modernas",
      description: "Departamentos equipados.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      title: "Actividades",
      description: (
        <>
          Múltiples opciones para conectar con la naturaleza. Consultar con la dirección de Turismo de la ciudad.{" "}
          <a 
            href="https://www.villalaangosturaturismo.gob.ar" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#4a7c59] hover:text-[#3d6a4a] underline hover:no-underline transition-colors"
          >
            www.villalaangosturaturismo.gob.ar
          </a>
        </>
      ),
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ]

  return (
    <section id="amenidades" className="py-16 px-6 bg-[#f5f2eb]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#3d3d3d] mb-4">
            ¿Por qué elegirnos?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white border-[#e0ddd5] p-8 text-center hover:shadow-lg transition-shadow">
              <div className="text-[#4a7c59] mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-[#3d3d3d] mb-2">{feature.title}</h3>
              <p className="text-[#666] text-sm leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
