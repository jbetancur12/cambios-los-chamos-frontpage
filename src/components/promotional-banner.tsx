import React, { useState, useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface PromoSlide {
  image?: string
  video?: string
  gradient?: string
  title?: string
  subtitle?: string
  cta?: string
  ctaLink?: string
  emoji?: string
}

export function PromotionalBanner({ slides }: { slides: PromoSlide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 20 }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ])

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi])

  const defaultGradients = [
    'from-[#001A5C] to-[#0033A0]',
    'from-[#CF142B] to-[#8B0000]',
    'from-[#FFCC00] to-[#FF9900]',
  ]

  if (!slides.length) return null

  return (
    <section className="relative max-w-7xl mx-auto px-6 pt-2 pb-6 md:pb-8">
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-lg" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, i) => {
            const gradient = slide.gradient || defaultGradients[i % defaultGradients.length]
            const isDark = i % 3 !== 2

            return (
              <div key={i} className="relative min-w-0 shrink-0 grow-0 basis-full overflow-hidden">
                {slide.video ? (
                  <div className="relative h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px]">
                    <video
                      src={slide.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-10 lg:p-12">
                      <div className="max-w-xl">
                        {slide.emoji && (
                          <span className="text-2xl md:text-3xl mb-2 block">{slide.emoji}</span>
                        )}
                        <h3 className={`text-xl md:text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-[#001A5C]'}`}>
                          {slide.title}
                        </h3>
                        {slide.subtitle && (
                          <p className={`mt-1.5 text-sm md:text-base ${isDark ? 'text-white/80' : 'text-[#001A5C]/70'}`}>
                            {slide.subtitle}
                          </p>
                        )}
                        {slide.cta && (
                          <a
                            href={slide.ctaLink || '#'}
                            target={slide.ctaLink?.startsWith('http') ? '_blank' : undefined}
                            rel={slide.ctaLink?.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className={`mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold shadow-lg transition hover:scale-105 ${
                              isDark
                                ? 'bg-[#FFCC00] text-[#001A5C] hover:bg-[#FFB800]'
                                : 'bg-[#001A5C] text-white hover:bg-[#0033A0]'
                            }`}
                          >
                            {slide.cta}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ) : slide.image ? (
                  <div className="relative h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px]">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-10 lg:p-12">
                      <div className="max-w-xl">
                        {slide.emoji && (
                          <span className="text-2xl md:text-3xl mb-2 block">{slide.emoji}</span>
                        )}
                        <h3 className={`text-xl md:text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-[#001A5C]'}`}>
                          {slide.title}
                        </h3>
                        {slide.subtitle && (
                          <p className={`mt-1.5 text-sm md:text-base ${isDark ? 'text-white/80' : 'text-[#001A5C]/70'}`}>
                            {slide.subtitle}
                          </p>
                        )}
                        {slide.cta && (
                          <a
                            href={slide.ctaLink || '#'}
                            target={slide.ctaLink?.startsWith('http') ? '_blank' : undefined}
                            rel={slide.ctaLink?.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className={`mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold shadow-lg transition hover:scale-105 ${
                              isDark
                                ? 'bg-[#FFCC00] text-[#001A5C] hover:bg-[#FFB800]'
                                : 'bg-[#001A5C] text-white hover:bg-[#0033A0]'
                            }`}
                          >
                            {slide.cta}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`relative h-[200px] sm:h-[220px] md:h-[260px] lg:h-[300px] bg-gradient-to-br ${gradient} flex items-center`}>
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white blur-3xl" />
                      <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white blur-3xl" />
                    </div>
                    <div className="relative z-10 w-full p-6 md:p-10 lg:p-12">
                      <div className="max-w-xl">
                        {slide.emoji && (
                          <span className="text-3xl md:text-4xl mb-2 block">{slide.emoji}</span>
                        )}
                        <h3 className={`text-xl md:text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-[#001A5C]'}`}>
                          {slide.title}
                        </h3>
                        {slide.subtitle && (
                          <p className={`mt-1.5 text-sm md:text-base ${isDark ? 'text-white/80' : 'text-[#001A5C]/70'}`}>
                            {slide.subtitle}
                          </p>
                        )}
                        {slide.cta && (
                          <a
                            href={slide.ctaLink || '#'}
                            target={slide.ctaLink?.startsWith('http') ? '_blank' : undefined}
                            rel={slide.ctaLink?.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className={`mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold shadow-lg transition hover:scale-105 ${
                              isDark
                                ? 'bg-[#FFCC00] text-[#001A5C] hover:bg-[#FFB800]'
                                : 'bg-[#001A5C] text-white hover:bg-[#0033A0]'
                            }`}
                          >
                            {slide.cta}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canScrollPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center text-gray-700 hover:bg-white hover:scale-105 disabled:opacity-0 disabled:cursor-default transition-all z-20"
          aria-label="Anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canScrollNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center text-gray-700 hover:bg-white hover:scale-105 disabled:opacity-0 disabled:cursor-default transition-all z-20"
          aria-label="Siguiente"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`rounded-full transition-all ${
                i === selectedIndex
                  ? 'h-2.5 w-6 bg-[#FFCC00] shadow-md'
                  : 'h-2.5 w-2.5 bg-white/60 hover:bg-white/90'
              }`}
              aria-label={`Ir a slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
