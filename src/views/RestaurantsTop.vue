<template>
  <div class="container py-5">
    <NavTabs />
    <Spinner v-if="isLoading" />
    <template v-else>

      <h1 class="mt-5">
        人氣餐廳
      </h1>

      <hr>
      <div v-for="restaurant in restaurants" :key="restaurant.id" class="card mb-3"
        style="max-width: 540px;margin: auto;">
        <div class="row no-gutters">
          <div class="col-md-4">
            <a href="#">
              <img class="card-img" :src="restaurant.image | emptyImage">
            </a>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">
                {{ restaurant.name }}
              </h5>
              <span class="badge badge-secondary">收藏數：{{ restaurant.FavoriteCount }}</span>
              <p class="card-text">
                {{ restaurant.description }}
              </p>
              <router-link to="/restaurants/1/dashboard" class="btn btn-primary mr-2">
                Show
              </router-link>

              <button v-if="restaurant.isFavorited" type="button" class="btn btn-danger mr-2"
                @click="deleteFavorite(restaurant, restaurant.id)">
                移除最愛
              </button>
              <button v-else type="button" class="btn btn-primary" @click="addFavorite(restaurant, restaurant.id)">
                加到最愛
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>

</div>
</template>
<script>
import Spinner from '@/components/Spinner'
import { emptyImageFilter } from '@/utils/mixins'
import { reqgetRestaurantsTop } from '@/apis/restaurants'
import { reqAddFavorite, reqdeleteFavorite } from '@/apis/users'
import { Toast } from '@/utils/helpers'


export default {
  name: 'RestaurantsTop',
  components: { Spinner },
  data() {
    return {
      restaurants: [],
      isLoading: false
    }
  },
  created() {
    this.fetchRestaurantsTop()
  },
  methods: {
    //連接api並取得RestaurantsTop數據
    async fetchRestaurantsTop() {
      try {
        this.isLoading = true
        const { data } = await reqgetRestaurantsTop()
        // console.log(data)
        if (data.status === "error") {
          throw new Error(data.message)
        }
        this.restaurants = data.restaurants
        this.isLoading = false

      } catch (error) {
        this.isLoading = false

        Toast.fire({
          icon: 'error',
          title: '無法將餐廳加入最愛，請稍後再試'
        })
      }
    },
    //連接api並改變user的isFavorite狀態(isFavorite=true)
    async addFavorite(restaurant, restaurantId) {
      try {
        // STEP 3: 使用撰寫好的 addFavorite 方法去呼叫 API，並取得回傳內容
        const response = await reqAddFavorite({ restaurantId })
        const { data } = response
        // STEP 4: 若請求過程有錯，則進到錯誤處理
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        // STEP 5: 請求成功的話，改變 Vue 內的資料狀態
        // restaurant.isFavorited = true
        this.fetchRestaurantsTop()

      } catch (error) {
        // STEP 6: 請求失敗的話則跳出錯誤提示

        Toast.fire({
          icon: 'error',
          title: '無法將餐廳加入最愛，請稍後再試'
        })
        console.log('error', error)
      }
    },
    //連接api並改變user的isFavorite狀態(isFavorite=true)
    async deleteFavorite(restaurant, restaurantId) {
      try {
        // STEP 3: 使用撰寫好的 addFavorite 方法去呼叫 API，並取得回傳內容
        const response = await reqdeleteFavorite({ restaurantId })
        const { data } = response
        // STEP 4: 若請求過程有錯，則進到錯誤處理
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        // STEP 5: 請求成功的話，改變 Vue 內的資料狀態
        // restaurant.isFavorited = false
        this.fetchRestaurantsTop()

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