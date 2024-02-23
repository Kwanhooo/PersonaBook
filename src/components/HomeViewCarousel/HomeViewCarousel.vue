<script setup lang="ts">
import $router from '@/router'

const handleSeeMore = () => {
  // TODO: 走马灯了解更多
  $router.push('/about')
}
</script>

<template>
  <div class="carousel-wrapper">
    <el-carousel height="400px" :interval="10000">
      <el-carousel-item v-for="item in 3" v-bind:key="item">
        <div class="carousel-item-inner">
          <img class="carousel-image" src="@/assets/image/bg-carousel.png" alt="1" />
          <div class="mask"></div>
          <div class="mask-content">
            <div class="title">智慧图书馆</div>
            <div class="content">让大数据的力量带给孩子们有温度的阅读体验。</div>
            <div>
              <el-button size="large" style="margin-top: 4rem" @click="handleSeeMore()">了解更多</el-button>
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang="scss">
@import "HomeViewCarousel";
</style>
