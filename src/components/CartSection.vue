<template>
  <!-- Cart Overlay -->
  <Teleport to="body">
    <Transition name="cart-overlay">
      <div
        v-if="cartStore.isOpen"
        class="cart-backdrop"
        @click="cartStore.closeCart()"
        aria-hidden="true"
      ></div>
    </Transition>

    <!-- Cart Drawer -->
    <Transition name="cart-slide">
      <aside v-if="cartStore.isOpen" class="cart" role="dialog" aria-label="Carrito de compras" aria-modal="true">
        <!-- Header -->
        <div class="cart__header">
          <div class="cart__header-left">
            <h2 class="cart__title">Carrito</h2>
            <span v-if="cartStore.totalItems > 0" class="cart__count">{{ cartStore.totalItems }} item{{ cartStore.totalItems !== 1 ? 's' : '' }}</span>
          </div>
          <button id="cart-close-btn" class="cart__close" @click="cartStore.closeCart()" aria-label="Cerrar carrito">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <!-- Items -->
        <div class="cart__body">
          <TransitionGroup name="cart-item" tag="ul" class="cart__list" v-if="cartStore.hasItems">
            <li v-for="item in cartStore.items" :key="item.id" class="cart__item">
              <!-- Product img -->
              <div class="cart__item-img">
                <img :src="item.image" :alt="item.name" />
              </div>
              <!-- Info -->
              <div class="cart__item-info">
                <span class="cart__item-flavor">{{ item.flavor }}</span>
                <p class="cart__item-name">{{ item.name }}</p>
                <p class="cart__item-unit">Paquete 5 bolsas × 38g</p>
                <!-- Qty controls -->
                <div class="cart__item-qty">
                  <button class="cart__qty-btn" @click="cartStore.updateQuantity(item.id, item.quantity - 1)" :id="`qty-minus-${item.id}`">−</button>
                  <span class="cart__qty-value">{{ item.quantity }}</span>
                  <button class="cart__qty-btn" @click="cartStore.updateQuantity(item.id, item.quantity + 1)" :id="`qty-plus-${item.id}`">+</button>
                </div>
              </div>
              <!-- Price & Remove -->
              <div class="cart__item-right">
                <span class="cart__item-price">${{ (item.price * item.quantity).toLocaleString('es-MX') }}</span>
                <button class="cart__item-remove" @click="cartStore.removeItem(item.id)" :id="`remove-${item.id}`" aria-label="Eliminar">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
                  </svg>
                </button>
              </div>
            </li>
          </TransitionGroup>

          <!-- Empty state -->
          <div v-else class="cart__empty">
            <div class="cart__empty-hat" aria-hidden="true">
              <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 90 Q100 10 180 90 L195 100 Q100 115 5 100 Z" fill="currentColor"/>
                <ellipse cx="100" cy="100" rx="95" ry="18" fill="currentColor"/>
              </svg>
            </div>
            <p>Tu carrito está vacío</p>
            <button class="btn-outline" @click="cartStore.closeCart()" id="cart-empty-cta">Ver Productos</button>
          </div>
        </div>

        <!-- Footer -->
        <div class="cart__footer" v-if="cartStore.hasItems">
          <!-- Shipping notice -->
          <div class="cart__shipping" :class="{ 'cart__shipping--free': cartStore.shippingFree }">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/>
              <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
            <span v-if="cartStore.shippingFree">¡Envío gratis incluido!</span>
            <span v-else>Agrega {{ 2 - cartStore.totalItems }} paquete{{ 2 - cartStore.totalItems !== 1 ? 's' : '' }} más para envío gratis</span>
          </div>

          <!-- Totals -->
          <div class="cart__totals">
            <div class="cart__total-row" v-if="!cartStore.shippingFree">
              <span>Subtotal</span>
              <span>${{ cartStore.subtotal.toLocaleString('es-MX') }}</span>
            </div>
            <div class="cart__total-row" v-if="!cartStore.shippingFree">
              <span>Envío</span>
              <span>${{ cartStore.shippingCost }}</span>
            </div>
            <div class="cart__total-row cart__total-row--total">
              <span>Total</span>
              <span>${{ cartStore.total.toLocaleString('es-MX') }} MXN</span>
            </div>
          </div>

          <!-- Checkout button -->
          <button id="checkout-btn" class="cart__checkout btn-primary" @click="cartStore.checkout()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            Pagar ahora
          </button>

          <!-- Payment logos placeholder -->
          <p class="cart__payment-note">
            Pronto: MercadoPago · MercadoLibre
          </p>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useCartStore } from '@/stores/cart.js'
const cartStore = useCartStore()
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

// ── Backdrop ────────────────────────────────────────────────────────────────
.cart-backdrop {
  position: fixed;
  inset: 0;
  background: rgba($color-black, 0.45);
  backdrop-filter: blur(2px);
  z-index: 1100;
}

