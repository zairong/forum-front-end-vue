<template>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">
          #
        </th>
        <th scope="col">
          Category
        </th>
        <th scope="col">
          Name
        </th>
        <th scope="col" width="300">
          操作
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="restaurant in restaurants" :key="restaurant.id">
        <th scope="row">
          {{ restaurant.id }}
        </th>
        <td>{{ restaurant.Category ? restaurant.Category.name : '未分類' }}</td>
        <td>{{ restaurant.name }}</td>
        <td class="d-flex justify-content-between">
          <router-link :to="{ name: 'admin-restaurants-id', params: { id: restaurant.id } }" class="btn btn-link">
            Show
          </router-link>

          <router-link :to="{
            name: 'admin-restaurant-edit',
            params: { id: restaurant.id }
          }" class="btn btn-link">Edit</router-link>

          <button type="button" class="btn btn-link" @click="deleteRestaurant(restaurant.id)">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { reqGetRestaurants, reqDeleteRestaurants } from '@/apis/admin'
import { Toast } from '@/utils/helpers'

export default {
  name: 'AdminRestaurantsTable'
  ,
  data() {
    return {
      restaurants: []
    }
  },
  created() {
    this.fetchRestaurants()
  },
  methods: {
    //取得所有餐廳資訊
    async fetchRestaurants() {
      try {
        const response = await reqGetRestaurants()
        // console.log(response.data)
        if (response.status === 'error') {
          throw new Error(response.statusText)
        }
        this.restaurants = response.data.restaurants

      } catch (error) {

        Toast.fire({
          icon: 'error',
          title: '無法讀取餐廳資料，請稍後再試'
        })
      }
    },
    //刪除餐廳資訊
    async deleteRestaurant(restaurantId) {
      try {
        const response = await reqDeleteRestaurants(restaurantId)
        // console.log(response.data)
        if (response.status === 'error') {
          throw new Error(response.statusText)
        }
        this.fetchRestaurants()
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法刪除餐廳資料，請稍後再試'
        })
      }
    }
  }
}
</script>