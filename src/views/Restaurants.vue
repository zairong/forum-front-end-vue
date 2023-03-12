<template>
  <div class="container py-5">

    <Spinner v-if="isLoading" />

    <template v-else>
      <NavTabs />
      <!-- 餐廳類別標籤 RestaurantsNavPills -->
      <RestaurantsNavPills :categories="categories" />
      <div class="row">
        <!-- 餐廳卡片 RestaurantCard-->
        <RestaurantCard v-for="restaurant in restaurants" :key="restaurant.id" :initial-restaurant="restaurant" />
      </div>
      <!-- 分頁標籤 RestaurantPagination -->
      <RestaurantPagination v-if="totalPage.length > 1" :categoryId="categoryId" :currentPage="currentPage"
        :totalPage="totalPage" :previousPage="previousPage" :nextPage="nextPage" />
      <div v-if="restaurants.length < 1">此類別目前沒餐廳資料</div>
    </template>
</div>
</template>

<script>
import Spinner from '@/components/Spinner'
import RestaurantCard from '@/components/RestaurantCard'
import RestaurantsNavPills from '@/components/RestaurantsNavPills'
import RestaurantPagination from '@/components/RestaurantsPagination'
import { Toast } from '@/utils/helpers'
import { getRestaurants } from '@/apis/restaurants'
// import { mapState } from 'vuex'


export default {
  name: 'Restaurants',
  components: {
    RestaurantCard,
    RestaurantsNavPills,
    RestaurantPagination,
    Spinner

  },
  data() {
    return {
      restaurants: [],
      categories: [],
      categoryId: -1,
      currentPage: 1,
      totalPage: [],
      previousPage: -1,
      nextPage: -1,
      isLoading: false
    }
  },
  created() {

    const { page = "", categoryId = "" } = this.$route.query
    // console.log(categoryId)
    //呼叫axios連接api取得數據並將資料放入data存取數據
    this.fetchRestaurants({ queryPage: page, queryCategoryId: categoryId })
    // this.$store.dispatch('restaurants/getRestaurants')

    // this.chooseRestaurants({ queryPage: page, queryCategoryId: categoryId })
  },
  // computed: {
  //   ...mapState('restaurants', ['Restaurants', 'Categories'])
  // },
  beforeRouteUpdate(to, from, next) {
    const { page = '', categoryId = '' } = to.query
    this.fetchRestaurants({ queryPage: page, queryCategoryId: categoryId })
    // this.chooseRestaurants({ queryPage: page, queryCategoryId: categoryId })

    next()
  },
  methods: {
    async fetchRestaurants({ queryPage, queryCategoryId }) {
      try {
        this.isLoading = true
        const response = await getRestaurants({
          page: queryPage,
          categoryId: queryCategoryId
        })
        // console.log(response.data)
        // STEP 2：透過解構賦值，將所需要的資料從 response.data 取出
        const {
          restaurants,
          categories,
          categoryId,
          page,
          totalPage,
          prev,
          next
        } = response.data

        // STEP 3：將從伺服器取得的 data 帶入 Vue 內
        this.restaurants = restaurants
        this.categories = categories
        this.categoryId = categoryId
        this.currentPage = page
        this.totalPage = totalPage
        this.previousPage = prev
        this.nextPage = next
        this.isLoading = false

      } catch (error) {
        this.isLoading = false

        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }
    },

    // chooseRestaurants({ queryPage, queryCategoryId }) {

    //   //網頁沒有Category參數,取得全部餐廳信息(餐廳首頁)
    //   if (queryCategoryId === "" || queryPage === "") {

    //     //計算出共幾頁,1頁10筆資料
    //     const numPage = 10
    //     const Pages = Math.ceil(this.Restaurants.length / numPage)
    //     //顯示分頁長度
    //     for (let i = 1; i <= Pages; i++) {
    //       this.TotalPage.push(i)
    //     }
    //     //以queryPage參數,篩選出個別餐廳信息
    //     //(ex:queryPage=2 ,餐廳信息為:第10位之後信息,最多10個 )
    //     function pagination(Pages, numPage, data) {
    //       let startIndex = (Pages - 1) * numPage
    //       let endIndex = startIndex + numPage
    //       let filteredData = data.slice(startIndex, endIndex)
    //       return filteredData
    //     }
    //     //全部的餐廳信息(含分頁)
    //     if (queryPage === 1) { 
    //       this.categories = this.Categories
    //       this.categoryId = { ...this.categoryId }
    //       this.currentPage = queryPage
    //       this.totalPage = this.TotalPage
    //       this.previousPage = queryPage
    //       this.nextPage = queryPage + 1
    //       this.restaurants = pagination(queryPage, numPage, this.Restaurants)

    //     } else if (queryPage ===this.TotalPage) {
    //       this.categories = this.Categories
    //       this.categoryId = { ...this.categoryId }
    //       this.currentPage = queryPage
    //       this.totalPage = this.TotalPage
    //       this.previousPage = queryPage - 1
    //       this.nextPage = queryPage 
    //       this.restaurants = pagination(queryPage, numPage, this.Restaurants)
    //     }else{
    //       this.categories = this.Categories
    //       this.categoryId = { ...this.categoryId }
    //       this.currentPage = queryPage
    //       this.totalPage = this.TotalPage
    //       this.previousPage = queryPage - 1
    //       this.nextPage = queryPage + 1
    //       this.restaurants = pagination(queryPage, numPage, this.Restaurants)
    //     }


    //   }
    //   else {

    //     function pagination(page, numPage, id, data) {
    //       let filteredData = data.filter(function (item) {
    //         return item.CategoryId === id
    //       })
    //       let startIndex = (page - 1) * numPage
    //       let endIndex = startIndex + numPage
    //       filteredData = filteredData.slice(startIndex, endIndex)
    //       return filteredData
    //     }

    //     let numPage = 10
    //     let result = pagination(queryPage, numPage, queryCategoryId, this.Restaurants)
    //     console.log(result)


    //   }
    // }
  }
}
</script>
