<template>
  <div class="container py-5">
    <form @submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="text" id="name" type="text" name="name" class="form-control" placeholder="Enter Name" required>
      </div>
      <img  :src="restaurant.image | emptyImage" class="d-block img-thumbnail mb-3" width="200"
      height="200">
      <div class="form-group">
        <label for="image">Image</label>

        <br>
        <input type="file" class="form-control-file" id="image" name="image" @change="handleFileChange">
      </div>

      <button type="submit" class="btn btn-primary">
        Submit
      </button>
    </form>
  </div>
</template>
<script>
import { emptyImageFilter } from '@/utils/mixins'
const dummyUser = {
  "restaurant": {
    "id": 1,
    "name": "root",
    "email": "root@example.com",
    "password": "$2a$10$ueY3138D8RlP4c.J8w7t/eB0wUZY4VsEwRN5e0IUOEpkDb/jvdpEm",
    "isAdmin": true,
    "image": 'https://cdn.hk01.com/di/media/images/dw/20230116/691656286319677440759402.jpeg/fIJTdHcaTijfZPLH0Tnmm7VuFW7Kj02zPqHUOz6h1Ds',
    "createdAt": "2023-01-31T15:27:30.000Z",
    "updatedAt": "2023-01-31T15:27:30.000Z",
   
  },
  "isFollowed": false
}
export default {
  data() {
    return {
      restaurant: {
        name: '',
        categoryId: '',
        tel: '',
        address: '',
        description: '',
        image: '',
        openingHours: ''
      },
      text:''
    }
  },
  created(){
    this.fetchUser()
  },
  methods: {
    fetchUser() {

      this.restaurant = dummyUser.restaurant
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
      for (let [name, value] of formData.entries()) {
        console.log(name + ': ' + value)
      }
    }
  },
  mixins: [emptyImageFilter]

}
</script>