<template>
  <section id="home" class="hero">
    <!-- Background image -->
    <div class="hero__bg">
      <img src="/assets/Presentacion.png" alt="Humitt carne seca artesanal" class="hero__bg-img" />
      <div class="hero__overlay"></div>
    </div>

    <!-- Content -->
    <div class="hero__content container">
      <div class="hero__text">
        <span class="hero__eyebrow fade-up" ref="el1">Nuevo León · Hecho en México</span>
        <h1 class="hero__title fade-up" ref="el2">
          HUMITT
        </h1>
        <p class="hero__tagline fade-up" ref="el3">
          <span class="hero__tagline-line1">CARNE SECA</span>
          <span class="hero__tagline-line2">BOTANA ARTESANAL</span>
        </p>
        <div class="hero__actions fade-up" ref="el4">
          <a href="#products" class="btn-primary" @click.prevent="scrollTo('products')" id="hero-cta-products">
            Ver Productos
          </a>
          <a href="#brand" class="btn-ghost hero__learn" @click.prevent="scrollTo('brand')" id="hero-cta-brand">
            Nuestra Historia
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Decorative hat -->
      <div class="hero__hat-deco" aria-hidden="true">
        <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 90 Q100 10 180 90 L195 100 Q100 115 5 100 Z" fill="currentColor"/>
          <ellipse cx="100" cy="100" rx="95" ry="18" fill="currentColor"/>
          <path d="M50 88 Q100 60 150 88" stroke="white" stroke-width="2" fill="none" opacity="0.3"/>
        </svg>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="hero__scroll" aria-hidden="true">
      <span></span>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const el1 = ref(null)
const el2 = ref(null)
const el3 = ref(null)
const el4 = ref(null)

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  const els = [el1.value, el2.value, el3.value, el4.value]
  els.forEach((el, i) => {
    if (el) {
      setTimeout(() => el.classList.add('is-visible'), 200 + i * 180)
    }
  })
})
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;

  // ── Background ─────────────────────────────────────────────────────────────
  &__bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  &__bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    filter: grayscale(30%);
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba($color-black, 0.82) 0%,
      rgba($color-black, 0.55) 60%,
      rgba($color-black, 0.30) 100%
    );
  }

  // ── Content ─────────────────────────────────────────────────────────────────
  &__content {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: $space-12;
    padding-top: $nav-height;
    min-height: 100svh;
  }

  &__text {
    flex: 1;
    color: $color-white;
    max-width: 640px;
  }

  &__eyebrow {
    display: block;
    font-size: $text-xs;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba($color-white, 0.65);
    margin-bottom: $space-4;
  }

  &__title {
    font-family: 'IBM Plex Sans Condensed', sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: clamp(5rem, 12vw, 10rem);
    color: $color-white;
    margin-bottom: $space-4;
    line-height: 0.95;
    letter-spacing: -0.01em;
  }

  &__tagline {
    display: flex;
    flex-direction: column;
    margin-bottom: $space-10;
  }

  &__tagline-line1 {
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: clamp(1.8rem, 4vw, 3.2rem);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: $color-white;
    line-height: 1.1;
  }

  &__tagline-line2 {
    font-family: 'Oswald', sans-serif;
    font-weight: 400;
    font-size: clamp(1.1rem, 2.5vw, 2rem);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba($color-white, 0.72);
    line-height: 1.2;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: $space-6;
    flex-wrap: wrap;

    .btn-primary {
      background: $color-white;
      color: $color-black;
      border-color: $color-white;

      &:hover {
        background: transparent;
        color: $color-white;
      }
    }
  }

  &__learn {
    color: rgba($color-white, 0.75);
    display: flex;
    align-items: center;
    gap: $space-2;
    font-size: $text-sm;
    font-weight: 500;
    letter-spacing: 0.05em;
    transition: all $transition-base;

    &:hover {
      color: $color-white;
      gap: $space-3;
    }
  }

  // ── Decorative hat ──────────────────────────────────────────────────────────
  &__hat-deco {
    flex: 0 0 auto;
    width: 280px;
    color: $color-white;
    opacity: 0.06;

    svg { width: 100%; }

    @media (max-width: 900px) { display: none; }
  }

  // ── Scroll indicator ────────────────────────────────────────────────────────
  &__scroll {
    position: absolute;
    bottom: $space-8;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;

    span {
      display: block;
      width: 1px;
      height: 64px;
      background: linear-gradient(to bottom, transparent, rgba($color-white, 0.6));
      margin: auto;
      animation: scrollPulse 2s ease-in-out infinite;
    }
  }
}

@keyframes scrollPulse {
  0%, 100% { opacity: 0.3; transform: scaleY(0.6); transform-origin: top; }
  50% { opacity: 0.9; transform: scaleY(1); transform-origin: top; }
}
</style>
