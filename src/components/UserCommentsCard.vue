<template>
  <div class="card">
    <div class="card-header">
      <strong v-if="profile.Comments">{{ profile.Comments.length }} </strong> 已評論餐廳
    </div>
    <div class="card-body">
      <router-link v-for="Comment in profile.Comments" :to="{
        name: 'restaurant',
        params: { id: Comment.RestaurantId }
      }" :key="Comment.id">
        <img :src="Comment.Restaurant.image|emptyImage" width="60" height="60" class="avatar">
      </router-link>

    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from '@/utils/mixins'

export default {
  name: 'UserCommentsCard',
  props: ['profile'],
  mixins:[emptyImageFilter]
}
</script>