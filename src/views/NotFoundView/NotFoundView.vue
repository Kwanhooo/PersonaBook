<script setup lang="ts"></script>

<template>
  <div class="wrapper">
    <div class="main">
      <div class="fof">
        <h1>404 NOT FOUND</h1>
        <span class="back" @click="$router.back()">回到上页</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'NotFoundView';
</style>
