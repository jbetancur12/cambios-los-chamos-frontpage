import { DollarSign, Zap, Shield, Heart, Award, Users, CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const foundationYear = 2019;
const calculateYears = () => new Date().getFullYear() - foundationYear;

const items = [
  { icon: DollarSign, title: "Mejores Tasas", desc: "Tasas competitivas actualizadas en tiempo real.", color: "bg-[#FFCC00]", text: "text-[#001A5C]" },
  { icon: Zap, title: "Transferencias Rápidas", desc: "El dinero llega en cuestión de minutos.", color: "bg-[#0033A0]", text: "text-white" },
  { icon: Shield, title: "Seguro y Confiable", desc: "Operaciones 100% protegidas y verificadas.", color: "bg-[#CF142B]", text: "text-white" },
  { icon: Heart, title: "Atención Personalizada", desc: "Equipo amable listo para ayudarte.", color: "bg-[#FFCC00]", text: "text-[#001A5C]" },
  { icon: Award, title: "Años de Experiencia", desc: `Más de ${calculateYears()} años en el mercado.`, color: "bg-[#0033A0]", text: "text-white" },
  { icon: Users, title: "Miles de Clientes", desc: "Miles de familias confían en nosotros.", color: "bg-[#CF142B]", text: "text-white" },
];

export function Benefits() {
  return (
    <section className="relative py-20 px-6 bg-white overflow-hidden">
      <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-[#FFCC00] blur-3xl opacity-10" />
      <div className="absolute bottom-20 left-0 h-96 w-96 rounded-full bg-[#CF142B] blur-3xl opacity-10" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <span className="inline-block rounded-full bg-[#CF142B] text-white px-4 py-1.5 text-xs tracking-wider shadow">
            🚀 TRANSFERENCIAS RÁPIDAS
          </span>
          <h2 className="mt-4">
            ¿Por qué los chamos nos <span className="text-[#0033A0]">prefieren</span>?
          </h2>
          <p className="mt-3 text-gray-600">Miles de familias venezolanas confían en Los Chamos para sus envíos.</p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it) => (
            <div key={it.title} className="group bg-white rounded-2xl border-2 border-gray-100 p-6 hover:border-[#FFCC00] hover:shadow-xl transition">
              <div className={`${it.color} ${it.text} h-12 w-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition`}>
                <it.icon className="h-6 w-6" />
              </div>
              <h4 className="mt-4">{it.title}</h4>
              <p className="mt-1 text-sm text-gray-600">{it.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1713942590392-598b193afb1a?w=683&h=455&fit=crop&auto=format&q=80"
              alt="Familia venezolana feliz"
              width="683"
              height="455"
              className="w-full h-full object-cover min-h-[260px]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0033A0]/60 to-transparent" />
            <div className="absolute top-4 left-4 text-3xl">🇻🇪</div>
          </div>
          <div className="bg-gradient-to-br from-[#001A5C] via-[#0033A0] to-[#00247D] text-white p-8 flex items-center gap-4 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-[#FFCC00]/20 blur-2xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[#CF142B]/20 blur-2xl" />
            <div className="relative flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-[#FFCC00] flex items-center justify-center flex-shrink-0 shadow-lg">
                <CheckCircle2 className="h-7 w-7 text-[#001A5C]" />
              </div>
              <div>
                <div>100% Seguro y Regulado 🛡️</div>
                <p className="text-sm text-white/80 mt-1">
                  Cumplimos con todas las regulaciones y protocolos de seguridad financiera para proteger a tu familia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
