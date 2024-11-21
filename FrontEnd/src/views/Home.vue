<script setup lang="ts">
import { ElMessage } from 'element-plus'
// import { useRoute } from 'vue-router' // 导入 useRoute
import { useRouter, useRoute } from 'vue-router'
// import router from './router'
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

const code = ref<string | null>(null)
onMounted(async () => {
  // // 获取当前URL中的查询参数部分
  // const params = new URLSearchParams(window.location.search)
  // // console.log('window.location.search :', params)
  // // 获取指定的查询参数值
  // code.value = params.get('code') // 获取 'code' 参数
  // if (code.value) {
  //   console.log('.code.value :', code.value)
  //   // router.push({ path: '/index' })
  //   // 用授权码换取访问令牌
  //   const tokenResponse = await axios.post(
  //     '/login/oauth/access_token',
  //     {
  //       client_id: clientId,
  //       client_secret: CLIENT_SECRET,
  //       code: code.value,
  //     },
  //     {
  //       headers: { Accept: 'application/json' },
  //     }
  //   )
  //   console.log('tokenResponse :' + tokenResponse)
  //   const accessToken = tokenResponse.data.access_token
  //   console.log('accessToken :' + accessToken)
  //   if (accessToken.length > 0) {
  //     authStore.setAccessToken(accessToken)
  //   }
  //   // 用访问令牌获取用户信息
  //   const userResponse = await axios.get('/githubUser', {
  //     headers: { Authorization: `Bearer ${accessToken}` },
  //   })
  //   const userData = userResponse.data
  //   console.log('userData :' + userData)
  //   console.log('name: ' + userData.login)
  //   console.log('avatar_url: ' + userData.avatar_url)
  //   console.log('location: ' + userData.locaction)
  //   user_name.value = userData.login
  //   avatarImg.value = userData.avatar_url
  // } else {
  //   console.log('lt- store accessToken :' + authStore.githubAccessToken)
  //   // 用访问令牌获取用户信息
  //   const userResponse = await axios.get('/githubUser', {
  //     headers: { Authorization: `Bearer ${accessToken}` },
  //   })
  //   const userData = userResponse.data
  //   console.log('userData :' + userData)
  //   console.log('name: ' + userData.login)
  //   console.log('avatar_url: ' + userData.avatar_url)
  //   console.log('location: ' + userData.locaction)
  //   user_name.value = userData.login
  //   avatarImg.value = userData.avatar_url
  //   const userInfoResponse = await axios.get('/githubUser?{user_name}', {
  //     headers: { Authorization: `Bearer ${accessToken}` },
  //   })
  //   console.log('location :' + userInfoResponse.data.location)
  //   user_location.value = userInfoResponse.data.location
  // }
})

// 动态数据数组
const tabs = ref<Tab[]>([
  { name: 'first', label: '互赞列表', content: '', loaded: false, data: [] },
  { name: 'second', label: '互粉列表', content: '', loaded: false, data: [] },
  { name: 'third', label: 'Star记录', content: '', loaded: false, data: [] },
  { name: 'fourth', label: 'Watch记录', content: '', loaded: false, data: [] },
  { name: 'fifth', label: 'Fork记录', content: '', loaded: false, data: [] },
  { name: 'sixth', label: 'Follow记录', content: '', loaded: false, data: [] },
  { name: 'seventh', label: '失信名单', content: '', loaded: false, data: [] },
])

// 当前激活的选项卡 name
const activeName = ref<string>(tabs.value[0].name)
const starSwitch = ref(false)
const aimRepository = ref('')

// 模拟加载数据函数
const loadData = (tab: Tab) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: `${tab.label} - 数据1` },
        { id: 2, name: `${tab.label} - 数据2` },
      ])
    }, 1000)
  })
}

const goToPersonInfoPage = () => {
  router.push({ path: '/about' }) // 跳转到 'About' 页面
}

const handleClick = async (tabInstance: any) => {
  const name = tabInstance.props.name // 通过 props 访问 name
  console.log('当前点击的选项卡 name:', name)

  // 查找对应的 Tab 数据
  const targetTab = tabs.value.find((t) => t.name === name)

  if (targetTab && !targetTab.loaded) {
    targetTab.content = `${targetTab.label} - 加载中...`
    try {
      const result = (await loadData(targetTab)) as Array<{ id: number; name: string }>
      targetTab.data = result // 更新数据
      targetTab.content = '' // 清空加载中消息
      targetTab.loaded = true
    } catch (error) {
      ElMessage.error('加载失败，请重试')
    }
  }
}
</script>

