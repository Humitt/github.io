<template>
  <section id="testimonials" class="testimonials section">
    <div class="container">
      <!-- Header -->
      <div class="testimonials__header fade-up" ref="headerEl">
        <span class="section-label">Opiniones</span>
        <div class="ruled-line"></div>
        <h2 class="section-title">Lo que dicen nuestros clientes</h2>
        <p class="section-subtitle">Próximamente publicaremos las opiniones reales de quienes ya probaron Humitt.</p>
      </div>

      <!-- Carousel -->
      <div class="testimonials__carousel fade-up" ref="carouselEl">
        <div class="testimonials__track" ref="track" @mousedown="startDrag" @touchstart.passive="startDragTouch">
          <div
            v-for="(t, i) in testimonials"
            :key="i"
            class="testimonials__slide"
            :class="{ active: currentIndex === i }"
          >
            <div class="testimonials__card">
              <!-- Stars -->
              <div class="testimonials__stars">
                <span v-for="s in 5" :key="s" :class="{ filled: s <= t.rating }">★</span>
              </div>
              <!-- Quote -->
              <blockquote class="testimonials__quote">{{ t.text }}</blockquote>
              <!-- Author -->
              <div class="testimonials__author">
                <div class="testimonials__avatar" :style="{ background: t.color }">
                  {{ t.initials }}
                </div>
                <div>
                  <p class="testimonials__name">{{ t.name }}</p>
                  <p class="testimonials__detail">{{ t.detail }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Controls -->
        <div class="testimonials__controls">
          <button id="testimonials-prev" class="testimonials__arrow" @click="prev" aria-label="Anterior">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          <div class="testimonials__dots">
            <button
              v-for="(t, i) in testimonials"
              :key="i"
              :id="`testimonials-dot-${i}`"
              class="testimonials__dot"
              :class="{ active: currentIndex === i }"
              @click="goTo(i)"
              :aria-label="`Ir al testimonio ${i + 1}`"
            ></button>
          </div>

          <button id="testimonials-next" class="testimonials__arrow" @click="next" aria-label="Siguiente">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Placeholder CTA -->
      <div class="testimonials__placeholder fade-up" ref="placeholderEl">
        <p>¿Ya probaste Humitt? Comparte tu experiencia en Instagram</p>
        <a
          href="https://www.instagram.com/humittmx"
          target="_blank"
          rel="noopener noreferrer"
          id="testimonials-ig-link"
          class="btn-outline"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
          @humittmx
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const headerEl = ref(null)
const carouselEl = ref(null)
const placeholderEl = ref(null)
const currentIndex = ref(0)

// Placeholder testimonials — replace with real ones
const testimonials = [
  {
    name: 'Tu nombre aquí',
    initials: 'TN',
    detail: 'Cliente Humitt',
    rating: 5,
    color: '#E8E8E8',
    text: '¡Espacio reservado para tu opinión! Pronto publicaremos los comentarios reales de nuestros clientes. Sé el primero en compartir tu experiencia con Humitt.'
  },
  {
    name: 'Próximamente',
    initials: 'PN',
    detail: 'Opinión verificada',
    rating: 5,
    color: '#F0F0F0',
    text: 'Aquí aparecerá la opinión de nuestros clientes una vez que tengamos retroalimentación real. ¡Gracias por tu paciencia!'
  },
  {
    name: 'Pronto',
    initials: 'PR',
    detail: 'Fan de Humitt',
    rating: 5,
    color: '#EBEBEB',
    text: 'Estamos construyendo nuestra comunidad de amantes de la carne seca artesanal. ¡Síguenos en @humittmx para estar al tanto!'
  }
]

function next() {
  currentIndex.value = (currentIndex.value + 1) % testimonials.length
}
function prev() {
  currentIndex.value = (currentIndex.value - 1 + testimonials.length) % testimonials.length
}
function goTo(i) {
  currentIndex.value = i
}

// Auto-advance
let interval = null
onMounted(() => {
  interval = setInterval(next, 5000)

  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible') }),
    { threshold: 0.1 }
  )
  ;[headerEl, carouselEl, placeholderEl].forEach((el, i) => {
    if (el.value) {
      el.value.style.transitionDelay = `${i * 150}ms`
      observer.observe(el.value)
    }
  })
})
onUnmounted(() => clearInterval(interval))

