<template>
  <section id="products" class="products section">
    <div class="container">
      <!-- Header -->
      <div class="products__header fade-up" ref="headerEl">
        <span class="section-label">Catálogo</span>
        <div class="ruled-line"></div>
        <h2 class="section-title">Nuestros Productos</h2>
        <p class="section-subtitle">
          Paquetes de 5 bolsas de 38g. A partir de 2 paquetes, el envío es gratis en toda la República.
        </p>

        <!-- Shipping notice -->
        <div class="products__shipping-badge">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="1" y="3" width="15" height="13" rx="1"/>
            <path d="M16 8h4l3 3v5h-7V8z"/>
            <circle cx="5.5" cy="18.5" r="2.5"/>
            <circle cx="18.5" cy="18.5" r="2.5"/>
          </svg>
          Envío gratis a partir de 2 paquetes
        </div>
      </div>

      <!-- Product grid -->
      <div class="products__grid">
        <ProductCard
          v-for="(product, i) in products"
          :key="product.id"
          :product="product"
          class="fade-up"
          :ref="el => productEls[i] = el"
        />
      </div>

      <!-- Divider info -->
      <div class="products__note fade-up" ref="noteEl">
        <p>
          <strong>Precio:</strong> $350 MXN por paquete de 5 bolsas.
          &nbsp;·&nbsp;
          <strong>Ingredientes naturales</strong>, sin conservadores artificiales.
          &nbsp;·&nbsp;
          <strong>38g</strong> por bolsa.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductCard from './ProductCard.vue'

const headerEl = ref(null)
const noteEl = ref(null)
const productEls = ref([])

const products = [
  {
    id: 'ajo-sal',
    name: 'Ajo & Sal',
    flavor: 'Clásico',
    description: 'El sabor original. Carne de res deshidratada con ajo y sal de calidad. Simple, elegante y adictivo. El acompañante perfecto de una cerveza fría.',
    image: '/assets/AS PAQ 5.png',
    price: 350,
    heat: 0,
    badge: 'El Clásico',
    isHot: false
  },
  {
    id: 'pina-habanero',
    name: 'Piña Habanero',
    flavor: 'Sabor Único',
    description: 'La combinación perfecta tropical y el picor moderado del habanero. Con especias seleccionadas que realzan cada bocado. Ideal para una cerveza artesanal o un buen mezcal.',
    image: '/assets/PH PAQ 5.png',
    price: 350,
    heat: 1,
    badge: 'Picor Bajo',
    isHot: false
  },
  {
    id: 'pina-habanero-picante',
    name: 'Piña Habanero Muy Picante',
    flavor: 'Extremo',
    description: 'Para los valientes. Piña habanero llevada al límite con especias extra que desafían el paladar. No apto para los que le huyen al fuego.',
    image: '/assets/PHP PAQ 5.png',
    price: 350,
    heat: 3,
    badge: '🌶 Muy Picante',
    isHot: true
  }
]

onMounted(() => {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible') }),
    { threshold: 0.1 }
  )

  if (headerEl.value) observer.observe(headerEl.value)
  if (noteEl.value) { noteEl.value.style.transitionDelay = '400ms'; observer.observe(noteEl.value) }

  productEls.value.forEach((el, i) => {
    if (el?.$el) {
      el.$el.style.transitionDelay = `${i * 150}ms`
      observer.observe(el.$el)
    }
  })
})
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.products {
  background: $color-bg-base;

  &__header {
    margin-bottom: $space-12;
    max-width: 600px;
  }

  &__shipping-badge {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    margin-top: $space-5;
    padding: $space-3 $space-5;
    background: $color-bg-alt;
    border: $border-thin;
    border-radius: $radius-full;
    font-size: $text-sm;
    font-weight: 500;
    color: $color-text;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $space-6;
    margin-bottom: $space-12;

    @media (max-width: 900px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 580px) {
      grid-template-columns: 1fr;
    }
  }

  &__note {
    padding: $space-5 $space-6;
    border: $border-thin;
    border-radius: $radius-md;
    background: $color-surface;
    font-size: $text-sm;
    color: $color-text-muted;
    line-height: 1.8;

    strong { color: $color-text; }
  }
}
</style>
