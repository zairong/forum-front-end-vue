<template>
  <div class="container py-5">
    <h1>餐廳描述頁</h1>
    <!-- 餐廳資訊頁 RestaurantDetail -->
    <RestaurantDetail :initial-restaurant="restaurant" />
    <hr>
    <!-- 餐廳評論 RestaurantComments -->
    <RestaurantComments :restaurantComments="restaurantComments" @after-delete-comment="afterDeleteComment" />
    <!-- 新增評論 CreateComment -->
    <CreateComment @after-create-comment="afterCreateComment" :restaurant="restaurant" />
  </div>
</template>

<script>
import RestaurantDetail from '@/components/RestaurantDetail'
import RestaurantComments from '@/components/RestaurantComments'
import CreateComment from '@/components/CreateComment'
import { reqGetRestaurant } from '@/apis/restaurants'
import { Toast } from '@/utils/helpers'
import { mapState } from 'vuex'

export default {
  name: 'RestaurantShow'
  ,
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment
  }
  ,
  data() {
    return {
      restaurant: {
        id: -1,
        name: '',
        categoryName: '',
        image: '',
        openingHours: '',
        tel: '',
        address: '',
        description: '',
        isFavorited: false,
        isLiked: false
      },
      restaurantComments: [],
    }
  },
  computed: {
    ...mapState('user', ['currentUser'])
  },
  created() {
    const { id } = this.$route.params
    this.fetchRestaurant(id)
  },
  beforeRouteUpdate(to, from, next) {
    const { id: restaurantId } = to.params
    this.fetchRestaurant(restaurantId)
    next()
  },
  methods: {
    //取得個別餐廳信息
    async fetchRestaurant(restaurantId) {
      try {
        // STEP 4: 透過 restaurantsAPI 取得餐廳資訊
        const { data } = await reqGetRestaurant({ restaurantId })
        // console.log(data)
        // STEP 5: 透過 restaurantsAPI 取得餐廳資訊
        const { restaurant, isFavorited, isLiked } = data
        const {
          id,
          name,
          Category,
          image,
          opening_hours: openingHours,
          tel,
          address,
          description,
          Comments
        } = restaurant

        this.restaurant = {
          id,
          name,
          categoryName: Category ? Category.name : '未分類',
          image,
          openingHours,
          tel,
          address,
          description,
          isFavorited,
          isLiked
        }
        this.restaurantComments = Comments
      } catch (error) {
        // STEP 6: 透過 restaurantsAPI 取得餐廳資訊
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }
    }
    ,
    afterDeleteComment(CommentId) {
      this.restaurantComments = this.restaurantComments.filter(comment => comment.id !== CommentId)
    },
    afterCreateComment(formdata) {
      // console.log(formdata)
      const {  restaurantId, text } = formdata
      this.restaurantComments.push({
        RestaurantId: restaurantId,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name
        },
        text,
        createdAt: new Date()
      })
      this.fetchRestaurant(this.$route.params.id)

    }

  }
}
</script>

<style>

</style>