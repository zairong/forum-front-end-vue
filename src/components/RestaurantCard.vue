<template>
  <div class="col-md-6 col-lg-4">
    <div class="card mb-4">
      <img class="card-img-top" :src="restaurant.image" alt="Card image cap" width="286px" height="180px">
      <div class="card-body">
        <p class="card-text title-wrap">
          <router-link :to="{ name: 'restaurant', params: { id: restaurant.id } }">
            {{ restaurant.name }}
          </router-link>
        </p>
        <span class="badge badge-secondary">{{ restaurant.Category.name }}</span>
        <p class="card-text text-truncate">
          {{ restaurant.description }}
        </p>
      </div>
      <div class="card-footer">
        <button v-if="restaurant.isFavorited" type="button" :disabled="isProcessing"
          class="btn btn-danger btn-border favorite mr-2" @click="deleteFavorite(restaurant.id)">
          移除最愛
        </button>
        <button v-else type="button" :disabled="isProcessing" class="btn btn-primary btn-border favorite mr-2"
          @click="addFavorite(restaurant.id)">
          加到最愛
        </button>
        <button v-if="restaurant.isLiked" :disabled="isProcessing" type="button" class="btn btn-danger like mr-2"
          @click="deleteIsLiked(restaurant.id)">
          Unlike
        </button>
        <button v-else type="button" :disabled="isProcessing" class="btn btn-primary like mr-2"
          @click="addIsLiked(restaurant.id)">
          Like
        </button>
      </div>
    </div>
</div>
</template>
<script>
import { emptyImageFilter } from '@/utils/mixins'
import { reqAddFavorite, reqdeleteFavorite, reqAddLiked, reqdeleteLiked } from '@/apis/users'
import { Toast } from '@/utils/helpers'
export default {
  props: ['initialRestaurant']
  ,
  data() {
    return {
      restaurant: this.initialRestaurant,
      isProcessing: false
    }
  },
  methods: {
    //新增最愛
    async addFavorite(restaurantId) {
      try {
        this.isProcessing = true
        // STEP 3: 使用撰寫好的 addFavorite 方法去呼叫 API，並取得回傳內容
        const response = await reqAddFavorite({ restaurantId })
        const { data } = response
        // STEP 4: 若請求過程有錯，則進到錯誤處理
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        // STEP 5: 請求成功的話，改變 Vue 內的資料狀態
        this.isProcessing = false

        this.restaurant.isFavorited = true
      } catch (error) {
        // STEP 6: 請求失敗的話則跳出錯誤提示
        this.isProcessing = false

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
        this.isProcessing = true

        // STEP 3: 使用撰寫好的 addFavorite 方法去呼叫 API，並取得回傳內容
        const response = await reqdeleteFavorite({ restaurantId })
        const { data } = response
        // STEP 4: 若請求過程有錯，則進到錯誤處理
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        // STEP 5: 請求成功的話，改變 Vue 內的資料狀態
        this.restaurant.isFavorited = false
        this.isProcessing = false

      } catch (error) {
        // STEP 6: 請求失敗的話則跳出錯誤提示
        this.isProcessing = false

        Toast.fire({
          icon: 'error',
          title: '無法將餐廳加入最愛，請稍後再試'
        })
        console.log('error', error)
      }
    },
    //新增喜歡
    async addIsLiked(restaurantId) {
      try {
        this.isProcessing = true

        // STEP 3: 使用撰寫好的 addFavorite 方法去呼叫 API，並取得回傳內容
        const response = await reqAddLiked({ restaurantId })
        const { data } = response
        // STEP 4: 若請求過程有錯，則進到錯誤處理
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        // STEP 5: 請求成功的話，改變 Vue 內的資料狀態
        this.restaurant.isLiked = true
        this.isProcessing = false

      } catch (error) {
        // STEP 6: 請求失敗的話則跳出錯誤提示
        this.isProcessing = false

        Toast.fire({
          icon: 'error',
          title: '無法將餐廳加入最愛，請稍後再試'
        })
        console.log('error', error)
      }
    },
    //移除喜歡
    async deleteIsLiked(restaurantId) {
      try {
        this.isProcessing = true

        // STEP 3: 使用撰寫好的 addFavorite 方法去呼叫 API，並取得回傳內容
        const response = await reqdeleteLiked({ restaurantId })
        const { data } = response
        // STEP 4: 若請求過程有錯，則進到錯誤處理
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        // STEP 5: 請求成功的話，改變 Vue 內的資料狀態
        this.restaurant.isLiked = false
        this.isProcessing = false

      } catch (error) {
        // STEP 6: 請求失敗的話則跳出錯誤提示
        this.isProcessing = false

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

<style scoped>
.badge.badge-secondary {
  padding: 0;
  margin: 8px 0;
  color: #bd2333;
  background-color: transparent;
}

.btn,
.btn-border.btn:hover {
  margin: 7px 14px 7px 0;
}

.card {
  margin-bottom: 2rem !important;
}

.card-img-top {
  background-color: #EFEFEF;
}

.card-body {
  padding: 17.5px;
}

.card-footer {
  padding: 9px 17.5px;
  border-color: rgb(232, 232, 232);
  background: white;
}
</style>