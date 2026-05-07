<template>
  <section id="benefits" class="benefits section">
    <div class="container">
      <!-- Section header -->
      <div class="benefits__header fade-up" ref="headerEl">
        <span class="section-label">Nutrición</span>
        <div class="ruled-line"></div>
        <h2 class="section-title">Lo Bueno de Humitt</h2>
      </div>

      <!-- Grid -->
      <div class="benefits__grid">
        <!-- Text column (Benefits) -->
        <div class="benefits__copy fade-up" ref="copyEl">
          <p class="benefits__lead">
            Buscamos promover la alimentación de calidad enfocándonos en el punto débil de los mexicanos: <strong>los snacks</strong>.
          </p>
          
          <ul class="benefits__list">
            <li class="benefits__item">
              <span class="benefits__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </span>
              <div>
                <strong>Alimento alto en proteína</strong>
                <p>Fundamental para el mantenimiento y desarrollo muscular.</p>
              </div>
            </li>
            <li class="benefits__item">
              <span class="benefits__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </span>
              <div>
                <strong>Alimento alto en hierro</strong>
                <p>Ayuda a mantener la energía y vitalidad en tu día a día.</p>
              </div>
            </li>
            <li class="benefits__item">
              <span class="benefits__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </span>
              <div>
                <strong>Snack saludable</strong>
                <p>Una alternativa nutritiva, deliciosa y sin culpa.</p>
              </div>
            </li>
            <li class="benefits__item">
              <span class="benefits__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </span>
              <div>
                <strong>Alimento saciador</strong>
                <p>Ideal para calmar el hambre efectivamente.</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Table column -->
        <div class="benefits__visual fade-up" ref="visualEl">
          <div class="nutrition-table">
            <div class="nutrition-table__header">
              <h3>INFORMACIÓN NUTRIMENTAL</h3>
            </div>
            
            <div class="nutrition-table__serving">
              <div class="nutrition-table__serving-row">
                <strong>Tamaño de la porción:</strong> <span>38 g</span>
              </div>
              <div class="nutrition-table__serving-row">
                <strong>Porciones por envase:</strong> <span>1 aprox.</span>
              </div>
              <div class="nutrition-table__serving-row nutrition-table__serving-row--energy">
                <strong>Contenido energético por envase (38 g):</strong> <span>153 kcal (640 kJ)</span>
              </div>
            </div>

            <div class="nutrition-table__body">
              <div class="nutrition-table__row nutrition-table__row--title">
                <span>Cantidad por porción</span>
              </div>
              <div class="nutrition-table__row">
                <strong>Grasas Totales</strong>
                <span>9.7 g</span>
              </div>
              <div class="nutrition-table__row nutrition-table__row--sub">
                <span>Grasas Saturadas</span>
                <span>1.8 g</span>
              </div>
              <div class="nutrition-table__row nutrition-table__row--sub">
                <span>Grasas Trans</span>
                <span>0 mg</span>
              </div>
              <div class="nutrition-table__row">
                <strong>Sodio</strong>
                <span>70 mg</span>
              </div>
              <div class="nutrition-table__row">
                <strong>Carbohidratos Totales</strong>
                <span>9.6 g</span>
              </div>
              <div class="nutrition-table__row nutrition-table__row--sub">
                <span>Fibra Dietética</span>
                <span>1.4 g</span>
              </div>
              <div class="nutrition-table__row nutrition-table__row--sub">
                <span>Azúcares Añadidos</span>
                <span>0 g</span>
              </div>
              <div class="nutrition-table__row">
                <strong>Proteína</strong>
                <span>16.8 g</span>
              </div>
              <div class="nutrition-table__row">
                <strong>Hierro</strong>
                <span>1.2 mg</span>
              </div>
            </div>
          </div>
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

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible') })
    },
    { threshold: 0.15 }
  )
  
  ;[headerEl, copyEl, visualEl].forEach((el, i) => {
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

.benefits {
  background: #111111;
  position: relative;
  overflow: hidden;

  &__header {
    margin-bottom: $space-16;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $space-16;
    align-items: start;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
      gap: $space-12;
    }
  }

  &__lead {
    font-size: $text-xl;
    line-height: 1.6;
    color: $color-text;
    margin-bottom: $space-10;

    strong {
      color: $color-white;
      font-weight: 600;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: $space-6;
  }

  &__item {
    display: flex;
    gap: $space-4;

    div {
      flex: 1;
    }

    strong {
      display: block;
      font-size: $text-lg;
      color: $color-white;
      margin-bottom: $space-1;
    }

    p {
      color: $color-text-muted;
      font-size: $text-sm;
      line-height: 1.5;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: $color-surface;
    border: $border-thin;
    border-radius: $radius-full;
    color: $color-text;
    flex-shrink: 0;
    margin-top: 2px;

    svg {
      width: 16px;
      height: 16px;
    }
  }

  // ── Nutrition Table ───────────────────────────────────────────────────────
  .nutrition-table {
    background: $color-surface;
    border: $border-thin;
    border-radius: $radius-md;
    overflow: hidden;
    color: $color-text;

    &__header {
      background: rgba(255, 255, 255, 0.03);
      padding: $space-4 $space-5;
      text-align: center;
      border-bottom: $border-thin;

      h3 {
        font-family: $font-body;
        font-size: $text-base;
        font-weight: 700;
        letter-spacing: 0.05em;
        margin: 0;
      }
    }

    &__serving {
      padding: $space-4 $space-5;
      border-bottom: $border-strong;
      font-size: $text-sm;

      &-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: $space-2;

        &:last-child {
          margin-bottom: 0;
        }

        &--energy {
          margin-top: $space-3;
          padding-top: $space-3;
          border-top: $border-thin;
        }
      }
    }

    &__body {
      padding: 0 $space-5 $space-5;
    }

    &__row {
      display: flex;
      justify-content: space-between;
      padding: $space-3 0;
      border-bottom: $border-thin;
      font-size: $text-sm;

      &:last-child {
        border-bottom: none;
      }

      &--title {
        justify-content: center;
        font-weight: 700;
        border-bottom: $border-strong;
      }

      &--sub {
        padding-left: $space-4;
        color: $color-text-muted;
      }

      strong {
        font-weight: 600;
      }
    }
  }
}
</style>
