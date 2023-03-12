<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <router-link :to="{ name: 'restaurants' }" class="navbar-brand">
      餐廳評論網
    </router-link>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon" />
    </button>

    <div id="navbarSupportedContent" class="navbar-collapse collapse">
      <div class="ml-auto d-flex align-items-center">
        <!-- is user is admin -->
        <router-link to="/admin/restaurants" class="text-white mr-3" v-if="currentUser.isAdmin">
          管理員後台
        </router-link>

        <!-- is user is login -->
        <router-link :to="{ name: 'users-id', params: { id: currentUser.id } }" class="text-white mr-3"
          v-if="isAuthenticated">
          {{ currentUser.name }} 您好
        </router-link>
        <button v-if="isAuthenticated" type="button" class="btn btn-sm btn-outline-success my-2 my-sm-0" @click="logout">
          登出
        </button>
        <button v-else type="button" class="btn btn-sm btn-outline-success my-2 my-sm-0">
          登入
        </button>
      </div>
    </div>
</nav>
</template>

<script>
import { mapState } from 'vuex'


export default {
  // Vue 會在沒有資料時使用此預設值
  name: 'NavBar',
  computed: {
    ...mapState('user', ['currentUser', 'isAuthenticated'])
  },
  methods: {
    logout() {
      this.$store.commit('user/revokeAuthentication')
      this.$router.push('/signin')
    }
  }

}
</script>

<style scoped>
  .navbar-toggler {
    min-width: 70px;
    margin-right: 0;
  }

  nav.bg-dark {
    padding: 14px 16px;
    background-color: #bd2333 !important;
  }

  .navbar-brand {
    font-size: 19px;
    padding: 0;
}
</style>