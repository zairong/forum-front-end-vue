<template>
  <div class="row">
    <div class="col-md-12 mb-3">
      <h1>{{ restaurant.name }}</h1>
      <p class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.categoryName }}
      </p>
    </div>
    <div class="col-lg-4">
      <img class="img-responsive center-block" :src="restaurant.image | emptyImage"
        style="width: 250px;margin-bottom: 25px;">
      <div class="contact-info-wrap">
        <ul class="list-unstyled">
          <li>
            <strong>Opening Hour:</strong>
            {{ restaurant.openingHours }}
          </li>
          <li>
            <strong>Tel:</strong>
            {{ restaurant.tel }}
          </li>
          <li>
            <strong>Address:</strong>
            {{ restaurant.address }}
          </li>
        </ul>
      </div>
    </div>
    <div class="col-lg-8">
      <p>{{ restaurant.description }}</p>

      <router-link :to="{
        name: 'restaurants-dashboard',
        params: { id: restaurant.id }
      }" class="btn btn-primary btn-border mr-2">
        Dashboard
      </router-link>

      <button v-if="restaurant.isFavorited" type="button" class="btn btn-danger btn-border favorite mr-2"
        @click="deleteFavorite(restaurant.id)">
        移除最愛
      </button>
      <button v-else type="button" class="btn btn-primary btn-border favorite mr-2" @click="addFavorite(restaurant.id)">
        加到最愛
      </button>
      <button v-if="restaurant.isLiked" type="button" class="btn btn-danger like mr-2"
        @click="deleteIsLiked(restaurant.id)">
        Unlike
      </button>
      <button v-else type="button" class="btn btn-primary like mr-2" @click="addIsLiked(restaurant.id)">
        Like
      </button>

    </div>
  </div>
</template>
<script>
import { reqAddFavorite, reqdeleteFavorite, reqAddLiked, reqdeleteLiked } from '@/apis/users'
import { emptyImageFilter } from '@/utils/mixins'
import { Toast } from '@/utils/helpers'

export default {
  name: 'RestaurantDetail',
  data() {
    return {
      restaurant: this.initialRestaurant
    }
  },
  watch: {
    initialRestaurant(newValue) {
      this.restaurant = {
        ...this.restaurant,
        ...newValue
      }
    }
  },
  props: ['initial-restaurant'],
  mixins: [emptyImageFilter],
  methods: {
    //新增最愛
    async addFavorite(restaurantId) {
      try {
        // STEP 3: 使用撰寫好的 addFavorite 方法去呼叫 API，並取得回傳內容
        const response = await reqAddFavorite({ restaurantId })
        // console.log(response)
        const { data } = response
        // STEP 4: 若請求過程有錯，則進到錯誤處理
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        // STEP 5: 請求成功的話，改變 Vue 內的資料狀態
        this.restaurant.isFavorited = true
      } catch (error) {
        // STEP 6: 請求失敗的話則跳出錯誤提示

        Toast.fire({
          icon: 'error',
          title: '無法將餐廳加入最愛，請稍後再試'
        })
        console.log('error', error)
      }
    },
    //移除最愛
    async deleteFavorite(restaurantId) {
      try {
        // STEP 3: 使用撰寫好的 addFavorite 方法去呼叫 API，並取得回傳內容
        const response = await reqdeleteFavorite({ restaurantId })
        const { data } = response
        // STEP 4: 若請求過程有錯，則進到錯誤處理
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        // STEP 5: 請求成功的話，改變 Vue 內的資料狀態
        this.restaurant.isFavorited = false
      } catch (error) {
        // STEP 6: 請求失敗的話則跳出錯誤提示

        Toast.fire({
          icon: 'error',
          title: '無法將餐廳加入最愛，請稍後再試'
        })
        console.log('error', error)
      }
    },
    // 新增喜歡
    async addIsLiked(restaurantId) {
      try {
        // STEP 3: 使用撰寫好的 addFavorite 方法去呼叫 API，並取得回傳內容
        const response = await reqAddLiked({ restaurantId })
        const { data } = response
        // STEP 4: 若請求過程有錯，則進到錯誤處理
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        // STEP 5: 請求成功的話，改變 Vue 內的資料狀態
        this.restaurant.isLiked = true
      } catch (error) {
        // STEP 6: 請求失敗的話則跳出錯誤提示

        Toast.fire({
          icon: 'error',
          title: '無法將餐廳加入最愛，請稍後再試'
        })
        console.log('error', error)
      }
    },
    // 移除喜歡
    async deleteIsLiked(restaurantId) {
      try {
        // STEP 3: 使用撰寫好的 addFavorite 方法去呼叫 API，並取得回傳內容
        const response = await reqdeleteLiked({ restaurantId })
        const { data } = response
        // STEP 4: 若請求過程有錯，則進到錯誤處理
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        // STEP 5: 請求成功的話，改變 Vue 內的資料狀態
        this.restaurant.isLiked = false
      } catch (error) {
        // STEP 6: 請求失敗的話則跳出錯誤提示

        Toast.fire({
          icon: 'error',
          title: '無法將餐廳加入最愛，請稍後再試'
        })
        console.log('error', error)
      }
    },
  }

}
</script>

<style scoped>
.col-lg-8 p,
.contact-info-wrap li,
.contact-info-wrap strong {
  font-family: serif;
  font-size: 17px;
}
</style>