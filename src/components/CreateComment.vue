<template>
  <form @submit.stop.prevent="addCommet">
    <div class="form-group mb-4">
      <label for="text">留下評論：</label>
      <textarea class="form-control" rows="3" name="text" v-model="text" />
    </div>
    <div class="d-flex align-items-center justify-content-between">
      <button type="button" class="btn btn-link" @click="$router.back()">回上一頁</button>
      <button type="submit" class="btn btn-primary mr-0">
        新增評論
      </button>
    </div>
  </form>
</template>
<script>
import { reqAddComment } from '@/apis/comment'
import { Toast } from '@/utils/helpers'

export default {
  data() {
    return {
      text: ''
    }
  },
  props: ['restaurant']
  ,
  methods: {
    async addCommet() {
      try {
        if (!this.text) {
          Toast.fire({
            icon: 'warning',
            title: '您尚未填寫任何評論'
          })
          return
        }
        const formdata ={
          CategoryId: this.restaurant.CategoryId,
          
        }
        const response = await reqAddComment({restaurantId: this.restaurant.id,
          text: this.text})
        // console.log(response.data)

        if (response.status === 'error') {
          throw new Error(data.message)
        }
        Toast.fire({
          icon: 'success',
          title: '新增評論成功!!'
        })
        this.$emit('after-create-comment',formdata)
        this.text = ''

      }
      catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法新增評論，請稍後再試'
        })
      }
    }
  }


}
</script>


<style scoped>
.form-group {
  margin: 21px 0 8px;
}
</style>