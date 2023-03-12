<template>
  <div class="card">
    <div class="card-header">
      <strong v-if="profile.FavoritedRestaurants">{{ profile.FavoritedRestaurants.length }} </strong> 收藏餐廳
    </div>
    <div class="card-body">
      <router-link v-for="FavoritedRestaurant in profile.FavoritedRestaurants" :to="{
        name: 'restaurant',
        params: { id: FavoritedRestaurant.id }
      }" :key="FavoritedRestaurant.id">
        <img  :src="FavoritedRestaurant.image|emptyImage" width="60" height="60" class="avatar">
      </router-link>

    </div>
  </div>
</template>

<script>

import { emptyImageFilter } from '@/utils/mixins'
export default {
  name: 'UserFavoritedRestaurantsCard',
  props: ['profile'],
  mixins: [emptyImageFilter]


}
</script>