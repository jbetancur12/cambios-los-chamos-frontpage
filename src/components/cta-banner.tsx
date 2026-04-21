import { Phone } from "lucide-react";

export function CTABanner() {
  return (
    <section className="py-12 px-6 bg-white">
      <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden p-10 text-center text-white shadow-2xl">
        {/* Venezuelan flag gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFCC00] via-[#0033A0] to-[#CF142B]" />
        <div className="absolute inset-0 bg-black/10" />

        {/* Decorative stars */}
        <div className="absolute top-4 left-6 text-white/30 text-2xl">★</div>
        <div className="absolute top-8 right-10 text-white/30 text-xl">★</div>
        <div className="absolute bottom-6 left-10 text-white/30">★</div>
        <div className="absolute bottom-10 right-8 text-white/30 text-2xl">★</div>

        <div className="relative">
          <div className="inline-block text-4xl mb-2">🇻🇪</div>
          <h3>¿Necesitas hacer un giro ya, chamo?</h3>
          <p className="mt-2 text-white/90 max-w-xl mx-auto">
            Escríbenos y un Chamo te atiende al instante. ¡Tu familia recibe en minutos!
          </p>
          <div className="mt-6 flex gap-3 justify-center flex-wrap">
            <a href="https://wa.me/573023414813?text=Hola,%20necesito%20hacer%20un%20giro" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white text-[#0033A0] hover:bg-[#FFCC00] hover:text-[#001A5C] transition px-6 py-3 shadow-lg">
              <Phone className="h-4 w-4" /> Llámanos Ahora
            </a>
            <a href="#contacto" className="inline-flex items-center justify-center rounded-full border-2 border-white text-white hover:bg-white hover:text-[#0033A0] transition px-6 py-3">
              Ver Oficinas
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
