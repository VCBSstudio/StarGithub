<script setup lang="ts">
import { ElMessage, ElAlert } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/AutoToken'
import { userInfo } from 'os'

const router = useRouter() // 获取 router 实例
const route = useRoute() // 获取当前路由信息

interface Tab {
  name: string
  label: string
  content: string
  loaded: boolean
  data: Array<{ id: number; name: string }>
}

const authStore = useAuthStore()

var user_name = ref('登录')
var avatarImg = ref('https://gitstar.com.cn/static/img/logo_white.png')
var user_location = ref('')
const inputValue = ref('') // 存储输入框的值
const visibleAlert = ref(false)

const handleLogin = () => {}
// 处理关闭事件
const handleClose = () => {
  inputValue.value = '' // 重置输入框的值
}

// 提交输入框的值
const submitInput = () => {
  console.log('Submitted:', inputValue.value)
  visibleAlert.value = false // 关闭弹窗
  authStore.setAccessToken(inputValue.value) // 存储令牌
  window.location.reload()
  ElMessage({
    message: '登录成功',
    type: 'success',
  })
}

onMounted(async () => {
  // 用访问令牌获取用户信息
  let accessToken = authStore.githubAccessToken
  console.log('accessToken :' + accessToken)
  if (accessToken != null) {
    visibleAlert.value = false
    const userResponse = await axios.get('/githubUser', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    const userData = userResponse.data
    console.log('userData :' + userData)
    console.log('name: ' + userData.login)
    console.log('avatar_url: ' + userData.avatar_url)

    user_name.value = userData.login
    avatarImg.value = userData.avatar_url

    const userInfoResponse = await axios.get('/githubUser?{user_name}', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    console.log('location :' + userInfoResponse.data.location)
    user_location.value = userInfoResponse.data.location
  } else {
    visibleAlert.value = true
  }
})
</script>

<template>
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
        <div class="login">App登录</div>
        <div class="user-info" @click="handleLogin">
          <div class="name">{{ user_name }}</div>
          <img :src="avatarImg" class="user-avatar" />
        </div>
      </div>
    </div>
  </header>
  <el-alert v-if="visibleAlert" class="login-alert" closable center>
    <el-input v-model="inputValue" placeholder="Type something..." />
    <div class="space"></div>
    <el-button type="primary" @click="submitInput">Submit</el-button>
  </el-alert>
  <router-view></router-view>
</template>
<style scoped lang="less">
.login-alert {
  background: red;
  display: flex;
  flex-direction: row;
  align-items: center;
  .space {
    height: 10px;
  }
}
header {
  height: 70px;
  background: #333;
  display: flex;
  align-items: center;
  color: white;

  .content {
    max-width: 1200px;
    min-width: 1024px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center; /* 可选，用于垂直居中 */
    width: 100%; /* 可选，设置容器宽度 */

    .left {
      display: flex;
      align-items: center;
      flex-direction: row;

      .style-img {
        width: 50px;
        height: 50px;
      }

      .github-title {
        font-size: 18px;
      }
    }

    .right {
      display: flex;
      align-items: center;

      .login {
        margin: 0 16px;
      }

      .user-info {
        display: flex;
        align-items: center;

        .user-avatar {
          width: 40px;
          height: 40px;
          margin-left: 8px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
