import { Package, ShoppingBag, Store, Wheat, Candy, Coffee } from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"

const categories = [
  { icon: Wheat, title: "Harina PAN", desc: "La auténtica harina de maíz para tus arepas, hallacas y tejeringos" },
  { icon: Candy, title: "Dulces Típicos", desc: "Golfeados, besitos de coco, conservas y más antojos venezolanos" },
  { icon: Coffee, title: "Café y Chocolate", desc: "Café de montaña venezolano y chocolate artesanal" },
  { icon: Package, title: "Imperdibles", desc: "Sardinas, mortadela, pasta, mayonesa y productos de aseo" },
]

export function Store() {
  return (
    <section className="relative py-20 px-6 bg-gradient-to-b from-white to-[#FFF9E6] overflow-hidden">
      <div className="absolute top-40 left-0 h-80 w-80 rounded-full bg-[#0033A0] blur-3xl opacity-5" />
      <div className="absolute bottom-40 right-0 h-80 w-80 rounded-full bg-[#CF142B] blur-3xl opacity-5" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <span className="inline-block rounded-full bg-[#0033A0] text-white px-4 py-1.5 text-xs tracking-wider shadow">
            🛒 TIENDA FÍSICA
          </span>
          <h2 className="mt-4">
            También traemos <span className="text-[#CF142B]">Venezuela</span> hasta ti
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Además de envíos de dinero, en nuestra tienda física encuentras productos venezolanos
            para que no extrañes los sabores de tu tierra.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <div key={cat.title} className="group bg-white rounded-2xl border-2 border-gray-100 p-6 hover:border-[#FFCC00] hover:shadow-xl transition text-center">
              <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-to-br from-[#FFCC00] to-[#FFB800] text-[#001A5C] flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                <cat.icon className="h-7 w-7" />
              </div>
              <h4 className="mt-4">{cat.title}</h4>
              <p className="mt-1 text-sm text-gray-600">{cat.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2">
          <div className="bg-gradient-to-br from-[#001A5C] via-[#0033A0] to-[#00247D] text-white p-8 md:p-10 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-[#FFCC00]/15 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-[#CF142B]/15 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-2">
                <Store className="h-6 w-6 text-[#FFCC00]" />
                <span className="text-[#FFCC00] font-semibold tracking-wide text-sm">VISÍTANOS</span>
              </div>
              <h3 className="mt-3 text-2xl md:text-3xl font-bold">
                Tienda Física de Productos Venezolanos
              </h3>
              <p className="mt-3 text-white/80 text-sm leading-relaxed">
                Harina PAN, dulces típicos, café, chocolate, imperdibles y mucho más.
                ¡Pregunta por nuestros combos especiales!
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-white/80">
                  <Store className="h-5 w-5 shrink-0 text-[#FFCC00]" />
                  <span>Cra 21 43-40 Av Los Molinos, Dosquebradas, Risaralda</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/80">
                  <Package className="h-5 w-5 shrink-0 text-[#FFCC00]" />
                  <span>Pregunta por nuestros combos y productos disponibles</span>
                </div>
              </div>
              <a
                href="https://wa.me/573023414813?text=Hola%2C%20quiero%20saber%20qu%C3%A9%20productos%20venezolanos%20tienen%20en%20su%20tienda%20f%C3%ADsica"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FFCC00] to-[#FFB800] text-[#001A5C] hover:scale-105 transition px-6 py-3 font-semibold shadow-lg no-underline"
              >
                <ShoppingBag className="h-4 w-4" /> Preguntar por Productos
              </a>
            </div>
          </div>
          <div className="relative min-h-[280px] md:min-h-full">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=800"
              alt="Productos venezolanos"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#0033A0]/20" />
          </div>
        </div>
      </div>
    </section>
  )
}
