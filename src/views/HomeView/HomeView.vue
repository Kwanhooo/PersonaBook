<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('Home')
</script>

<template>
  <div class="example">{{ msg }}</div>
</template>

<style scoped lang="scss">
@import './HomeView';
</style>