// ── Cart drawer ──────────────────────────────────────────────────────────────
.cart {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(420px, 100vw);
  background: $color-bg-base;
  z-index: 1200;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 40px rgba(0,0,0,0.15);

  &__header {
    @include flex-between;
    padding: $space-6;
    border-bottom: $border-thin;
    flex-shrink: 0;

    &-left {
      display: flex;
      align-items: baseline;
      gap: $space-3;
    }
  }

  &__title {
    font-family: $font-display;
    font-size: $text-2xl;
    font-weight: 700;
  }

  &__count {
    font-size: $text-sm;
    color: $color-text-muted;
  }

  &__close {
    background: none;
    border: none;
    cursor: pointer;
    color: $color-text-muted;
    padding: $space-2;
    transition: color $transition-fast;
    &:hover { color: $color-text; }
  }

  &__body {
    flex: 1;
    overflow-y: auto;
    padding: $space-4;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: $space-3;
  }

  // ── Cart item ────────────────────────────────────────────────────────────
  &__item {
    display: flex;
    gap: $space-4;
    padding: $space-4;
    border: $border-thin;
    border-radius: $radius-md;
    background: $color-bg-alt;
  }

  &__item-img {
    width: 72px;
    height: 72px;
    flex-shrink: 0;
    background: $color-surface;
    border-radius: $radius-sm;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: $space-2;

    img { width: 100%; height: 100%; object-fit: contain; }
  }

  &__item-info {
    flex: 1;
    min-width: 0;
  }

  &__item-flavor {
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: $color-text-muted;
  }

  &__item-name {
    font-family: $font-display;
    font-size: $text-base;
    font-weight: 600;
    margin: 2px 0 $space-1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__item-unit {
    font-size: 11px;
    color: $color-text-muted;
    margin-bottom: $space-3;
  }

  &__item-qty {
    display: flex;
    align-items: center;
    gap: $space-3;
  }

  &__qty-btn {
    width: 26px;
    height: 26px;
    border-radius: $radius-sm;
    border: $border-thin;
    background: $color-surface;
    cursor: pointer;
    font-size: $text-base;
    @include flex-center;
    color: $color-text;
    transition: all $transition-fast;

    &:hover {
      background: $color-text;
      color: $color-bg-base;
      border-color: $color-text;
    }
  }

  &__qty-value {
    font-weight: 600;
    font-size: $text-sm;
    min-width: 20px;
    text-align: center;
  }

  &__item-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    flex-shrink: 0;
  }

  &__item-price {
    font-family: $font-display;
    font-size: $text-lg;
    font-weight: 700;
  }

  &__item-remove {
    background: none;
    border: none;
    cursor: pointer;
    color: $color-text-muted;
    padding: $space-1;
    transition: color $transition-fast;
    &:hover { color: $color-text; }
  }

  // ── Empty ─────────────────────────────────────────────────────────────────
  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: $space-6;
    height: 100%;
    text-align: center;
    color: $color-text-muted;
    padding: $space-12;

    p { font-size: $text-lg; }
  }

  &__empty-hat {
    width: 100px;
    color: $color-text;
    opacity: 0.05;
    svg { width: 100%; }
  }

  // ── Footer ────────────────────────────────────────────────────────────────
  &__footer {
    border-top: $border-thin;
    padding: $space-5 $space-6 $space-6;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: $space-4;
  }

  &__shipping {
    display: flex;
    align-items: center;
    gap: $space-2;
    font-size: $text-sm;
    padding: $space-3 $space-4;
    border-radius: $radius-full;
    background: $color-surface;
    color: $color-text-muted;

    &--free {
      background: rgba(255, 255, 255, 0.06);
      color: $color-text;
      font-weight: 500;
    }
  }

  &__totals {
    display: flex;
    flex-direction: column;
    gap: $space-2;
  }

  &__total-row {
    @include flex-between;
    font-size: $text-sm;
    color: $color-text-muted;

    &--total {
      font-size: $text-lg;
      font-weight: 700;
      color: $color-text;
      padding-top: $space-3;
      border-top: $border-thin;
      margin-top: $space-1;
    }
  }

  &__checkout {
    width: 100%;
    padding: $space-4;
    font-size: $text-base;
    border-radius: $radius-sm;
    gap: $space-3;
  }

  &__payment-note {
    text-align: center;
    font-size: 11px;
    color: $color-text-muted;
    letter-spacing: 0.05em;
  }
}

// ── Transitions ──────────────────────────────────────────────────────────────
.cart-overlay-enter-active, .cart-overlay-leave-active { transition: opacity 0.3s ease; }
.cart-overlay-enter-from, .cart-overlay-leave-to { opacity: 0; }

.cart-slide-enter-active, .cart-slide-leave-active { transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1); }
.cart-slide-enter-from, .cart-slide-leave-to { transform: translateX(100%); }

.cart-item-enter-active { transition: all 0.3s ease; }
.cart-item-leave-active { transition: all 0.25s ease; }
.cart-item-enter-from { opacity: 0; transform: translateX(16px); }
.cart-item-leave-to { opacity: 0; transform: translateX(16px); }
</style>
