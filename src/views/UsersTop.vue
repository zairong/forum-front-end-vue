<template>
  <div class="container py-5">
    <NavTabs />
    <Spinner v-if="isLoading" />
    <template v-else>

      <h1 class="mt-5">
        美食達人
      </h1>
      <hr>
      <div class="row text-center">
        <div class="col-3" v-for="user in users" :key="user.id">
          <a href="#">
            <img :src="user.image | emptyImage" width="140px" height="140px">
          </a>
          <h2>{{ user.name }}</h2>
          <span class="badge badge-secondary">追蹤人數：{{ user.FollowerCount }}</span>
          <p class="mt-3">
            <button v-if="user.isFollowed" type="button" class="btn btn-danger" @click="deleteFollowing(user, user.id)">
              取消追蹤
            </button>
            <button v-else type="button" class="btn btn-primary" @click="addFollowing(user, user.id)">
              追蹤
            </button>
          </p>
        </div>
      </div>
    </template>
</div>
</template>
<script>
import Spinner from '@/components/Spinner'
import { emptyImageFilter } from '@/utils/mixins'
import { reqgetTopUsers, reqaddFollowing, reqdeleteFollowing } from '@/apis/users'
import { Toast } from '@/utils/helpers'

export default {
  name: 'UsersTop',
  data() {
    return {
      users: [],
      isLoading: false

    }
  },
  components:{ Spinner }
  ,
  created() {
    this.fetchTopUsers()
  },
  methods: {
    //連接api並取得users數據
    async fetchTopUsers() {
      try {
        this.isLoading= true

        const { data } = await reqgetTopUsers()
        // console.log(data)
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.users = data.users
        this.isLoading= false

      } catch (error) {
        this.isLoading= true
        Toast.fire({

          icon: 'error',
          title: '無法將餐廳加入最愛，請稍後再試'
        })
        // console.log('error', error)
      }
    },
    //加入追蹤
    async addFollowing(user, userId) {
      try {
        
        // STEP 3: 使用撰寫好的 addFavorite 方法去呼叫 API，並取得回傳內容
        const response = await reqaddFollowing({ userId })
        const { data } = response
        // STEP 4: 若請求過程有錯，則進到錯誤處理
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        // STEP 5: 請求成功的話，改變 Vue 內的資料狀態
        user.isFollowed = true
        // user.FollowerCount = user.FollowerCount + 1
        this.fetchTopUsers()
      } catch (error) {
        // STEP 6: 請求失敗的話則跳出錯誤提示

        Toast.fire({
          icon: 'error',
          title: '無法將餐廳加入最愛，請稍後再試'
        })
        console.log('error', error)
      }
    },
    //移除追蹤
    async deleteFollowing(user, userId) {
      try {
        // STEP 3: 使用撰寫好的 addFavorite 方法去呼叫 API，並取得回傳內容
        const response = await reqdeleteFollowing({ userId })
        const { data } = response
        // STEP 4: 若請求過程有錯，則進到錯誤處理
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        // STEP 5: 請求成功的話，改變 Vue 內的資料狀態
        user.isFollowed = false
        // user.FollowerCount = user.FollowerCount - 1
        this.fetchTopUsers()

      } catch (error) {
        // STEP 6: 請求失敗的話則跳出錯誤提示

        Toast.fire({
          icon: 'error',
          title: '無法將餐廳加入最愛，請稍後再試'
        })
        console.log('error', error)
      }
    },
  },
  mixins: [emptyImageFilter]

}
</script>