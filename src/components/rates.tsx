import React, { useState, useEffect } from "react";
import { TrendingUp, RefreshCw } from "lucide-react";

export function Rates() {
  const [rates, setRates] = useState([
    { from: "🇨🇴 Colombia", to: "🇻🇪 Venezuela", rate: "...", detail: "Cargando...", highlight: true, color: "from-[#FFCC00] via-[#0033A0] to-[#CF142B]" },
    { from: "🇺🇸 USD", to: "🇻🇪 Venezuela", rate: "...", detail: "Cargando...", highlight: false, color: "from-[#0033A0] via-white to-[#CF142B]" },
  ]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("Recién actualizado");

  const fetchRates = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env?.PUBLIC_API_URL || 'http://localhost:3000';
      const res = await fetch(`${apiUrl}/exchange-rate/public-current`);
      if (res.ok) {
        const json = await res.json();
        const data = json.data?.rate;
        if (data) {
          setRates([
            { from: "🇨🇴 Colombia", to: "🇻🇪 Venezuela", rate: parseFloat(data.sellRate).toString().replace('.', ','), detail: `1 COP = ${parseFloat(data.sellRate).toString().replace('.', ',')} Bs`, highlight: true, color: "from-[#FFCC00] via-[#0033A0] to-[#CF142B]" },
            { from: "🇺🇸 USD", to: "🇻🇪 Venezuela", rate: parseFloat(data.bcv).toString().replace('.', ','), detail: `1 USD = ${parseFloat(data.bcv).toString().replace('.', ',')} Bs`, highlight: false, color: "from-[#0033A0] via-white to-[#CF142B]" },
          ]);
          setLastUpdated("Actualizado justo ahora");
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  return (
    <section id="tasas" className="relative py-20 px-6 bg-gradient-to-b from-[#FFF9E6] to-white overflow-hidden">
      <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-[#FFCC00] blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#0033A0] blur-3xl opacity-10" />

      <div className="relative max-w-7xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FFCC00] to-[#FFB800] text-[#001A5C] px-4 py-1.5 text-xs tracking-wider shadow">
          💰 TASAS ACTUALIZADAS EN VIVO
        </span>
        <h2 className="mt-4">
          Las Mejores <span className="text-[#0033A0]">Tasas</span> de <span className="text-[#CF142B]">COP a Bolívares</span>
        </h2>
        <p className="mt-3 text-gray-600">
          Especialistas en cambio de pesos colombianos a bolívares venezolanos. ¡Actualizadas en vivo!
        </p>

        <div className="mt-10 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {rates.map((r) => (
            <div
              key={r.from + r.to}
              className={`relative rounded-2xl border-2 p-6 text-left shadow-lg hover:shadow-2xl hover:-translate-y-1 transition group overflow-hidden ${r.highlight ? "bg-gradient-to-br from-[#001A5C] to-[#0033A0] text-white border-[#FFCC00] scale-105" : "bg-white border-transparent"
                }`}
            >
              <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${r.color}`} />
              {r.highlight && (
                <span className="absolute top-3 right-3 rounded-full bg-[#FFCC00] text-[#001A5C] text-xs px-2 py-0.5">⭐ POPULAR</span>
              )}
              <div className="flex items-center gap-2 text-sm">
                <span>{r.from}</span>
                <span className={r.highlight ? "text-[#FFCC00]" : "text-gray-400"}>→</span>
                <span>{r.to}</span>
              </div>
              <div className={`mt-6 tracking-tight text-3xl font-bold ${r.highlight ? "text-[#FFCC00]" : "bg-gradient-to-r from-[#0033A0] to-[#CF142B] bg-clip-text text-transparent"}`}>
                {r.rate}
              </div>
              <div className={`mt-1 text-sm ${r.highlight ? "text-white/80" : "text-gray-600"}`}>{r.detail}</div>
              <div className={`mt-4 flex items-center justify-between text-xs ${r.highlight ? "text-white/60" : "text-gray-400"}`}>
                <span>● {lastUpdated}</span>
                <span className="inline-flex items-center gap-1 text-green-500">
                  {loading ? <RefreshCw className="h-3 w-3 animate-spin text-gray-400" /> : <><TrendingUp className="h-3 w-3" /> En vivo</>}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button onClick={fetchRates} disabled={loading} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0033A0] text-white hover:bg-[#002570] transition px-5 py-2 text-sm shadow disabled:opacity-50">
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Actualizar tasas
        </button>
      </div>
    </section>
  );
}
