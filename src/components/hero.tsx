import React, { useState, useEffect } from "react";
import { Send, Menu, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  const [amountCop, setAmountCop] = useState<string>("200000");
  const [rate, setRate] = useState<number>(0.02512);
  const [loadingRate, setLoadingRate] = useState<boolean>(true);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const apiUrl = import.meta.env?.VITE_API_URL || 'http://localhost:3000';
        const res = await fetch(`${apiUrl}/exchange-rate/public-current`);
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.rate && json.data.rate.buyRate) {
            setRate(parseFloat(json.data.rate.buyRate));
          }
        }
      } catch (err) {
        console.error("Error fetching rate", err);
      } finally {
        setLoadingRate(false);
      }
    };
    fetchRate();
  }, []);

  const handleCopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setAmountCop(val);
  };

  const bsAmount = (Number(amountCop) * rate).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const formattedCop = Number(amountCop).toLocaleString('es-CO');
  return (
    <header className="relative overflow-hidden text-white">
      {/* Venezuelan flag gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00247D] via-[#0033A0] to-[#001A5C]" />
      <div className="absolute inset-0 opacity-70">
        <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-[#FFCC00] blur-[120px] opacity-40" />
        <div className="absolute top-1/3 -left-32 h-[400px] w-[400px] rounded-full bg-[#CF142B] blur-[120px] opacity-50" />
        <div className="absolute bottom-0 right-1/4 h-[350px] w-[350px] rounded-full bg-[#FFCC00] blur-[100px] opacity-30" />
      </div>

      {/* Stars pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-yellow-300 animate-pulse"
            style={{
              top: `${(i * 37) % 100}%`,
              left: `${(i * 53) % 100}%`,
              width: `${8 + (i % 3) * 4}px`,
              height: `${8 + (i % 3) * 4}px`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <nav className="relative max-w-7xl mx-auto flex items-center justify-between px-6 pt-4 pb-0 z-10">
        <div className="flex items-center">
          <img src="/LogoLosChamos.avif" alt="Cambios Los Chamos" className="w-48 md:w-64 lg:w-[280px] h-auto object-contain -mb-10 -mt-[4.5rem]" />
        </div>
        <ul className="hidden md:flex items-center gap-8 text-sm text-white/80">
          <a href="#" className="hover:text-[#FFCC00] cursor-pointer transition">Inicio</a>
          <a href="#tasas" className="hover:text-[#FFCC00] cursor-pointer transition">Tasas</a>
          <a href="#como-funciona" className="hover:text-[#FFCC00] cursor-pointer transition">¿Cómo funciona?</a>
          <a href="#contacto" className="hover:text-[#FFCC00] cursor-pointer transition">Contacto</a>
        </ul>
        <button className="md:hidden">
          <Menu className="h-6 w-6" />
        </button>
        <a href="https://wa.me/573023414813?text=Hola,%20quiero%20hacer%20un%20env%C3%ADo%20con%20Cambios%20Los%20Chamos" target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FFCC00] to-[#FFB800] hover:from-[#FFB800] hover:to-[#FF9900] text-[#001A5C] transition px-5 py-2 text-sm shadow-lg">
          Enviar Ahora
        </a>
      </nav>

      <div className="relative max-w-7xl mx-auto px-6 pt-0 pb-28 grid md:grid-cols-2 gap-12 items-center md:-mt-12 lg:-mt-16">
        <div>
          {/* Venezuelan flag mini */}
          <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 backdrop-blur px-4 py-1.5">
            <div className="flex rounded-sm overflow-hidden shadow h-4 w-6">
              <div className="flex-1 bg-[#FFCC00]" />
              <div className="flex-1 bg-[#0033A0] flex items-center justify-center">
                <span className="text-[6px]">★</span>
              </div>
              <div className="flex-1 bg-[#CF142B]" />
            </div>
            <span className="text-xs tracking-wider text-[#FFCC00]">¡EPA CHAMO! CAMBIOS SEGUROS 🇻🇪</span>
          </div>

          <h1 className="mt-5 leading-tight">
            Envía dinero a
            <br />
            <span className="bg-gradient-to-r from-[#FFCC00] via-[#FFDD44] to-[#FFCC00] bg-clip-text text-transparent drop-shadow">
              Venezuela
            </span>
            <span className="text-[#CF142B]">.</span>
          </h1>
          <p className="mt-4 text-white/80 max-w-md">
            Con <span className="text-[#FFCC00]">Cambios Los Chamos</span> envías dinero a tu familia en Venezuela de forma rápida, segura y con las mejores tasas del mercado. ¡Así de fácil, chamo!
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button onClick={() => window.scrollTo({top: 300, behavior: 'smooth'})} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FFCC00] to-[#FFB800] text-[#001A5C] hover:scale-105 transition px-6 py-3 shadow-xl">
              <Send className="h-4 w-4" /> Cotizar Hoy
            </button>
            <a href="#tasas" className="inline-flex items-center gap-2 rounded-full border-2 border-[#CF142B] bg-[#CF142B]/20 hover:bg-[#CF142B]/40 transition px-6 py-3">
              Ver Tasas 🇻🇪
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            <Stat value={`${new Date().getFullYear() - 2019}+`} label="Años de experiencia" color="text-[#FFCC00]" />
            <Stat value="50K+" label="Familias felices" color="text-white" />
            <Stat value="99%" label="Satisfacción" color="text-[#FFCC00]" />
          </div>
        </div>

        <div className="relative">
          {/* Decorative flag stripes behind card */}
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#FFCC00] via-[#0033A0] to-[#CF142B] opacity-30 blur-xl" />

          <div className="relative mx-auto max-w-sm rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 shadow-2xl">
            {/* Flag accent at top */}
            <div className="flex rounded-full overflow-hidden h-1 mb-5 -mx-2">
              <div className="flex-1 bg-[#FFCC00]" />
              <div className="flex-1 bg-[#0033A0]" />
              <div className="flex-1 bg-[#CF142B]" />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">Envías desde Colombia</span>
              <span className="text-xs rounded-full bg-white/20 text-white px-2 py-0.5">🇨🇴 COP</span>
            </div>
            <div className="relative mt-2 tracking-tight flex items-center bg-white/5 hover:bg-white/10 border border-white/20 focus-within:border-[#FFCC00] rounded-xl px-4 py-2.5 transition group">
              {/* Subtle background pulse */}
              <div className="absolute inset-0 bg-[#FFCC00]/5 animate-pulse group-focus-within:hidden pointer-events-none rounded-xl" />
              
              <span className="mr-2 text-[#FFCC00] relative z-10">$</span>
              <input 
                type="text" 
                value={formattedCop} 
                onChange={handleCopChange}
                className="bg-transparent border-none text-[#FFCC00] tracking-tight w-full focus:outline-none focus:ring-0 text-2xl md:text-3xl font-bold placeholder-white/30 p-0 relative z-10"
                placeholder="0"
              />
              
              {/* Blinking cursor explicitly telling the brain 'type here' */}
              <div className="w-[3px] h-7 bg-[#FFCC00] animate-[pulse_1s_ease-in-out_infinite] rounded-full ml-1 opacity-80 group-focus-within:hidden pointer-events-none relative z-10" />
            </div>
            <div className="h-px bg-white/20 my-5" />
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">Recibe en Venezuela</span>
              <span className="text-xs rounded-full bg-[#FFCC00]/30 text-[#FFCC00] px-2 py-0.5">🇻🇪 Bs</span>
            </div>
            <div className="mt-2 tracking-tight text-[#FFCC00] text-xl">Bs. {loadingRate ? "..." : bsAmount}</div>
            <div className="mt-2 text-xs text-white/60">Tasa: 1 COP = {loadingRate ? "..." : rate.toString().replace('.', ',')} Bs</div>
            <button onClick={() => window.open(`https://wa.me/573023414813?text=${encodeURIComponent(`¡EPA CHAMO! Quiero enviar COP $${formattedCop} para recibir Bs. ${bsAmount}.`)}`, '_blank')} className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#CF142B] via-[#FFCC00] to-[#0033A0] hover:brightness-110 transition py-3 shadow-lg">
              Enviar ahora ✨
            </button>

            <div className="mt-4 flex items-center gap-2 text-xs text-white/60 justify-center">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              Entrega en minutos
            </div>
          </div>

          {/* Floating Venezuela card */}
          <div className="absolute -top-6 -right-2 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FFCC00] rotate-6 hover:rotate-0 transition hidden md:block">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1724711603891-ca4557b9f40f?w=300"
              alt="Caracas Venezuela"
              className="h-28 w-28 object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-4 rounded-2xl overflow-hidden shadow-2xl border-4 border-[#CF142B] -rotate-6 hover:rotate-0 transition hidden md:block">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1758525865438-385dbc8caa5e?w=300"
              alt="Familia feliz"
              className="h-24 w-24 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Flag stripe at bottom */}
      <div className="relative flex h-2 w-full">
        <div className="flex-1 bg-[#FFCC00]" />
        <div className="flex-1 bg-[#0033A0]" />
        <div className="flex-1 bg-[#CF142B]" />
      </div>
    </header>
  );
}

function Stat({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div>
      <div className={color}>{value}</div>
      <div className="text-xs text-white/70 mt-1">{label}</div>
    </div>
  );
}
