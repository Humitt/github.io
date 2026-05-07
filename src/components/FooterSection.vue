<template>
  <footer class="footer">
    <!-- Top border accent -->
    <div class="footer__accent"></div>

    <div class="container">
      <div class="footer__inner">
        <!-- Brand column -->
        <div class="footer__brand">
          <img src="/assets/logo.png" alt="Humitt" class="footer__logo" />
          <p class="footer__tagline">
            El snack norteño que te hace tararear de felicidad.
          </p>
        </div>

        <!-- Nav links -->
        <div class="footer__nav">
          <h4 class="footer__nav-title">Navegación</h4>
          <ul>
            <li><a href="#home" @click.prevent="scrollTo('home')">Inicio</a></li>
            <li><a href="#brand" @click.prevent="scrollTo('brand')">La Marca</a></li>
            <li><a href="#products" @click.prevent="scrollTo('products')">Productos</a></li>
            <li><a href="#places" @click.prevent="scrollTo('places')">Encuéntranos</a></li>
            <li><a href="#testimonials" @click.prevent="scrollTo('testimonials')">Opiniones</a></li>
          </ul>
        </div>

        <!-- Products links -->
        <div class="footer__nav">
          <h4 class="footer__nav-title">Productos</h4>
          <ul>
            <li><a href="#products" @click.prevent="scrollTo('products')">Ajo & Sal</a></li>
            <li><a href="#products" @click.prevent="scrollTo('products')">Piña Habanero</a></li>
            <li><a href="#products" @click.prevent="scrollTo('products')">Piña Habanero Muy Picante</a></li>
          </ul>
        </div>

        <!-- Contact / Info -->
        <div class="footer__contact">
          <h4 class="footer__nav-title">Contacto</h4>
          <div class="footer__info">
            <div class="footer__info-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink: 0;">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              Sócrates #310, Col. Hércules, C.P. 67120, Guadalupe, Nuevo León, México
            </div>
            <a href="https://www.instagram.com/humittmx" target="_blank" rel="noopener noreferrer" class="footer__info-item footer__info-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink: 0;">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
              </svg>
              @humittmx
            </a>
            <a href="https://wa.me/528114718590" target="_blank" rel="noopener noreferrer" class="footer__info-item footer__info-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink: 0;">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              +52 81 1471 8590
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="footer__bottom">
        <p>© {{ currentYear }} Humitt. Todos los derechos reservados.</p>
        <p class="footer__bottom-right">Hecho con ♥ en Nuevo León</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style lang="scss" scoped>
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.footer {
  background: $color-black;
  color: $color-white;

  &__accent {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba($color-white, 0.15), transparent);
  }

  &__inner {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: $space-12;
    padding-block: $space-16;

    @media (max-width: 900px) {
      grid-template-columns: 1fr 1fr;
      gap: $space-8;
    }

    @media (max-width: 560px) {
      grid-template-columns: 1fr;
    }
  }

  // ── Brand ─────────────────────────────────────────────────────────────────
  &__brand {
    display: flex;
    flex-direction: column;
    gap: $space-5;
  }

  &__logo {
    height: 100px;
    width: auto;
    object-fit: contain;
    filter: invert(1);
    align-self: flex-start;
  }

  &__tagline {
    font-size: $text-sm;
    color: rgba($color-white, 0.55);
    line-height: 1.7;
    max-width: 240px;
  }

  // ── Social ─────────────────────────────────────────────────────────────────
  &__social {
    display: flex;
    flex-direction: column;
    gap: $space-3;
  }

  &__social-link {
    display: inline-flex;
    align-items: center;
    gap: $space-3;
    font-size: $text-sm;
    color: rgba($color-white, 0.7);
    transition: color $transition-fast;
    width: fit-content;

    &:hover { color: $color-white; }
  }

  // ── Nav ───────────────────────────────────────────────────────────────────
  &__nav-title {
    font-family: $font-body;
    font-size: $text-xs;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba($color-white, 0.4);
    margin-bottom: $space-5;
  }

  &__nav ul {
    display: flex;
    flex-direction: column;
    gap: $space-3;

    li a {
      font-size: $text-sm;
      color: rgba($color-white, 0.65);
      cursor: pointer;
      transition: color $transition-fast;

      &:hover { color: $color-white; }
    }
  }

  // ── Contact ───────────────────────────────────────────────────────────────
  &__contact {}

  &__info {
    display: flex;
    flex-direction: column;
    gap: $space-3;
  }

  &__info-item {
    display: flex;
    align-items: flex-start;
    gap: $space-3;
    font-size: $text-sm;
    color: rgba($color-white, 0.65);
    line-height: 1.4;
  }

  &__info-link {
    cursor: pointer;
    transition: color $transition-fast;

    &:hover { color: $color-white; }
  }

  // ── Bottom bar ────────────────────────────────────────────────────────────
  &__bottom {
    @include flex-between;
    padding-block: $space-5;
    border-top: 1px solid rgba($color-white, 0.1);
    font-size: $text-xs;
    color: rgba($color-white, 0.35);
    gap: $space-4;
    flex-wrap: wrap;

    &-right {
      letter-spacing: 0.04em;
    }
  }
}
</style>
