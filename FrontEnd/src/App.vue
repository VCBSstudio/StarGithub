<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="content">
       <img src="https://gitstar.com.cn/static/img/logo_white.png" class="style-img" />
      </div>
  </header>
</template>

<style scoped>

header {
  height: 70px;
  background: green;
  display: flex;
  flex-direction: row;
  align-items: center;
}

header .content {
  width: 100%;
  max-width: 1200px;
  min-width: 1024px;
  margin: 0 auto;
  background: red;
  height: 70px;
  /* align-content: center;
   */
   justify-content: center;
}

header .style-img {
  width: 60px;
  height: 60px;
  background: purple;
}

</style>
