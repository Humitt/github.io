import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const isOpen = ref(false)

  // ── Computed ────────────────────────────────────────────────────────────────
  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const hasItems = computed(() => items.value.length > 0)

  // Envío gratis a partir de 2 paquetes (cada producto viene en paquete de 5)
  const shippingFree = computed(() => totalItems.value >= 2)

  const shippingCost = computed(() => shippingFree.value ? 0 : 120)

  const total = computed(() => subtotal.value + shippingCost.value)

  // ── Actions ─────────────────────────────────────────────────────────────────
  function addItem(product) {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
    isOpen.value = true
  }

  function removeItem(productId) {
    items.value = items.value.filter(i => i.id !== productId)
  }

  function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    const item = items.value.find(i => i.id === productId)
    if (item) item.quantity = quantity
  }

  function clearCart() {
    items.value = []
  }

  function toggleCart() {
    isOpen.value = !isOpen.value
  }

  function openCart() {
    isOpen.value = true
  }

  function closeCart() {
    isOpen.value = false
  }

  // ── Payment Integration (Preparado para MercadoPago / MercadoLibre) ────────
  // TODO: Reemplaza con tu Public Key de MercadoPago
  const MERCADOPAGO_PUBLIC_KEY = 'YOUR_MERCADOPAGO_PUBLIC_KEY'

  // TODO: URL de tu backend que crea la preferencia de pago
  // Endpoint esperado: POST /api/create-preference
  // Recibe: { items: [{ title, quantity, unit_price }] }
  // Devuelve: { init_point: 'https://www.mercadopago.com.mx/checkout/...' }
  const PAYMENT_BACKEND_URL = 'YOUR_BACKEND_URL/api/create-preference'

  async function checkout() {
    if (!hasItems.value) return

    const orderItems = items.value.map(item => ({
      id: item.id,
      title: item.name,
      quantity: item.quantity,
      unit_price: item.price,
      currency_id: 'MXN'
    }))

    // TODO: Descomentar cuando tengas tu backend configurado
    /*
    try {
      const response = await fetch(PAYMENT_BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: orderItems,
          back_urls: {
            success: 'https://www.humitt.com.mx/#/gracias',
            failure: 'https://www.humitt.com.mx/#/error',
            pending: 'https://www.humitt.com.mx/#/pendiente'
          },
          auto_return: 'approved'
        })
      })
      const { init_point } = await response.json()
      window.location.href = init_point
    } catch (error) {
      console.error('Error al conectar con MercadoPago:', error)
    }
    */

    // Placeholder: redirige a MercadoLibre (reemplazar con URL real de tu tienda)
    // TODO: Reemplaza con el link directo a tu tienda de MercadoLibre
    const MERCADOLIBRE_STORE_URL = 'https://www.mercadolibre.com.mx'
    window.open(MERCADOLIBRE_STORE_URL, '_blank')
  }

  return {
    items,
    isOpen,
    totalItems,
    subtotal,
    total,
    shippingFree,
    shippingCost,
    hasItems,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    checkout
  }
})
