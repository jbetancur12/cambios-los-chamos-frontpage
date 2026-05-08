import React, { useState, useEffect, useCallback, useMemo } from "react"
import { ShoppingBag, Plus, Minus, X, ShoppingCart, Package, Search, ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react"

interface ProductPresentation {
  id: string
  name: string
  quantity: number
  sellingPrice: number
}

interface Product {
  id: string
  name: string
  description?: string
  sellingPrice: number
  stock: number
  imageUrl?: string
  presentations?: ProductPresentation[]
}

interface CartItem {
  product: Product
  presentation?: ProductPresentation
  quantity: number
}

const CART_KEY = "loschamos_cart"
const PAGE_SIZE = 12

const API_URL = import.meta.env?.PUBLIC_API_URL || "http://localhost:3000"

function getItemKey(item: CartItem): string {
  return item.presentation
    ? `${item.product.id}-${item.presentation.id}`
    : item.product.id
}

function getEffectiveStock(product: Product, presentation?: ProductPresentation): number {
  return presentation
    ? Math.floor(product.stock / presentation.quantity)
    : product.stock
}

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

function imgUrl(product: Product): string | undefined {
  return product.imageUrl ? `${API_URL}${product.imageUrl}` : undefined
}

export function Products({ initialProducts }: { initialProducts?: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts || [])
  const [loading, setLoading] = useState(!initialProducts)
  const [cart, setCart] = useState<CartItem[]>(loadCart)
  const [cartOpen, setCartOpen] = useState(false)
  const [imgs, setImgs] = useState<Record<string, boolean>>({})
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(0)

  useEffect(() => {
    if (initialProducts) return
    fetch(`${API_URL}/inventory/products/public`)
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

  const query = search.toLowerCase().trim()
  const filtered = useMemo(
    () => (query ? products.filter((p) => p.name.toLowerCase().includes(query) || (p.description || "").toLowerCase().includes(query)) : products),
    [products, query]
  )
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages - 1)
  const paged = filtered.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE)

  const cartCount = cart.reduce((a, i) => a + i.quantity, 0)

  const addToCart = useCallback((product: Product, presentation?: ProductPresentation) => {
    const effectiveStock = getEffectiveStock(product, presentation)
    if (effectiveStock <= 0) return
    const key = presentation ? `${product.id}-${presentation.id}` : product.id
    setCart((prev) => {
      const existing = prev.find((i) => getItemKey(i) === key)
      if (existing) {
        return prev.map((i) =>
          getItemKey(i) === key ? { ...i, quantity: Math.min(i.quantity + 1, effectiveStock) } : i
        )
      }
      return [...prev, { product, presentation, quantity: 1 }]
    })
  }, [])

  const updateQty = useCallback((key: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (getItemKey(i) !== key) return i
          const next = i.quantity + delta
          if (next <= 0) return null
          const max = getEffectiveStock(i.product, i.presentation)
          if (next > max) return { ...i, quantity: max }
          return { ...i, quantity: next }
        })
        .filter(Boolean) as CartItem[]
    )
  }, [])

  const sendOrder = () => {
    if (cart.length === 0) return
    const lines = cart.map((i, idx) => {
      const label = i.presentation
        ? `${i.product.name} — ${i.presentation.name}`
        : i.product.name
      const price = i.presentation ? i.presentation.sellingPrice : i.product.sellingPrice
      return `${idx + 1}. ${label} x${i.quantity} = ${formatPrice(price * i.quantity)}`
    })
    const total = cart.reduce((a, i) => {
      const price = i.presentation ? i.presentation.sellingPrice : i.product.sellingPrice
      return a + price * i.quantity
    }, 0)
    const msg = encodeURIComponent(
      `¡Hola! Quiero hacer un pedido:\n\n${lines.join("\n")}\n\nTotal: ${formatPrice(total)}`
    )
    window.open(`https://wa.me/573023414813?text=${msg}`, "_blank")
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(0)
  }

  if (loading) {
    return (
      <section className="relative py-20 px-6 bg-gradient-to-b from-white to-[#FFF9E6]">
        <div className="max-w-7xl mx-auto text-center text-gray-400">Cargando productos...</div>
      </section>
    )
  }

  return (
    <section className="relative py-16 md:py-20 px-6 bg-gradient-to-b from-white to-[#FFF9E6] overflow-hidden">
      <div className="absolute top-40 right-0 h-96 w-96 rounded-full bg-[#FFCC00] blur-3xl opacity-10" />
      <div className="absolute bottom-40 left-0 h-96 w-96 rounded-full bg-[#CF142B] blur-3xl opacity-10" />

      <div className="relative max-w-7xl mx-auto">
        {/* Search */}
        <div className="max-w-md mx-auto relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Buscar productos..."
            className="w-full rounded-full border-2 border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:border-[#FFCC00] transition placeholder:text-gray-400"
          />
          {query && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Product grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paged.map((product) => {
            const url = imgUrl(product)
            const hasPresentations = product.presentations && product.presentations.length > 0

            return (
              <div key={product.id} className="group bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:border-[#FFCC00] hover:shadow-xl transition flex flex-col">
                <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
                  {url && imgs[product.id] !== false ? (
                    <img
                      src={url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      onError={() => setImgs((prev) => ({ ...prev, [product.id]: false }))}
                    />
                  ) : (
                    <img src={FALLBACK_IMG} alt="" className="w-full h-full object-cover" />
                  )}
                  {product.stock <= 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-white text-gray-700 px-3 py-1 rounded-full text-xs font-bold shadow">
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

                  <div className="mt-auto pt-3">
                    {hasPresentations ? (
                      <div className="flex flex-wrap gap-1.5">
                        {product.presentations!.map((pp) => {
                          const effectiveStock = getEffectiveStock(product, pp)
                          const key = `${product.id}-${pp.id}`
                          const inCart = cart.find((i) => getItemKey(i) === key)
                          const inCartQty = inCart?.quantity || 0
                          const atLimit = inCartQty >= effectiveStock
                          return inCartQty > 0 ? (
                            <div key={pp.id} className="inline-flex items-center gap-0.5 rounded-full bg-[#001A5C] text-white pl-2.5 pr-1 py-0.5 text-xs font-medium shadow-sm">
                              <span className="truncate max-w-[80px]">{pp.name}</span>
                              <span className="opacity-70 mx-0.5">·</span>
                              <button onClick={() => updateQty(key, -1)} className="hover:bg-white/20 rounded-full p-0.5 transition">
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="min-w-[14px] text-center">{inCartQty}</span>
                              <button onClick={() => updateQty(key, 1)} disabled={atLimit} className="hover:bg-white/20 rounded-full p-0.5 disabled:opacity-30 transition">
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          ) : (
                            <button
                              key={pp.id}
                              onClick={() => addToCart(product, pp)}
                              disabled={effectiveStock <= 0}
                              className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 hover:border-[#FFCC00] hover:bg-[#FFF9E6] disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm"
                            >
                              <span className="truncate max-w-[80px]">{pp.name}</span>
                              <span className="text-[#001A5C] font-bold">{formatPrice(pp.sellingPrice)}</span>
                              <Plus className="h-3 w-3 text-gray-400 shrink-0" />
                            </button>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-[#001A5C]">{formatPrice(product.sellingPrice)}</div>
                        {(() => {
                          const key = product.id
                          const inCart = cart.find((i) => getItemKey(i) === key)
                          const inCartQty = inCart?.quantity || 0
                          const atLimit = inCartQty >= product.stock
                          return inCartQty > 0 ? (
                            <div className="flex items-center gap-1">
                              <button onClick={() => updateQty(key, -1)} className="h-7 w-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition">
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-5 text-center text-xs font-semibold">{inCartQty}</span>
                              <button onClick={() => updateQty(key, 1)} disabled={atLimit} className="h-7 w-7 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-30 flex items-center justify-center transition">
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToCart(product)}
                              disabled={product.stock <= 0}
                              className="h-10 w-10 rounded-xl bg-[#FFCC00] hover:bg-[#FFB800] disabled:bg-gray-200 disabled:cursor-not-allowed text-[#001A5C] flex items-center justify-center shadow-lg transition"
                            >
                              <Plus className="h-5 w-5" />
                            </button>
                          )
                        })()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {paged.length === 0 && (
          <div className="text-center text-gray-400 py-16">
            <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>{query ? "No encontramos productos con ese nombre" : "Próximamente más productos"}</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={safePage === 0}
              className="h-9 w-9 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`h-9 min-w-[2.25rem] rounded-xl text-sm font-semibold transition ${
                  i === safePage ? "bg-[#001A5C] text-white" : "border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={safePage >= totalPages - 1}
              className="h-9 w-9 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Cart FAB */}
      {cartCount > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#001A5C] text-white rounded-full px-5 py-3 shadow-2xl hover:bg-[#0033A0] transition"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="font-semibold">{cartCount}</span>
        </button>
      )}

      {/* Cart drawer */}
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
              {cart.map((item) => {
                const key = getItemKey(item)
                const url = imgUrl(item.product)
                const price = item.presentation ? item.presentation.sellingPrice : item.product.sellingPrice
                const effectiveStock = getEffectiveStock(item.product, item.presentation)
                const overStock = item.quantity > effectiveStock
                const label = item.presentation
                  ? `${item.product.name} — ${item.presentation.name}`
                  : item.product.name
                return (
                  <div key={key} className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center gap-3">
                      {url && imgs[item.product.id] !== false ? (
                        <img
                          src={url}
                          alt={item.product.name}
                          className="h-14 w-14 rounded-lg object-cover shrink-0"
                          onError={() => setImgs((prev) => ({ ...prev, [item.product.id]: false }))}
                        />
                      ) : (
                        <div className="h-14 w-14 rounded-lg bg-gray-200 flex items-center justify-center shrink-0">
                          <Package className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold truncate">{label}</div>
                        <div className="text-xs text-gray-500">{formatPrice(price)} c/u</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(key, -1)}
                          className="h-7 w-7 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(key, 1)}
                          disabled={item.quantity >= effectiveStock}
                          className="h-7 w-7 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-40 flex items-center justify-center transition"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    {overStock && (
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-red-500 bg-red-50 rounded-lg px-2 py-1">
                        <AlertTriangle className="h-3 w-3 shrink-0" />
                        Solo hay {effectiveStock} disponibles
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="border-t p-4 space-y-3">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-[#CF142B]">
                  {formatPrice(cart.reduce((a, i) => {
                    const price = i.presentation ? i.presentation.sellingPrice : i.product.sellingPrice
                    return a + price * i.quantity
                  }, 0))}
                </span>
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
