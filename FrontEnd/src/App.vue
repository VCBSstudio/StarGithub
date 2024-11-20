<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { computed } from 'vue';
</script>

<template>
  <div>
    <header>
      <div class="content">
        <div class="left">
          <img src="https://gitstar.com.cn/static/img/logo_white.png" class="style-img" />
          <div class="github-title">
            <a class="" href="https://github.com/VCBSstudio/StarGithub">StarGitub</a>
          </div>
        </div>
        <div class="right">
          <div>App下载</div>
          <div></div>
          <div class="login">App登录</div>
          <div class="user-info">
            <div class="name">name</div>
            <img src="https://gitstar.com.cn/static/img/logo_white.png" class="user-avatar" />
          </div>
        </div>
      </div>
    </header>

    <div class="body-style">
      <div class="content">
        <div class="left">
          <div class="banner-wraper">
             写banner的内容
          </div>
          <div class="action-list-wrapper">
            canlist
          </div>
        </div>
        <div class="right">
          右边内容
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body-style {
  width: 100%;
  height: calc(100% - 70px); /* 使用 calc 计算高度 */
  align-items: center;
  display: flex;

  .content {
    width: 100%;
    max-width: 1200px;
    min-width: 1024px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;

    .left {
      width: 70%;
      background: blue;
      display: flex;
      flex-direction: column;

      .banner-wraper {
        width: 100%;
        height: 200px;
      }

      .action-list-wrapper {
        width: 100%;
        /* height: 200px; */
        background: green;
      }
    }

    .right {
      width: 30%;
      background: orange;
    }
  }
}

header {
  height: 70px;
  background: green;
  display: flex;
  flex-direction: row;
  align-items: center;

  .content {
    width: 100%;
    max-width: 1200px;
    min-width: 1024px;
    margin: 0 auto;
    background: red;
    height: 70px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between; /* 内容两边对齐，空白分布在中间 */
    align-items: center;           /* 可选：垂直方向居中 */
    color: white;

    .left {
      display: flex;
      height: 70px;
      line-height: 70px;

      .style-img {
        width: 70px;
        height: 70px;
        background: rgb(94, 61, 94);
      }

      .github-title {
        color: blue;
        font-size: 24px;
        text-align: center;
        height: 70px;
        line-height: 70px;
      }
    }

    .right {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: 70px;
      line-height: 70px;

      .login {
        padding-left: 20px;
        padding-right: 20px;
      }

      .user-info {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 70px;
        line-height: 70px;

        .name {
          padding-right: 5px;
        }

        .user-avatar {
          padding-left: 10px;
          width: 50px;
          height: 50px;
          background: rgb(94, 61, 94);
          border-radius: 25px; /* 圆角半径 */
        }
      }
    }
  }
}
</style>
