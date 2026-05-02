import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer id="contacto" className="relative bg-[#001A5C] text-white/80 px-6 pt-16 pb-8 overflow-hidden">
      {/* Flag stripe at top */}
      <div className="absolute top-0 inset-x-0 h-1.5 flex">
        <div className="flex-1 bg-[#FFCC00]" />
        <div className="flex-1 bg-[#0033A0]" />
        <div className="flex-1 bg-[#CF142B]" />
      </div>

      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#CF142B] blur-3xl opacity-10" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#FFCC00] blur-3xl opacity-10" />

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div>
          <img src="/LogoLosChamos.avif" alt="Cambios Los Chamos" className="w-56 h-auto object-contain -ml-2 -mb-24 -mt-24" />
          <p className="mt-4 text-sm text-white/60 relative z-10">
            La plataforma favorita de los venezolanos para enviar dinero a casa. Rápido, seguro y pana total.
          </p>
          <div className="mt-5 flex gap-3">
            <SocialIcon Icon={Facebook} color="bg-[#0033A0]" />
            <SocialIcon Icon={Instagram} color="bg-[#CF142B]" />
            <SocialIcon Icon={Twitter} color="bg-[#FFCC00] text-[#001A5C]" />
          </div>
        </div>
        <FooterCol title="Enlaces Rápidos" items={["Inicio", "Tasas", "Cómo funciona", "Preguntas frecuentes"]} />
        <FooterCol title="Servicios" items={["Envío a Venezuela", "Cambio de divisas", "Pago de remesas", "Atención personalizada"]} />
        <div>
          <div className="text-[#FFCC00]">Contacto</div>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>📍 Cra 21 43-40 AV Los Molinos, Dosquebradas, Risaralda</li>
            <li>🕒 L - S: 8:00 AM a 8:30 PM <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;D: 8:00 AM a 5:00 PM</li>
            <li>📞 +57 302 341 4813</li>
            <li>✉️ hola@loschamos.com</li>
          </ul>
        </div>
      </div>
      <div className="relative max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 text-xs text-white/50 text-center space-y-2">
        <div>© 2026 Cambios Los Chamos. Todos los derechos reservados. Hecho con ❤️ para Venezuela 🇻🇪</div>

        {/* Nueva línea para vinculación legal con Inversiones R&M */}
        <div className="text-white/40">
          Cambios Los Chamos es una marca operada por <span className="font-semibold text-white/60">Inversiones R&M</span>.
        </div>

        <div>
          <a href="/tratamiento-datos-personales" className="text-white/40 hover:text-[#FFCC00] transition underline">
            Tratamiento de Datos Personales
          </a>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ Icon, color }: { Icon: typeof Facebook; color: string }) {
  return (
    <a className={`h-9 w-9 rounded-full ${color} hover:scale-110 transition flex items-center justify-center shadow-lg cursor-pointer`}>
      <Icon className="h-4 w-4" />
    </a>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="text-[#FFCC00]">{title}</div>
      <ul className="mt-4 space-y-2 text-sm text-white/70">
        {items.map((i) => (
          <li key={i} className="hover:text-[#FFCC00] cursor-pointer transition">{i}</li>
        ))}
      </ul>
    </div>
  );
}
