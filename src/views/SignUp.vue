<template>
  <div class="container py-5">
    <form class="w-100" @submit.stop.prevent="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">
          Sign Up
        </h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="name">Name</label>
        <input id="name" v-model="name" name="name" type="text" class="form-control" placeholder="name"
          autocomplete="username" required autofocus>
      </div>

      <div class="form-label-group mb-2">
        <label for="email">Email</label>
        <input id="email" v-model="email" name="email" type="email" class="form-control" placeholder="email"
          autocomplete="email" required>
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input id="password" v-model="password" name="password" type="password" class="form-control"
          placeholder="Password" autocomplete="new-password" required>
      </div>

      <div class="form-label-group mb-3">
        <label for="password-check">Password Check</label>
        <input id="password-check" v-model="passwordCheck" name="passwordCheck" type="password" class="form-control"
          placeholder="Password" autocomplete="new-password" required>
      </div>

      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit" :disabled="isProcessing">
        Submit
      </button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signin">
            Sign In
          </router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">
        © 2022-2023
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
      name: '',
      email: '',
      password: '',
      passwordCheck: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit() {
      try {

        if (!this.email || !this.password || !this.name || !this.passwordCheck) {
          Toast.fire({
            icon: 'warning',
            title: '請填入 email 和 password'
          })
          return
        }
        if (this.passwordCheck !== this.password) {
          Toast.fire({
            icon: 'warning',
            title: '兩次密碼輸入不同！'
          })
          return
        }

        this.isProcessing = true

        const response = await authorizationAPI.signUp({
          name: this.name,
          email: this.email,
          password: this.password,
          passwordCheck: this.passwordCheck
        })
        this.isProcessing = false
        //狀態error 拋出錯誤
        if (response.data.status === 'error') {
          throw new Error(response.data.message)
        }
        // TODO: 向後端驗證使用者登入資訊是否合法
        this.$router.push('/signin')

      } catch (error) {
        //錯誤信息,submit改回可動作
        this.isProcessing = false

        // 將密碼欄位清空
        this.passwordCheck = ''
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