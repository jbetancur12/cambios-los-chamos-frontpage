import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const COOKIE_CONSENT_KEY = 'loschamos_cookie_consent'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted')
    setVisible(false)
  }

  const reject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 pointer-events-none">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 pointer-events-auto animate-[slideUp_0.3s_ease-out]">
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🍪</span>
              <span className="font-semibold text-[#001A5C] text-sm">Uso de cookies</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Usamos cookies y herramientas similares para mejorar tu experiencia en nuestro sitio.
              Algunas son necesarias para el funcionamiento y otras nos ayudan a analizar el tráfico.
              No compartimos datos personales con terceros sin tu consentimiento.
              Consulta nuestra{' '}
              <a href="/tratamiento-datos-personales" className="text-[#0033A0] underline hover:text-[#CF142B] transition">
                Política de Privacidad
              </a>
              {' '}y{' '}
              <a href="/terminos-condiciones" className="text-[#0033A0] underline hover:text-[#CF142B] transition">
                Términos y Condiciones
              </a>.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={reject}
              className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
            >
              Rechazar
            </button>
            <button
              onClick={accept}
              className="px-4 py-2 text-xs font-bold text-[#001A5C] bg-[#FFCC00] hover:bg-[#FFB800] rounded-xl shadow transition"
            >
              Aceptar
            </button>
            <button
              onClick={reject}
              className="p-1.5 text-gray-400 hover:text-gray-600 transition"
              aria-label="Cerrar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