// Drag to swipe
let startX = 0
function startDrag(e) {
  startX = e.clientX
  const onUp = (up) => {
    const diff = startX - up.clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
    window.removeEventListener('mouseup', onUp)
  }
  window.addEventListener('mouseup', onUp)
}
function startDragTouch(e) {
  startX = e.touches[0].clientX
  const onEnd = (up) => {
    const diff = startX - up.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
    window.removeEventListener('touchend', onEnd)
  }
  window.addEventListener('touchend', onEnd)
}
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.testimonials {
  background: $color-bg-base;

  &__header {
    margin-bottom: $space-12;
    max-width: 560px;
  }

  // ── Carousel ──────────────────────────────────────────────────────────────
  &__carousel {
    position: relative;
    user-select: none;
    margin-bottom: $space-12;
  }

  &__track {
    display: grid;
    grid-template-columns: 1fr;
    cursor: grab;

    &:active { cursor: grabbing; }
  }

  &__slide {
    grid-column: 1;
    grid-row: 1;
    opacity: 0;
    transform: translateX(24px);
    transition: opacity 0.5s ease, transform 0.5s ease;
    pointer-events: none;

    &.active {
      opacity: 1;
      transform: translateX(0);
      pointer-events: auto;
    }
  }

  &__card {
    max-width: 700px;
    margin: auto;
    padding: $space-10 $space-12;
    border: $border-thin;
    border-radius: $radius-md;
    background: $color-surface;
    position: relative;

    &::before {
      content: '"';
      position: absolute;
      top: $space-4;
      left: $space-8;
      font-family: $font-display;
      font-size: 8rem;
      line-height: 1;
      color: rgba(255, 255, 255, 0.03);
      pointer-events: none;
    }

    @media (max-width: 600px) {
      padding: $space-6 $space-6;
    }
  }

  &__stars {
    display: flex;
    gap: 2px;
    margin-bottom: $space-5;
    font-size: $text-xl;

    span {
      color: $color-border-strong;
      &.filled { color: $color-text; }
    }
  }

  &__quote {
    font-family: $font-display;
    font-size: $text-xl;
    font-style: italic;
    line-height: 1.7;
    color: $color-text-muted;
    margin-bottom: $space-8;
  }

  &__author {
    display: flex;
    align-items: center;
    gap: $space-4;
  }

  &__avatar {
    width: 44px;
    height: 44px;
    border-radius: $radius-full;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: $text-sm;
    font-weight: 700;
    color: $color-bg-base; // Changed for contrast with author initials background
    flex-shrink: 0;
    border: $border-thin;
  }

  &__name {
    font-weight: 600;
    font-size: $text-sm;
    margin-bottom: 2px;
  }

  &__detail {
    font-size: $text-xs;
    color: $color-text-muted;
    letter-spacing: 0.05em;
  }

  // ── Controls ──────────────────────────────────────────────────────────────
  &__controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $space-5;
    margin-top: $space-8;
  }

  &__arrow {
    width: 40px;
    height: 40px;
    border-radius: $radius-full;
    border: $border-thin;
    background: $color-surface;
    cursor: pointer;
    @include flex-center;
    color: $color-text-muted;
    transition: all $transition-fast;

    &:hover {
      background: $color-text;
      border-color: $color-text;
      color: $color-bg-base;
    }
  }

  &__dots {
    display: flex;
    gap: $space-2;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: $radius-full;
    background: $color-border-strong;
    border: none;
    cursor: pointer;
    transition: all $transition-fast;

    &.active {
      background: $color-text;
      width: 24px;
    }
  }

  // ── Placeholder CTA ───────────────────────────────────────────────────────
  &__placeholder {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-6;
    padding: $space-6 $space-8;
    border: $border-thin;
    border-radius: $radius-md;
    background: $color-bg-alt;

    p {
      font-size: $text-base;
      color: $color-text-muted;
    }

    .btn-outline {
      display: flex;
      align-items: center;
      gap: $space-2;
      flex-shrink: 0;
    }

    @media (max-width: 600px) {
      flex-direction: column;
      text-align: center;
    }
  }
}
</style>
