<script setup lang="ts"></script>

<template>
  <div class="footer-wrapper">
    <div class="author-info-wrapper">
      <div class="title">中南大学开源实验室</div>
      <div class="content">地址：湖南省长沙市中南大学北校区</div>
      <div class="content">电话：(0731) 88888888</div>
      <div class="content">
        邮箱：<a href="mailto://persona-book@csuoss.cn">persona-book@csuoss.cn</a>
      </div>
      <!-- TODO: 社交媒体嵌入 -->
      <div class="social-media">
        <div class="item">
          <img src="../../assets/svg/logo-weibo.svg" alt="weibo" />
        </div>
        <div class="item">
          <img src="../../assets/svg/logo-wechat.svg" alt="wechat" />
        </div>
        <div class="item">
          <img src="../../assets/svg/logo-twitter.svg" alt="twitter" />
        </div>
      </div>
    </div>
    <!-- TODO: 信息页面嵌入 -->
    <div class="footer-item-wrapper">
      <div class="footer-item">
        <div class="title">企业介绍</div>
        <div class="content"><a>品牌介绍</a></div>
        <div class="content"><a>免责声明</a></div>
        <div class="content"><a>版权声明</a></div>
      </div>
      <div class="footer-item">
        <div class="title">服务范围</div>
        <div class="content"><a>产品介绍</a></div>
        <div class="content"><a>新闻介绍</a></div>
        <div class="content"><a>服务品牌</a></div>
      </div>
      <div class="footer-item">
        <div class="title">加入我们</div>
        <div class="content"><a>公司动态</a></div>
        <div class="content"><a>诚信合作</a></div>
        <div class="content"><a>投诉举报</a></div>
      </div>
      <div class="footer-item">
        <div class="title">相关链接</div>
        <div class="content"><a href="https://www.csu.edu.cn" target="_blank">中南大学</a></div>
      </div>
      <div class="footer-item"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './BaseFooter';
</style>
