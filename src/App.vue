<template>
  <div id="app-root">
    <NavBar />
    <RouterView />
    <FooterSection />
    <CartSection />
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import FooterSection from '@/components/FooterSection.vue'
import CartSection from '@/components/CartSection.vue'
</script>

<style lang="scss">
@use '@/styles/main.scss';
</style>
