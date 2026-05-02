import { MapPin, Clock, Phone, Mail, Send } from "lucide-react";
import { useState } from "react";

const info = [
  { icon: MapPin, title: "Dirección", text: "Cra 21 43-40 Av Los Molinos, Dosquebradas, Risaralda", color: "bg-[#FFCC00] text-[#001A5C]" },
  { icon: Clock, title: "Horario", text: "L-S: 8am-8:30pm | D: 8am-5pm", color: "bg-[#0033A0] text-white" },
  { icon: Phone, title: "Teléfono", text: "+57 302 341 4813", color: "bg-[#CF142B] text-white" },
  { icon: Mail, title: "Email", text: "hola@loschamos.com", color: "bg-[#FFCC00] text-[#001A5C]" },
];

export function Visit() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleWhatsApp = () => {
    let msg = "Hola, me gustaría cotizar un envío de dinero.";
    if (name && amount) {
      msg = `¡EPA CHAMO! Soy ${name} y quiero enviar $${amount} COP. ¿Me ayudas con la cotización?`;
    } else if (name) {
      msg = `¡EPA CHAMO! Soy ${name} y me gustaría cotizar un envío de dinero.`;
    } else if (amount) {
      msg = `¡EPA CHAMO! Quiero enviar $${amount} COP. ¿Me ayudas con la cotización?`;
    }

    window.open(`https://wa.me/573023414813?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section className="relative py-20 px-6 bg-gradient-to-b from-[#FFF9E6] to-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <span className="inline-block rounded-full bg-[#FFCC00] text-[#001A5C] px-4 py-1.5 text-xs tracking-wider shadow">
            📍 VISÍTANOS
          </span>
          <h2 className="mt-4">
            Estamos <span className="text-[#CF142B]">Cerca</span> de <span className="text-[#0033A0]">Ti</span>
          </h2>
          <p className="mt-3 text-gray-600">Atención personalizada y cálida, como en casa.</p>
        </div>

        <div className="mt-12 grid md:grid-cols-4 gap-5">
          {info.map((i) => (
            <div key={i.title} className="bg-white rounded-2xl p-5 text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition border border-gray-100">
              <div className={`mx-auto h-12 w-12 rounded-xl ${i.color} flex items-center justify-center shadow-lg`}>
                <i.icon className="h-6 w-6" />
              </div>
              <div className="mt-3">{i.title}</div>
              <div className="mt-1 text-sm text-gray-600">{i.text}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6 items-stretch">
          <div className="rounded-3xl overflow-hidden shadow-2xl min-h-[320px] md:min-h-full relative group bg-gray-100">
            <iframe
              src="https://maps.google.com/maps?q=Cra%2021%2043-40,%20Dosquebradas,%20Risaralda&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen={false}
              loading="lazy"
              title="Ubicación Cambios Los Chamos"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="relative rounded-3xl overflow-hidden p-8 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#001A5C] via-[#0033A0] to-[#00247D]" />
            <div className="absolute top-0 inset-x-0 h-1.5 flex">
              <div className="flex-1 bg-[#FFCC00]" />
              <div className="flex-1 bg-[#0033A0]" />
              <div className="flex-1 bg-[#CF142B]" />
            </div>
            <div className="relative text-white">
              <h4>¿Listo para Enviar Dinero? 💸</h4>
              <p className="mt-2 text-sm text-white/80">
                Contacta con nuestro equipo o visítanos para iniciar tu envío.
              </p>
              <div className="mt-6 space-y-3">
                <label className="block">
                  <span className="text-xs text-white/70">Tu nombre</span>
                  <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm outline-none focus:border-[#FFCC00] placeholder:text-white/40" placeholder="Nombre completo" />
                </label>
                <label className="block">
                  <span className="text-xs text-white/70">Monto a enviar (COP)</span>
                  <input value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1 w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm outline-none focus:border-[#FFCC00] placeholder:text-white/40" placeholder="$ 200.000 COP" />
                </label>
              </div>
              <button onClick={handleWhatsApp} className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FFCC00] to-[#FFB800] text-[#001A5C] hover:scale-[1.02] transition py-3 shadow-lg">
                <Send className="h-4 w-4" /> Cotizar Envío
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
