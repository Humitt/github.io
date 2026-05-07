<template>
  <section id="brand" class="brand section">
    <div class="container">
      <!-- Section header -->
      <div class="brand__header fade-up" ref="headerEl">
        <span class="section-label">La Marca</span>
        <div class="ruled-line"></div>
        <h2 class="section-title brand__title">
          <span class="brand__humitt">Hum<em>itt</em>.</span><br />
          <span class="brand__title-sub">El sabor que tarareas.</span>
        </h2>
      </div>

      <!-- Story grid -->
      <div class="brand__grid">
        <!-- Text column -->
        <div class="brand__copy fade-up" ref="copyEl">
          <div class="brand__word-block">
            <span class="brand__word-en">hum</span>
            <span class="brand__word-slash">/</span>
            <span class="brand__word-es">tararear</span>
          </div>
          <p>
            En inglés, <strong>hum</strong> significa tararear — ese zumbido suave e involuntario
            que alguien emite cuando algo le produce genuina felicidad. Eso es exactamente
            lo que queremos que sientas con cada bocado de nuestros productos.
          </p>
          <p>
            <strong>Humitt</strong> nació en Nuevo León con una misión simple:
            traer lo mejor de la tradición norteña en formato de botana portátil.
            Elaborada artesanalmente, sin conservadores artificiales, con carne
            de res seleccionada y sabores que van desde lo clásico hasta lo
            atrevidamente picante.
          </p>
          <p>
            Un snack para el rancho, para la ciudad, para la cantina y para la sala.
            Para la cerveza artesanal, para el mezcal, para el tequila
            y para compartir en familia.
          </p>
          <div class="brand__values">
            <div class="brand__value" v-for="v in values" :key="v.label">
              <span class="brand__value-icon">{{ v.icon }}</span>
              <span>{{ v.label }}</span>
            </div>
          </div>
        </div>

        <!-- Image column -->
        <div class="brand__visual fade-up" ref="visualEl">
          <div class="brand__img-frame">
            <img src="/assets/carne-seca.jpg" alt="Carne seca Humitt" class="brand__img" />
          </div>
          <!-- Hat decoration -->
          <div class="brand__hat" aria-hidden="true">
            <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 90 Q100 10 180 90 L195 100 Q100 115 5 100 Z" fill="currentColor"/>
              <ellipse cx="100" cy="100" rx="95" ry="18" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Stats bar -->
      <div class="brand__stats fade-up" ref="statsEl">
        <div class="brand__stat" v-for="s in stats" :key="s.label">
          <span class="brand__stat-number">{{ s.number }}</span>
          <span class="brand__stat-label">{{ s.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const headerEl = ref(null)
const copyEl = ref(null)
const visualEl = ref(null)
const statsEl = ref(null)

const values = [
  { icon: '🌾', label: 'Artesanal' },
  { icon: '🤠', label: 'Norteño' },
  { icon: '🍺', label: 'Para la cerveza' },
  { icon: '🏙️', label: 'Citadino' },
]

const stats = [
  { number: '3', label: 'Sabores únicos' },
  { number: '38g', label: 'Por bolsa' },
  { number: '100%', label: 'Artesanal' },
  { number: 'NL', label: 'Hecho en Nuevo León' },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible') })
    },
    { threshold: 0.15 }
  )
  ;[headerEl, copyEl, visualEl, statsEl].forEach((el, i) => {
    if (el.value) {
      el.value.style.transitionDelay = `${i * 120}ms`
      observer.observe(el.value)
    }
  })
})
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.brand {
  background: $color-bg-alt;
  position: relative;
  overflow: hidden;

  &__header {
    margin-bottom: $space-16;
  }

  &__title {
    font-size: clamp($text-4xl, 6vw, $text-6xl);
    line-height: 1.05;

    em { font-style: italic; }

    &-sub {
      display: block;
      font-size: clamp($text-xl, 3vw, $text-3xl);
      font-weight: 400;
      font-style: italic;
      color: $color-text-muted;
      margin-top: $space-2;
    }
  }

  &__humitt {
    font-family: 'IBM Plex Sans Condensed', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: clamp($text-4xl, 6vw, $text-6xl);
    line-height: 1.05;

    em {
      font-style: italic;
    }
  }

  // ── Grid ───────────────────────────────────────────────────────────────────
  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $space-16;
    align-items: center;
    margin-bottom: $space-20;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
      gap: $space-12;
    }
  }

  // ── Copy ───────────────────────────────────────────────────────────────────
  &__copy {
    p {
      color: $color-text-muted;
      line-height: 1.8;
      margin-bottom: $space-5;

      strong { color: $color-text; }
    }
  }

  &__word-block {
    display: inline-flex;
    align-items: baseline;
    gap: $space-2;
    margin-bottom: $space-6;
    padding: $space-3 $space-5;
    border: 1px solid $color-border;
    border-radius: $radius-sm;
  }

  &__word-en {
    font-family: $font-display;
    font-size: $text-2xl;
    font-style: italic;
    font-weight: 700;
  }

  &__word-slash {
    color: $color-text-muted;
    font-size: $text-xl;
  }

  &__word-es {
    font-size: $text-sm;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: $color-text-muted;
  }

  // ── Values ─────────────────────────────────────────────────────────────────
  &__values {
    display: flex;
    flex-wrap: wrap;
    gap: $space-3;
    margin-top: $space-6;
  }

  &__value {
    display: flex;
    align-items: center;
    gap: $space-2;
    padding: $space-2 $space-4;
    border: $border-thin;
    border-radius: $radius-full;
    font-size: $text-sm;
    color: $color-text-muted;
    background: $color-surface;
  }

  // ── Visual ─────────────────────────────────────────────────────────────────
  &__visual {
    position: relative;
  }

  &__img-frame {
    position: relative;
    border-radius: $radius-md;
    overflow: hidden;
    aspect-ratio: 4/5;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border: 1px solid $color-border;
      border-radius: $radius-md;
      pointer-events: none;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(15%);
    transition: filter $transition-slow;

    &:hover { filter: grayscale(0%); }
  }

  &__hat {
    position: absolute;
    bottom: -$space-8;
    right: -$space-8;
    width: 180px;
    color: $color-text;
    opacity: 0.05;
    pointer-events: none;

    svg { width: 100%; }
  }

  // ── Stats ──────────────────────────────────────────────────────────────────
  &__stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border: $border-thin;
    border-radius: $radius-md;
    background: $color-surface;
    overflow: hidden;

    @media (max-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: $space-8 $space-6;
    border-right: $border-thin;
    text-align: center;

    &:last-child { border-right: none; }
  }

  &__stat-number {
    font-family: $font-display;
    font-size: $text-3xl;
    font-weight: 700;
    line-height: 1;
    margin-bottom: $space-2;
  }

  &__stat-label {
    font-size: $text-xs;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: $color-text-muted;
  }
}
</style>
