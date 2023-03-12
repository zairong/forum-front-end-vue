<template>
  <div class="container py-5">
    <NavTabs />
    <Spinner v-if="isLoading" />
    <template v-else>
      <h1 class="mt-5">
        最新動態
      </h1>
      <hr>
      <div class="row">
        <div class="col-md-6">
          <h3>最新餐廳</h3>
          <!-- 最新餐廳 NewestRestaurants -->
          <NewestRestaurants :restaurants="restaurants" />
        </div>
        <div class="col-md-6">
          <!-- 最新評論 NewestComments-->
          <h3>最新評論</h3>
          <NewestComments :comments="comments" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import NewestRestaurants from '@/components/NewestRestaurants'
import NewestComments from '@/components/NewestComments'
import { reqGetRestaurantsFeeds } from '@/apis/restaurants'
import Spinner from '@/components/Spinner'
import { Toast } from './../utils/helpers'

export default {
  name: 'RestaurantsFeeds'
  ,
  components: {
    NewestRestaurants,
    NewestComments,
    Spinner
  },
  created() {
    this.fetchFeeds()
  },
  data() {
    return {
      restaurants: [],
      comments: [],
      isLoading: true
    }
  },
  methods: {
    async fetchFeeds() {
      try {
        this.isLoading = true
        const response = await reqGetRestaurantsFeeds()
        // console.log(response.data)
        this.restaurants = response.data.restaurants
        this.comments = response.data.comments.filter(
          comment => comment.Restaurant && comment.text
        )
        this.isLoading = false
      } catch (error) {
        this.isLoading = false

        Toast.fire({
          icon: 'error',
          title: '無法取得最新動態，請稍後再試'
        })
      }
    }
  }
  ,
  created() {
    this.fetchFeeds()
  },
}
</script>