<template>
  <article class="product-card" :class="[`product-card--${product.id}`, { 'product-card--hot': product.isHot }]">
    <!-- Badge -->
    <div v-if="product.badge" class="product-card__badge">{{ product.badge }}</div>

    <!-- Image -->
    <div class="product-card__img-wrap">
      <img :src="product.image" :alt="product.name" class="product-card__img" />
    </div>

    <!-- Info -->
    <div class="product-card__body">
      <span class="product-card__flavor">{{ product.flavor }}</span>
      <h3 class="product-card__name">{{ product.name }}</h3>
      <p class="product-card__desc">{{ product.description }}</p>

      <!-- Heat indicator -->
      <div v-if="product.heat" class="product-card__heat">
        <span v-for="n in 3" :key="n" :class="{ active: n <= product.heat }">🌶</span>
      </div>

      <!-- Price & CTA -->
      <div class="product-card__footer">
        <div class="product-card__pricing">
          <span class="product-card__price">${{ product.price }}</span>
          <span class="product-card__unit">paquete 5 bolsas × 38g</span>
        </div>
        <button
          :id="`add-to-cart-${product.id}`"
          class="product-card__btn"
          @click="handleAdd"
          :class="{ 'product-card__btn--added': added }"
        >
          <transition name="btn-fade" mode="out-in">
            <span v-if="!added" key="add">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              Agregar
            </span>
            <span v-else key="ok">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              ¡Listo!
            </span>
          </transition>
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart.js'

const props = defineProps({
  product: { type: Object, required: true }
})

const cartStore = useCartStore()
const added = ref(false)

function handleAdd() {
  cartStore.addItem(props.product)
  added.value = true
  setTimeout(() => { added.value = false }, 1600)
}
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.product-card {
  position: relative;
  background: $color-surface;
  border: $border-thin;
  border-radius: $radius-md;
  overflow: hidden;
  transition: transform $transition-base, box-shadow $transition-base, border-color $transition-base;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-lg;
    border-color: $color-border-strong;
  }

  &--hot {
    border-color: $color-border-strong;
  }

  // ── Badge ─────────────────────────────────────────────────────────────────
  &__badge {
    position: absolute;
    top: $space-4;
    left: $space-4;
    background: $color-text;
    color: $color-bg-base;
    font-size: $text-xs;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 3px $space-3;
    border-radius: $radius-full;
    z-index: 2;
  }

  // ── Image ─────────────────────────────────────────────────────────────────
  &__img-wrap {
    background: $color-bg-alt;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: $space-2;
    aspect-ratio: 1;
    overflow: hidden;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform $transition-slow;

    .product-card:hover & {
      transform: scale(1.05);
    }
  }

  // ── Body ──────────────────────────────────────────────────────────────────
  &__body {
    padding: $space-6;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  &__flavor {
    font-size: $text-xs;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: $color-text-muted;
    display: block;
    margin-bottom: $space-2;
  }

  &__name {
    font-family: $font-display;
    font-size: $text-xl;
    font-weight: 700;
    margin-bottom: $space-3;
    line-height: 1.2;
  }

  &__desc {
    font-size: $text-sm;
    color: $color-text-muted;
    line-height: 1.7;
    flex: 1;
    margin-bottom: $space-4;
  }

  &__heat {
    margin-bottom: $space-4;
    font-size: 14px;

    span {
      opacity: 0.2;
      transition: opacity $transition-fast;

      &.active { opacity: 1; }
    }
  }

  // ── Footer ────────────────────────────────────────────────────────────────
  &__footer {
    @include flex-between;
    gap: $space-3;
    margin-top: auto;
    padding-top: $space-4;
    border-top: $border-thin;
  }

  &__pricing {
    display: flex;
    flex-direction: column;
  }

  &__price {
    font-family: $font-display;
    font-size: $text-2xl;
    font-weight: 700;
    line-height: 1;
  }

  &__unit {
    font-size: 10px;
    color: $color-text-muted;
    letter-spacing: 0.05em;
    margin-top: 2px;
  }

  // ── Add button ────────────────────────────────────────────────────────────
  &__btn {
    @include btn-base;
    background: $color-text;
    color: $color-bg-base;
    border: 1px solid $color-text;
    border-radius: $radius-sm;
    padding: $space-3 $space-4;
    font-size: $text-xs;
    min-width: 100px;

    span {
      display: flex;
      align-items: center;
      gap: $space-2;
    }

    &--added {
      background: $color-bg-alt;
      border-color: $color-bg-alt;
      color: $color-text;
    }

    &:hover:not(.product-card__btn--added) {
      background: transparent;
      color: $color-text;
    }
  }
}

// Button transition
.btn-fade-enter-active, .btn-fade-leave-active { transition: opacity 0.2s ease; }
.btn-fade-enter-from, .btn-fade-leave-to { opacity: 0; }
</style>