<template>
  <router-view>
    <div>
      <!-- <header>
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
            <div class="user-info" @click="redirectToGitHubAuth">
              <div class="name">{{ user_name }}</div>
              <img :src="avatarImg" class="user-avatar" />
            </div>
          </div>
        </div>
      </header> -->
      <div class="body-style">
        <div class="content">
          <div class="left">
            <div class="banner-wraper">Banner 内容</div>
            <div class="action-list-wrapper">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane
                  v-for="tab in tabs"
                  :key="tab.name"
                  :label="tab.label"
                  :name="tab.name"
                >
                  <div v-if="tab.content">{{ tab.content }}</div>
                  <el-table v-else :data="tab.data" style="width: 100%">
                    <el-table-column prop="id" label="ID" width="100" />
                    <el-table-column prop="name" label="名称" />
                  </el-table>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
          <div class="right">
            <div class="right-item">
              <div class="right-item-info">
                <div>个人</div>
                <div class="right-item-more" @click="goToPersonInfoPage">more>>></div>
              </div>
              <!-- <div class="green-line"></div> -->
              <div style="height: 2px; background-color: green"></div>
              <div class="right-item-name">
                <img class="right-item-icon" src="https://gitstar.com.cn/static/img/name.svg" />
                <div class="right-item-name-label">name:</div>
                <div>{{ user_name }}</div>
              </div>
              <div class="right-item-name">
                <img class="right-item-icon" src="https://gitstar.com.cn/static/img/location.svg" />
                <div class="right-item-name-label">location:</div>
                <div>{{ user_location }}</div>
              </div>
              <div style="height: 1px; background-color: gray"></div>
              <div class="right-item-name">
                <img class="right-item-icon" src="https://gitstar.com.cn/static/img/location.svg" />
                <div class="right-item-name-label">支付中心</div>
                <div>>></div>
              </div>
              <div class="right-item-name">
                <img class="right-item-icon" src="https://gitstar.com.cn/static/img/location.svg" />
                <div class="right-item-name-label">订单管理</div>
                <div>>></div>
              </div>
              <div style="height: 1px; background-color: gray"></div>
              <div class="right-item-name">
                <img class="right-item-icon" src="https://gitstar.com.cn/static/img/star.svg" />
                <div class="right-item-name-label">Star:</div>
                <div>数量</div>
              </div>
              <div class="right-item-name">
                <img class="right-item-icon" src="https://gitstar.com.cn/static/img/lock.svg" />
                <div class="right-item-name-label">Star开关:</div>
                <el-switch v-model="starSwitch"></el-switch>
              </div>
              <!--  还有两个 -->
              <svg width="100%" height="4">
                <line
                  x1="0"
                  y1="2"
                  x2="100%"
                  y2="2"
                  stroke="gray"
                  stroke-width="1"
                  stroke-dasharray="5,5"
                />
              </svg>
              <div class="right-item-name">
                <img class="right-item-icon" src="https://gitstar.com.cn/static/img/lock.svg" />
                <div class="right-item-name-label">目标仓库:</div>
                <div>获取仓库的地址</div>
              </div>
              <div style="height: 1px; background-color: black"></div>
              <div class="right-item-name">
                <img class="right-item-icon" src="https://gitstar.com.cn/static/img/star.svg" />
                <div class="right-item-name-label">Follow:</div>
                <div>数量</div>
              </div>
              <div class="right-item-name">
                <img class="right-item-icon" src="https://gitstar.com.cn/static/img/lock.svg" />
                <div class="right-item-name-label">互粉开关:</div>
                <el-switch v-model="starSwitch"></el-switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </router-view>
</template>

<style scoped lang="less">
.body-style {
  width: 100%;
  height: calc(100% - 70px);
  display: flex;

  .content {
    max-width: 1200px;
    min-width: 1024px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    width: 100%; /* 可选，设置容器宽度 */

    .left {
      width: 100% - 320px;
      display: flex;
      flex-direction: column;

      .banner-wraper {
        height: 200px;
        background: #f5f5f5;
        margin-bottom: 16px;
      }

      .action-list-wrapper {
        background: #ffffff;
        border: 1px solid #ddd;
        padding: 16px;
        border-radius: 8px;
      }
    }

    .right {
      width: 320px;
      padding-left: 16px;
      background: white;

      .right-item {
        display: flex;
        flex-direction: column;

        .right-item-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 40px;

          .right-item-icon {
            width: 20px;
            height: 20px;
            background: red;
          }

          .right-item-more {
            cursor: pointer; /* 鼠标悬停时显示手指 */

            .green-line {
              height: 2px;
              width: 100%;
              width: 100px;
              background: black;
            }
          }
        }

        .right-item-name {
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 30px;

          .right-item-icon {
            width: 20px;
            height: 20px;
          }
          .right-item-name-label {
            color: black;
            font-weight: bold;
          }
        }
      }
    }
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
