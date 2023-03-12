import { reqGetCurrentUser } from '@/apis/users'

const state = {
  currentUser: {
    id: -1,
    name: '',
    email: '',
    image: '',
    isAdmin: false
  },
  isAuthenticated: false,
  token: ''
}
const mutations = {
  setCurrentUser(state, currentUser) {
    state.currentUser = {
      ...state.currentUser,
      // 將 API 取得的 currentUser 覆蓋掉 Vuex state 中的 currentUser
      ...currentUser
    }
    // 將使用者驗證用的 token 儲存在 state 中
    state.token = localStorage.getItem('token')
    // 將使用者的登入狀態改為 true
    state.isAuthenticated = true
  },
  revokeAuthentication(state) {
    state.currentUser = {}
    localStorage.removeItem('token')
    // 登出時一併將 state 內的 token 移除
    state.token = ''
    state.isAuthenticated = false
  }
}
const actions = {
  async fetchCurrentUser({ commit }) {
    try {
      // 呼叫 usersAPI.getCurrentUser() 方法，並將 response 顯示出來
      const response = await reqGetCurrentUser()
      // console.log('response', response)
      const { id, name, email, image, isAdmin } = response.data
      commit('setCurrentUser', {
        id,
        name,
        email,
        image,
        isAdmin
      })
      return true  // add this line
    } catch (error) {
      console.log('error', error)
      // 驗證失敗的話一併觸發登出的行為，以清除 state 中的 token
      commit('user/revokeAuthentication')
      return false  // add this line
    }
  }
}
const getters = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}