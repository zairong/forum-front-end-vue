<template>
  <div class="container py-5">
    <!-- 餐廳表單 AdminRestaurantForm -->
    <AdminRestaurantsForm :initialRestaurant="restaurant" @after-submit="handleAfterSubmit"
      :isProcessing="isProcessing" />
  </div>
</template>
<script>
import AdminRestaurantsForm from '@/components/AdminRestaurantsForm'
import { reqGetRestaurantDetail, reqUpdateRestaurants } from '@/apis/admin'
import { Toast } from '@/utils/helpers'
export default ({
  name: 'AdminRestaurantEdit',
  data() {
    return {
      restaurant: {},
      isProcessing: false
    }
  },
  components: {
    AdminRestaurantsForm
  },
  created() {
    const { id } = this.$route.params
    this.fetchRestaurant(id)
  },
  beforeRouteUpdate (to, from, next) {
    // 路由改變時重新抓取資料
    const { id } = to.params
    this.fetchRestaurant(id)
    next()
  },
  methods: {
    //取得餐廳個別詳情資訊
    async fetchRestaurant(restaurantId) {
      try {
        const response = await reqGetRestaurantDetail({ restaurantId })
        // console.log(response.data)
        if (response.status === 'error') {
          throw new Error(response.statusText)
        }
        this.restaurant = response.data.restaurant
      } catch (error) {

        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資訊，請稍後再試'
        })
      }

    },
    async handleAfterSubmit(formData) {
      // 透過 API 將表單資料送到伺服器
      try {
      
        this.isProcessing = true
        const { data } = await reqUpdateRestaurants(
          { restaurantId: this.restaurant.id, formData })
        // console.log(data)
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.$router.push({ name: 'admin-restaurants' })

      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法修改餐廳內容，請稍後再試'
        })
      }
    }
  }
})
</script>
