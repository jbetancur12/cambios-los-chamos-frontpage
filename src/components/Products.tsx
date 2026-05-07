import React, { useState, useEffect, useCallback } from "react"
import { ShoppingBag, Plus, Minus, X, ShoppingCart, Package, Store } from "lucide-react"

interface Product {
  id: string
  name: string
  description?: string
  sellingPrice: number
  stock: number
  imageUrl?: string
}

interface CartItem {
  product: Product
  quantity: number
}

const CART_KEY = "loschamos_cart"

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function formatPrice(n: number) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(n)
}

const FALLBACK_IMG = "data:image/svg+xml," + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
    <rect fill="#f3f4f6" width="400" height="300"/>
    <g transform="translate(200,150)">
      <circle fill="#d1d5db" r="40"/>
      <path fill="#d1d5db" d="M-50,30 C-50,10 -40,0 -20,0 L20,0 C40,0 50,10 50,30 L40,60 L-40,60 Z"/>
      <line x1="-30" y1="-10" x2="-15" y2="10" stroke="#9ca3af" stroke-width="3" stroke-linecap="round"/>
      <line x1="30" y1="-10" x2="15" y2="10" stroke="#9ca3af" stroke-width="3" stroke-linecap="round"/>
    </g>
    <text x="200" y="240" text-anchor="middle" fill="#9ca3af" font-family="sans-serif" font-size="14">Sin imagen</text>
  </svg>`
)

export function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState<CartItem[]>(loadCart)
  const [cartOpen, setCartOpen] = useState(false)
  const [images, setImages] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const apiUrl = import.meta.env?.PUBLIC_API_URL || "http://localhost:3000"
    fetch(`${apiUrl}/inventory/products/public`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setProducts(json.data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  const cartCount = cart.reduce((a, i) => a + i.quantity, 0)
  const cartTotal = cart.reduce((a, i) => a + i.product.sellingPrice * i.quantity, 0)

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: Math.min(i.quantity + 1, product.stock) } : i
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }, [])

  const updateQty = useCallback((id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.product.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i
        )
        .filter((i) => i.quantity > 0)
    )
  }, [])

  const sendOrder = () => {
    if (cart.length === 0) return
    const lines = cart.map(
      (i, idx) =>
        `${idx + 1}. ${i.product.name} x${i.quantity} = ${formatPrice(i.product.sellingPrice * i.quantity)}`
    )
    const msg = encodeURIComponent(
      `¡Hola! Quiero hacer un pedido:\n\n${lines.join("\n")}\n\nTotal: ${formatPrice(cartTotal)}`
    )
    window.open(`https://wa.me/573023414813?text=${msg}`, "_blank")
  }

  if (loading) {
    return (
      <section className="relative py-20 px-6 bg-gradient-to-b from-white to-[#FFF9E6]">
        <div className="max-w-7xl mx-auto text-center text-gray-400">Cargando productos...</div>
      </section>
    )
  }

  return (
    <section className="relative py-20 px-6 bg-gradient-to-b from-white to-[#FFF9E6] overflow-hidden">
      <div className="absolute top-40 right-0 h-96 w-96 rounded-full bg-[#FFCC00] blur-3xl opacity-10" />
      <div className="absolute bottom-40 left-0 h-96 w-96 rounded-full bg-[#CF142B] blur-3xl opacity-10" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <span className="inline-block rounded-full bg-[#CF142B] text-white px-4 py-1.5 text-xs tracking-wider shadow">
            🛒 PRODUCTOS VENEZOLANOS
          </span>
          <h2 className="mt-4">
            Nuestra <span className="text-[#0033A0]">Tienda</span>
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Llevamos los sabores de Venezuela a tu mesa. Harina PAN, dulces, café y mucho más.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:border-[#FFCC00] hover:shadow-xl transition flex flex-col">
              <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
                {product.imageUrl ? (
                  <img
                    src={images[product.id] === false ? FALLBACK_IMG : product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    onError={() => setImages((prev) => ({ ...prev, [product.id]: false }))}
                  />
                ) : (
                  <img src={FALLBACK_IMG} alt="" className="w-full h-full object-cover" />
                )}
                {product.stock <= 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-white text-gray-700 px-3 py-1 rounded-full text-xs font-bold">
                      Agotado
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h4 className="text-sm md:text-base font-semibold text-gray-800 line-clamp-2">{product.name}</h4>
                {product.description && (
                  <p className="mt-1 text-xs text-gray-500 line-clamp-2">{product.description}</p>
                )}
                <div className="mt-auto pt-3 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-[#001A5C]">{formatPrice(product.sellingPrice)}</div>
                    <div className={`text-xs ${product.stock > 5 ? "text-green-600" : product.stock > 0 ? "text-orange-500" : "text-red-500"}`}>
                      {product.stock > 0 ? `${product.stock} en stock` : "Agotado"}
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    disabled={product.stock <= 0}
                    className="h-10 w-10 rounded-xl bg-[#FFCC00] hover:bg-[#FFB800] disabled:bg-gray-200 disabled:cursor-not-allowed text-[#001A5C] flex items-center justify-center shadow-lg transition"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center text-gray-400 py-20">
            <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Próximamente más productos</p>
          </div>
        )}
      </div>

      {cartCount > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#001A5C] text-white rounded-full px-5 py-3 shadow-2xl hover:bg-[#0033A0] transition"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="font-semibold">{cartCount}</span>
        </button>
      )}

      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2 font-bold text-lg">
                <ShoppingCart className="h-5 w-5 text-[#FFCC00]" />
                Pedido
              </div>
              <button onClick={() => setCartOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg transition">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                  {item.product.imageUrl && images[item.product.id] !== false ? (
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="h-14 w-14 rounded-lg object-cover shrink-0"
                      onError={() => setImages((prev) => ({ ...prev, [item.product.id]: false }))}
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-lg bg-gray-200 flex items-center justify-center shrink-0">
                      <Package className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{item.product.name}</div>
                    <div className="text-xs text-gray-500">{formatPrice(item.product.sellingPrice)} c/u</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.product.id, -1)}
                      className="h-7 w-7 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.product.id, 1)}
                      disabled={item.quantity >= item.product.stock}
                      className="h-7 w-7 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-40 flex items-center justify-center transition"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t p-4 space-y-3">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-[#CF142B]">{formatPrice(cartTotal)}</span>
              </div>
              <button
                onClick={sendOrder}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FFCC00] to-[#FFB800] text-[#001A5C] hover:scale-[1.02] transition py-3 font-bold shadow-lg"
              >
                <ShoppingBag className="h-5 w-5" /> Enviar Pedido por WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
