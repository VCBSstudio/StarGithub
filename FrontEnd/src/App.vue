<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <div class="content">
         这个是头部内容
      </div>
    </div>
  </header>

  <!-- <RouterView /> -->
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  width: 100%;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    background-color: red;
    height: 70px;
  }

  header .wrapper {
    /* display: flex;
    place-items: flex-start;
    flex-wrap: wrap; */
  }

  header .content {
    display: flex;
    flex-direction: row;
    background-color: green;
    height: 70px;
  }

}
</style>
