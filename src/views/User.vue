<template>

  <main role="main">
    <div class="album py-5 bg-light">
      <div class="container">
        <UserProfileCard :profile="profile" />

        <div class="row">
          <div class="col-md-4">
            <UserFollowingsCard :profile="profile" />
            <br>
            <UserFollowersCard :profile="profile" />
          </div>
          <div class="col-md-8">
            <UserCommentsCard :profile="profile" />
            <br>
            <UserFavoritedRestaurantsCard :profile="profile" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import UserProfileCard from '@/components/UserProfileCard'
import UserFollowingsCard from '@/components/UserFollowingsCard'
import UserFollowersCard from '@/components/UserFollowersCard'
import UserCommentsCard from '@/components/UserCommentsCard'
import UserFavoritedRestaurantsCard from '@/components/UserFavoritedRestaurantsCard'
import { reqGetUsersInfo } from '@/apis/users'
import { Toast } from '@/utils/helpers'


export default {
  name: 'User',
  components: {
    UserProfileCard,
    UserFollowingsCard,
    UserFollowersCard,
    UserCommentsCard,
    UserFavoritedRestaurantsCard
  },
  data() {
    return {
      profile: {},
      isFollowed: false,
    }
  },
  created() {
    const { id } = this.$route.params
    this.getUserInfo({ userId: id })
  },
  methods: {

    //取得對應id的使用者資訊
    async getUserInfo({ userId }) {
      try {

        const response = await reqGetUsersInfo({ userId })
        // console.log(response)
        console.log(response.data)
        const { profile, isFollowed } = response.data
        this.profile = profile
        this.isFollowed = isFollowed
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者資料，請稍後再試'
        })
      }

    }

  },
  beforeRouteUpdate(to, from, next) {
    // 路由改變時重新抓取資料
    const { id } = to.params
    this.getUserInfo({ userId: id })
    next()
  },
}
</script>