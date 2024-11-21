// import { defineStore } from 'pinia'

// export const useAuthStore = defineStore('auth', {
//   state: () => ({
//     githubAccessToken: null as string | null, // 修改类型定义
//   }),
//   actions: {
//     setAccessToken(token: string) {
//       this.githubAccessToken = token
//     },
//     clearAccessToken() {
//       this.githubAccessToken = null
//     },
//   },
// })
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    githubAccessToken: localStorage.getItem('githubAccessToken') || null, // 从 localStorage 获取 token
  }),
  actions: {
    setAccessToken(token: string) {
      this.githubAccessToken = token
      localStorage.setItem('githubAccessToken', token) // 保存到 localStorage
    },
    clearAccessToken() {
      this.githubAccessToken = null
      localStorage.removeItem('githubAccessToken') // 清除 localStorage 中的 token
    },
  },
})
