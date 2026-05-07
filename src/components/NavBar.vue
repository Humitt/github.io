<template>
  <nav class="navbar" :class="{ 'navbar--scrolled': isScrolled, 'navbar--hidden': isHidden }">
    <div class="navbar__inner container">
      <!-- Logo -->
      <a href="#home" class="navbar__logo" @click.prevent="scrollTo('home')">
        <img src="/assets/logo.png" alt="Humitt" class="navbar__logo-img" />
      </a>

      <!-- Nav links (desktop) -->
      <ul class="navbar__links">
        <li><a href="#home" @click.prevent="scrollTo('home')" :class="{ active: activeSection === 'home' }">Inicio</a></li>
        <li><a href="#brand" @click.prevent="scrollTo('brand')" :class="{ active: activeSection === 'brand' }">La Marca</a></li>
        <li><a href="#products" @click.prevent="scrollTo('products')" :class="{ active: activeSection === 'products' }">Productos</a></li>
        <li><a href="#benefits" @click.prevent="scrollTo('benefits')" :class="{ active: activeSection === 'benefits' }">Nutrición</a></li>
        <li><a href="#places" @click.prevent="scrollTo('places')" :class="{ active: activeSection === 'places' }">Encuéntranos</a></li>
      </ul>

      <!-- Cart button -->
      <button
        id="cart-toggle-btn"
        class="navbar__cart"
        @click="cartStore.toggleCart()"
        aria-label="Abrir carrito de compras"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        <span v-if="cartStore.totalItems > 0" class="navbar__cart-badge">{{ cartStore.totalItems }}</span>
      </button>

      <!-- Hamburger (mobile) -->
      <button class="navbar__hamburger" @click="menuOpen = !menuOpen" aria-label="Menú">
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
      </button>
    </div>

    <!-- Mobile menu -->
    <div class="navbar__mobile" :class="{ 'navbar__mobile--open': menuOpen }">
      <ul>
        <li><a @click="mobileNav('home')">Inicio</a></li>
        <li><a @click="mobileNav('brand')">La Marca</a></li>
        <li><a @click="mobileNav('products')">Productos</a></li>
        <li><a @click="mobileNav('benefits')">Nutrición</a></li>
        <li><a @click="mobileNav('places')">Encuéntranos</a></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useCartStore } from '@/stores/cart.js'

const cartStore = useCartStore()
const isScrolled = ref(false)
const isHidden = ref(false)
const menuOpen = ref(false)
const activeSection = ref('home')
let lastScrollY = 0

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function mobileNav(id) {
  menuOpen.value = false
  setTimeout(() => scrollTo(id), 150)
}

function handleScroll() {
  const y = window.scrollY
  isScrolled.value = y > 60
  isHidden.value = y > 200 && y > lastScrollY
  lastScrollY = y

  // Detect active section
  const sections = ['home', 'brand', 'products', 'benefits', 'places', 'testimonials']
  for (const id of sections) {
    const el = document.getElementById(id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 120 && rect.bottom > 120) {
        activeSection.value = id
        break
      }
    }
  }
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: $nav-height;
  transition: all $transition-base;
  border-bottom: 1px solid transparent;

  &--scrolled {
    background: rgba($color-bg-base, 0.96);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom-color: $color-border;
  }

  &--hidden {
    transform: translateY(-100%);
  }

  &__inner {
    @include flex-between;
    height: 100%;
  }

  &__logo {
    display: flex;
    align-items: center;
    padding: 5px;

    &-img {
      height: 70px;
      width: auto;
      object-fit: contain;
      filter: invert(1);
    }
  }

  &__links {
    display: flex;
    gap: $space-8;

    li a {
      font-size: $text-sm;
      font-weight: 500;
      letter-spacing: 0.04em;
      color: $color-text-muted;
      padding-bottom: 2px;
      border-bottom: 1px solid transparent;
      transition: all $transition-fast;

      &:hover, &.active {
        color: $color-text;
        border-bottom-color: $color-text;
      }
    }

    @media (max-width: 768px) {
      display: none;
    }
  }

  &__cart {
    position: relative;
    background: none;
    border: none;
    cursor: pointer;
    padding: $space-2;
    color: $color-text;
    transition: opacity $transition-fast;

    &:hover { opacity: 0.6; }
  }

  &__cart-badge {
    position: absolute;
    top: -2px;
    right: -4px;
    background: $color-text;
    color: $color-bg-base;
    border-radius: $radius-full;
    font-size: 10px;
    font-weight: 700;
    min-width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }

  &__hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: $space-2;

    span {
      display: block;
      width: 22px;
      height: 1.5px;
      background: $color-text;
      transition: all $transition-base;

      &.open:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
      &.open:nth-child(2) { opacity: 0; }
      &.open:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }
    }

    @media (max-width: 768px) { display: flex; }
  }

  &__mobile {
    background: $color-bg-base;
    overflow: hidden;
    max-height: 0;
    transition: max-height $transition-base;
    border-bottom: 1px solid transparent;

    &--open {
      max-height: 300px;
      border-bottom-color: $color-border;
    }

    ul {
      padding: $space-4 $space-6 $space-6;
      display: flex;
      flex-direction: column;
      gap: $space-4;
    }

    li a {
      font-size: $text-lg;
      font-weight: 500;
      color: $color-text;
      cursor: pointer;

      &:hover { opacity: 0.5; }
    }

    @media (min-width: 769px) { display: none; }
  }
}
</style>
