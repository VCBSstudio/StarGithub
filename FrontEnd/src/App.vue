<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { useRoute } from 'vue-router'; // 导入 useRoute
import router from './router';
import { ref, onMounted } from 'vue'
import axios from 'axios'


interface Tab {
  name: string;
  label: string;
  content: string;
  loaded: boolean;
  data: Array<{ id: number; name: string }>;
}

// GitHub OAuth 配置
const CLIENT_SECRET="86e5be880237a24cacd0760070287963e92d3cf5"
const clientId = '30c256b4116d1f32fc2a'; // 你从 GitHub 获取的 Client ID
const redirectUri = "http://localhost:5173";; // OAuth 回调地址，通常是你的应用中的某个路径

// 重定向到 GitHub 授权页面
const redirectToGitHubAuth = () => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;
  // const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&scope=read:user user:email`;
  window.location.href = githubAuthUrl;
}

const code = ref<string | null>(null)
onMounted(async () => {
  // 获取当前URL中的查询参数部分
  const params = new URLSearchParams(window.location.search)
  console.log('window.location.search :', params);

  // 获取指定的查询参数值
  code.value = params.get('code') // 获取 'code' 参数
  console.log('.code.value :', code.value);
  if (code.value) {
    // router.push({ path: '/index' })
     // 用授权码换取访问令牌
     const tokenResponse = await axios.post(
            'https://github.com/login/oauth/access_token',
            {
                client_id: clientId,
                client_secret: CLIENT_SECRET,
                code: code,
            },
            {
                headers: { Accept: 'application/json' },
            }
        );

        const accessToken = tokenResponse.data.access_token;

        // 用访问令牌获取用户信息
        const userResponse = await axios.get('https://api.github.com/user', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        const userData = userResponse.data;
        // console.log('userData :' +  ruserData);
  } else {
    ElMessage.error('获取code失败，请重新登录')
  }
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
]);

// 当前激活的选项卡 name
const activeName = ref<string>(tabs.value[0].name);

// 模拟加载数据函数
const loadData = (tab: Tab) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: `${tab.label} - 数据1` },
        { id: 2, name: `${tab.label} - 数据2` },
      ]);
    }, 1000);
  });
};

// 点击选项卡事件处理
const handleClick = async (tabInstance: any) => {
  const name = tabInstance.props.name; // 通过 props 访问 name
  console.log('当前点击的选项卡 name:', name);

  // 查找对应的 Tab 数据
  const targetTab = tabs.value.find((t) => t.name === name);

  if (targetTab && !targetTab.loaded) {
    targetTab.content = `${targetTab.label} - 加载中...`;

    try {
      const result = (await loadData(targetTab)) as Array<{ id: number; name: string }>;
      targetTab.data = result; // 更新数据
      targetTab.content = ''; // 清空加载中消息
      targetTab.loaded = true;
    } catch (error) {
      ElMessage.error('加载失败，请重试');
    }
  }
};



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
          <div class="login">App登录</div>
          <div class="user-info" @click="redirectToGitHubAuth">
            <div class="name">name</div>
            <img src="https://gitstar.com.cn/static/img/logo_white.png" class="user-avatar" />
          </div>
        </div>
      </div>
    </header>
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
          <ElButton type="primary">Primary Button</ElButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.body-style {
  width: 100%;
  height: calc(100% - 70px);
  display: flex;

  .content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;

    .left {
      width: 70%;
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
      width: 30%;
      padding-left: 16px;
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
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      align-items: center;

      .style-img {
        width: 50px;
        margin-right: 16px;
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
