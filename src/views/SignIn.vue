<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">
          Sign In
        </h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="email">email</label>
        <input id="email" name="email" type="email" class="form-control" placeholder="email" autocomplete="username"
          autofocus v-model="email">
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input id="password" name="password" type="password" class="form-control" placeholder="Password"
          autocomplete="current-password" v-model="password">
      </div>

      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit" :disabled="isProcessing">
        Submit
      </button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signup">
            Sign Up
          </router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">
        &copy; 2022-2023
      </p>
    </form>
  </div>
</template>

<script>
import authorizationAPI from '@/apis/authorization'
import { Toast } from '@/utils/helpers'

export default {
  data() {
    return {
      email: '',
      password: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.email || !this.password) {
          Toast.fire({
            icon: 'warning',
            title: '請填入 email 和 password'
          })
          return
        }
        //送出表單,submit變不能動作
        this.isProcessing = true

        // 使用 authorizationAPI 的 signIn 方法
        // 並且帶入使用者填寫的 email 和 password
        const response = await authorizationAPI.signIn({
          email: this.email,
          password: this.password
        })

        //接受到回應資料,submit改回可動作
        this.isProcessing = false
        // console.log(response)
        // console.log(response.data)

        const { data } = response
        // console.log(data)
        //狀態error 拋出錯誤
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        //成功則跳轉餐廳頁面
        localStorage.setItem('token', data.token)
        // this.$store.commit('user/setCurrentUser', data.user)
        this.$router.push('/restaurants')


      } catch (error) {
        //錯誤信息,submit改回可動作
        this.isProcessing = false

        // 將密碼欄位清空
        this.password = ''
        // 顯示錯誤提示
        Toast.fire({
          icon: 'warning',
          title: '請確認您輸入了正確的帳號密碼'
        })
      }

    }
  }
}
</script>