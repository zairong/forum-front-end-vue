<template>
  <main role="main">
    <div class="album py-5 bg-light">
      <div class="container">
        <form v-show="!isLoading" @submit.stop.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" name="name" id="name" placeholder="Enter name" value=""
              v-model="restaurant.name">
          </div>

          <div class="form-group">
            <label for="categoryId">Category</label>
            <select class="form-control" id="categoryId" name="categoryId" v-model="restaurant.CategoryId" required>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="tel">Tel</label>
            <input type="text" class="form-control" name="tel" v-model="restaurant.tel" id="tel" placeholder="Enter tel"
              value="">
          </div>

          <div class="form-group">
            <label for="address">Address</label>
            <input type="text" class="form-control" v-model="restaurant.address" name="address" id="address"
              placeholder="Enter address" value="">
          </div>

          <div class="form-group">
            <label for="opening_hours">Opening Hours</label>
            <input type="time" class="form-control" v-model="restaurant.opening_hours" name="opening_hours"
              id="opening_hours" placeholder="Enter opening_hours" value="">
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <textarea class="form-control" v-model="restaurant.description" id="description" name="description"
              rows="3"></textarea>
          </div>

          <div class="form-group">
            <label for="image">Image</label>
            <br>
            <img v-if="restaurant.image" :src="restaurant.image | emptyImage" class="d-block img-thumbnail mb-3"
              width="150" height="150">
            <br>
            <input type="file" class="form-control-file" id="image" name="image" @change="handleFileChange">
          </div>

          <button :disabled="isProcessing" type="submit" class="btn btn-primary"> {{ isProcessing ? "處理中..." : "送出" }}</button>
        </form>
      </div>
    </div>
  </main>
</template>

<script>

import { emptyImageFilter } from '@/utils/mixins'
import { reqGetCategories } from '@/apis/admin'
import { Toast } from '@/utils/helpers'

export default {
  data() {
    return {
      restaurant: {
        name: '',
        CategoryId: '',
        tel: '',
        address: '',
        description: '',
        image: '',
        opening_hours: ''
      },
      categories: [],
      isLoading: true
    }
  },
  props: {
    initialRestaurant: {
      type: Object,
      default: () => ({
        name: '',
        categoryId: '',
        tel: '',
        address: '',
        description: '',
        image: '',
        openingHours: '',
      })
    },
    isProcessing: {
      type: Boolean,
      default: false
    }
  },
  watch:{
    initialRestaurant (newValue, oldValue) {
      this.restaurant = {
        ...this.restaurant,
        ...newValue
      }
    }
  },
  created() {
    this.fetchCategories()
    this.restaurant = {
      ...this.restaurant,
      ...this.initialRestaurant
    }
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await reqGetCategories()
        // console.log(response.data)

        if (response.data.status === 'error') {
          throw new Error(data.message)
        }
        this.categories = response.data.categories
        this.isLoading = false

      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳類別，請稍後再試'
        })
      }
    },
    //修改or加入新圖
    handleFileChange(e) {
      const { files } = e.target

      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        this.restaurant.image = ''
      } else {
        // 否則產生預覽圖
        this.restaurant.image = window.URL.createObjectURL(files[0])
      }
    },
    //傳送資料
    handleSubmit(e) {
      const form = e.target  // <form></form>
      const formData = new FormData(form)
      // console.log(formData)
      this.$emit('after-submit', formData)
    }
  },
  mixins: [emptyImageFilter]
}
</script>