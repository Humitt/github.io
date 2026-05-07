<template>
  <section id="places" class="places section">
    <div class="container">
      <!-- Header -->
      <div class="places__header fade-up" ref="headerEl">
        <span class="section-label">Encuéntranos</span>
        <div class="ruled-line"></div>
        <h2 class="section-title">Dónde Probar Humitt</h2>
        <p class="section-subtitle">
          Encuentra nuestra carne seca en estos puntos de venta y eventos especiales en Nuevo León.
        </p>
      </div>

      <div class="places__grid">
        <template v-for="(place, i) in places" :key="place.id">
          <!-- Clickable card (has mapsUrl) -->
          <a
            v-if="place.mapsUrl"
            :href="place.mapsUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="places__card places__card--link fade-up"
            :ref="el => placeEls[i] = el"
            :aria-label="`Ver ${place.name} en Google Maps`"
          >
            <!-- Photo -->
            <div class="places__card-img">
              <img :src="place.image" :alt="place.name" />
              <div class="places__card-overlay"></div>
              <span class="places__card-maps-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                Ver en Maps
              </span>
            </div>
            <!-- Body -->
            <div class="places__card-body">
              <span class="places__card-type">{{ place.type }}</span>
              <h3 class="places__card-name">{{ place.name }}</h3>
              <p class="places__card-location">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {{ place.location }}
              </p>
              <p class="places__card-desc">{{ place.description }}</p>
            </div>
          </a>

          <!-- Non-clickable card -->
          <div
            v-else
            class="places__card fade-up"
            :ref="el => placeEls[i] = el"
          >
            <!-- Photo -->
            <div class="places__card-img">
              <img :src="place.image" :alt="place.name" />
              <div class="places__card-overlay"></div>
            </div>
            <!-- Body -->
            <div class="places__card-body">
              <span class="places__card-type">{{ place.type }}</span>
              <h3 class="places__card-name">{{ place.name }}</h3>
              <p class="places__card-location">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {{ place.location }}
              </p>
              <p class="places__card-desc">{{ place.description }}</p>
            </div>
          </div>
        </template>
      </div>

      <!-- Banner: events -->
      <div class="places__cta fade-up" ref="ctaEl">
        <div class="places__cta-text">
          <span class="section-label" style="color: rgba(255,255,255,0.5)">Próximos Eventos</span>
          <p>¿Quieres encontrarnos en el siguiente mercado o evento?<br />Síguenos en Instagram para no perderte ninguno.</p>
        </div>
        <a
          href="https://www.instagram.com/humittmx"
          target="_blank"
          rel="noopener noreferrer"
          id="places-instagram-btn"
          class="places__cta-btn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
import { ref, onMounted } from 'vue'

const headerEl = ref(null)
const ctaEl = ref(null)
const placeEls = ref([])

const places = [
  {
    id: 'mercado-hnl',
    type: 'Evento',
    name: 'Mercado Hecho en Nuevo León',
    location: 'Nuevo León, México',
    description: 'Participamos activamente en el mercado que reúne lo mejor de los productores artesanales de Nuevo León. Un espacio para conocernos en persona y probar nuestra carne seca.',
    image: '/assets/evento1.jpg'
  },
  {
    id: 'cerveceria-fausto',
    type: 'Punto Fijo',
    name: 'Cervecería Fausto',
    location: 'Mitras Centro, Monterrey, NL',
    description: 'Tenemos presencia permanente en Cervecería Fausto en el corazón de Mitras Centro. El maridaje perfecto: cerveza artesanal y carne seca Humitt.',
    image: '/assets/fausto.jpg',
    mapsUrl: 'https://maps.app.goo.gl/b9AFJaAQCzEiFwVT7'
  }
]

onMounted(() => {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible') }),
    { threshold: 0.1 }
  )
  if (headerEl.value) observer.observe(headerEl.value)
  if (ctaEl.value) { ctaEl.value.style.transitionDelay = '300ms'; observer.observe(ctaEl.value) }
  placeEls.value.forEach((el, i) => {
    if (el) {
      el.style.transitionDelay = `${i * 160}ms`
      observer.observe(el)
    }
  })
})
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.places {
  background: $color-bg-alt;

  &__header {
    margin-bottom: $space-12;
  }

  // ── Grid ──────────────────────────────────────────────────────────────────
  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $space-6;
    margin-bottom: $space-12;

    @media (max-width: 720px) {
      grid-template-columns: 1fr;
    }
  }

  // ── Card ──────────────────────────────────────────────────────────────────
  &__card {
    border-radius: $radius-md;
    overflow: hidden;
    border: $border-thin;
    background: $color-surface;
    transition: transform $transition-base, box-shadow $transition-base;
    display: block;        // needed when rendered as <a>
    color: inherit;        // reset link color
    text-decoration: none;

    &:hover {
      transform: translateY(-4px);
      box-shadow: $shadow-lg;
    }

    &--link {
      cursor: pointer;
    }

    &-img {
      position: relative;
      aspect-ratio: 16/9;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: grayscale(25%);
        transition: filter $transition-slow, transform $transition-slow;
      }
    }

    &:hover &-img img {
      filter: grayscale(0%);
      transform: scale(1.03);
    }

    &-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent 60%);
    }

    &-maps-badge {
      position: absolute;
      bottom: $space-3;
      right: $space-3;
      display: inline-flex;
      align-items: center;
      gap: $space-1;
      background: rgba($color-bg-base, 0.72);
      color: $color-text;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.05em;
      padding: 4px $space-3;
      border-radius: $radius-full;
      backdrop-filter: blur(4px);
    }

    &-body {
      padding: $space-6;
    }

    &-type {
      font-size: $text-xs;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: $color-text-muted;
      display: block;
      margin-bottom: $space-2;
    }

    &-name {
      font-family: $font-display;
      font-size: $text-2xl;
      font-weight: 700;
      margin-bottom: $space-2;
    }

    &-location {
      display: flex;
      align-items: center;
      gap: $space-2;
      font-size: $text-sm;
      color: $color-text-muted;
      margin-bottom: $space-4;
    }

    &-desc {
      font-size: $text-sm;
      color: $color-text-muted;
      line-height: 1.7;
    }
  }

  // ── CTA Banner ────────────────────────────────────────────────────────────
  &__cta {
    background: $color-surface;
    border-radius: $radius-md;
    padding: $space-10 $space-12;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-8;
    color: $color-text;

    @media (max-width: 700px) {
      flex-direction: column;
      text-align: center;
      padding: $space-8;
    }

    &-text p {
      font-size: $text-lg;
      line-height: 1.7;
      opacity: 0.85;
    }

    &-btn {
      @include btn-base;
      background: $color-text;
      color: $color-bg-base;
      border: 1px solid $color-text;
      white-space: nowrap;
      flex-shrink: 0;
      gap: $space-2;

      &:hover {
        background: transparent;
        color: $color-text;
      }
    }
  }
}
</style>
