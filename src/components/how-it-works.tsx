import { MapPin, FileText, Send } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    color: "from-[#FFCC00] to-[#FFB800]",
    iconColor: "text-[#001A5C]",
    title: "Visita Nuestra Oficina",
    desc: "Acércate a cualquiera de nuestras sucursales cerca de ti.",
  },
  {
    icon: FileText,
    color: "from-[#0033A0] to-[#00247D]",
    iconColor: "text-white",
    title: "Completa el Proceso",
    desc: "Llena los datos del beneficiario y monto a enviar.",
  },
  {
    icon: Send,
    color: "from-[#CF142B] to-[#A00D20]",
    iconColor: "text-white",
    title: "Dinero Entregado",
    desc: "Tu familiar recibe el dinero en Venezuela de forma rápida.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="relative py-20 px-6 bg-gradient-to-b from-white to-[#FFF9E6] overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <span className="inline-block rounded-full bg-[#0033A0] text-white px-4 py-1.5 text-xs tracking-wider shadow">
          ⚡ PROCESO SIMPLE
        </span>
        <h2 className="mt-4">
          ¿Cómo <span className="text-[#CF142B]">funciona</span>?
        </h2>
        <p className="mt-3 text-gray-600">Envía dinero a Venezuela en solo 3 pasos sencillos.</p>

        <div className="mt-12 grid md:grid-cols-3 gap-6 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-20 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-[#FFCC00] via-[#0033A0] to-[#CF142B] opacity-30" />

          {steps.map((s, i) => (
            <div
              key={s.title}
              className="relative bg-white rounded-2xl p-8 text-left shadow-lg hover:shadow-2xl hover:-translate-y-2 transition border border-gray-100"
            >
              <div className={`bg-gradient-to-br ${s.color} h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg`}>
                <s.icon className={`h-7 w-7 ${s.iconColor}`} />
              </div>
              <div className="absolute top-6 right-6 tracking-tight bg-gradient-to-br from-[#FFCC00] via-[#0033A0] to-[#CF142B] bg-clip-text text-transparent opacity-40">
                0{i + 1}
              </div>
              <h4 className="mt-5">{s.title}</h4>
              <p className="mt-2 text-gray-600 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
