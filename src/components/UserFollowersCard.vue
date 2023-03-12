<template>
  <div class="card">
    <div class="card-header">
      <strong v-if="profile.Followers">{{ Followers.length }}</strong> followers (追隨者)
    </div>
    <div class="card-body">
      <router-link
        v-for="Follower in profile.Followers"
        :key="Follower.id"
        :to="{ name: 'user', params: { id: Follower.id } }"
      >
        <img
          :src="following.image |emptyImage"
          width="60"
          height="60"
          class="mr-1"
        >
      </router-link>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from '@/utils/mixins'

export default {
  name: 'UserFollowersCard',
  props: ['profile'],
  mixins:[emptyImageFilter],
  computed: {
    Followers(){
      const {Followers} =this.profile
      return Followers
    }
  }
}
</script>