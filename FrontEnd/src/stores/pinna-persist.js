// pinna-persist.js
export const pinnaPersist = (store) => {
  store.subscribe((mutation, state) => {
    // 将状态同步到 localStorage
    localStorage.setItem('user', JSON.stringify(state.user))
    localStorage.setItem('isAuthenticated', JSON.stringify(state.isAuthenticated))
  })
}
